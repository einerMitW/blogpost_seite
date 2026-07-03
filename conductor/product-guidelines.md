# Product Guidelines: Gedankengang

## Design Philosophy & Vision
The "Gedankengang" is a premium digital thought-space for literary essays, profound philosophy, cultural and technological discourse. The tone is restrained, high-quality, and precise.

* **Restraint over Ornament:** No loud color gradients, no decorative icons without function. Typography and logical structure of the text are paramount.
* **Structural Clarity:** Tiles feature sharp edges or minimal radii (2px–4px) for precise distinction.
* **Accessibility (A11y):** Full keyboard operability with exclusive `:focus-visible` indicators and semantic HTML.

## Typography & Color Palette
* **Colors:** Warm alabaster backgrounds (`oklch(96.5% 0.003 70)`), pure white surfaces, deep slate-black text. Accents in Sapphire Blue and Muted Gold/Ocher. Extreme restriction on red (Rosso Corsa) to highlights only.
* **Typography:** Premium serif fonts (Iowan Old Style, Georgia) for display/headings, and clear sans-serif/system fonts for body text to mimic high-quality print magazines.
* **Precision:** Minimal rounded corners (2px-4px radius max).

## Interaction & Animation Principles
* **Keyboard UX:** Semantic HTML elements with high-contrast outlines for focus states (`outline: 2px solid var(--accent)`).
* **Smooth Filtering (View Transitions):** Animated filtering via tags using the W3C View Transitions API for soft repositioning of cards.
* **Soft Entrance (Entrance Reveal):** Staggered fade-ins (60ms delay) on initial page load.
* **Reduced Motion:** Full support for `prefers-reduced-motion` to disable non-essential animations.
