# Authentication: Login & Logout

**Summary**: Documents the `/api/login` and `/api/logout` endpoints used to authenticate the administrator and manage session state.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-04

---

Authentication for the admin role is handled directly by the server via session tokens.

### Setup and Verification
During server startup, the plaintext password defined in `process.env.ADMIN_PASSWORD` is hashed using `bcrypt.hashSync()` and stored in memory as `admin_hash`.

### Login Endpoint (`POST /api/login`)
*   **Rate Limiting**: Protected by `login_limiter` middleware. It limits requests to a maximum of **10 attempts per 15 minutes** per IP. Exceeding this limit returns a `429 Too Many Requests` status.
*   **Credentials Verification**: Receives `{ password }` in the request body and performs a secure comparison using `bcrypt.compare()` against the stored `admin_hash`.
*   **Session Management**: On success, sets an HTTP-only `admin_session` cookie containing the session token (derived from `process.env.SESSION_SECRET`).
*   **Auditing**: Successes and failures (e.g. wrong password, missing field) are logged to the security audit log. See [[docs/security-audit-log.md]].
*   **Response**: Responds with `{ success: true }`. If verification fails, returns a `401 Unauthorized` error.

### Logout Endpoint (`POST /api/logout`)
*   Clears the `admin_session` cookie on the client.
*   Logs the logout event to the audit log.
*   Responds with `{ success: true }`.

## Related pages
- [[docs/server-init.md]]
- [[docs/auth-middleware.md]]
