# API: Essay List Retrieval

**Summary**: Documents the public endpoint that retrieves a list of all published essays from the database.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

### Route Configuration
- **Path**: `GET /api/essays`
- **Access**: Public (no authentication required).

### Functionality
This route processes requests to retrieve all essays in the database:
1. Executes an SQL query: `SELECT id, title, tags, read_time, created_at FROM essays ORDER BY created_at DESC`.
2. The body contents of the essays are omitted from this response to keep the payload size small.
3. Responds with status code `200 OK` and a JSON array of the fetched essay records.
4. If an database error occurs, it returns `500 Internal Server Error` with the error message in the body.

This endpoint is used by the frontend overview page [[docs/fe-overview-rendering.md]] to display the list of essays.

## Related pages
- [[docs/server-init.md]]
- [[docs/db-schema.md]]
- [[docs/fe-overview-rendering.md]]
