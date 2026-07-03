# Plan: Frontend Redesign & Modularization (Revised)

**Summary**: Plan for unifying the frontend styling based on `design-spec-2.html` without changing the layout structure, separating concerns programmatically, structuring stylesheets, and introducing test plans first.

**Sources**: [[Context/design/design-spec-2.html]], [[Context/standards.md]]

**Last updated**: 2026-07-03

---

## 🎯 1. Objectives & Scope
1. **Design Alignment**: Integrate Alabaster Editorial design guidelines (OKLCH variables, precise typography, hover transformations) from `design-spec-2.html` into the existing single-column centered layouts. No sidebar navigation will be introduced.
2. **Programmatic Event Binding**: Remove all inline JavaScript event handlers (`onclick`, `onkeydown`, `onsubmit`) from HTML elements. All interactions will be registered programmatically in external JS files.
3. **Encapsulated & Descriptive Code**: Rewrite DOM variables, functions, and CSS class selectors to be highly descriptive (using `snake_case` for JS and standard hyphen-case for CSS).
4. **Clean CSS Glicering**: Structure `public/style.css` into logical, well-commented sections.
5. **Test-First Methodology**: Define testing strategies for the refactored code before writing any implementation.
6. **Refactoring Report**: Produce a final `refactoring_report_fronten_redesign_1.md` in the `Plan/` folder outlining the exact modifications.

---

## 🧪 2. Test Plan (First Stage)
Before writing implementation code, we define how the changes will be validated:

### 2.1 Static Link & Flow Verification (`tests/user_flow.test.js`)
We will expand the static contract checks to assert that:
- HTML templates do not contain any occurrences of inline event attributes (`onclick`, `onsubmit`, `onkeydown`, etc.).
- External JavaScript references (`index.js`, `admin.js`, `read.js`) are linked with the `defer` attribute.

### 2.2 Programmatic Event Registration Checks
We will write tests to ensure that:
- Element listeners are initialized properly when `DOMContentLoaded` fires.
- Actions (such as login clicks, category filtering, and essay deletion) register correct event calls.

---

## 📂 3. Modular Architecture

The frontend files will be structured as follows:
```
public/
├── index.html       # Landing page (HTML markup only, no inline style/JS)
├── admin.html       # Editor dashboard (HTML markup only, no inline style/JS)
├── read.html        # Essay reader (HTML markup only, no inline style/JS)
├── style.css        # Gliedered stylesheets (design tokens, layout, components, animations)
├── api.js           # Shared fetch logic
├── index.js         # Event listeners & renderer logic for index page
├── admin.js         # Event listeners & logic for editor dashboard
└── read.js          # Event listeners & logic for markdown reader
```

---

## 📝 4. Step-by-Step Implementation Steps

### Step 4.1: Restructure CSS (`public/style.css`)
We will organize `public/style.css` into clean sections:
1. `/* ==================== 1. DESIGN TOKENS ==================== */` (OKLCH variables, typography styles, shadows, radius)
2. `/* ==================== 2. BASE RESET ======================== */` (Browser normalization)
3. `/* ==================== 3. STRUCTURE & LAYOUT ================ */` (Centered single-column layout grid, header, footer)
4. `/* ==================== 4. COMPONENTS ======================== */` (Cards, forms, tags, buttons)
5. `/* ==================== 5. ANIMATIONS ======================== */` (Entrance animations, media preferences)

We will use the precise OKLCH colors, typography, hover transitions (`transform: translateY(-4px)`), and shadows defined in `design-spec-2.html`.

### Step 4.2: Programmatic Script Setup (Event Listeners)
- Extract inline scripts to `public/index.js`, `public/admin.js`, and `public/read.js`.
- Replace all inline attributes in `index.html`, `admin.html`, and `read.html` with DOM event registrations:
  - Register overview tag clicks dynamically.
  - Bind form submissions and key listeners programmatically inside `DOMContentLoaded` event handlers.
- Refactor all variables and local functions to use descriptive `snake_case` names.

### Step 4.3: HTML Cleansing
- Strip inline `<style>` blocks.
- Clean up templates to use semantic tags.
- Load JS files at the bottom of headers with `<script src="..." defer></script>`.

---

## 📊 5. Refactoring Report Output
After the implementation has been completed and verified by tests, we will create `Plan/refactoring_report_fronten_redesign_1.md`.
The report will include:
- A diff list showing removed inline event handlers.
- A summary of refactored variable names and classes.
- Test run execution logs verifying that all code standards and functional flows remain intact.
