# Implementierungsplan: Sprint 1 — Sicherheit & Validierung

Dieses Dokument beschreibt die geplanten Sicherheitsverbesserungen und Validierungsregeln für die Anwendung "Gedankengang Journal" gemäß den Richtlinien in [standards.md](../Context/standards.md) und der Ist-Analyse in [developer_dialog.md](../Context/developer_dialog.md).

---

## 1. Beschreibung der Änderungen

### A. Rate Limiting für Login-Schnittstelle
*   **Ziel**: Schutz des `/api/login`-Endpunktes vor Brute-Force-Angriffen.
*   **Technologie**: Einbindung des NPM-Pakets `express-rate-limit`.
*   **Konfiguration**: Maximal 10 Login-Versuche pro 15 Minuten pro IP-Adresse. Bei Überschreitung wird ein HTTP-Status `429 Too Many Requests` zurückgegeben.

### B. Eingabenvalidierung im Backend
*   **Ziel**: Absicherung gegen ungültige, zu lange oder manipulierte Payloads auf dem Endpunkt `POST /api/essays`.
*   **Regeln**:
    *   `title`: Muss ein String sein, Mindestlänge 3 Zeichen, Maximallänge 100 Zeichen.
    *   `content`: Muss ein String sein, Mindestlänge 10 Zeichen, Maximallänge 50.000 Zeichen.
    *   `tags`: Muss ein Array von Strings sein oder ein kommagetrennter String (der serverseitig normalisiert wird). Maximallänge des normalisierten String-Eintrags: 200 Zeichen.
    *   `read_time`: Muss eine positive Ganzzahl sein (0 bis 240 Minuten).
*   **Verhalten**: Bei Validierungsfehlern antwortet der Server mit `400 Bad Request` und einer detaillierten Fehlermeldung im JSON-Format.

### C. HTML-Sanitisierung im Frontend (XSS-Schutz)
*   **Ziel**: Verhindern der Ausführung von Schadcode (Cross-Site Scripting), der über Markdown in ein Essay eingeschleust werden könnte.
*   **Technologie**: Einbindung der Bibliothek `DOMPurify` (über vertrauenswürdiges CDN in [read.html](file:///C:/Projekte/blogpost_seite/public/read.html)).
*   **Konfiguration**: Das vom Parser `marked` generierte HTML wird vor dem Schreiben in das DOM mittels `DOMPurify.sanitize()` bereinigt.

### D. Audit Logging
*   **Ziel**: Nachvollziehbarkeit kritischer Ereignisse (Login-Versuche, Hinzufügen/Löschen von Beiträgen) zur Abwehr von Repudiation-Risiken.
*   **Verhalten**: 
    *   Jeder fehlgeschlagene oder erfolgreiche Login-Versuch wird mit Zeitstempel und maskierter IP/Status auf dem Server geloggt.
    *   Jede Erstellung und Löschung eines Essays wird im Format `[AUDIT] [TIME] Action: <action>, Essay-ID: <id>` protokolliert.
    *   Die Logs werden in die Datei `data/audit.log` geschrieben.

---

## 2. Implementierungsschritte nach TDD

### Schritt 2.1: Rote Phase (Schreiben fehlschlagender Tests)
Wir erweitern die bestehenden Testdateien um folgende Testfälle:

1.  **In [tests/server.test.js](file:///C:/Projekte/blogpost_seite/tests/server.test.js)**:
    *   *Test 1*: Sende an `POST /api/essays` ein Objekt ohne Titel oder mit einem Titel, der länger als 100 Zeichen ist. Erwarte `400 Bad Request`.
    *   *Test 2*: Sende an `POST /api/essays` ungültige Typen (z. B. `read_time: "zehn"` oder `content: 12345`). Erwarte `400 Bad Request`.
    *   *Test 3*: Sende 11 aufeinanderfolgende Login-Anfragen an `/api/login`. Erwarte, dass die 11. Anfrage mit `429 Too Many Requests` blockiert wird.
    *   *Test 4*: Führe eine erfolgreiche Anmeldung und Erstellung durch und prüfe, ob die Datei `data/audit.log` existiert und die entsprechenden Log-Zeilen enthält.
2.  **In [tests/user_flow.test.js](file:///C:/Projekte/blogpost_seite/tests/user_flow.test.js)**:
    *   *Test 5*: Prüfe statisch, ob in [read.html](file:///C:/Projekte/blogpost_seite/public/read.html) die DOMPurify-Bibliothek per `<script>`-Tag geladen wird.
    *   *Test 6*: Überprüfe, ob in [read.js](file:///C:/Projekte/blogpost_seite/public/read.js) der Aufruf von `DOMPurify.sanitize` erfolgt.

*Ausführen der Tests via `npm test` -> Die neuen Tests müssen fehlschlagen.*

### Schritt 2.2: Grüne Phase (Implementierung)
1.  **Dependencies installieren**:
    *   `npm install express-rate-limit`
2.  **Server-Code anpassen in [server.js](file:///C:/Projekte/blogpost_seite/server/server.js)**:
    *   Einbinden von `express-rate-limit`. Richte den Limiter für den Pfad `/api/login` ein.
    *   Implementiere eine Validierungsfunktion `validate_essay_payload` und klinke sie als Middleware vor dem `POST /api/essays` Endpunkt ein.
    *   Erstelle ein Helferlein fürs Logging (z.B. `write_audit_log(message)`), welches synchron oder asynchron mit Zeitstempel in `../data/audit.log` schreibt. Füge Log-Aufrufe bei `/api/login`, `/api/logout`, `POST /api/essays` und `DELETE /api/essays/:id` hinzu.
3.  **Frontend anpassen**:
    *   In [read.html](file:///C:/Projekte/blogpost_seite/public/read.html) das CDN-Skript für DOMPurify einfügen:
        ```html
        <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js" defer></script>
        ```
    *   In [read.js](file:///C:/Projekte/blogpost_seite/public/read.js) die Rendering-Zeile abändern zu:
        ```javascript
        document.getElementById("articleBody").innerHTML = DOMPurify.sanitize(marked.parse(essay.content || ''));
        ```

*Ausführen der Tests via `npm test` -> Alle Tests müssen erfolgreich durchlaufen.*

### Schritt 2.3: Refactoring
*   Stelle sicher, dass alle neuen Hilfsfunktionen in `server.js` aussagekräftige Namen und vollständige docStrings besitzen.
*   Entferne redundanten Code.
*   Prüfe, ob alle neuen Log-Dateien oder temporären Test-Dateien in `.gitignore` eingetragen sind.

---

## 3. Validierung

Die Validierung erfolgt automatisiert und manuell:
1.  **Automatisierte Tests**: Erfolgreicher Durchlauf von `npm test`.
2.  **Manuelle Verifikation**:
    *   Erstellung eines Blogposts mit dem Inhalt `<script>alert('XSS')</script> *Test*`. In der Leseansicht darf das Skript nicht ausgeführt werden, und im DOM darf kein aktives `<script>`-Tag gerendert sein (nur der sanitisierte Text).
    *   Prüfung des Logfiles `data/audit.log` nach Aktionen im Admin-Bereich.
