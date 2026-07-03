# Server & API Tests

**Summary**: Documents the integration test suite verifying the REST API routing, status codes, and bcrypt-based admin authentication.

**Sources**: [[tests/server.test.js]]

**Last updated**: 2026-07-03

---

### Test Lifecycle
- **Setup (`before`)**: The Express `app` is imported and started listening on a dynamic port (`0`). The address is extracted to build the `base_url` query path.
- **Teardown (`after`)**: The server listener is closed cleanly to release the network resources.

### Test Cases:
1. **Public Endpoint Retrieval**: Queries `GET /api/essays`, asserts `200 OK` status, and checks that it returns an empty list initially.
2. **Auth Flow - Invalid password**: Dispatches a `POST` request to `/api/login` with an incorrect password and asserts `410 Unauthorized` response.
3. **Auth Flow - Valid password**: Dispatches a `POST` request to `/api/login` with the correct test password. Asserts `200 OK` status and checks that the returned headers contain a valid `Set-Cookie` property with `admin_session`.

## Related pages
- [[docs/server-init.md]]
- [[docs/auth-login.md]]
- [[docs/auth-middleware.md]]
