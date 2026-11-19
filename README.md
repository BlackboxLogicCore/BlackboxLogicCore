# Rhodium Germany

**Die Sicherung ist zurück. Kann die Arbeit weitergehen?**

Ein Bauamt öffnet nach einem Ausfall wieder eine Bauakte. Der Antrag ist da, die Pläne lassen sich öffnen. Jetzt kommt die entscheidende Frage: Ist das wirklich der zuletzt freigegebene Plansatz, mit jeder Anlage in genau der Fassung, über die entschieden wurde?

Rhodium Germany entwickelt und lizenziert eine proprietäre Box zur überprüfbaren Datenwiederherstellung. Im Mittelpunkt steht der Vergleich mit einem bekannten Referenzstand. Wer einen Vorgang wieder aufnimmt, soll nachvollziehen können, welche Daten bitidentisch zurückgekommen sind und welche Prüfung noch aussteht.

[Gesamte öffentliche Prüfübersicht](RHODIUM-GERMANY-FULL-BIG-APP.md) · [Technische Einordnung](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) · [Unabhängige Prüfung](INDEPENDENT-TECHNICAL-REVIEW-REQUEST.md)

## Was sich heute prüfen lässt

Die historischen Berichte dokumentieren **15 von 15 bestandene lokale Schutzprüfungen** und einzelne Rekonstruktionsfälle bis **1 GiB**. Die Messergebnisse beziehen sich auf die dort beschriebenen Testbedingungen. Für die Box zählt das Zusammenspiel aus deterministischer Verarbeitung, Wiederherstellung und Vergleich mit der Referenz.

## Der eigene kryptomanische Fingerabdruck

Woran erkennt die Box einen Auftrag wieder, wenn die Verarbeitung weiterläuft und sich dabei der Arbeitszustand ändert? Rhodium Germany nennt diese Wiedererkennung den **kryptomanischen Fingerabdruck**. Für einen Kunden zählt die Zuordnung: Gehört das Paket zum vorgesehenen Auftrag, und lässt sich eine unerwartete Änderung bei der Übergabe erkennen?

**Eine feste Identität über 20 Millionen Zustandsaktualisierungen.** Die Projektauswertung vom 2. November 2026 beschreibt einen lokalen Stabilitätstest. Der Arbeitszustand wurde 20.000.000-mal fortgeschrieben. Der verglichene Fingerabdruck blieb unverändert, der Lauf endete mit Exitcode 0. Die Zahl bezeichnet die Schritte innerhalb dieses einen Versuchs. So lässt sich genau benennen, welche Eigenschaft geprüft wurde: die Beständigkeit der Kennung bei fortlaufender Verarbeitung.

**Was bei einer falschen Übergabe passiert.** In einem getrennten lokalen Prototyp mit Testdaten und Demo-Schlüssel wurden ein manipuliertes Paket und ein ungültiger Auslöser abgewiesen. Zwei Durchläufe mit jeweils 15 Prozessen und 14 Übergaben ergaben denselben Manifest-Prüfwert. Für eine Bank oder ein Amt wäre die entsprechende Pilotfrage, ob ein korrekt zugeordneter Vorgang weiterverarbeitet und eine absichtlich veränderte Übergabe zuverlässig gestoppt wird.

**Welche Identität belegt ist.** Die Ergebnisse stammen aus historischen lokalen Projektauswertungen. Der Gründer verortet den Ursprung seines Fingerabdrucks bei IONOS. Der separat dokumentierte RSA-3072-Abgleich betrifft einen SSH-Schlüssel. Das [technische Nachweisdokument](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) beschreibt diesen Abgleich und das geplante Prüfsiegel für Berichte.

### Vom einzelnen Datenpaket bis zur Wiederherstellung von 100 GiB

Die Box nutzt bereits verfügbare Daten am Ziel. Ist der richtige Stand dort vorhanden, kann eine kurze Kennung die Verarbeitung auslösen. Fehlende Inhalte müssen mitübertragen oder am Ziel reproduzierbar erzeugt werden. Wer zwei Verfahren vergleichen will, muss deshalb neben der Größe des Auslösers auch den vorbereiteten Zielbestand und die tatsächlich übertragenen Bytes kennen.

