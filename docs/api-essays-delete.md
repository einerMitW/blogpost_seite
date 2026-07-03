# API: Essay Deletion

**Summary**: Documents the protected endpoint used by the administrator to delete an essay from the database.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

### Route Configuration
- **Path**: `DELETE /api/essays/:id`
- **Access**: Protected. Requires a valid session validated by the [[docs/auth-middleware.md]] middleware.

### Functionality
This route deletes a single essay record:
1. Extracts the parameter `id` from the URL path.
2. Prepares and runs a DELETE statement: `DELETE FROM essays WHERE id = ?`.
3. Responds with `200 OK` and `{ success: true }`.
4. If a database error occurs, it returns `500 Internal Server Error`.

This endpoint is called by the frontend admin console [[docs/fe-admin-logic.md]] when the delete button ("Löschen") on an essay card is clicked.

## Related pages
- [[docs/auth-middleware.md]]
- [[docs/db-schema.md]]
- [[docs/fe-admin-logic.md]]
