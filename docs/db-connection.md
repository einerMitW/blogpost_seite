# Database Connection

**Summary**: Establishes the SQLite database connection using the `better-sqlite3` driver and exports the database instance for backend operations.

**Sources**: [[server/db.js]]

**Last updated**: 2026-07-03

---

This module initializes the connection to the local SQLite database. It imports the `better-sqlite3` library to interface with the database.

The database file is located at `data/blog.db`. Upon loading, the module creates the database instance which runs synchronously. The exported database instance is utilized by other backend services (specifically [[docs/server-init.md]]) to perform SQL operations.

## Related pages
- [[docs/db-schema.md]]
- [[docs/server-init.md]]
