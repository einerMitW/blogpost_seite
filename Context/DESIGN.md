# Design System: Gedankengang & Scuderia Journal

Dieses Dokument definiert das übergreifende Design-System, die Design-Tokens und die UX/UI-Prinzipien der verschiedenen Layout-Varianten der Gedankengang-Plattform. Es dient als "Single Source of Truth" für zukünftige Entwicklungen und Code-Generierungen.

---

## 1. Design-Philosophie & Vision

Der "Gedankengang" ist ein edler digitaler Gedankenraum für literarische Essays, tiefgründige Philosophie, Kultur- und Technologiediskurse. Die Tonalität ist zurückhaltend, wertig und präzise.

*   **Zurückhaltung über Ornament:** Keine lauten Farbverläufe, keine dekorativen Icons ohne Funktion, kein stat-slop. Die Typografie und die logische Struktur des Textes stehen im Vordergrund.
*   **Strukturelle Klarheit:** Kacheln haben scharfe Kanten oder minimale Radien (2px–4px) und heben sich präzise ab.
*   **Barrierefreiheit (A11y):** Vollständige Tastaturbedienbarkeit mit exklusiven `:focus-visible`-Indikatoren und semantischem HTML.

---

## 2. Variante Alabaster Editorial

Diese Variante ist an hochwertige Printmagazine (wie *Monocle* oder *FT Weekend*) angelehnt. Sie kombiniert edle Serifenschriften mit einem warmen, hellen Canvas.

### Design-Tokens (CSS-Variablen)

```css
:root {
  --bg: oklch(96.5% 0.003 70);       /* Alabaster / Feiner warmer Steinton */
  --surface: oklch(100% 0 0);        /* Reines Weiß für maximalen Kontrast */
  --fg: oklch(22% 0.01 70);          /* Tiefes Schiefer-Schwarz (organisch, edel) */
  --muted: oklch(52% 0.008 70);      /* Gedämpftes Grau für Metadaten */
  --border: oklch(86% 0.006 70);     /* Filigrane, zarte Verbindungslinien */
  --accent: oklch(45% 0.13 260);     /* Deep Sapphire Blue (Tiefe & Technik) */
  --accent-soft: oklch(94% 0.015 260);
  --creative: oklch(62% 0.13 75);    /* Mutes Gold/Ocker (Kreativität & Geist) */
  --creative-soft: oklch(95% 0.01 75);
  
  --font-display: 'Iowan Old Style', Georgia, serif; /* Literarischer Fokus */
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;
  
  --radius: 2px;                     /* Minimaler Radius für präzisen Schliff */
  --radius-lg: 4px;
  
  --shadow: 0 10px 30px -10px rgba(28, 25, 23, 0.07), 0 1px 3px rgba(28, 25, 23, 0.02);
  --shadow-hover: 0 16px 40px -12px rgba(28, 25, 23, 0.12), 0 2px 8px rgba(28, 25, 23, 0.04);
}
```

### Layout-Posture
*   **Variante A1:** Einspaltig, zentriert auf maximal `800px` Breite. Fokus auf ungestörten Lesefluss.
*   **Akzent-Budget:** Maximal 1 Accent-Element (Sapphire/Gold) pro Bildschirmabschnitt.

---

### Layout-Posture & Restriktion
*   **Carbon & Weiß:** Tiefer, dunkler Raum, aus dem weiße Inhaltskacheln scharf heraustreten.
*   **Extreme Rot-Restriktion:** Rosso Corsa (`#dc0000`) wird ausschließlich für den Logo-Cavallino (Prancing Horse SVG), die aktive Kategorie-Auswahl und punktuelle Interaktionszustände verwendet. **Maximal zwei rote Highlights pro Viewport.**
*   **Präzision:** Keinerlei abgerundete Formen außer einem mikrofeinen `2px`-Radius an Ecken von Buttons und Kacheln.

---

## 3. Interaktions- & Animationsprinzipien

*   **Tastatur-UX:** Alle klickbaren Elemente nutzen semantische `<a>`- und `<button>`-Tags und erhalten bei Fokus eine kontrastreiche Outline (`outline: 2px solid var(--accent)`).
*   **Gleitende Filter (View Transitions):** Filterung durch Tags oder Kategorien wird über die W3C View Transitions API animiert. Karten fliegen weich an ihre neue Position.
*   **Sanfter Einstieg (Entrance Reveal):** Beim ersten Seitenaufruf erhalten Elemente eine gestaffelte Einblendung (Stagger-Delay `60ms`).
*   **Reduced Motion:**
    ```css
    @media (prefers-reduced-motion: reduce) {
      /* Deaktiviert translatorische Verschiebungen und Skalierungen */
      * {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        transform: none !important;
      }
    }
    ```
