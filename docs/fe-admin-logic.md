# Frontend: Admin Logic

**Summary**: Documents the client-side JavaScript logic managing the authentication state and content publishing / deletion on the admin page.

**Sources**: [[public/admin.js]]

**Last updated**: 2026-07-03

---

The logical behavior of the admin portal is isolated within the external `admin.js` file.

### Programmatic Authentication Controls
- **`check_auth()`**: Checks the server auth status and toggles visibility states between `#loginScreen` and `#adminDashboard`.
- **`handle_login()`**: Triggered by click events on `#loginScreen .btn` or Enter keypresses on `#passwordInput`. Posts the password payload to `/api/login` and sets `blog_admin_logged_in` in `sessionStorage` on success.
- **`logout()`**: Posts to `/api/logout`, clears local session flags, and refreshes the view.

### Content Administration
- **Create**: Listens for `submit` events on `#essayForm`. Extracts input values, formats tags into an array, and parses the read duration to an integer before calling `add_essay()` ([[docs/fe-api-client.md]]).
- **Delete**: Handled via event delegation. The list `#adminEssayList` intercepts clicks. If a `.btn-delete` is targeted, it prompts browser confirmation and calls `delete_essay(id)` ([[docs/fe-api-client.md]]).

## Related pages
- [[docs/fe-admin-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/auth-login.md]]
- [[docs/tests-user-flow.md]]
