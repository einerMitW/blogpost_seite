# User Flow & Structure Tests

**Summary**: Documents the static contract tests verifying code modularity, HTML script cleanliness, and navigation links.

**Sources**: [[tests/user_flow.test.js]]

**Last updated**: 2026-07-04

---

This test suite performs static code inspections on frontend files to enforce architectural purity guidelines.

### Test Cases:
1.  **Purity of HTML Event Handlers**: Iterates through `index.html`, `admin.html`, and `read.html` to assert that they contain no occurrences of inline event attributes (such as `onclick=`, `onsubmit=`, `onkeydown=`). This guarantees a clean separation of concerns.
2.  **Purity of Inline Scripts**: Verifies that no `<script>` tags without a `src` attribute are present in the HTML templates.
3.  **Overview Card Navigation Contract**: Checks `public/index.js` to ensure the generated card layout strings output correct `href` attributes pointing to `read.html?id=${essay.id}`.
4.  **Read Page Query Contract**: Checks `public/read.js` to verify that it reads the `id` property from `url_params.get('id')`.
5.  **DOMPurify Script Inclusion**: Inspects `public/read.html` to assert it loads DOMPurify from a CDN script tag (`purify.min.js`).
6.  **DOMPurify Invocation**: Inspects `public/read.js` to assert that `DOMPurify.sanitize` is used when rendering the article body.
7.  **Single Essay Fetching Contract**: Inspects `public/read.js` to verify it calls the single-essay endpoint wrapper (`get_essay_by_id`) and does **not** fetch all essays (`get_essays()`).

## Related pages
- [[docs/fe-overview-rendering.md]]
- [[docs/fe-admin-logic.md]]
- [[docs/fe-read-rendering.md]]
