# User Flow & Structure Tests

**Summary**: Documents the static contract tests verifying code modularity, HTML script cleanliness, and navigation links.

**Sources**: [[tests/user_flow.test.js]]

**Last updated**: 2026-07-03

---

This test suite performs static code inspections on frontend files to enforce architectural purity guidelines.

### Test Cases:
1. **Purity of HTML Event Handlers**: Iterates through `index.html`, `admin.html`, and `read.html` to assert that they contain no occurrences of inline event attributes (such as `onclick=`, `onsubmit=`, `onkeydown=`). This guarantees a clean separation of concerns.
2. **Purity of Inline Scripts**: Verifies that no `<script>` tags without a `src` attribute are present in the HTML templates.
3. **Overview Card Navigation Contract**: Checks `public/index.js` to ensure the generated card layout strings output correct `href` attributes pointing to `read.html?id=${essay.id}`.
4. **Read Page Query Contract**: Checks `public/read.js` to verify that it reads the `id` property from `url_params.get('id')`.

## Related pages
- [[docs/fe-overview-rendering.md]]
- [[docs/fe-admin-logic.md]]
- [[docs/fe-read-rendering.md]]
