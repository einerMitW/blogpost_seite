# Database Schema

**Summary**: Defines the database schema for storing essays, initializing the tables and seeding default data if they do not exist.

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

## Database Seeding
To provide default essays upon first setup:
- A startup query checks the row count of `essays`.
- If the count is `0`, a transaction seeds the database with the three default essays from the project specifications (e.g. "Warum Schreiben eine Superkraft...", "Architektur-Entscheidungen...", "KISS...").

## Related pages
- [[docs/db-connection.md]]
- [[docs/api-essays-post.md]]
