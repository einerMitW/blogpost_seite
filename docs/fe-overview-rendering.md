# Frontend: Overview Rendering & Filtering

**Summary**: Documents the client-side JavaScript logic responsible for displaying and filtering essays on the overview page.

**Sources**: [[public/index.html]]

**Last updated**: 2026-07-03

---

The overview page contains inline script logic to fetch and display the essays.

### Initial Load
When the DOM is ready, the script:
1. Instantiates `activeTag` state (retrieved from `tag` URL search parameters if present, defaulting to `'all'`).
2. Calls `fetchEssays()`, which queries the list endpoint via `getEssays()` ([[docs/fe-api-client.md]]).
3. Triggers rendering pipelines: `renderTags()` and `renderEssays()`.

### Tag Rendering & Filtering
- `renderTags()`: Dynamically inserts button elements into `#tagList`. Each button displays a tag name and the number of essays referencing it. Clicking triggers `filterByTag(tag)`.
- `renderEssays()`: Iterates through the list of essays, filters them based on `activeTag`, and appends formatted anchor templates (`.essay-card`) to `#essayList`. Text content is truncated to 220 characters to act as a preview.

### View Transitions
The function `filterByTag(tag)` updates the global `activeTag` state and renders the views. If supported by the browser, it wraps the update inside `document.startViewTransition()` to execute smooth cross-fades.

## Related pages
- [[docs/fe-overview-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/fe-animations.md]]
