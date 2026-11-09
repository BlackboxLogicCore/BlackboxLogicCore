# Rhodium Germany – Öffentliche Erdbebenforschung und Schadensabschätzung

**Stand:** 9. November 2026  
**Status:** Forschungsnachweise und Methodik; **kein Frühwarnsystem und keine Erdbebenvorhersage**.

## Vorliegende technische Prüfungen

- Ein privater GitHub-Actions-Forschungsdurchlauf verarbeitete **22.836 historische USGS-Ereignisse** aus zwölf Monaten 2025 in einem Streaming-Verfahren mit Hash-Kette. Diese Zahl bezeichnet verarbeitete Ereignisse, **keine vorhergesagten Erdbeben**.
- Ein separater Live-Daten-Integritätstest verarbeitete **184 Ereignisse** aus einem öffentlichen USGS-GeoJSON-Feed und prüfte die bitidentische Datenwiederherstellung zweimal. Dieser Durchlauf nutzte eine Standardbibliotheks-Zlib-Baseline; er ist **kein Beweis für eine proprietäre Vorhersagefähigkeit**.
- Eine retrospektive Forschungsprüfung verwendete **597 historische USGS-Ereignisse** aus Kalifornien (Januar bis Juni 2025). Ein bestandenes Datenintegritäts- und Leakage-Gate belegt **keine zuverlässige Vorhersage künftiger Erdbeben**.

Die zugrunde liegenden technischen Protokolle liegen im privaten Rhodium-Forschungsbestand; sie werden mit dieser Veröffentlichung nicht öffentlich zugänglich gemacht.

## Ergänzung: erste Live-Daten, End-to-End und Failover

Die folgenden Ergebnisse stammen aus bereits vorhandenen, getrennten Testprofilen. Sie werden **nicht** zu einem einzigen durchgehenden Gesamttest zusammengefasst.

| Datum | Nachweisgegenstand | Dokumentiertes Ergebnis | Aussagegrenze |
|---|---|---|---|
| 05.11.2026 | Erste externe USGS-Live-Datenprüfung | Drei originale USGS-HTTPS-Feeds; je zwei übereinstimmende In-Memory-Streaming-/SHA-256-Kontrollen | Live-Datenintegrität, nicht Erdbebenvorhersage oder proprietärer Engine-Restore |
| 06.11.2026 | Externer GitHub–Laptop–GitHub-End-to-End-Transport | Kontrollierter fester Marker über autorisierten Rechner, anschließend unabhängiger GitHub-Abruf: PASS | Echter externer End-to-End-Transport-PASS für den definierten Weg; keine Aussage über beliebige Nutzlasten oder einen zusätzlichen Mobilfunkempfang |
| 06.11.2026 | Isoliertes Authentifizierungs-Gate | Zwei akzeptierte signierte Anfragen; vier erwartete Ablehnungen (Replay, Format, Mandant/Schlüssel, Signatur) | Test einer definierten Zugriffskontrolle, keine vollständige Produktzertifizierung |
| 06.11.2026 | Isolierter Forschungs-Pilot | 1 MiB deterministischer Teststrom byteidentisch wiedererzeugt, SHA-256-Abgleich; Forschungsstatus `RESEARCH_PILOT_VERIFIED__PRODUCTION_HOLD` | Vorbereiteter Empfängerzustand und Testdaten; keine universelle Rekonstruktion beliebiger unbekannter Nutzlasten |
| 09.11.2026 | Historischer seismischer Stream | 22.836 historische USGS-Ereignisse, GitHub-Actions-Lauf erfolgreich abgeschlossen | Datenverarbeitung und Integritätsprüfung; keine Prognosegüte belegt |
| 09.11.2026 | USGS-Live-Integritäts-Gate | 184 Ereignisse aus öffentlichem USGS-Feed; zwei bitidentische Prüfungen, Tamper-Erkennung im definierten Test; GitHub-Actions-Lauf erfolgreich | Standard-Zlib-Testpfad, keine proprietäre Vorhersage oder Echtzeitwarnung |
| 09.11.2026 | Cross-Runner-Failover-Gate | Zwei unabhängige GitHub-Runner; je 10.000 Aufgaben; kontrollierter Ausfall und Wiederaufnahme, berichtete Wiederaufnahmezeiten 2,137 ms und 3,833 ms; GitHub-Actions-Lauf erfolgreich | Kontrollierter Runner-Test; keine garantierte Wiederherstellungszeit in produktiven Rechenzentren |

