# Rhodium Germany – Öffentliche Erdbebenforschung und Schadensabschätzung

**Stand:** 9. November 2026  
**Status:** Forschungsnachweise und Methodik; **kein Frühwarnsystem und keine Erdbebenvorhersage**.

## Vorliegende technische Prüfungen

- Ein privater GitHub-Actions-Forschungsdurchlauf verarbeitete **22.836 historische USGS-Ereignisse** aus zwölf Monaten 2025 in einem Streaming-Verfahren mit Hash-Kette. Diese Zahl bezeichnet verarbeitete Ereignisse, **keine vorhergesagten Erdbeben**.
- Ein separater Live-Daten-Integritätstest verarbeitete **184 Ereignisse** aus einem öffentlichen USGS-GeoJSON-Feed und prüfte die bitidentische Datenwiederherstellung zweimal. Dieser Durchlauf nutzte eine Standardbibliotheks-Zlib-Baseline; er ist **kein Beweis für eine proprietäre Vorhersagefähigkeit**.
- Eine retrospektive Forschungsprüfung verwendete **597 historische USGS-Ereignisse** aus Kalifornien (Januar bis Juni 2025). Ein bestandenes Datenintegritäts- und Leakage-Gate belegt **keine zuverlässige Vorhersage künftiger Erdbeben**.

Die zugrunde liegenden technischen Protokolle liegen im privaten Rhodium-Forschungsbestand; sie werden mit dieser Veröffentlichung nicht öffentlich zugänglich gemacht.

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
