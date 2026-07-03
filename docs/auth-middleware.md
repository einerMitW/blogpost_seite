# Authentication Middleware

**Summary**: Outlines the server-side custom middleware that intercepts requests and enforces admin authorization checks.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

The custom Express middleware `authenticate` is used to protect write and delete API endpoints from unauthorized actions.

### Middleware Logic
1. Reads the `admin_session` cookie from the client using the cookie parser.
2. Compares the cookie's value with the expected `process.env.SESSION_SECRET`.
3. If the value matches, the middleware calls `next()` to hand off execution to the route handler.
4. If the value is missing or does not match, it terminates the request immediately by responding with `401 Unauthorized` and `{ error: 'Unauthorized' }`.

This middleware prevents unauthorized clients from making changes via create [[docs/api-essays-post.md]] and delete [[docs/api-essays-delete.md]] operations.

## Related pages
- [[docs/server-init.md]]
- [[docs/auth-login.md]]
- [[docs/api-essays-post.md]]
- [[docs/api-essays-delete.md]]
