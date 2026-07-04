# Frontend: Read Rendering

**Summary**: Documents the client-side JavaScript logic that parses URLs, requests specific essay entries, and renders markdown content.

**Sources**: [[public/read.js]]

**Last updated**: 2026-07-04

---

### Initial Lifecycle
Upon DOM readiness, the code:
1.  Parses URL search parameters using `URLSearchParams` to extract the `id` of the article (defaults to `'1'`).
2.  Invokes `get_essay_by_id(id)` ([[docs/fe-api-client.md]]) to query the backend specifically for that essay's full details (avoiding loading other essays).

### Rendering Pipeline
- **Metadata**: Populates the table cells (`#metaDate`, `#metaReadTime`, `#metaTags`).
- **Markdown Parsing & Sanitization**: 
    1.  Passes the essay content to `marked.parse()` to convert Markdown text into raw HTML.
    2.  Wraps the raw HTML inside `DOMPurify.sanitize()` to filter out malicious scripts or inline event handlers.
    3.  Inserts the sanitized HTML directly into the `#articleBody` element, protecting against Cross-Site Scripting (XSS).
- **Error States**: If the essay is not found, headings and metadata cells show fallbacks, and a recovery link back to the homepage is displayed.

## Related pages
- [[docs/fe-read-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/tests-user-flow.md]]
