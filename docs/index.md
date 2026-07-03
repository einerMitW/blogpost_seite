# Gedankengang Project Wiki

**Summary**: Master index and sitemap for the Gedankengang application knowledge graph.

**Last updated**: 2026-07-03

---

Welcome to the Gedankengang developers' documentation. Below is the structured index of the system components.

## 📂 Wiki Index & Sitemap

### I. Database Layer
- [[docs/db-connection.md]] — Establishes the SQLite connection using `better-sqlite3`.
- [[docs/db-schema.md]] — Structure and details of the database tables (e.g. `essays` table).

### II. Backend Application
- [[docs/server-init.md]] — Server configuration, parsing, static directories, and port binding.
- [[docs/auth-login.md]] — Admin login/logout API endpoints, password validation using `bcrypt`.
- [[docs/auth-middleware.md]] — Request interception and security constraints checking session cookies.
- [[docs/api-essays-get.md]] — Endpoint for retrieving metadata of all published essays.
- [[docs/api-essays-get-single.md]] — Endpoint for retrieving the full content of a specific essay by ID.
- [[docs/api-essays-post.md]] — Secure endpoint for writing new essays to the database.
- [[docs/api-essays-delete.md]] — Secure endpoint for deleting essays from the database.

### III. Frontend Layer & UI Engine
- [[docs/fe-api-client.md]] — Client-side API wrapper handling backend fetches.
- [[docs/fe-design-tokens.md]] — CSS Variables, OKLCH color palettes, typography mappings.
- [[docs/fe-animations.md]] — Keyframes, reveal animations, reduced-motion guidelines.

### IV. Frontend Views
- [[docs/fe-overview-layout.md]] — Structure of the homepage article listing.
- [[docs/fe-overview-rendering.md]] — Category filters and tag updates mapping database content.
- [[docs/fe-admin-layout.md]] — Structure of the administration dashboard and editor console.
- [[docs/fe-admin-logic.md]] — Login flows, session verification, and article form handler functions.
- [[docs/fe-read-layout.md]] — Structure of the distraction-free reading mode.
- [[docs/fe-read-rendering.md]] — Loading individual articles and rendering markdown via `marked.js`.
