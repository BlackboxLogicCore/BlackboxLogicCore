# Rhodium Germany | Nachweiskette, Ausfallsicherheit und Benchmark-Navigation
**Stand: 20. November 2026 · Öffentliche Ergebnisübersicht · geschützter Kern nicht offengelegt**

Rhodium Germany ist eine geschützte Technologieplattform für deterministische Datenverarbeitung, bitidentische Wiederherstellung, Integritätsnachweise und kontrollierte Ausführung. Die folgenden Referenzen verbinden konkrete Prüfbedingungen, Ergebnisse und Nachweisorte. Öffentliche Hashes sind Prüfreferenzen, keine geheimen Schlüssel und kein Ersatz für ein Leistungsprotokoll.

## Nachweise direkt öffnen

- [558 historische Kalt-/Warm-Einzelberichte mit SHA-256 und Bytezahlen](RHODIUM-GERMANY-PUBLIC-BENCHMARK-EVIDENCE.md)
- [Große technische Gesamtschau mit Benchmark-Familien und Ergebnissen](RHODIUM-GERMANY-FULL-BIG-APP.md)
- [Erweiterter öffentlicher Evidence-Katalog](RHODIUM-GERMANY-EXTENDED-PUBLIC-EVIDENCE.md)
- [Technischer Überblick und Branchen](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md)
- [Öffentliches Profil und weitere Ergebnisübersicht](README.md)

## Messbare Ausfallsicherheit und Wiederherstellung