| Frage | Ergebnis laut historischem Projektbericht |
|---|---|
| Kommt ein großer Bestand vollständig zurück? | Bei **4 GiB** gelangen zwei Wiederherstellungen in **31,76 und 33,39 Sekunden** ohne abweichende Blöcke. Ein separater **100-GiB**-Fall meldet **14.476.957.280 übertragene Bytes** und zwei erfolgreiche Wiederherstellungsprüfungen. |
| Wiederholt sich das Ergebnis bei vielen Dateien? | Zwei Durchläufe mit denselben **103.226 Kandidaten** meldeten jeweils **103.193 PASS**. In einer weiteren Massenprüfung erhielten **107.643 von 107.672** Kandidaten ein PASS. Die übrigen 29 blieben unklassifiziert. |
| Was wurde beim Kaltstart gemessen? | Ein lokaler Versuch meldet **10.000 erfolgreiche Aktivierungen** und vier abgewiesene ungültige Auslöser. Ein getrennter EPIC9-Bericht dokumentiert **10 von 10 Durchläufen** mit insgesamt **100.000 Aktivierungen**. Der unabhängige Online-Endtest zwischen Mobilfunk und WLAN ist offen. |
| Funktioniert die Wiederherstellung auch bei wissenschaftlichen Daten? | Für **62 öffentliche NASA-Juno-WAVES-Dateien** mit insgesamt **5.443.001.419 Bytes** meldet der Bericht **85,54 % Größenreduktion** und identische SHA-256-Prüfsummen nach der Wiederherstellung. Ein späterer, separater Versuch endete mit einem Fehler. |
| Welche Branchenbeispiele wurden tatsächlich gemessen? | Die Automotive-Serie FAST75 dokumentiert **75 von 75 lokalen Übertragungs- und Wiederherstellungstests**. Beim seismischen Abgleich stimmten **194 von 194 Ereigniskennungen** mit dem USGS-Katalog überein. Der Abgleich misst die Übereinstimmung bereits erfasster Ereignisse. |

Die Berichte stammen aus dem Projekt. Die [öffentliche Gesamtschau](RHODIUM-GERMANY-FULL-BIG-APP.md) ordnet auch Robotik-, Cloudflare-, Turbinen-, Telemetrie- und Übergabetests einzeln ein. Im [Index mit 558 Berichten](RHODIUM-GERMANY-PUBLIC-BENCHMARK-EVIDENCE.md) lassen sich einzelne Messungen und ihre Prüfsummen nachschlagen.

## Historische Benchmarks im Vergleich

Die drei Wiedererkennungstests beantworten eine praktische Frage: Wie viele Bytes brauchte der Empfänger im jeweiligen Versuch, um die Referenzdatei bitidentisch wiederherzustellen? **Warm** bedeutet, dass bereits vorbereitete Daten am Ziel verfügbar waren.

| Fingerabdruck-Test | Original | Übertragen laut Bericht | Ergebnis |
|---|---:|---:|---|
| Fingerprint Recognition 32 | 1.000.000.000 Bytes | 81.481 Bytes, warm | Bitidentisch, SHA-256 stimmt überein |
| Foreign Recognition 32 | 134.728.520 Bytes | 11.354 Bytes, warm | Bitidentisch, SHA-256 stimmt überein |
| Fingerprint Pure One-File | 1.048.576 Bytes | 7.151 Bytes | Bitidentisch, Wiederherstellung in rund 62 ms |

Die **32** bezeichnet die Worker-Konfiguration. Die drei Messreihen untersuchen die Wiedererkennung von Daten. Die Herkunft des privaten Projektfingerabdrucks ist eine eigene Nachweisfrage.

### Übertragung, Wiederanlauf und Datenintegrität

