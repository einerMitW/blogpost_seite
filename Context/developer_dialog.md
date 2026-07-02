## Begriffslexikon
Essay: Ein einzelner Artikel welchen der user lesen kann
user: eine Person die Artikel auf der Webseite lesen kann und keinen Account hat bzw erstellen darf
Admin: eine Person die einen Account hat und durch login neue Artikel hochladen kann.
Anwendung: Die gesamte Software mit allen Funktionen
Container: Technische, in sich funktionierende Baustein der Anwendung wie z.b: Datenbank oder Microservices
Componente: Aufbau bzw einzelne Funktionen innerhalb eines Container

## Ist-Analyse
Wo fängt die Software an wo hört sie auf?
 - Eine Webseite die mir erlaubt Blogartikel hochzuladen. Keine user-Accounts oder weiteren domänen die von dort aus erreichbar sind

## 1) Anforderungen
Beschreibung der Anwendung:
Eine Webseite auf welcher man übersichlich Essays betrachten kann welche auch nach Tags in einem Auswahlmenü sortierte werden können. Wenn man auf eine Essay Klick öffnet sich diese und man kann Sie im Vollformat lesen.
Was für ein Problem löst meine Anwendung?
Es löst das Problem keinen Zwang zum Scheiben über themen gibt. Die Webseite sorgt dafür, das ich "Skin in the game" habe.
Für wen ist meine Anwendung?
Jeden user der meine Artikel lesen will
Warum mache ich das Projekt?
Eine Plattform zu haben für die es sich lohnet rgelmäßig Essays zu schreiben. Quasi als motivation zum Schreiben.

Usecases (Features): Als Anwender will ich ... tun, um ... Ziele zu erreichen:
Als Anwender will ich Alle Essays übersichtlich vor mir haben, um Eine überblick über den Webseiteninhalt zu erhalten.
Als Anwender will ich auf Essays klicken, um sie vollständig lesen zu können.
Als Anwender will ich in der Essay übersicht / Inhaltsauflistung für jede einezelne Essay eine Kachel haben die mir Titel, Lesezeit und Thementags anzeigt um zu entscheiden ob mir der Text interessiert
Als Admin will ich oben Rechtes einen kleinen Login button haben welcher nur mitt Passwort gesichert ist um in den Admin modus zu kommen. 
Als Admin will ich eine Kachel mit einem "+" drücke um einen neuen Text einzufügen.
Als Admin will ich eine Formular haben in welches ich den Text und Metadaten einfügen kann um einen neue Essay hochzuladen.
Als Admin will ich im admin modus über ein "x" gesamte kacheln löschen können um Texte von der Seite zu entfernen.
Als User will ich schnelle und smoothe animationen biem Wechsle der Screens haben um die benutzung nicht verlangsamen aber flüssiger anfühlen zu lassen.

Abuse Case und Evil User Behavior:
Als Angreifer will ich das Passwort zum Admin Brut forcen um Admin zugang zu erhalten.
Als Angreifer will ich SQL Injections in jedes freie Eingabefeld einfügen um maximalen schaden anzurichten.
Als Angreifer will ich Ports abhören um enventuelle unverschlüsselten Travic abzufangen und weiter zu verwenden.
Als Angreifer will ich Den inhalt der Essays Manipulieren und Persisten wieder abspeichern um Falschinformationen zu verbreiten.

## 2) Datenmodell
Was sind meine Datenentitäten und welche Attribute haben sie?
Essays: Text (500 bis 5000 Wörter), Tags, Lesezeit, Titel 
Admin user: korrektes Passwort (keine Id da es nur einen Geben soll)

Wie werden diese Daten erhoben?
Durch einstellen von neuen Essays auf der Webseite.

Wie werde ich die Daten anwenden / abrufen?
Durch besuchen der Webseite werden Metadaten zu jeder Essay angezeigt.
Durch drücken auf eine Essay wird der Gesamte Text angezeigt.

Wie interagieren die Daten untereinander?
Gar nicht so viel. Essays sind einzelne Entitäten. Diese können untereinander verlinkt und aufgerufen werden. Das geschieht aber im Frontend und ist nicht zwingend eine Verlinkung der Datenstruktur.

Wie Groß wird die Datenmenge sein?
Maxiaml mit mehreren Hundert Essays Rechnen. Keine Hundert Tausende von Dateneinträgen.

## 3) MVP Idee
Ist das Feature wirklich eine Kernfunktion?
- Essaykacheln Anzeigen
- Essays als gesamttext lesen
- durch eine "+" Kachel neue Essays einstellen
- Kachelerstellung hinter dem Login verstecken

Folgende Features nach der Erstimplementierung / Deployment
- Smoothe übergangs animationoen.

## 4) User Interaktion Design
- Welche Screens werden benötigt?
1. einen Inhalts übersicht Screen
2. Eine Ansicht in der man die Essay lesen kann
3. Eine Admin ansicht die Löschen und Einfügen von neuen Essays ermöglicht

