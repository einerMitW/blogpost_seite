# Specification: Setup project structure and main page layout

## Overview
This track focuses on initializing the foundational structure of the "Gedankengang" monolithic application and building the static frontend layout for the main page. The backend Express server setup is deferred to a future track.

## Functional Requirements
- **Directory Structure:** Create the primary folders: `public/` (for static assets), `server/` (for future backend logic), and `data/` (for the SQLite database).
- **Frontend Assets:** Initialize `public/index.html` and `public/style.css`.
- **Main Layout Shell:** 
  - Create a semantic HTML structure with a Header, Content Area (Main), and Footer.
  - Implement a basic CSS Reset to ensure cross-browser consistency.
  - Define CSS Variables for theming (light/dark mode colors, typography, spacing).
- **Static Mock Data:** Add hardcoded HTML mock essay cards within the content area to visualize the layout.

## Non-Functional Requirements
- **Tech Stack:** Vanilla HTML5 and CSS3 (no external frameworks).
- **Design Aesthetic:** The layout should establish a premium, clean design with modern typography and harmonious color palettes.
- **Simplicity (KISS/YAGNI):** Do not write backend code or Express boilerplate yet.

## Acceptance Criteria
- [ ] Project folders `public/`, `server/`, and `data/` exist.
- [ ] `public/index.html` can be opened in a browser and displays the layout shell.
- [ ] `public/style.css` is correctly linked and applies a CSS reset and theme variables.
- [ ] Mock essay cards are visible and responsively styled in the content area.

## Out of Scope
- Setting up the Express.js server (`server.js`).
- Implementing the Markdown renderer (`marked`).
- Database schema creation or interaction.