| Messreihe | Historischer Messwert | Testbedingung |
|---|---|---|
| enwik9 | 1 Milliarde Bytes Ausgangsdaten. Kalt 323.250.554 Bytes in 63,5063 s, warm 10.592 Bytes in 7,9804 s. Wiederherstellung bitidentisch. | Derselbe Textbestand mit unterschiedlichen Empfängerzuständen |
| TCP-Ausweichverbindung | Zwei bestandene Läufe, rund 140 ms bis zur ersten Antwort | Testaufbau mit 100 virtuellen Kontexten und 10.000 Aufträgen |
| Wiederherstellung nach simuliertem Kundenausfall | Zweimal 4 von 4 Prüfungen bestanden, null gemeldete SHA-256-Abweichungen | Lokaler Versuch mit separater Datenkopie |
| Zustellung und Wiederholung | 20.000 von 20.000 Ereignissen zugestellt, keine Duplikate. Separater Replay-Lauf mit 2.360.787 Ereignissen/s. | Interne Ereignisverarbeitung |
| Unterschiedliche Datenarten | Größenreduktion bei Tabellen 83,421 %, bei zeilenorientierten Objektdaten 93,737 %, bei Zeitreihen 99,141 %. Zufallsdaten wurden um 0,031 % größer. | Lokale Datenprofile. Der Inhalt beeinflusst die übertragene Menge. |
| Integritätsprüfung | Eine einzelne Bitänderung in 8 MiB erkannt. Separater SHA-256-Lasttest mit einer Million Operationen in 1,641 s und null gemeldeten Fehlern. | Manipulationstest und synthetische Lastmessung in getrennten Läufen |

### Robotik, Infrastruktur und Umweltmessungen

| Messreihe | Ergebnis | Was untersucht wurde |
|---|---|---|
| AGIBOT-Robotikdaten | 67.108.864 Bytes Ausgangsdaten, kalt 67.018.034 Bytes, warm 5.827 Bytes. Vier konsistente Berichte. | Übertragung und Rekonstruktion eines Datensatzes |
| NASA C-MAPSS FD001 | 495.144 Messwerte von 100 Triebwerken in 147 ms lokal verarbeitet | Verarbeitung historischer Sensordaten |
| Cloudflare Speedtest und Google Brotli | 163/163 Tests der Speedtest-Testsuite und 73/73 Brotli-Tests bestanden | Kompatibilität mit den Tests der jeweiligen Projekte |
| Niagara/USGS | Zwei Datensätze mit 10.120 und 9.958 Bytes wiederhergestellt. Warm wurden 475 bzw. 472 Bytes gemeldet. Beide Prüfsummen stimmten. | Übertragung von Quelldaten |
| Europäische Routen, simulierte Störungen | Bei 35 gesperrten Verbindungen waren mit festen Routen 229 von 394 Anfragen erfolgreich, mit Neuberechnung 394 von 394. | Simulation mit 60 Knoten und 180 Verbindungen |
| Signalerkennung im Rauschen | 4.200 synthetische Signalspuren. Erkennungsrate 1,83 % bei −18 dB und 99,67 % bei −6 dB. | Bekannte eingespeiste Wellenform. Die Trefferquote hing stark vom Rauschen ab. |
| Rechen- und Matrixprüfung vom 18. November | Eine Million Multiplikations- und Umkehrprüfungen in 2,644 s, null Fehler. Drei lokale Datenbanken mit insgesamt 54.043 Zeilen bestanden die Integritätsprüfung. | Getrennte lokale Konsolenmessungen |

**Einzeln nachprüfen.** Der Index vom 7. Oktober enthält 558 Kalt-/Warm-Berichte mit Datenmengen und Berichtsprüfsummen. Alle 558 melden für beide Zustände bitidentische Wiederherstellung. Die Register enthalten Wiederholungen und überlappende Messreihen. Die Zahlen oben stammen aus historischen Projektberichten.

[558 Einzelberichte mit Messwerten](RHODIUM-GERMANY-PUBLIC-BENCHMARK-EVIDENCE.md) · [Gesamtschau mit weiteren Messreihen und offenen Befunden](RHODIUM-GERMANY-FULL-BIG-APP.md) · [Erweiterter Katalog nach Testfamilie](RHODIUM-GERMANY-EXTENDED-PUBLIC-EVIDENCE.md)

