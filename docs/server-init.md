# Server Initialization

**Summary**: Sets up the Express web server framework, registers default middlewares, serves static assets, and listens on a configured network port.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-03

---

The Express server acts as the central coordinator for the monolith. It performs the following initialization steps:

1. **Environment Variables**: Loads settings from `.env` using `dotenv`.
2. **Middleware Registration**:
   - `express.json()` to parse JSON request bodies.
   - `cookieParser()` to parse cookies sent in request headers.
   - `express.static(path.join(__dirname, '../public'))` to serve the static frontend client files.
3. **Database Import**: Requires the connection instance [[docs/db-connection.md]].
4. **Port Binding**: Starts listening on the port defined by `process.env.PORT` (falling back to port `3000`).

All routes and controllers are mounted directly on this server instance.

## Related pages
- [[docs/db-connection.md]]
- [[docs/auth-login.md]]
- [[docs/auth-middleware.md]]
