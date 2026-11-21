# Rhodium Germany | RSA-Schlüssel: Nachweisstand, Wiederherstellung und Ausfallsicherheit
**Stand: 21. November 2026 · Öffentliche Fassung · keine privaten Schlüssel, Passphrasen oder internen Pfade**

Dieses Dokument trennt drei Dinge sauber: was zum RSA-Schlüssel des Eigentümers **bereits belegt** ist, was als **doppelt geprüfte, bitidentische Wiederherstellung mit Ausfallsicherheit** nachgewiesen werden soll und wie dieses Verfahren im Vergleich zum Stand der Technik einzuordnen ist.

## 1. Bereits belegt

| ID | Datum | Prüfung | Ergebnis | Grenze |
|---|---|---|---|---|
| RG-20261118-KEY | 18.11.2026 | Fingerabdruck des öffentlichen **RSA-3072**-Schlüssels (SHA-256) mit einem historischen Terminalprotokoll vom 11.07.2026 verglichen | **Exakte Übereinstimmung** | Belegt die Identität des öffentlichen Schlüssels über die Zeit. Kein Signaturtest, keine Wiederherstellungsprüfung. |
| Signaturtest | 18.11.2026 | Prüfnachricht lokal mit dem privaten RSA-Schlüssel des Owner-Freeze-Zertifikats signiert und mit dem zugehörigen öffentlichen Schlüssel verifiziert | **Verifikation erfolgreich** | Belegt den Besitz des privaten Schlüssels. Keine unabhängige Zertifizierung. |

Der Fingerabdruckwert selbst ist im privaten Register dokumentiert und wird hier bewusst nicht veröffentlicht.

## 2. Doppelt geprüfte, bitidentische Wiederherstellung mit Ausfallsicherheit

**Status: Prüfverfahren bereitgestellt · Lauf mit dem Eigentümerschlüssel ausstehend.**
Bis ein Ergebnis vorliegt, wird hier **kein PASS behauptet**.

Das Prüfskript [`tools/Test-RsaKeyRecovery.ps1`](tools/Test-RsaKeyRecovery.ps1) läuft ausschließlich lokal auf dem Rechner des Eigentümers. Es prüft:

| Schritt | Was geprüft wird | Bestanden, wenn |
|---|---|---|
| Sicherung | Kopie des privaten Schlüssels an **zwei getrennte Orte** (z. B. USB-Datenträger und zweites Laufwerk) | Beide Kopien vorhanden |
| Ausfall | Der Arbeitsstand gilt als verloren; Wiederherstellung **nur aus den Sicherungen** in ein frisches Verzeichnis | Wiederherstellung aus jeder Sicherung möglich |
| Prüfung 1: bitidentisch | SHA-256 und Bytelänge der wiederhergestellten Datei gegen das Original | Beide Werte identisch |
| Prüfung 2: funktional identisch | Öffentlicher Schlüssel wird aus dem **wiederhergestellten** privaten Schlüssel neu abgeleitet (`ssh-keygen -y`), sein Fingerabdruck mit dem erwarteten RSA-3072-Fingerabdruck verglichen | Fingerabdruck identisch |
| Ausfallsicherheit | Prüfung 1 und 2 **getrennt für Sicherung A und B** | Jede Sicherung allein reicht zur vollständigen Wiederherstellung |
| Negativtest | In einer Wegwerfkopie wird **genau ein Bit** gekippt | Abweichung wird erkannt |
| Wiederholung | Gesamter Ablauf **zweimal** (Lauf 1 und Lauf 2) | 2 von 2 Läufen bestanden |

**Datenschutz im Verfahren:** Die Ergebnisdatei enthält nur PASS/FAIL je Prüfpunkt, Schlüsseltyp und -länge sowie den öffentlichen Fingerabdruck. Der private Schlüssel, sein SHA-256-Wert, die Passphrase und Dateipfade werden nicht ausgegeben. Temporäre Kopien werden überschrieben und gelöscht.

**Selbsttest des Verfahrens (21.11.2026):** Mit einem eigens erzeugten Wegwerf-Testschlüssel (RSA-3072, nicht der Eigentümerschlüssel) ergab das Skript 2/2 Läufe PASS, je 2/2 Sicherungen bitidentisch und funktional identisch, Ein-Bit-Fehler in beiden Läufen erkannt. Ein absichtlich falscher erwarteter Fingerabdruck führte korrekt zu FAIL. Das belegt die Funktion des Prüfverfahrens, nicht die Wiederherstellung des Eigentümerschlüssels.

### Ausführung durch den Eigentümer

