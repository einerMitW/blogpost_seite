# Frontend API Client

**Summary**: Documents the shared client-side API helper library used by the HTML pages to communicate with the REST API backend.

**Sources**: [[public/api.js]]

**Last updated**: 2026-07-03

---

The file `api.js` exposes core asynchronous JavaScript functions that wrap fetch API calls to the server endpoints. This decouples the DOM rendering logic in individual pages from direct HTTP request writing.

### Provided Functions:

- `async get_essays()`: Fetches the array of essays via `GET /api/essays` ([[docs/api-essays-get.md]]) and processes the tags property. If `tags` is a comma-separated string, it splits it into a clean array; otherwise, defaults to an empty array.
- `async get_all_tags()`: Calls `get_essays()` and uses a `Set` to collect and return a list of unique tags used across all essays.
- `async add_essay(essay)`: Sends a `POST /api/essays` ([[docs/api-essays-post.md]]) request containing the essay object (mapping `tags` back to a comma-separated string). Shows an alert on failure.
- `async delete_essay(id)`: Sends a `DELETE /api/essays/:id` ([[docs/api-essays-delete.md]]) request to remove the essay. Shows an alert on failure.
- `format_date(created_at)`: Synchronous helper function that parses a SQLite UTC datetime string (`YYYY-MM-DD HH:MM:SS`) and formats it to a readable German locale representation (e.g., "28. Mai 2026"). Returns "Kürzlich veröffentlicht" if input is invalid or missing.

All three frontend views ([[docs/fe-overview-rendering.md]], [[docs/fe-admin-logic.md]], [[docs/fe-read-rendering.md]]) load this file.

## Related pages
- [[docs/api-essays-get.md]]
- [[docs/api-essays-post.md]]
- [[docs/api-essays-delete.md]]
