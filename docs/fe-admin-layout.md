# Frontend: Admin Layout

**Summary**: Documents the HTML structure of the administration interface, showing how the editor panel and the published articles lists are structured.

**Sources**: [[public/admin.html]]

**Last updated**: 2026-07-03

---

The page `admin.html` alternates between two screen states controlled by Javascript.

### 1. Login Screen (`#loginScreen`)
A centralized box containing:
- Password field (`#passwordInput`)
- Error container (`#loginError`) for incorrect input indicators.
- Submission button triggers login attempts.

### 2. Admin Dashboard (`#adminDashboard`)
A two-column grid layout visible only to authenticated users:
- **Left Column (Editor Form)**: Contains form fields for `essayTitle` (text), `essayTags` (comma-separated list), `essayReadTime` (approximate duration text), and `essayContent` (textarea for markdown input).
- **Right Column (List)**: Contains the `#adminEssayList` container displaying existing essays alongside action controls.

## Related pages
- [[docs/fe-design-tokens.md]]
- [[docs/fe-admin-logic.md]]
