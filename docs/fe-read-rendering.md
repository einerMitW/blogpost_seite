# Frontend: Read Rendering

**Summary**: Documents the client-side JavaScript logic that parses URLs, requests specific essay entries, and renders markdown content.

**Sources**: [[public/read.js]]

**Last updated**: 2026-07-03

---

### Initial Lifecycle
Upon DOM readiness, the code:
1. Parses URL search parameters using `URLSearchParams` to extract the `id` of the article.
2. Invokes `get_essays()` ([[docs/fe-api-client.md]]) to query the local client database cache.
3. Searches for the essay matching the query ID.

### Rendering Pipeline
- **Metadata**: Populates the table cells (`#metaDate`, `#metaReadTime`, `#metaTags`).
- **Markdown Parsing**: Passes the essay content directly to the `marked.parse()` utility from the imported `marked.js` library. The resulting HTML is inserted directly into the `#articleBody` element.
- **Error States**: If the essay is not found, headings and metadata cells show fallbacks, and a recovery link back to the homepage is displayed.

## Related pages
- [[docs/fe-read-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/tests-user-flow.md]]
