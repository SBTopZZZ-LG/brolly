# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-19

Initial public release.

### Added

- 29 components with tokens, four themes, 44 hairline icons, motion, sounds, and keyboard support.
- Plain CSS/JS distribution: `dist/brolly.css`, `dist/brolly.js`, and `dist/brolly.esm.js`.
- `dist/brolly.inline.css`, a single CSS file with the five WOFF2 fonts embedded.
- Component gallery generated from `design/previews/`, with theme switching and live previews.
- Eight standalone example tools: tasks, notes, habits, focus, library, expenses, journal, and flashcards.
- API reference for the core object and `Brolly.sun`, plus design guidance for behaviour, motion, voice, and accessibility.
- Playwright checks for previews, interactions, the ESM build, and every example.
- MIT license and a reproducible, dependency-free build script.

### Fixed

- Short pages now fill the viewport, and the page background is painted on `html`/`body`, so no white strip appears below the gradient.
- The expenses example's date field now stacks its resolved-date line below the input instead of overlapping adjacent controls.
- Charts handle all-zero series without dividing by zero.
