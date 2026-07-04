# Server & API Tests

**Summary**: Documents the integration test suite verifying the REST API routing, status codes, and bcrypt-based admin authentication.

**Sources**: [[tests/server.test.js]]

**Last updated**: 2026-07-04

---

### Test Lifecycle
- **Setup (`before`)**: The Express `app` is imported and started listening on a dynamic port (`0`). The address is extracted to build the `base_url` query path.
- **Teardown (`after`)**: The server listener is closed cleanly to release the network resources.

### Test Cases:
1.  **Public Endpoint Retrieval**: Queries `GET /api/essays`, asserts `200 OK` status, and checks that it returns an empty list initially.
2.  **Auth Flow - Invalid password**: Dispatches a `POST` request to `/api/login` with an incorrect password and asserts `401 Unauthorized` response.
3.  **Auth Flow - Valid password**: Dispatches a `POST` request to `/api/login` with the correct test password. Asserts `200 OK` status and checks that the returned headers contain a valid `Set-Cookie` property with `admin_session`.
4.  **Essay Creation Validation**:
    *   Asserts `400 Bad Request` when creating an essay with a title that is too short (<3 chars) or too long (>100 chars).
    *   Asserts `400 Bad Request` when content length is too short (<10 chars).
    *   Asserts `400 Bad Request` when `read_time` is out of bounds (e.g. 300 minutes).
5.  **Audit Logging Verification**: Checks that calling `/api/login` creates the file `data/audit.log` and writes the correct action log string prefix `[AUDIT]`.
6.  **API Data Minimization**:
    *   Checks that `GET /api/essays` excludes the full `content` property but returns a computed `preview`.
    *   Checks that `GET /api/essays/:id` returns the full, unmodified `content`.
7.  **Rate Limiting Verification**: Dispatches 15 consecutive login requests and asserts that the API begins blocking requests with a `429 Too Many Requests` status.

## Related pages
- [[docs/server-init.md]]
- [[docs/auth-login.md]]
- [[docs/auth-middleware.md]]