## Wo ein Pilot zeigen kann, was die Box wert ist

| Einsatzfeld | Die Frage nach einer Unterbrechung |
| --- | --- |
| Bank | Entspricht der wiederhergestellte Buchungsstapel für einen abgeschlossenen Zeitraum dem freigegebenen Export? |
| Post und Logistik | Welche Zustellnachweise eines Tourenabschlusses stimmen mit dem archivierten Stand überein, welche fehlen? |
| Rechenzentrum und Infrastruktur | Kann der Betreiber nach dem Rückspielen einer Konfiguration die freigegebene Referenzversion bestätigen, bevor der Dienst wieder anläuft? |
| Bauamt und Notariat | Liegen Antrag oder Vertragsentwurf samt Anlagen in der vereinbarten Fassung vor, damit die fachliche Prüfung weitergehen kann? |
| Autohaus | Gehören Auftrag, Teilefreigabe und Übergabeprotokoll zum selben dokumentierten Reparaturstand? |

**So würden wir den ersten Branchenpilot messen:** Der Partner wählt einen abgeschlossenen Vorgang, legt den gültigen Referenzstand fest und baut einen bekannten Fehler ein, etwa eine ältere Anlage unter demselben Dateinamen. Sein Team und Rhodium prüfen denselben Bestand. Im Protokoll stehen die erkannte Abweichung, die Vollständigkeit nach der Wiederherstellung und die Zeit bis zur fachlichen Freigabe. So kann der Partner selbst entscheiden, ob der Einsatz ihm Arbeit erspart.

## Vom digitalen Briefkasten zum Datentresor

Ein erster Einsatz für kleine Betriebe wäre die Übergabe einer vollständigen Akte. Der digitale Briefkasten nimmt das vereinbarte Paket entgegen. Im Datentresor des Empfängers soll sich später prüfen lassen, ob alle zugehörigen Dateien in der freigegebenen Fassung vorliegen. Vorgesehen sind getrennte Kundenbereiche, eine Prüfung vor der Übergabe und eine zweite am Ziel. Für einen Betreiber mit vielen Kunden gehört die Prüfung der Kundentrennung ausdrücklich in die Abnahme.

Das Geschäftsmodell umfasst B2B-Lizenzen, Integration und Support sowie projektbezogene Prüfleistungen. Kleine Betriebe sollen mit einem abgegrenzten Paket beginnen können. Für Banken, Netzbetreiber und Rechenzentren sind individuelle Integrationen mit vereinbarten Abnahmekriterien vorgesehen. Der bisherige Marktstand umfasst bedingtes Forschungsinteresse, eine angebotene Kontaktvermittlung samt Prüfung eines Testkontingents und einen zur Prüfung entgegengenommenen Hosting-Pilotvorschlag. Vertragsschlüsse oder Erlöse sind daraus bislang nicht belegt.

## Wirtschaftliches Ziel

Die **Bewertungsambition des Gründers liegt bei mindestens 10 Millionen US-Dollar**. Das ist ein Entwicklungsziel. Ein heutiger Unternehmenswert in dieser Höhe ist bislang offen. Für dessen Beurteilung sollen unabhängig wiederholte Prüfläufe, gemessene Vorteile gegenüber dem Kundenverfahren und bezahlte Pilot- oder Lizenzverträge die Grundlage bilden.

## Der Gründer und seine Vorstellung von Zukunft

Der Gründer von Rhodium Germany kommt aus dem Handwerk. Sein Maßstab für Fortschritt ist praktisch. Wenn jemand im Bauamt nach einer Störung einen Antrag zum zweiten Mal einreichen muss, hat die Digitalisierung für diesen Menschen ihr Versprechen verfehlt. Wenn die Sachbearbeiterin den letzten gültigen Stand selbst prüfen und den Vorgang fortsetzen kann, wird die Verbesserung für beide spürbar.