| Test | Umfang / Fehlerbild | Dokumentiertes Ergebnis | Nachweisreferenz |
|---|---|---|---|
| TCP-Failover, 08.11.2026 | 100 virtuelle Kontexte, 10.000 Aufträge, erzwungener Prozessabbruch | Doppel-PASS; ca. 140 ms bis zur ersten Antwort im Testaufbau | `RHODIUM-TCP-10000-FAILOVER-DOUBLEPASS-20261108.json`; historischer SHA-256 `4C2DD15E2BA93CA1935A1ED45EF8FD8326436B8A6FC7BD07F7DA2AB45D9B5379` |
| Customer Double Recovery, 07.11.2026 | Zwei Wiederherstellungsläufe, je vier Prüfpunkte | 2 × 4/4 PASS; 0 SHA-Abweichungen | `DOUBLE-VERIFY-REPORT.json`; historischer SHA-256 `D8A3E30255DBFDE238C89B11BEC806E9D824AE5B06B48B7E692F3D367A67B3F9` |
| 4-GiB-Rekonstruktion, 08.11.2026 | 4.294.967.296 Byte, zweimaliger Test | 2/2 PASS; 31,76 / 33,39 s; 0 abweichende Blöcke | `RHODIUM-MINIMAL-IGNITION-4GIB-DOUBLEPASS-SEAL-20261108.json`; historischer SHA-256 `3D48D9F61D566FC2258347E9CFA162BB19BA6FBA2F4F99B15B2573CE588D8A27` |
| Cross-Runner-Failover | 10.000 Aufträge; Worker-Abbruch nach 5.000 | Öffentlicher Testcode und Workflow zur reproduzierbaren Prüfung | [GitHub-Workflow-Repository](https://github.com/BlackboxLogicCore/rhodium-kaggle-public-gate) · Commit `dae76e3` |

**Einordnung:** Die Wiederanlaufzeit ist die gemessene Zeit bis zur ersten Antwort im jeweiligen Szenario, keine allgemeine Garantie für jede Infrastruktur oder eine garantierte 24/7-Verfügbarkeit. Doppelte und mehrfache Absicherung sind zentrale Resilienzmerkmale; die obigen Prüfungen belegen konkrete Teilfälle.

## Daten, Integrität, Wiedererkennung und Verarbeitung

| Testfamilie | Testdaten / Umfang | Dokumentiertes Ergebnis |
|---|---|---|
| 100 GiB | 107.374.182.400 Byte Ausgangsdaten | 14.476.957.280 Byte Ausgabedaten, 86,52 % Reduktion, zwei Restore-Prüfungen PASS |
| NASA Juno WAVES | 62 Dateien, 5.443.001.419 Byte | 85,54 % Reduktion, SHA-identische Wiederherstellung im dokumentierten Lauf |
| Automotive FAST75 | 75 lokale Roundtrips | 75/75 PASS, 0 Fehler |
| NASA C-MAPSS FD001 | 100 Triebwerke, 20.631 Zeilen, 24 Kanäle | 495.144 Messwerte, lokale Verarbeitung in 147 ms |
| Boss-Massentest | 107.672 Kandidaten | 107.643 PASS; 29 nicht als PASS gezählt |
| Inverse FastP0 | 103.226 Kandidaten je Lauf | 103.193 PASS in jedem von zwei Läufen; gleiche Kandidatenmenge nicht doppelt als unabhängig zählen |
| EPIC9 | 10 Durchläufe | 10/10 PASS, zusammen 100.000 Aktivierungen |
| Isolierter Aktivierungstest | 10.000 Aktivierungen | PASS; vier ungültige Trigger abgewiesen |
| Seismischer USGS-Abgleich | 194 Ereignisse | 194/194 Ereigniskennungen übereinstimmend |
| Fingerabdruck-Stabilität | 20.000.000 Zustandsaktualisierungen | Feste Kennung über den dokumentierten lokalen Lauf |
| Historische Siegelprüfung | 1.000.000 Vorgänge | Historischer Lastlauf |
| Historische Telemetrie | 1.500.000 Einträge | Zehn Senderläufe; keine 1,5 Mio. unabhängigen Benchmarks |

Bei Warm- und Wiedererkennungstests können vorbereitete Referenzdaten am Ziel vorhanden sein. Die übertragenen Bytes sind deshalb getrennt von der Größe des ursprünglichen Datenbestands zu lesen.

## Umfang des Nachweisbestands

Das interne Gesamtregister nennt **216 Testgruppen und 2.369 Nachweisdateien**. Das öffentliche Register enthält **558 historische Cold/Warm-Einzelberichte** mit Messwerten und Berichtsprüfsummen. Weitere Register zählen 63 öffentliche Positionen, 29 Katalogpositionen, 34 zusätzliche Ergebnispositionen und 25 Best-of-Fälle. Diese Zahlen sind unterschiedliche Sichten auf teils überlappende Bestände und werden nicht zu einer künstlichen Gesamtzahl addiert.

## Kryptografische Nachweiskette

Ein überprüfbarer Leistungsnachweis besteht aus Testkennung, Testbedingungen, Messwert, Integritätsreferenz und – wo verfügbar – digitaler Signatur mit zugehörigem **öffentlichem** Prüfschlüssel. Die geschützte Identität, der persönliche kryptografische Fingerabdruck, private Signaturschlüssel und Zugriffstoken werden nicht veröffentlicht.

Ein historisches SSH-Verbindungsprotokoll dokumentiert unterschiedliche Server-Hostschlüssel (RSA, ECDSA, ED25519) und einen lokalen RSA-Schlüssel. **SSH-Hostschlüssel sind nicht automatisch die Signaturschlüssel der Benchmark-Berichte.** Das Projekt dokumentiert außerdem ein TRUE-COLD-Evidence-Bundle mit Evidence-JSON, Signatur und öffentlichem Prüfschlüssel: `RHODIUM-EVIDENCE-TRUE-COLD-20260929-141308`. Eine Veröffentlichung von Signatur und öffentlichem Prüfschlüssel erfolgt nur mit eindeutiger Zuordnung zum freigegebenen Nachweis.

## Öffentliche automatische Prüfungen

- [GitHub Actions: 1-Byte-Live-Gate / enwik9, Lauf 42370132004](https://github.com/BlackboxLogicCore/rhodium-kaggle-public-gate/actions/runs/42370132004)
- [GitHub Actions: Referenz-Integritätsprüfung, Lauf 42362509610](https://github.com/BlackboxLogicCore/rhodium-kaggle-public-gate/actions/runs/42362509610)

Die Links sind konkrete Laufreferenzen. Ob sie ohne Anmeldung abrufbar sind, hängt von der aktuellen Repository-Sichtbarkeit ab. Der Referenz-Integritätslauf verwendet zlib und ist kein Nachweis eines proprietären Codecs.

## Anwendungen und Gesamtplattform

Die dokumentierten Einsatzfelder reichen von Datenwiederherstellung, Integritätskontrolle, technischer Ausfallsicherheit und Industrie-/Robotikdaten bis zu Sensorik, Umwelt- und Seismikdaten. Rhodium Germany bietet die geschützte Technologie für B2B-Prüfungen und definierte Lizenz-/Pilotprojekte an. Die öffentlichen Ergebnisse beschreiben die geprüften Eigenschaften; interne Verarbeitungswege, proprietäre Steuerung und Kernimplementierung bleiben vertraulich.

**Vergleichsmaßstab:** Hardware, Energieverbrauch, Netto-Durchsatz, Fehlerverhalten, Integrität, Wiederanlauf und reale Testbedingungen. Ein großer Serverpark allein ist kein Leistungsbeweis; eine weltweite Alleinstellung ist ohne methodisch vergleichbare Daten nicht behauptet.

**Kontakt:** https://rhodium-germany.de
