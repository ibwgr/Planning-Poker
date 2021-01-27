Noch zu überarbeiten :)
# Semesterarbeit
Planning-Poker
## Einleitung
Dieses Projekt ist eine auf das Minimum reduzierte Planning-Poker-App. Es sollen innert kürzester Zeit Schätzrunden durchgeführt werden können, ohne dass zu viel Zeit für das Setup benötigt wird. 
Die Applikation besteht aus zwei Projekten. Einem Websocket Server für den Datenaustausch zwischen den Clients, sowie einer Angular Applikation für das Frontend.

## Vorbereitung und Applikationsstart
GIT Repository clonen oder ZIP download

### Projekt in IntelliJ öffnen
1. Backend  
  1a: Falls IntelliJ im *Hauptverezeichnis* fragt ob npm install ausgeführt werden soll, dies bestätigen.  
  1b: Alternativ manuell im Terminal im *Hauptverzeichnis* den Befehl `npm install` ausführen
2. Frontend  
  2a: Falls IntelliJ im Verzeichnis *calenderView* fragt ob npm install ausgeführt werden soll, dies bestätigen.  
  2b. Alternativ manuell im Terminal im Verzeichnis *calenderView* den Befehl `npm install` durchführen
3. Im File *ormconfig.json*, zu finden im *Hauptverzeichnis*, den Usernamen und das Passwort für den Zugriff auf die Datenbank eintragen

## Applikation starten
1. Terminal im *Hauptverzeichnis* öffnen und das Backend mit dem Befehl `npm run start` ausführen
2. Zweites Terminalfenster im Verzeichnis *calenderView* öffnen und das Frontend mit dem Befehl `npm run start` ausführen  
  
-> Das Frontend kann nun im Browser unter http://localhost:1234 aufgerufen werden


#### TESTS
##### Unit-Tests
Für die Unit-Tests muss das Backend gestartet sein!  
- Um die Unit-Tests in der Konsole zu starten, im Terminal im Verzeichnis *calenderView* den Befehl `npm run test` ausführen.

#### End2End-Tests
Für die End2End-Tests müssen das Backend und das Frontend gestartet sein.  
- Um die End2End-Tests in der Konsole zu starten, im Terminal im Verzeichnis *Hauptverzeichnis* den Befehl `npm run test:e2e` ausführen.  
- Im geöffneten Browserfenster auf `Run all specs` klicken
- alternativ auf *calender.spec.js* doppelklicken