Diese Haltung prägt auch seinen Blick auf Politik und öffentliche Infrastruktur. Wer Regeln und Technik gestaltet, sollte sich daran messen lassen, ob Menschen im Alltag verlässlich weiterarbeiten können. Dazu will Rhodium Germany einen überprüfbaren Beitrag leisten.

**Matrix World** ist die Forschungsrichtung für öffentliche Messdaten. Der Erdbebenkatalog zeigt eine erste konkrete Aufgabe: Stimmen Kennung, Zeitpunkt und Ort desselben Ereignisses über den Datenweg hinweg überein? Langfristig sollen solche Vergleiche auch bei Umweltmessungen Abweichungen bis zu ihrer Quelle zurückverfolgen helfen.

**Rhodium World** ist die wirtschaftliche Zukunftsidee. Lokale Partner sollen in ihrer Sprache und Branche eigene Einsatzfälle betreuen können. Dafür braucht jeder Partner einen wiederholbaren Test, nachvollziehbare Freigaben und einen schriftlichen Weg vom Versuch zur Lizenz.

<details>
<summary>Lizenzangebot, technische Register und bisherige Projektdokumentation</summary>

Rhodium Germany bietet eine proprietäre Arbeiterbox zur Lizenzierung an. Sie dient der Datenverarbeitung, Integritätsprüfung und überprüfbaren Wiederherstellung. Mögliche Einsatzfelder sind Archivierung, Backup-Verifikation, Forensik und Audit.

## Nachweise prüfen