```powershell
cd <Repository>\tools
.\Test-RsaKeyRecovery.ps1 `
  -PrivateKeyPath "$env:USERPROFILE\.ssh\id_rsa" `
  -BackupDirA "E:\RhodiumKeyBackup" `
  -BackupDirB "D:\RhodiumKeyBackup" `
  -ExpectedFingerprint "SHA256:<Wert aus dem privaten Register>"
```

Nach einem erfolgreichen Lauf kann die erzeugte JSON-Datei (sie enthält keine Geheimnisse) als Nachweis `RG-20261121-KEY-RECOVERY` ergänzt werden. Erst dann wird der Status in diesem Dokument und in der README auf PASS gesetzt.

**Hinweis zu den Sicherungen:** Die Sicherungsordner enthalten den privaten Schlüssel. Sie gehören verschlüsselt und getrennt aufbewahrt, nicht in ein Repository, eine Cloud-Synchronisation ohne Verschlüsselung oder einen Chat.

## 3. Ist das Verfahren einmalig?

**Kurz: Nein, das Verfahren an sich ist nicht einmalig, und das ist gut so.** Doppelt geprüfte, bitidentische Wiederherstellung von Schlüsseln ist anerkannte Sicherheitspraxis. Gerade weil sie Standard ist, ist sie für Kunden und Prüfer glaubwürdig.

- **NIST SP 800-57** empfiehlt, von Schlüsselmaterial mehrere Kopien an physisch getrennten Orten zu halten und die Integrität jeder Kopie regelmäßig zu prüfen ([NIST SP 800-57 Part 1 Rev. 4](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r4.pdf)). Die Wiederherstellung aus Sicherung oder Archiv heißt dort *key recovery* ([NIST SP 800-57 Part 1 Rev. 5](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf)).
- Der **Bundesdatenschutzbeauftragte** verlangt, dass auch von Schlüsseln Backups erstellt, mindestens so sicher wie die Daten aufbewahrt und Wiederherstellungen regelmäßig geprobt werden ([BfDI, Kurzposition Verschlüsselung und Backups](https://www.bfdi.bund.de/DE/Fachthemen/Inhalte/Technik/Kurzposition_Verschl%C3%BCsselung_und_Backups.html)).
- Das **BSI** fordert, private Signaturschlüssel gegen Kopieren, Missbrauch und Manipulation zu schützen, etwa durch zertifizierte Hardware wie Chipkarte oder HSM ([BSI TR-02102-2](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeRichtlinien/TR02102/BSI-TR-02102-2.pdf?__blob=publicationFile&v=13)).
- Kommerzielle und freie Werkzeuge automatisieren Wiederherstellungsprüfungen seit Jahren, z. B. [Veeam SureBackup](https://helpcenter.veeam.com/docs/vbr/userguide/surebackup_job.html) oder [restic check --read-data](https://manpages.debian.org/unstable/restic/restic-check.1.en.html).
- Für Schlüssel gibt es zusätzlich verteilte Sicherungen nach **Shamir** (k-von-n-Anteile), etwa [SLIP-39 bei Trezor](https://trezor.io/de/learn/advanced/standards-proposals/what-is-shamir-backup).

**Was Rhodium Germany daraus machen kann:** Ein Alleinstellungsmerkmal entsteht nicht durch den Prüfschritt selbst. Es kann durch die Einbettung in die Box entstehen: ein signierter, datensparsamer Prüfnachweis je Wiederherstellung, der an den freigegebenen Referenzstand gebunden ist und von Dritten mit dem öffentlichen Schlüssel geprüft werden kann. Ob diese Kombination am Markt einzigartig ist, lässt sich erst nach einem methodisch vergleichbaren Wettbewerbsvergleich sagen und wird hier nicht behauptet.

## 4. Empfehlungen für die Ausfallsicherheit

1. **Getrennter Signaturschlüssel:** Den bisherigen SSH-Schlüssel nicht als produktiven Kunden-Signaturschlüssel verwenden. Für das Rhodium-Prüfsiegel einen eigenen Schlüssel festlegen, wie im internen Siegelkonzept vorgesehen.
2. **Zwei getrennte, verschlüsselte Sicherungen** an unterschiedlichen Orten, eine davon offline.
3. **Regelmäßige Wiederholung** des Prüfskripts, z. B. vierteljährlich, und Ablage der JSON-Ergebnisse.
4. **Optional Hardware-Schutz** (Smartcard, FIDO2/YubiKey oder HSM) für den späteren Signaturschlüssel, wie vom BSI empfohlen.
5. **Widerrufsplan:** Dokumentieren, wie ein kompromittierter Schlüssel ersetzt und Partnern ein neuer öffentlicher Schlüssel mitgeteilt wird.

[Zurück zur Übersicht](README.md) · [Technische Evidenz und Resilienz](RHODIUM-EVIDENCE-AND-RESILIENCE-20261120.md)
