# Gedankengang Project Wiki

**Summary**: Master index and sitemap for the Gedankengang application knowledge graph.

**Last updated**: 2026-07-04

---

Welcome to the Gedankengang developers' documentation. Below is the structured index of the system components.

## 📂 Wiki Index & Sitemap

### I. Database Layer
- [[docs/db-connection.md]] — Establishes the SQLite connection using `better-sqlite3`.
- [[docs/db-schema.md]] — Structure and details of the database tables (e.g. `essays` table) and initialization seeds.
- [[docs/db-backup.md]] — SQLite database backup copying and backup file rotation logic.

### II. Backend Application
- [[docs/server-init.md]] — Server configuration, static directories, and port binding.
- [[docs/auth-login.md]] — Admin login/logout API endpoints, password validation, and login rate limiting.
- [[docs/auth-middleware.md]] — Request interception and security constraints checking session cookies.
- [[docs/api-essays-get.md]] — Endpoint for retrieving metadata of all published essays (returns pre-computed previews).
- [[docs/api-essays-get-single.md]] — Endpoint for retrieving the full content of a specific essay by ID.
- [[docs/api-essays-post.md]] — Secure endpoint for writing new essays to the database with payload validation.
- [[docs/api-essays-delete.md]] — Secure endpoint for deleting essays from the database.
- [[docs/security-audit-log.md]] — Local audit logging of administrative mutations and authentication events.

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
- [[docs/fe-read-rendering.md]] — Loading individual articles, HTML sanitization, and rendering markdown via `marked.js`.

### V. Test Suite & Verification Contracts
- [[docs/tests-db.md]] — Unit tests for SQLite table creation and CRUD operations.
- [[docs/tests-server.md]] — Integration tests for server validation, authentication, rate limiting, and log generation.
- [[docs/tests-user-flow.md]] — Contract tests checking HTML purity, script inclusion, and frontend DOMPurify use.
- [[docs/tests-backup.md]] — Tests verifying correct database backup and file rotation.
