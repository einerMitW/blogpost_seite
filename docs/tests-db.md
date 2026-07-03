# Database Tests

**Summary**: Documents the unit test suite verifying database initialization, schema integrity, and CRUD operations.

**Sources**: [[tests/db.test.js]]

**Last updated**: 2026-07-03

---

### Test Configuration
The database test suite runs in an isolated context by setting `process.env.NODE_ENV = 'test'`. This instructs [[docs/db-connection.md]] to spin up a transient, in-memory database (`:memory:`) instead of modifying the production `blog.db` file.

### Test Cases:
1. **Schema Check**: Verifies that the `essays` table is successfully initialized upon connection setup.
2. **CRUD Insertion & Selection**:
   - Clears any records.
   - Prepares and executes an SQL `INSERT` statement.
   - Asserts that exactly one row is affected.
   - Queries the inserted row by ID and asserts that all columns (`title`, `content`, `tags`, `read_time`) match the input.

These tests run using Node's built-in test runner.

## Related pages
- [[docs/db-connection.md]]
- [[docs/db-schema.md]]
