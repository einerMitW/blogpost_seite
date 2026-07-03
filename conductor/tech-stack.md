# Technology Stack: Gedankengang

## Frontend
* **Core:** Vanilla HTML5, Vanilla CSS3 (CSS Grid, Flexbox, Custom Properties for Themes, Keyframe Animations), and Vanilla JavaScript.
* **Markdown Rendering:** `marked` (via CDN or npm) to render markdown to HTML.

## Backend
* **Runtime & Framework:** Node.js with Express.js acting as a lightweight monolith.
* **Architecture:** Monolithic architecture serving both the API and static frontend assets from a single project.

## Database
* **Database System:** SQLite (using `better-sqlite3` or `sqlite3` NPM module).
* **Storage:** Stored as a local file `data/blog.db`.

## API & Communication
* **Protocol:** HTTP REST API (JSON).

## Deployment & Infrastructure
* **Hosting:** Node.js process on a VPS or homeserver with persistent disk storage.
* **Reverse Proxy:** Nginx or Caddy to handle SSL/HTTPS termination.
