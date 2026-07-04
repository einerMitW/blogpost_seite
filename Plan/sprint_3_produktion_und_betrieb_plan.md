# Implementierungsplan: Sprint 3 — Produktion, Betrieb & API-Optimierung (Überarbeitet)

Dieses Dokument beschreibt die überarbeitete Vorgehensweise für Sprint 3. Auf klassisches Paging (Seiten-Navigation) wird verzichtet, um das minimalistische, endlos scrollbare Design beizubehalten und Overengineering zu vermeiden. Stattdessen wird die API optimiert, sodass Metadaten und Beitragsinhalte getrennt und effizient übertragen werden.

---

## 1. Beschreibung der Änderungen

### A. API-Optimierung (Datenminimierung)
*   **Ziel**: Reduzierung der Payload bei der Artikelliste, ohne das scrollbare Design zu zerstören.
*   **Endpunkt `GET /api/essays`**:
    *   Liefert nicht mehr den kompletten Beitragsinhalt (`content`) aller Essays.
    *   Die SQL-Abfrage wird auf Metadaten beschränkt: `id, title, tags, read_time, created_at`.
    *   Um den Kachel-Vorschautext zu erhalten, wird die SQLite-Funktion `SUBSTR(content, 1, 220) AS preview` genutzt. Dadurch werden pro Essay nur ca. 220 Zeichen Vorschau übertragen statt potenziell megabytelanger Texte.
*   **Endpunkt `GET /api/essays/:id`**:
    *   Liefert den vollständigen Datensatz inklusive des ungekürzten `content` für die Detailansicht.

### B. Frontend-Korrektur (Lesemodus)
*   **Ziel**: Behebung einer Ineffizienz im Lesemodus.
*   **Änderung in [read.js](file:///C:/Projekte/blogpost_seite/public/read.js)**:
    *   Derzeit lädt die Detailansicht über `get_essays()` die *gesamte* Liste aller Beiträge herunter, um einen einzelnen Beitrag clientseitig zu suchen.
    *   Dies wird abgeändert: Es wird gezielt der API-Endpunkt `GET /api/essays/:id` für den gewünschten Beitrag aufgerufen.
*   **Änderung in [api.js](file:///C:/Projekte/blogpost_seite/public/api.js)**:
    *   Hinzufügen einer Funktion `get_essay_by_id(id)` zum Abruf eines einzelnen Beitrags.

### B. Backup-Skript
*   **Ziel**: Schutz vor Datenverlust durch automatische, zeitgesteuerte Backups der SQLite-Datenbank.
*   **Verhalten**:
    *   Ein Node.js-Skript `scripts/backup.js` kopiert die Datenbankdatei `data/blog.db` in ein frei konfigurierbares Backup-Verzeichnis (z. B. `data/backups/`).
    *   Der Dateiname enthält den Zeitstempel (z. B. `backup_2026-07-04_12-30-00.db`).
    *   Es behält nur die letzten 10 Backups und löscht ältere Dateien (Rotationsprinzip).

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
    *   *Test 1*: Erstelle ein Essay mit sehr langem Text (z.B. 1000 Wörter). Rufe `GET /api/essays` ab. Prüfe, ob die Eigenschaft `content` **nicht** existiert, sondern stattdessen `preview` vorhanden ist und maximal 223 Zeichen (220 + "...") lang ist.
    *   *Test 2*: Rufe `GET /api/essays/:id` ab. Prüfe, ob der ungekürzte `content` vollständig zurückgegeben wird.
2.  **In einem neuen Test [tests/backup.test.js](file:///C:/Projekte/blogpost_seite/tests/backup.test.js)**:
    *   *Test 3*: Führe die Backup-Funktion aus `scripts/backup.js` programmatisch aus. Prüfe, ob im Backup-Verzeichnis eine Kopie der DB-Datei mit dem korrekten Zeitstempel-Format erstellt wurde.
    *   *Test 4*: Führe das Backup 12 Mal aus und prüfe, ob durch die Rotationslogik exakt 10 Backup-Dateien im Ordner verbleiben.
3.  **In [tests/user_flow.test.js](file:///C:/Projekte/blogpost_seite/tests/user_flow.test.js)**:
    *   *Test 5*: Prüfe, ob die Paginierungs-Elemente im HTML der Startseite vorhanden sind.

*Ausführen der Tests via `npm test` -> Die neuen Tests müssen fehlschlagen.*

### Schritt 2.2: Grüne Phase (Implementierung)
1.  **Backend anpassen in [server.js](file:///C:/Projekte/blogpost_seite/server/server.js)**:
    *   Passe `GET /api/essays` an:
        ```javascript
        const essays = db.prepare(`
            SELECT id, title, SUBSTR(content, 1, 220) AS preview, tags, read_time, created_at 
            FROM essays 
            ORDER BY created_at DESC
        `).all();
        ```
2.  **API Client anpassen in [api.js](file:///C:/Projekte/blogpost_seite/public/api.js)**:
    *   Passe `get_essays()` an, da die Vorschau bereits im Objekt als `preview` geliefert wird.
    *   Füge `get_essay_by_id(id)` hinzu:
        ```javascript
        async function get_essay_by_id(id) {
            const res = await fetch(`/api/essays/` + id);
            if (!res.ok) return null;
            const e = await res.json();
            if (typeof e.tags === 'string') {
                e.tags = e.tags.split(',').map(t => t.trim()).filter(Boolean);
            }
            return e;
        }
        ```
3.  **Frontend anpassen**:
    *   In [index.js](file:///C:/Projekte/blogpost_seite/public/index.js) den Vorschau-Zuweisungscode auf `essay.preview` anpassen.
    *   In [read.js](file:///C:/Projekte/blogpost_seite/public/read.js) den Abruf auf `get_essay_by_id(id)` umstellen.
4.  **Backup-Skript erstellen** in `scripts/backup.js`.
5.  **Docker-Dateien erstellen** (`Dockerfile` und `docker-compose.yml`).

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