**Nachvollziehbarkeit:** Die drei GitHub-Actions-Läufe vom 09.11.2026 haben die IDs `42650707918` (historischer USGS-Stream), `42650734710` (USGS-Live-Integrität) und `42650689669` (Cross-Runner-Failover). Ihre Ausführungsprotokolle liegen in einem **privaten** Repository und sind nicht ohne entsprechende Berechtigung öffentlich einsehbar. Die älteren E2E-Originalberichte bleiben ebenfalls privat. Die öffentliche Tabelle ist eine zusammenfassende Darstellung, keine unabhängige öffentliche Reproduktion.

**Einordnung der vorhandenen End-to-End-Nachweise:** Rhodium Germany verfügt über dokumentierte reale End-to-End-Prüfungen, darunter GitHub–Laptop–GitHub-Transport, externe Runner-Roundtrips und den Runner-übergreifenden Failover-Test. Diese positiven Ergebnisse bleiben als PASS erhalten. Die einzelnen Prüfprofile sind voneinander zu unterscheiden; daraus folgt weder automatisch eine bereits erfolgte produktive Kundenabnahme noch eine universelle 1-Byte-Rekonstruktion. Für die Erdbebenanwendung sind eine validierte Vorhersage und eine verlässliche standortbezogene Gebäudeeinsturzprognose nicht belegt.

## Was sich abschätzen lässt

Nach **einem bereits registrierten Erdbeben** lassen sich aus amtlich erfassten Größen wie Magnitude, Tiefe, Epizentrum und Entfernung erste, mit Unsicherheit behaftete Einschätzungen ableiten. Für belastbare lokale Schadensabschätzungen sind insbesondere gemessene bzw. modellierte Bodenerschütterung, Untergrund und Gebäudevulnerabilität erforderlich.

Die Magnitude allein bestimmt **nicht**, ob ein Gebäude einstürzt. Eine lokale Schadenswahrscheinlichkeit, ein Einsturzrisiko oder eine genaue Vorwarnzeit wird hier mangels validierter Modelle und standortbezogener Eingangsdaten **nicht beziffert**.

## Forschungsziel

Rhodium Germany untersucht, wie externe seismische Originaldaten in einer isolierten, nachvollziehbaren Verarbeitungskette empfangen, auf Integrität geprüft und zwischen unabhängigen Systemen weitergegeben werden können. Zukünftige Forschung kann sich auf schnelle Zustellung autorisierter Warninformationen und validierte, standortbezogene Risikomodelle richten.

**Wichtiger Sicherheitshinweis:** Diese Seite gibt **keine Warnungen, Evakuierungsempfehlungen oder Vorhersagen** aus. Für aktuelle Erdbebeninformationen und amtliche Warnungen sind die zuständigen Behörden maßgeblich.

## Originaldaten und fachliche Referenzen

- USGS Earthquake Catalog: https://earthquake.usgs.gov/earthquakes/search/
- USGS GeoJSON-Feeds: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- USGS ShakeMap: https://earthquake.usgs.gov/data/shakemap/
- USGS ShakeAlert (Erdbebenfrühwarnung nach Ereignisbeginn): https://www.usgs.gov/programs/earthquake-hazards/science/shakealert

*Öffentliche Forschungszusammenfassung. Keine externe Zertifizierung und kein Nachweis einer einsatzfähigen Bevölkerungswarnung.*
