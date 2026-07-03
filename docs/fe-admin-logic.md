# Frontend: Admin Logic

**Summary**: Documents the client-side JavaScript logic managing the authentication state and content publishing / deletion on the admin page.

**Sources**: [[public/admin.html]]

**Last updated**: 2026-07-03

---

### Authentication Controls
1. **`checkAuth()`**: Checks the server auth status via `/api/auth/status` (fetches credentials validation status). Toggles display states between `#loginScreen` and `#adminDashboard`.
2. **`handleLogin()`**: Dispatches a `POST` request to `/api/login` ([[docs/auth-login.md]]) containing the password. Stores a local indicator `blog_admin_logged_in` in `sessionStorage` on success, then displays the dashboard.
3. **`logout()`**: Destroys the server session cookie via `/api/logout` and clears `sessionStorage` before refreshing the auth view.

### Content Administration
- **Create**: Submission of `#essayForm` triggers `handleCreate(e)`. It extracts the form values, splits the tag string by commas, constructs the new essay payload, and dispatches it via `addEssay()` ([[docs/fe-api-client.md]]). Resets the form upon success and re-renders the database list.
- **Delete**: Clicking "Löschen" triggers `handleDelete(id)`. Following a browser confirmation dialog, it dispatches the deletion request via `deleteEssay(id)` and refreshes the list display.

## Related pages
- [[docs/fe-admin-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/auth-login.md]]