## 5) Skala
- Sollen echte Nutzer auf die Anwendung?
ja 
- Wie viele Anwender sollen es werden?
Wenig Trafic zu erwarten. ca 3 User Gleichzeitig auf der Seite
- Ist es eine Studien-, Hobby-, Portfolio-Anwendung?
Hobbyprojekt 
- Verwende ich es in 1, 6, 12 Monaten noch?
Versuchsweise sollen erst einmal 3 Monate reichen.
Wenn regelmäsig neue Essays erscheienen dann wird so lange maintaint bis keine Content mehr kommt.

## 6) High Level Architektur
- Welche generellen Container hat das System (Frontend, Backend, DB, ...)? (Am besten in einem C4-Modell)
Frontend 
Backend
Json Speicherdatei

- Wie sieht die Kommunikation zwischen diesen Teilen aus (Wer muss mit wem verbunden werden)?
Frontend zu Backend
json Speicherdatei mit dem Backend zum Auslesen der Daten

- Welches sind die kritischen Bestandteile meiner Architektur, ohne die die Applikation gar nicht läuft (Begründug warum)?
Frontend, da man Essays auch Statisch in den HTML Code kopieren könnte und Backend mit Jsonon Für die Dynamischere administration der Essays nicht in erster linie nötig macht.
----
**Bis hierhin waren alle Überlegungen nicht technisch.**
----
## 7) Sicherheit
- **STRIDE Angriffsvektoren**:
  - *Spoofing*: Verhindert durch kryptografisch signierte Session-Cookies für den Admin.
  - *Tampering*: Validierung und Bereinigung aller Inputs (Titel, Inhalt, Tags) sowohl im Frontend als auch im Backend, um Cross-Site Scripting (XSS) zu verhindern. Parameterisierte Queries verhindern SQL Injection.
  - *Repudiation*: Logging von Admin-Aktionen (Login-Versuche, Hinzufügen/Löschen von Essays) auf dem Server.
  - *Information Disclosure*: HTTPS-Zwang im Deployment, um unverschlüsselten Traffic (Eavesdropping) zu verhindern.
  - *Denial of Service*: Ratenbegrenzung (Rate Limiting) auf dem Login-Schnittstellen-Pfad, um Brute-Force-Angriffe zu blockieren.
  - *Elevation of Privilege*: Endpunkte wie `POST` und `DELETE` verlangen zwingend eine aktive, authentifizierte Session auf Server-Ebene.
- **Least Privilege**: Der Node.js-Prozess läuft unter einem Systemnutzer mit minimalen Rechten. Die SQLite-Datenbankdatei ist nur für diesen Prozess les- und schreibbar.
- **Unvertrauenswürdige Eingaben**: JSON-Inputs werden auf Typen und Längen geprüft. Eingebettetes HTML in Markdown wird standardmäßig maskiert oder gefiltert, um Script-Injections zu blockieren.

## 8) Datenminimierung & Rollenvergabe
- **User-Daten**: Leser müssen keine Daten angeben (kein Tracking, keine Accounts, keine personenbezogenen Daten).
- **Rollen**: Es existiert ausschließlich die Rolle "Admin".
- **Identifikation & Authentifizierung**:
  - Der Admin wird durch ein in den Umgebungsvariablen (`.env`) gesetztes Passwort identifiziert.
  - Authentifizierung erfolgt über ein Login-Formular. Bei Erfolg wird ein signierter Session-Cookie gesetzt.
  - Das Passwort wird zur Laufzeit mit bcrypt im Speicher verglichen.

## 9) Stack
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (CSS Grid, Flexbox, Custom Properties für Themes, Keyframe-Animationen) und Vanilla JavaScript (für API-Requests, Rendering der Kacheln und Tag-Filterung). `marked` (via CDN oder npm) zum Rendern von Markdown zu HTML.
- **Backend**: Node.js mit Express.js als leichtgewichtiger Monolith (ausgeliefert über ein einziges Projekt).
- **Datenbank**: SQLite (`better-sqlite3` oder `sqlite3` NPM-Modul), gespeichert als lokale Datei `data/blog.db`.
- **Kommunikation**: HTTP REST API (JSON).
- **Deployment**: Node.js-Prozess auf einem VPS bzw homeserver mit persistentem disk anlegen. Ein Reverse-Proxy (z. B. Nginx oder Caddy) übernimmt SSL/HTTPS.


  **Nach der Festlegung der Anwendungsfälle, Funktionen, Skala, Navigation, Datenminimierung, Datenschutz und der generellen Architektur kann man nun in die Entwicklung einsteigen**
## 10) Einstieg in die Entwicklung
1. Anlegen der Ordnerstruktur
2. Festlegen von Entwicklungsmaximen: Sprache, Commit- und Branch-Conventions, KISS, Clean Code, ...
3. Aufsetzen der Datenstruktur. Dabei die in 6. bestimmten kritischsten Elemente zuerst!
4. Aufsetzen eines User Story Backlogs mit Kanban-Board zum Projektmanagement (Epics, User Stories, Tasks, Bug / Refactoring Report)

## 11) Iterative Weiterentwicklung
Ab der Implementierung des MVP und dessen Deployment können weitere Features hinzugefügt werden, die in 3. gestrichen wurden.