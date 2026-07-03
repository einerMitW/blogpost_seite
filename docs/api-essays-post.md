# API: Essay Creation

**Summary**: Documents the protected endpoint used by the administrator to publish a new essay.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

### Route Configuration
- **Path**: `POST /api/essays`
- **Access**: Protected. Requires a valid session validated by the [[docs/auth-middleware.md]] middleware.

### Functionality
This route handles the submission of a new essay:
1. Validates the request body to ensure that `title` and `content` are present. If either is missing, it responds with `400 Bad Request`.
2. Prepares and runs an INSERT statement: `INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)`.
3. Responds with `201 Created` and a JSON object containing the newly created essay's ID: `{ id: lastInsertRowid }`.
4. If a database error occurs, it returns `500 Internal Server Error`.

This endpoint is called by the frontend admin console [[docs/fe-admin-logic.md]] when a user submits the "Gedanke verfassen" form.

## Related pages
- [[docs/auth-middleware.md]]
- [[docs/db-schema.md]]
- [[docs/fe-admin-logic.md]]
