# Authentication: Login & Logout

**Summary**: Documents the `/api/login` and `/api/logout` endpoints used to authenticate the administrator and manage session state.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

Authentication for the admin role is handled directly by the server via session tokens.

### Setup and Verification
During server startup, the plaintext password defined in `process.env.ADMIN_PASSWORD` is hashed using `bcrypt.hashSync()` and stored in memory as `adminHash`.

### Login Endpoint (`POST /api/login`)
- Receives `{ password }` in the request body.
- Performs a secure comparison using `bcrypt.compare()` against the stored `adminHash`.
- On success, sets an HTTP-only `admin_session` cookie containing the session token (derived from `process.env.SESSION_SECRET`).
- Responds with `{ success: true }`. If verification fails, returns a `401 Unauthorized` error.

### Logout Endpoint (`POST /api/logout`)
- Clears the `admin_session` cookie on the client.
- Responds with `{ success: true }`.

## Related pages
- [[docs/server-init.md]]
- [[docs/auth-middleware.md]]
