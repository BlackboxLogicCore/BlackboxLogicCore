<#
.SYNOPSIS
  Rhodium Germany - Doppelt gepruefte, bitidentische Wiederherstellung eines RSA-Schluessels
  mit Ausfallsicherheit ueber zwei getrennte Sicherungsorte.

.DESCRIPTION
  Das Skript prueft LOKAL, ohne den privaten Schluessel auszugeben oder hochzuladen:

    1. Sicherung   : Der private Schluessel wird an zwei getrennte Orte kopiert (A und B),
                     z. B. USB-Stick und zweites Laufwerk.
    2. Ausfall     : Der Arbeitsstand wird als "verloren" behandelt; es wird nur aus den
                     Sicherungen wiederhergestellt (in ein frisches Temp-Verzeichnis).
    3. Pruefung 1  : SHA-256 des wiederhergestellten privaten Schluessels == SHA-256 des Originals
                     und Bytelaenge identisch (bitidentisch).
    4. Pruefung 2  : Aus dem wiederhergestellten privaten Schluessel wird mit ssh-keygen -y der
                     oeffentliche Schluessel neu abgeleitet; sein Fingerabdruck muss dem
                     erwarteten RSA-Fingerabdruck entsprechen (funktionale Gleichheit).
    5. Failover    : Beide Pruefungen laufen getrennt fuer Sicherung A UND Sicherung B.
                     Faellt ein Ort aus, bleibt der andere nachweislich nutzbar.
    6. Negativtest : In einer Wegwerfkopie wird genau ein Bit gekippt. Die Pruefung muss
                     diese Kopie als ABWEICHEND erkennen.
    7. Wiederholung: Der gesamte Ablauf wird zweimal ausgefuehrt (Lauf 1 und Lauf 2).

  Ausgabe: eine JSON-Datei mit PASS/FAIL je Pruefpunkt, Schluesseltyp/-laenge und dem
  OEFFENTLICHEN Fingerabdruck. Der private Schluessel, sein Inhalt und sein SHA-256-Wert
  werden NICHT in die Ausgabedatei geschrieben. Temporaere Kopien werden am Ende geloescht.

.PARAMETER PrivateKeyPath
  Pfad zum privaten Schluessel, z. B. C:\Users\<name>\.ssh\id_rsa

.PARAMETER BackupDirA / BackupDirB
  Zwei getrennte Sicherungsorte (moeglichst unterschiedliche Datentraeger).

.PARAMETER ExpectedFingerprint
  Erwarteter Fingerabdruck im Format SHA256:..., z. B. aus dem historischen Protokoll.
  Ohne Angabe wird der Fingerabdruck der vorhandenen .pub-Datei verwendet.

.PARAMETER OutFile
  Ergebnisdatei (JSON). Standard: .\RSA-RECOVERY-DOUBLECHECK-<Datum>.json

.EXAMPLE
  .\Test-RsaKeyRecovery.ps1 -PrivateKeyPath "$env:USERPROFILE\.ssh\id_rsa" `
      -BackupDirA "E:\RhodiumKeyBackup" -BackupDirB "D:\RhodiumKeyBackup" `
      -ExpectedFingerprint "SHA256:..."

.NOTES
  Bei passwortgeschuetztem Schluessel fragt ssh-keygen interaktiv nach der Passphrase.
  Die Passphrase wird vom Skript weder gespeichert noch protokolliert.
  Die Sicherungsordner bleiben bestehen; sie enthalten den privaten Schluessel und muessen
  entsprechend geschuetzt werden (Verschluesselung, Zugriffsschutz, getrennte Aufbewahrung).
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory)] [string] $PrivateKeyPath,
  [Parameter(Mandatory)] [string] $BackupDirA,
  [Parameter(Mandatory)] [string] $BackupDirB,
  [string] $ExpectedFingerprint,
  [string] $OutFile = (Join-Path (Get-Location) ("RSA-RECOVERY-DOUBLECHECK-{0}.json" -f (Get-Date -Format 'yyyyMMdd-HHmmss')))
)

$ErrorActionPreference = 'Stop'

