# Frontend Animations & Motion

**Summary**: Documents the micro-animations, transitions, and user preference overrides built into the stylesheet.

**Sources**: [[public/style.css]]

**Last updated**: 2026-07-03

---

### Page Entrance Animation
The class `.reveal-item` triggers a fade-in-up animation:
- **Keyframe (`fadeInUp`)**: Interpolates opacity from `0` to `1` and shifts position along Y-axis from `16px` to `0`.
- **Easing**: Employs a smooth cubic-bezier curve: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Staggering**: The files use helper classes (`.reveal-delay-1` to `.reveal-delay-5`) with incremental animation delays (80ms steps) to render sequential elements.

### Hover Effects
- Buttons (`.tag-btn`, `.btn-login`) utilize transitions for background, border-color, and text changes.

### Motion Accessibility
To respect user configuration, a media query `@media (prefers-reduced-motion: reduce)` is set up to:
- Switch the vertical slide animation to a simple opacity-only fade (`fadeInOnly`).
- Clear staggered animation delays to display content immediately.
- Disable transitions on cards and buttons.

## Related pages
- [[docs/fe-design-tokens.md]]
- [[docs/fe-overview-rendering.md]]