- [Historische Benchmarks](https://github.com/BlackboxLogicCore/rhodium-benchmarks) dokumentieren 15 von 15 bestandene lokale Schutzprüfungen und Rekonstruktionsfälle bis 1 GiB. Die Ergebnisse gelten für die beschriebenen Testbedingungen.
- [Technischer Überblick und Aussagegrenzen](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md)
- [Anfrage zur unabhängigen technischen Ersteinschätzung](INDEPENDENT-TECHNICAL-REVIEW-REQUEST.md)

## Öffentlicher Testzugang

Die verlinkten Nachweise sind direkt auf GitHub einsehbar. Ein öffentlich ausführbares Testpaket für die Arbeiterbox steht hier derzeit noch nicht zum Download.

Für den Selbsttest ist ein freigegebenes Paket mit synthetischen Beispieldaten, einer kurzen Anleitung und einem Soll-Ergebnis vorgesehen. Der Test soll zeigen, ob wiederhergestellte Daten mit dem Original übereinstimmen. Die Veröffentlichung setzt einen erfolgreichen Lauf auf einem frischen Testsystem voraus. Der proprietäre Kern und geheime Schlüssel bleiben vertraulich.

## Unsere Richtung: Technik, Menschen und Zukunft

Rhodium Germany entwickelt überprüfbare Technologie, um Menschen, Unternehmen und Forschungspartner zusammenzubringen. Unsere langfristige Vision ist eine widerstandsfähigere Wirtschaft, verlässlichere digitale Infrastruktur und eine bessere Zusammenarbeit zwischen Technik, Landwirtschaft und Umweltforschung. Wir möchten dabei helfen, Wege für gesündere Lebensmittelproduktion, verantwortungsvolle Ressourcennutzung und ein besseres Verständnis natürlicher Prozesse zu eröffnen. Dies sind **Entwicklungsziele**, keine Behauptungen über bereits nachgewiesene agrarwirtschaftliche, medizinische oder ökologische Wirkungen.

Wir suchen **Lizenz- und Vertriebspartner**, die bestehende dokumentierte Fähigkeiten in konkreten Branchen verantwortungsvoll einsetzen und weiterentwickeln möchten. Geeignete Partner erhalten nach Vertraulichkeitsvereinbarung und definiertem Prüfrahmen einen vertieften technischen Einblick und können die für eine Lizenzentscheidung nötigen Nachweise prüfen. **Das tiefste proprietäre Kerngeheimnis, private Schlüssel und nicht freigegebene Implementierungsdetails bleiben auch gegenüber Lizenzpartnern geschützt.**

**Was Besucher nachlesen können:** [Gesamte öffentliche Benchmark- und Prüfübersicht](RHODIUM-GERMANY-FULL-BIG-APP.md), einschließlich Datentests, Automotive-/Robotik-Beispielen, 32 Einzelprüfungen, Sicherheit, Wiederherstellung, Fehlversuchen und Aussagegrenzen. Historische Prüfungen sind nach Testaufbau und Beleglage zu beurteilen; es wird keine unabhängige Zertifizierung behauptet.


**Neu, 18.11.2026:** [Technischer Nachweisstand, geplantes Rhodium-Prüfsiegel und mögliche Branchenanwendungen (DE/EN)](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) · [Unabhängige Ersteinschätzung](INDEPENDENT-TECHNICAL-REVIEW-REQUEST.md)
**Archivierung. Backup-Verifikation. Forensik und Audit.**

Rhodium Germany bietet die fertige, proprietäre Arbeiterbox zur Datenverarbeitung und überprüfbaren Wiederherstellung zur Lizenzierung an. Gesucht werden Lizenz- und Vertriebspartner für Archivierung, Backup-Verifikation sowie Forensik und Audit. Grundlage des Angebots sind die vorhandenen dokumentierten Nachweise.

## Rhodium Germany — Fertige Technologie, wirtschaftlicher Einsatz

**Rhodium Germany bietet eine fertiggestellte, proprietäre Arbeiterbox zur Lizenzierung an.** Ihr Schwerpunkt liegt auf deterministischer Datenverarbeitung, Integritätskontrolle, überprüfbarer Wiederherstellung und kontrollierter Auftragsannahme. Das Ziel: technische Risiken und Folgekosten von Datenfehlern, fehlerhaften Übergaben und Betriebsunterbrechungen in klar definierten Einsatzfällen reduzieren.

**Für wen?** Kleine und mittlere Unternehmen, IT-Dienstleister, Backup- und Archivierungsanbieter sowie potenzielle Großkunden in Rechenzentren, Finanzwirtschaft, Telekommunikation, Industrie, Energie und kritischer Infrastruktur. Einsatzfelder sind Möglichkeiten zur kundenspezifischen Prüfung, **keine Behauptung bereits erfolgter Branchenzulassungen oder produktiver Installationen**.

**Wirtschaftlicher Ansatz:** Die entscheidende Kennzahl ist nicht nur der Umfang einer Software, sondern der nachweisbare Kundennutzen: vermiedene Datenfehler, überprüfbare Wiederherstellung, weniger manuelle Prüfung und – nach kundenspezifischer Validierung – potenziell geringere Ausfallkosten. Lizenz-, Service- und Vertriebspartnermodelle sind vorgesehen. Konkrete Einsparungen, Kundenumsätze oder Energievergleiche werden nicht ohne entsprechende Nachweise behauptet.

**Nachweise:** Öffentlich beschrieben sind unter anderem 15/15 lokale Schutzprüfungen und Rekonstruktionsfälle bis 1 GiB mit den jeweiligen Testgrenzen. Weitere historische Benchmark- und Capability-Register existieren; überlappende Positionen sind nicht als unabhängige Tests zu addieren. Der historische Bestand verweist auf **52 Hebel/Capability-Bereiche**; dies ist keine Behauptung, dass jeder Bereich einzeln produktiv abgenommen wurde.

**Kryptografischer Nachweis:** Der Eigentümer berichtet über einen mit IONOS erstellten eigenen kryptografischen Fingerabdruck. Dieser wird von gewöhnlichen Datei-Prüfsummen unterschieden; seine konkrete Zuordnung und kryptografische Tragweite bedürfen der Prüfung der Originalbelege. Der dokumentierte RSA-3072-Öffentlichschlüssel-Abgleich ist davon getrennt und keine Produktzertifizierung. **Geheime Schlüssel, interne Verfahren und proprietärer Kern werden nicht veröffentlicht.**

**Für Bewerter und Lizenzpartner:** Bitte den aktuellen Unternehmenswert, den belegbaren Technologiewert und das langfristige Markt- und Lizenzpotenzial **getrennt** beurteilen. Die fehlende öffentliche Offenlegung des Kerns ist nicht mit fehlender Technologie gleichzusetzen. Kundenintegration, Branchenzulassungen und konkrete Einsparungen sind separat nachzuweisen.

[Technischer Überblick und Grenzen](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) · [Historische öffentliche Benchmarks](https://github.com/BlackboxLogicCore/rhodium-benchmarks) · [Unabhängige Ersteinschätzung](INDEPENDENT-TECHNICAL-REVIEW-REQUEST.md)

## Fähigkeiten und Entwicklung

Die dokumentierten Arbeitsfelder umfassen Datenfluss, Wiederherstellung, technische Aktionskontrolle und Replay. Aussagen gelten für das jeweilige Testprofil und den dort beschriebenen Zustand.

Archive und wiederholte Übertragungen, Telemetrie und Sensorik, KI-/API-Abläufe sowie Integration am Einsatzort sind mögliche Entwicklungsrichtungen.

## Dokumentierte Nachweisregister

Registerstand: 15.10.2026. Die zugängliche öffentliche Zusammenfassung und ihre Grenzen sind im neuen [technischen Überblick](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) beschrieben.

| Bestand | Anzahl | Einordnung |
|---|---:|---|
| Prüfzwecke | 62 | Im historischen Einzelregister dokumentiert |
| Profilübersicht | 1 | Zusammen mit den Prüfzwecken 63 Registerpositionen |
| Messprofile | 22 | Ergänzende Evidence-JSON |
| Best-of-Datenfälle | 25 | Nach Eingabe-SHA-256 unterschieden |
| Historische Nachweiseinträge | 29 | Überlappender Familien-/Validierungsexport |

Diese Sammlungen überschneiden sich und ergeben keine addierbare Gesamtzahl unabhängiger Benchmarks. Historische Messergebnisse sind keine allgemeine Leistungs-, Reduktions- oder Fehlerfreiheitsgarantie.

[Öffentlicher technischer Überblick](RHODIUM-TECHNICAL-OVERVIEW-AND-INDUSTRIES-20261118.md) · [Anfrage zur unabhängigen Bewertung](INDEPENDENT-TECHNICAL-REVIEW-REQUEST.md)

Hinweis: Die bisher verlinkten technischen Einzelregister liegen derzeit in einem privaten Repository und sind für externe Besucher nicht ohne gesonderte Berechtigung zugänglich.


## Lizenzangebot und Gebote

Angeboten werden vertraglich definierte Nutzungs- und Vertriebsrechte an der Arbeiterbox. Einsatzfeld, Märkte, Laufzeit und Vergütung werden vereinbart. Quellcode, Matrix-Interna, Schlüssel und Eigentumsanteile bleiben bei Kai Kuhnert.

Kontakt für Lizenzanfragen und Gebote: **info@rhodium-germany.tech**. Bitte nennen Sie den gewünschten Nutzungsumfang und die vorgesehenen Märkte. Die vorhandenen Nachweise bilden die Grundlage des Lizenzangebots.

## Kontakt

[rhodium-germany.de](https://rhodium-germany.de) · [info@rhodium-germany.tech](mailto:info@rhodium-germany.tech)

Die öffentliche Darstellung beschreibt Ergebnisse und mögliche Anwendungen. Die proprietäre Umsetzung bleibt geschützt.


## Geschützter innerer Kern – Nachweise für Lizenzpartner

Rhodium Germany trennt die öffentliche Darstellung der Ergebnisse strikt vom **geschützten inneren Technologiekern**. Quellcode, interne Verfahren, private Schlüssel, vertrauliche Konfigurationen und nicht freigegebene Rohdaten werden **nicht** in öffentlichen Repositories offengelegt.

Zum historischen Prüfarchiv gehören laut Register **2.369 Dateieinträge in 216 Testgruppen**; darin wurden **711 unterschiedliche JSON-Berichtsinhalte** ausgewertet. Der damalige Prüfbericht meldet passende Datei-Hashes für die 2.369 erfassten Dateien. Diese Zahlen sind Archiv- und Integritätskennzahlen, **nicht** 2.369 voneinander unabhängige erfolgreiche Benchmarks. Die Zuordnung der einzelnen PASS-Berichte bleibt Teil der Nachweisprüfung.

**Vertrauliche Einsicht:** Geeignete Lizenzpartner können nach Identitätsprüfung, Vertraulichkeitsvereinbarung, festgelegtem Prüfumfang und ausdrücklicher Eigentümerfreigabe weitergehende technische Nachweise erhalten. Das ist keine Zusage, sämtliche Kerngeheimnisse oder privaten Schlüssel herauszugeben.

[Öffentliches historisches Nachweisregister](RHODIUM-HISTORISCHE-PRUEFSPUREN-2026.md)


## Abgeschlossene, in sich geschlossene Technologie- und Kundenpakete

Rhodium Germany verfolgt **nicht nur eine Forschungsvision**: Zum Projektbestand gehören vorbereitete, abgegrenzte Technologie- und Kundenpakete. Die Kundenkomponente ist architektonisch als **eigenständiges, in sich geschlossenes Paket** definiert, das nur innerhalb freigegebener Funktionen eingesetzt wird. Der geschützte Kern wird nicht öffentlich offengelegt.

Das interne Kundenpaket-Nachweisregister vom 05.11.2026 dokumentiert vorbereitete Angebotsunterlagen. **Eine vollständige Produktions- und Vertriebsfreigabe ist darin noch nicht nachgewiesen.** Die vom Eigentümer genannte Zahl von **24 Paketen** wird als zu prüfender Inventarstand geführt, bis Paketliste, Versionen, Prüfberichte und Freigaben eindeutig abgeglichen sind. Daher wird hier weder behauptet, dass alle 24 unabhängig abgenommen wurden, noch dass sie bereits ohne weitere Prüfung sofort produktiv einsetzbar sind.

**Für Lizenzinteressenten:** Konkrete Pakete und ihre Einsatzfähigkeit können im vertraulichen Partnerprozess anhand von Paketidentität, Teststatus, Leistungsumfang und Freigabeunterlagen einzeln geprüft werden. Vertrauliche Implementierungsdetails und private Schlüssel bleiben geschützt.


## Öffentliche und geschützte GitHub-Projektbestände

**GitHub-Inventur vom 18.11.2026:** Der autorisierte Rhodium-Germany-GitHub-Zugang zeigt **10 Repositories: 2 öffentliche und 8 private**, darunter **4 archivierte private Repositories**. Archiviert bedeutet nicht gelöscht; die Zugriffsrechte bleiben bestehen. Eine private Ablage ist kein öffentlich einsehbarer Nachweis und nicht automatisch ein eigenständiges Kundenprodukt.

Die geschützten Bestände umfassen unter anderem technische Dokumentation, historische Prüfergebnisse, Integritätsberichte, Entwicklungs- und Bedienkomponenten, Nachweiskataloge sowie vorbereitete Vertriebs- und Kundenunterlagen. Der konkrete Umfang und Freigabestatus einzelner Kundenpakete wird anhand von Paketmanifesten und Originalprüfberichten geprüft; eine endgültige Anzahl sofort einsatzbereiter Pakete wird derzeit nicht behauptet.

**Vertraulichkeit:** Private Repositories, interne Dateipfade, Quelltexte, proprietäre Verfahren, Schlüssel und nicht freigegebene Originalbelege bleiben geschützt. Ein geeigneter Lizenzpartner kann nach Vertraulichkeitsvereinbarung und persönlicher Freigabe einen vereinbarten Nachweisumfang prüfen. Die Existenz privater Repositories bedeutet weder automatische Herausgabe noch öffentliche Einsicht.

Diese Bestandsangabe beschreibt den über GitHub zugänglichen Inventarstand. Sie ist keine Behauptung, dass sämtliche Dateien aller Repositories bereits einzeln technisch abgenommen wurden.

</details>
