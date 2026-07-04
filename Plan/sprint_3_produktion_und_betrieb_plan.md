# Implementierungsplan: Sprint 3 — Produktion & Betrieb

Dieses Dokument beschreibt die geplanten Erweiterungen zur Produktionsbereitschaft und zum Betrieb des "Gedankengang Journals" gemäß den Richtlinien in [standards.md](file:///C:/Projekte/blogpost_seite/Context/standards.md) und der Ist-Analyse in [developer_dialog.md](file:///C:/Projekte/blogpost_seite/Context/developer_dialog.md).

---

## 1. Beschreibung der Änderungen

### A. Paginierung auf der Startseite
*   **Ziel**: Performance-Optimierung bei steigender Beitragsanzahl. Es sollen nicht alle Essays auf einmal geladen werden.
*   **API-Erweiterung**: 
    *   `GET /api/essays` akzeptiert die optionalen Query-Parameter `page` und `limit` (z.B. `/api/essays?page=1&limit=5`).
    *   Das Backend liefert ein JSON-Objekt zurück, das sowohl die Liste der Essays für die aktuelle Seite (`essays`) als auch Metadaten (`total_count`, `total_pages`, `current_page`) enthält.
*   **Frontend-Erweiterung**:
    *   Ergänzung von Navigations-Buttons ("Ältere Beiträge" / "Neuere Beiträge") am unteren Ende der Startseite.
    *   Die Buttons laden die entsprechenden Seiten über die API nach und aktualisieren die Kachel-Ansicht.

### B. Backup-Skript
*   **Ziel**: Schutz vor Datenverlust durch automatische, zeitgesteuerte Backups der SQLite-Datenbank.
*   **Verhalten**:
    *   Ein Node.js-Skript `scripts/backup.js` kopiert die Datenbankdatei `data/blog.db` in ein frei konfigurierbares Backup-Verzeichnis (z. B. `data/backups/`).
    *   Der Dateiname enthält den Zeitstempel (z. B. `backup_2026-07-04_12-30-00.db`).
    *   Es behält nur die letzten 10 Backups und löscht ältere Dateien automatisch (Rotation).

### C. Docker-Konfiguration (Containerisierung)
*   **Ziel**: Einfaches, reproduzierbares Deployment auf einem beliebigen VPS.
*   **Dateien**:
    *   `Dockerfile`: Multi-Stage-Build oder optimiertes Node-Image. Der Node-Prozess läuft unter einem unprivilegierten Systemnutzer (`node`), um das Least-Privilege-Prinzip zu wahren.
    *   `docker-compose.yml`: Definiert den Anwendungs-Container, mountet das SQLite-Datenverzeichnis persistent (`data/`) und bindet den Port.

---

## 2. Implementierungsschritte nach TDD

### Schritt 2.1: Rote Phase (Schreiben fehlschlagender Tests)
Wir fügen Tests hinzu, um die neuen Anforderungen abzusichern:

1.  **In [tests/server.test.js](file:///C:/Projekte/blogpost_seite/tests/server.test.js)**:
    *   *Test 1*: Lege 7 Test-Essays in der Test-Datenbank an. Rufe `/api/essays?page=1&limit=5` ab. Verifiziere, dass genau 5 Essays zurückgegeben werden und das Metadaten-Objekt `total_count: 7` enthält.
    *   *Test 2*: Rufe `/api/essays?page=2&limit=5` ab. Verifiziere, dass die verbleibenden 2 Essays zurückgegeben werden.
2.  **In einem neuen Test [tests/backup.test.js](file:///C:/Projekte/blogpost_seite/tests/backup.test.js)**:
    *   *Test 3*: Führe die Backup-Funktion aus `scripts/backup.js` programmatisch aus. Prüfe, ob im Backup-Verzeichnis eine Kopie der DB-Datei mit dem korrekten Zeitstempel-Format erstellt wurde.
    *   *Test 4*: Führe das Backup 12 Mal aus und prüfe, ob durch die Rotationslogik exakt 10 Backup-Dateien im Ordner verbleiben.
3.  **In [tests/user_flow.test.js](file:///C:/Projekte/blogpost_seite/tests/user_flow.test.js)**:
    *   *Test 5*: Prüfe, ob die Paginierungs-Elemente im HTML der Startseite vorhanden sind.

*Ausführen der Tests via `npm test` -> Die neuen Tests müssen fehlschlagen.*

### Schritt 2.2: Grüne Phase (Implementierung)
1.  **Backend anpassen in [server.js](file:///C:/Projekte/blogpost_seite/server/server.js)**:
    *   Modifiziere den Route-Handler für `GET /api/essays`, um `page` (Standard: 1) und `limit` (Standard: unbegrenzt, um Rückwärtskompatibilität des MVP zu wahren) aus `req.query` zu parsen.
    *   Führe zwei Queries aus: Eine `SELECT COUNT(*) as count FROM essays` zur Ermittlung der Gesamtzahl, und eine `SELECT ... LIMIT ? OFFSET ?` für die Beitragsliste.
2.  **Frontend anpassen in [index.js](file:///C:/Projekte/blogpost_seite/public/index.js)**:
    *   Füge Paginierungs-Buttons in [index.html](file:///C:/Projekte/blogpost_seite/public/index.html) hinzu.
    *   Passe `render_essays` an, um den Seitenparameter beim API-Call mitzugeben und den Zustand der Navigationsbuttons (aktiv/inaktiv) zu steuern.
3.  **Backup-Skript erstellen**:
    *   Erstelle `scripts/backup.js`. Nutze das Node-interne `fs`-Modul zum Kopieren und Filtern der Verzeichnisinhalte (Rotation).
4.  **Docker-Dateien erstellen**:
    *   Erstelle `Dockerfile` im Root-Verzeichnis. Stelle sicher, dass der Port `3000` freigegeben und das Arbeitsverzeichnis auf `/app` gesetzt ist.
    *   Erstelle `docker-compose.yml` mit persistentem Volume-Mapping: `./data:/app/data`.

*Ausführen der Tests via `npm test` -> Alle Tests müssen erfolgreich durchlaufen.*

### Schritt 2.3: Refactoring
*   Dokumentiere alle Export-Funktionen des Backup-Skripts und der API-Pagination per docString.
*   Passe `.dockerignore` an, um `node_modules` und lokale SQLite-Datenbank-Kopien vom Build auszuschließen.

---

## 3. Validierung

Die Validierung erfolgt automatisiert und manuell:
1.  **Automatisierte Tests**: Erfolgreicher Durchlauf aller Tests (einschließlich Docker-Kompatibilitätsprüfungen).
2.  **Manuelle Verifikation**:
    *   Lokales Starten der Anwendung im Docker-Container:
        ```bash
        docker build -t blog-app .
        docker run -p 3000:3000 -v ${PWD}/data:/app/data blog-app
        ```
        Verifizieren, dass die Anwendung unter `http://localhost:3000` erreichbar ist.
    *   Manuelles Aufrufen von `node scripts/backup.js` und Verifizieren des Backup-Ordners.
