# API: Single Essay Retrieval

**Summary**: Documents the public endpoint that retrieves all columns, including content, for a specific essay by ID.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

### Route Configuration
- **Path**: `GET /api/essays/:id`
- **Access**: Public (no authentication required).

### Functionality
This route retrieves the full details of a specific essay:
1. Extracts the parameter `id` from the URL path.
2. Executes an SQL query: `SELECT * FROM essays WHERE id = ?`.
3. If an essay is found, it responds with `200 OK` and the complete essay object (including the Markdown `content` field).
4. If no matching essay is found, it returns `404 Not Found` and `{ error: 'Essay not found' }`.
5. If a database error occurs, it returns `500 Internal Server Error`.

This endpoint is consumed by the frontend reading page [[docs/fe-read-rendering.md]] to display the markdown text of an essay.

## Related pages
- [[docs/server-init.md]]
- [[docs/db-schema.md]]
- [[docs/fe-read-rendering.md]]
