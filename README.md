# Semesterarbeit
Planning-Poker

## Einleitung
Dieses Projekt ist eine auf das Minimum reduzierte Planning-Poker-App. Es sollen innert kürzester Zeit Schätzrunden durchgeführt werden können, ohne dass zu viel Zeit für das Setup benötigt wird. 
Die Applikation besteht aus zwei Projekten. Einem Websocket Server für den Datenaustausch zwischen den Clients, sowie einer Angular Applikation für das Frontend.

## Vorbereitung und Applikationsstart
GIT Repository clonen oder ZIP download

### Projekt installieren
Im Hauptverezeichnis *Planning-Poker* in der CLI den Befehl `npm run install-both` ausführen.   
Damit werden die benötigten Pakete für das Websocket Server- wie auch das Angular Frontend-Projekt installiert.

### Applikation starten
Mit dem Befehl `npm run start-local` in der CLI im *Hauptverzeichnis* wird der Websocket Server und das Frontend gestartet.   
Das Frontend kann nun im Browser unter http://localhost:4200/ aufgerufen werden


## TESTS
### Unit-Tests
Um die Unit-Tests im CLI zu starten, kann im *Hauptverzeichnis* der Befehl `npm run test` ausgeführt werden.   

### End2End-Tests
Um die Unit-Tests im CLI zu starten, kann im *Hauptverzeichnis* der Befehl `npm run e2e` ausgeführt werden.   

### Headless Tests
Die Unit und End2End Tests können auch Headless ausgeführt werden.   
Unit-Tests: `npm run test-headless`
End2End-Tests: `npm run e2e-headless`

#### Tipp
Sollte es bei der Verwendung des Webdrivers zu der Fehlermeldung kommen, dass update-config.json  nicht gefunden werden kann, kann dieser mit folgendem Befehl im Verzeichnis *Poker-Frontend* manuell aktualisiert werden:   
`node_modules/protractor/bin/webdriver-manager update`   


### Systemvoraussetzungen
Die Applikation wurde mit Node.js in den Versionen 12 und 14 geschrieben und getestet.
Die verwendeten Befehle funktionieren auf Unix basierten Systemen wie Mac OS und Ubuntu. 


