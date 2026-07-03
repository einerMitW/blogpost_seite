# Frontend Design Tokens

**Summary**: Documents the CSS Custom Properties and variables that define the colors, typography, and spacing properties of the application.

**Sources**: [[public/style.css]]

**Last updated**: 2026-07-03

---

The design tokens are declared within the `:root` pseudo-class in the stylesheet to establish a unified system.

### Colors (OKLCH Space)
The application utilizes the modern OKLCH color space for perceptually uniform colors:
- `--bg`: oklch(96.5% 0.003 70) — Alabaster/warm stone background.
- `--surface`: oklch(100% 0 0) — Pure white surface container backgrounds.
- `--fg`: oklch(22% 0.01 70) — Deep slate-black text color.
- `--muted`: oklch(52% 0.008 70) — Muted gray for metadata text.
- `--border`: oklch(86% 0.006 70) — Light gray borders.
- `--accent`: oklch(45% 0.13 260) — Deep sapphire blue.
- `--creative`: oklch(62% 0.13 75) — Muted ocher/gold theme color.

### Typography
- `--font-display`: 'Iowan Old Style', Georgia, serif — Used for literary display headings.
- `--font-body`: System-ui, sans-serif — Used for standard body text.
- `--font-mono`: ui-monospace, SF Mono, monospace — Used for meta values, buttons, tags.

## Related pages
- [[docs/fe-animations.md]]
- [[docs/fe-overview-layout.md]]
