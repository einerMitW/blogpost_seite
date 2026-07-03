# Frontend: Overview Rendering & Filtering

**Summary**: Documents the client-side JavaScript logic responsible for displaying and filtering essays on the overview page.

**Sources**: [[public/index.js]]

**Last updated**: 2026-07-03

---

The overview page contains external logic located in `index.js` to render tags and articles dynamically.

### Initial Lifecycle
Upon DOM readiness:
1. Parses URL queries using `URLSearchParams` to extract the active tag filter (defaults to `'all'`).
2. Triggers asynchronous pipelines `render_tags()` and `render_essays()` using `get_essays()` and `get_all_tags()` ([[docs/fe-api-client.md]]).

### Programmatic Event Listeners
To comply with modular specifications, no event handlers are declared inside HTML attributes. Instead:
- **Category Filter clicks**: Dynamically bound via event delegation. The script listens on the parent `#tagList` element, matches clicks to `.tag-btn` elements using `event.target.closest()`, and calls `filter_by_tag(tag)`.
- **Card Tag clicks**: Dynamically bound via delegation on `#essayList`. Clicking a tag within an article card prevents parent navigation and filters the overview list.

### View Transitions
The function `filter_by_tag(tag)` updates the global state `active_tag` and refreshes the layout. It utilizes `document.startViewTransition()` to enable seamless cross-fades if supported by the client browser.

## Related pages
- [[docs/fe-overview-layout.md]]
- [[docs/fe-api-client.md]]
- [[docs/fe-animations.md]]
- [[docs/tests-user-flow.md]]
