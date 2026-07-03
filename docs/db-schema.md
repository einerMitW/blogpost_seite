# Database Schema

**Summary**: Defines the database schema for storing essays, initializing the tables if they do not exist.

**Sources**: [[server/db.js]]

**Last updated**: 2026-07-03

---

The database schema consists of a single table named `essays`. The schema is initialized using an `IF NOT EXISTS` statement upon database module load.

## Table Structure: `essays`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier for each essay. |
| `title` | TEXT | NOT NULL | Title of the essay. |
| `content` | TEXT | NOT NULL | Markdown body of the essay. |
| `tags` | TEXT | - | Comma-separated list of tags associated with the essay. |
| `read_time` | INTEGER | - | Approximate read time in minutes. |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Date and time when the essay was created. |

All read/write operations (e.g. [[docs/api-essays-get.md]], [[docs/api-essays-post.md]]) run against this table structure.

## Related pages
- [[docs/db-connection.md]]
- [[docs/api-essays-post.md]]
