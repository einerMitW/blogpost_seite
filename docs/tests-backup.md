# Backup Verification Tests

**Summary**: Documentation for the unit tests checking the database backup and rotation logic.

**Sources**: [[tests/backup.test.js]]

**Last updated**: 2026-07-04

---

The database backup process is validated in the test suite to ensure backup creation succeeds and rotation is correctly applied.

## Test Suite
The tests are implemented in [[tests/backup.test.js]] and run as part of the Node.js test runner using `npm test`.

## Validated Behaviors
The test suite validates:
1.  **Directory Creation**: Verifies that the `data/backups` directory is automatically created if it does not exist.
2.  **File Copying**: Confirms that running the backup script creates a valid copy of the database.
3.  **Naming Structure**: Asserts that the backup files are generated with the prefix `backup_` and suffix `.db`.
4.  **Rotation Constraint**: Simulates 11 backups with millisecond offsets and asserts that the backups directory contains exactly **10** files, proving that rotation is applied correctly.

## Related pages
- [[docs/db-backup.md]]
- [[docs/tests-server.md]]
