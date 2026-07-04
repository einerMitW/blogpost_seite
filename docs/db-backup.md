# Database Backup and Rotation

**Summary**: Documentation for the SQLite database backup process, naming conventions, and file rotation configuration.

**Sources**: [[scripts/backup.js]]

**Last updated**: 2026-07-04

---

To prevent data loss, the application implements an automated backup mechanism that copies the live database and cleans up older backups.

## Backup Location
Backups are stored in:
*   `data/backups/`

## Script Execution
The backup logic is contained in [[scripts/backup.js]] and can be run:
*   Programmatically by requiring `run_backup()` from the module.
*   Directly from the command line using:
    ```bash
    node scripts/backup.js
    ```
    (Typically scheduled as a daily cron job or system task in production environments).

## Naming Convention
Backup files are created with high-resolution timestamps to prevent naming collisions:
```text
backup_YYYYMMDD-HHMMSS-ms.db
```
Example: `backup_20260704-131500-425.db`

## Rotation Policy
To optimize storage, the backup script enforces a strict rotation policy:
1.  All files in the backup directory are read.
2.  If the number of backups exceeds **10**, the oldest backups (determined by file modification time) are deleted.
3.  Only the **10 most recent backups** are preserved.

## Related pages
- [[docs/db-connection.md]]
- [[docs/tests-backup.md]]