function Get-Sha256([string] $Path) { (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash }

function Get-PubInfo([string] $PubPath) {
  # Ausgabe z. B.: "3072 SHA256:abc... kommentar (RSA)"
  $line = (& ssh-keygen -lf $PubPath -E sha256) | Select-Object -First 1
  if ($LASTEXITCODE -ne 0 -or -not $line) { throw "ssh-keygen -lf fehlgeschlagen fuer $PubPath" }
  $parts = $line -split '\s+'
  [pscustomobject]@{ Bits = [int]$parts[0]; Fingerprint = $parts[1]; Type = ($line -replace '.*\((\w+)\)\s*$', '$1') }
}

function Get-DerivedFingerprint([string] $PrivPath, [string] $WorkDir) {
  $pub = Join-Path $WorkDir 'derived.pub'
  $derived = & ssh-keygen -y -f $PrivPath
  if ($LASTEXITCODE -ne 0 -or -not $derived) { return $null }
  Set-Content -LiteralPath $pub -Value $derived -Encoding ascii
  Get-PubInfo $pub
}

if (-not (Get-Command ssh-keygen -ErrorAction SilentlyContinue)) { throw 'ssh-keygen nicht gefunden (OpenSSH-Client installieren).' }
if (-not (Test-Path -LiteralPath $PrivateKeyPath)) { throw "Privater Schluessel nicht gefunden: $PrivateKeyPath" }
if ((Resolve-Path $BackupDirA -ErrorAction SilentlyContinue) -and (Resolve-Path $BackupDirB -ErrorAction SilentlyContinue) -and
    ((Resolve-Path $BackupDirA).Path -eq (Resolve-Path $BackupDirB).Path)) { throw 'BackupDirA und BackupDirB muessen verschiedene Orte sein.' }

$origHash  = Get-Sha256 $PrivateKeyPath
$origBytes = (Get-Item -LiteralPath $PrivateKeyPath).Length
$pubPath   = "$PrivateKeyPath.pub"
$pubInfo   = if (Test-Path -LiteralPath $pubPath) { Get-PubInfo $pubPath } else { $null }
if (-not $ExpectedFingerprint) {
  if (-not $pubInfo) { throw 'Kein -ExpectedFingerprint angegeben und keine .pub-Datei vorhanden.' }
  $ExpectedFingerprint = $pubInfo.Fingerprint
}

# 1. Sicherung an zwei getrennte Orte
$backups = @{}
foreach ($entry in @(@{ Name = 'A'; Dir = $BackupDirA }, @{ Name = 'B'; Dir = $BackupDirB })) {
  New-Item -ItemType Directory -Force -Path $entry.Dir | Out-Null
  $target = Join-Path $entry.Dir (Split-Path $PrivateKeyPath -Leaf)
  Copy-Item -LiteralPath $PrivateKeyPath -Destination $target -Force
  $backups[$entry.Name] = $target
}

$runs = @()
foreach ($run in 1..2) {
  $work = Join-Path ([IO.Path]::GetTempPath()) ("rhodium-rsa-restore-{0}-{1}" -f $run, [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $work | Out-Null
  try {
    $sources = @()
    foreach ($name in 'A', 'B') {
      # 2. Wiederherstellung ausschliesslich aus der Sicherung
      $restored = Join-Path $work "restored_$name"
      Copy-Item -LiteralPath $backups[$name] -Destination $restored -Force
      if ($IsLinux -or $IsMacOS) { & chmod 600 $restored }
      else { & icacls $restored /inheritance:r /grant:r "$($env:USERNAME):(R)" | Out-Null }

      # 3. Pruefung 1: bitidentisch
      $bitIdentical = ((Get-Sha256 $restored) -eq $origHash) -and ((Get-Item -LiteralPath $restored).Length -eq $origBytes)
      # 4. Pruefung 2: funktional identisch (abgeleiteter oeffentlicher Schluessel)
      $derived = Get-DerivedFingerprint $restored $work
      $fpMatch = [bool]($derived -and $derived.Fingerprint -eq $ExpectedFingerprint)

      $sources += [pscustomobject]@{
        backup                    = $name
        bit_identical_sha256      = $bitIdentical
        derived_fingerprint_match = $fpMatch
        pass                      = ($bitIdentical -and $fpMatch)
      }
    }

    # 6. Negativtest: ein gekipptes Bit muss erkannt werden
    $tampered = Join-Path $work 'tampered'
    $bytes = [IO.File]::ReadAllBytes($backups['A'])
    $bytes[[int]($bytes.Length / 2)] = $bytes[[int]($bytes.Length / 2)] -bxor 0x01
    [IO.File]::WriteAllBytes($tampered, $bytes)
    $tamperDetected = ((Get-Sha256 $tampered) -ne $origHash)
    $bytes = $null

    $runs += [pscustomobject]@{
      run                       = $run
      sources                   = $sources
      failover_each_backup_ok   = (@($sources | Where-Object { $_.pass }).Count -eq 2)
      single_bit_flip_detected  = $tamperDetected
      pass                      = ((@($sources | Where-Object { $_.pass }).Count -eq 2) -and $tamperDetected)
    }
  }
  finally {
    Get-ChildItem -LiteralPath $work -File -ErrorAction SilentlyContinue | ForEach-Object {
      # Temp-Kopien vor dem Loeschen ueberschreiben
      $len = $_.Length; if ($len -gt 0) { [IO.File]::WriteAllBytes($_.FullName, (New-Object byte[] $len)) }
    }
    Remove-Item -LiteralPath $work -Recurse -Force -ErrorAction SilentlyContinue
  }
}

$result = [ordered]@{
  test_id                 = 'RG-RSA-RECOVERY-DOUBLECHECK'
  timestamp_utc           = (Get-Date).ToUniversalTime().ToString('o')
  key_type                = if ($pubInfo) { $pubInfo.Type } else { 'RSA' }
  key_bits                = if ($pubInfo) { $pubInfo.Bits } else { $null }
  public_key_fingerprint  = $ExpectedFingerprint
  backup_locations        = 2
  runs                    = $runs
  overall_pass            = (@($runs | Where-Object { $_.pass }).Count -eq 2)
  not_included            = 'Privater Schluessel, dessen SHA-256-Wert, Passphrase und Dateipfade werden nicht ausgegeben.'
  scope                   = 'Lokaler Wiederherstellungstest einer Schluesseldatei aus zwei Sicherungen. Kein Nachweis fuer Schutz vor Diebstahl, Hardwareausfall des Rechners oder unabhaengige Zertifizierung.'
}

$result | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $OutFile -Encoding utf8
Write-Host ("Ergebnis: {0}  ->  {1}" -f ($(if ($result.overall_pass) { 'PASS (2/2 Laeufe, je 2/2 Sicherungen, Bitfehler erkannt)' } else { 'FAIL' })), $OutFile)
if (-not $result.overall_pass) { exit 1 }
