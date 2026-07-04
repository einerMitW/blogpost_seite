# Security Audit Logging

**Summary**: Documentation for the administrative event logging mechanism designed to mitigate repudiation threats.

**Sources**: [[server/server.js]]

**Last updated**: 2026-07-04

---

The application logs security-critical events to ensure transparency and accountability. All administrative mutations and authentication attempts are logged.

## Log Location
The audit logs are saved locally to:
*   `data/audit.log`

This file is automatically ignored by Git (defined in [[.gitignore]]) to prevent sensitive server environment paths or timestamps from leaking into public version control.

## Logged Events
The following events trigger an audit entry:
1.  **Administrative Login Attempts**:
    *   *Successful login*: Logged as `Login successful`.
    *   *Failed login*: Logged as `Login failed: Invalid credentials` or `Login failed: Missing password or unconfigured hash`.
2.  **Administrative Logout**:
    *   Logged as `Logout successful`.
3.  **Essay Creation**:
    *   Logged when a new essay is saved, including the generated ID: `Essay created with ID: <id>`.
4.  **Essay Deletion**:
    *   Logged when an essay is removed: `Essay deleted with ID: <id>`.

## Log Format
Log entries are appended as plain-text lines in the following format:
```text
[AUDIT] [<ISO-8601-Timestamp>] <Event Message>
```

Example output:
```text
[AUDIT] [2026-07-04T12:00:00.000Z] Login successful
[AUDIT] [2026-07-04T12:05:00.000Z] Essay created with ID: 4
```

## Related pages
- [[docs/auth-login.md]]
- [[docs/api-essays-post.md]]
- [[docs/api-essays-delete.md]]
