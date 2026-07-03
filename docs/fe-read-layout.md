# Frontend: Read Layout

**Summary**: Documents the HTML structure of the dedicated article reading view, focusing on typographic layout and metadata display.

**Sources**: [[public/read.html]]

**Last updated**: 2026-07-03

---

The reading page `read.html` prioritizes distraction-free reading with a single-column layout.

### Structural Layout:
- **Header**: Logo and link returning users back to the index page (`index.html`).
- **Navigation link**: A floating "← Alle Essays" link above the article body.
- **Article Container (`.article-box`)**:
  - **Article Header**: Houses the main `#articleTitle` (h1 heading).
  - **Metadata Table (`.metadata-table`)**: A structured matrix display mapping creation dates (`#metaDate`), read time (`#metaReadTime`), and theme tags (`#metaTags`).
  - **Article Body (`#articleBody`)**: The dedicated section container where the parsed markdown content is inserted.

## Related pages
- [[docs/fe-design-tokens.md]]
- [[docs/fe-read-rendering.md]]
