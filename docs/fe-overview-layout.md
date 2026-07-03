# Frontend: Overview Layout

**Summary**: Documents the HTML structure of the main landing page, which serves as the index of published essays.

**Sources**: [[public/index.html]]

**Last updated**: 2026-07-03

---

The overview page `index.html` implements an editorial, single-column design.

### Structural Sections:
- **Wireframe Badge**: Located at the very top for dev info.
- **Header (`.header`)**: Displays the logo ("Gedankengang Journal") and contains the "Admin Login" button linking to [[docs/fe-admin-layout.md]].
- **Hero Section (`.hero-section`)**: Displays the journal's tag line and subtext.
- **Filter Section (`.filter-section`)**: Displays a container labeled "Filter nach Thema" with a wrapper (`#tagList`) to hold dynamic category buttons.
- **Essay List Container (`#essayList`)**: Serves as the mounting container for the dynamic essay card articles.
- **Footer (`.footer`)**: Displays copyright and style-related annotations.

## Related pages
- [[docs/fe-design-tokens.md]]
- [[docs/fe-overview-rendering.md]]
