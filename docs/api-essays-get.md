# API: Essay List Retrieval

**Summary**: Documents the public endpoint that retrieves a list of all published essays from the database.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-04

---

### Route Configuration
- **Path**: `GET /api/essays`
- **Access**: Public (no authentication required).

### Functionality
This route processes requests to retrieve all essays in the database:
1.  Executes an SQL query to retrieve metadata and a computed snippet:
    ```sql
    SELECT id, title, CASE WHEN LENGTH(content) > 220 THEN SUBSTR(content, 1, 220) || '...' ELSE content END AS preview, tags, read_time, created_at FROM essays ORDER BY created_at DESC
    ```
2.  The full body contents (`content` column) of the essays are omitted from this response to minimize the network payload size. Instead, the `preview` column provides a safe, pre-truncated teaser (up to 220 characters) for overview listings.
3.  Responds with status code `200 OK` and a JSON array of the fetched essay records.
4.  If a database error occurs, it returns `500 Internal Server Error` with the error message in the body.

This endpoint is used by the frontend overview page [[docs/fe-overview-rendering.md]] to display the list of essays with their preview text.

## Related pages
- [[docs/server-init.md]]
- [[docs/db-schema.md]]
- [[docs/fe-overview-rendering.md]]
