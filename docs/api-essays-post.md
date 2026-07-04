# API: Essay Creation

**Summary**: Documents the protected endpoint used by the administrator to publish a new essay.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-04

---

### Route Configuration
- **Path**: `POST /api/essays`
- **Access**: Protected. Requires a valid session validated by the [[docs/auth-middleware.md]] middleware.

### Input Validation
Before database insertion, the payload is parsed and validated by the `validate_essay_payload` middleware:
*   `title`: Must be a string with a length between **3 and 100 characters**.
*   `content`: Must be a string with a length between **10 and 50,000 characters**.
*   `tags`: Optional. Can be a string or an array of strings. The resulting database string must not exceed **200 characters**.
*   `read_time`: Optional. Must be an integer between **0 and 240** (representing minutes).

If any rule is violated, the server returns `400 Bad Request` containing a JSON error message describing the violation.

### Functionality
This route handles the submission of a new essay:
1.  Runs validation checks via `validate_essay_payload`.
2.  Normalizes `tags` to a comma-separated string (if submitted as an array).
3.  Prepares and runs an INSERT statement: `INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)`.
4.  Logs the creation event to the security audit log (e.g. `Essay created with ID: 5`). See [[docs/security-audit-log.md]].
5.  Responds with `201 Created` and a JSON object containing the newly created essay's ID: `{ id: lastInsertRowid }`.
6.  If a database error occurs, it returns `500 Internal Server Error`.

This endpoint is called by the frontend admin console [[docs/fe-admin-logic.md]] when an authenticated administrator submits the "Gedanke verfassen" form.

## Related pages
- [[docs/auth-middleware.md]]
- [[docs/db-schema.md]]
- [[docs/fe-admin-logic.md]]
