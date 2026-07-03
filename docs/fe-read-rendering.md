# Frontend: Read Rendering

**Summary**: Documents the client-side JavaScript logic that parses URLs, requests specific essay entries, and renders markdown content.

**Sources**: [[public/read.html]]

**Last updated**: 2026-07-03

---

### Initial Lifecycle
When the page loads, the script:
1. Parses the query string using `URLSearchParams` to extract the `id` parameter.
2. Invokes `getEssays()` ([[docs/fe-api-client.md]]) to query the local client database cache.
3. Searches for the item matching the query ID.

### Rendering Pipeline
- **Metadata**: Populates the table cells (`#metaDate`, `#metaReadTime`, `#metaTags`). Tags are rendered as links back to the overview index page, pre-configured with active tag filter queries (e.g. `index.html?tag=Philosophie`).
- **Body Content & Markdown Parsing**: The essay's content property is passed directly to the `marked.parse()` function from the imported `marked.js` library (loaded via CDN link in the page header). The output HTML string is assigned directly to `document.getElementById('articleBody').innerHTML`.
- **Error States**: If the essay is not found, the script updates headings and metadata cells to fallback dash states and inserts a recovery link back to the homepage list.

## Related pages
- [[docs/fe-read-layout.md]]
- [[docs/fe-api-client.md]]
