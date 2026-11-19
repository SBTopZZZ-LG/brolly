# Brolly

A UI kit for productivity tools, built with plain CSS and JavaScript. Aurora glass over a lavender haze, Fraunces and DM Mono, springy motion, and a keyboard-first way of working.

![Brolly component gallery](docs/screenshot.jpg)

## Features

- **29 components** — buttons, fields, date fields, controls, tabs, rows, drag/reorder, lasso selection, command bar, hint overlay, toasts, dialogs, menus, charts, progress, empty states, a navigation rail, a bento layout, and more.
- **No runtime dependencies** — copy `dist/` and link two entry files. For a single CSS file with fonts embedded, use `dist/brolly.inline.css`.
- **Four themes** — `dawn`, `noon`, `dusk`, `night`, all driven by CSS custom properties.
- **Override-friendly CSS** — styles live in named `@layer`s, so application CSS wins without specificity fights.
- **Hackable behaviour** — plain DOM, `data-br` attributes, bubbling `br-*` events, and a small `Brolly` API.
- **44 hairline icons**, self-hosted fonts, reduced-motion support, and visible focus states.
- **Eight complete example tools**, each a standalone page.

## Get the files

The kit is not published to the npm registry. Use one of these:

**CDN (jsDelivr).** Fonts resolve from the same versioned path:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SBTopZZZ-LG/brolly@v1.0.0/dist/brolly.css">
<script src="https://cdn.jsdelivr.net/gh/SBTopZZZ-LG/brolly@v1.0.0/dist/brolly.js"></script>
```

**Download.** Grab the [v1.0.0 release](https://github.com/SBTopZZZ-LG/brolly/releases/tag/v1.0.0), or the [source archive](https://github.com/SBTopZZZ-LG/brolly/archive/refs/tags/v1.0.0.zip).

**Git.** `git clone https://github.com/SBTopZZZ-LG/brolly.git`

**npm, from GitHub.** This is a GitHub install, not an npm-registry package:

```bash
npm install github:SBTopZZZ-LG/brolly
```

```js
import Brolly from 'brolly/esm';
import 'brolly/css';
```

**Copying the build.** Copy the whole `dist/` folder, not just the two entry files — `brolly.css` loads five files from `dist/fonts/`:

```
dist/
  brolly.css
  brolly.inline.css   ← fonts embedded; no fonts/ folder needed
  brolly.js
  brolly.esm.js
  fonts/
  components.json
```

If a single CSS file is easier, use `brolly.inline.css` with `brolly.js`. It is about 310 KB instead of 57 KB plus 196 KB of fonts.

## Quick start

```html
<link rel="stylesheet" href="dist/brolly.css">
<script src="dist/brolly.js"></script>

<div class="br-stage" data-theme="dawn">
  <button class="br-btn br-btn--primary">Add a task</button>
</div>

<script>
  Brolly.init();
</script>
```

ES modules are available too:

```js
import Brolly from './dist/brolly.esm.js';
```

## Themes

Set `data-theme` on any wrapper, or let the kit follow the clock:

```html
<div class="br-stage" data-theme="night">…</div>
```

```js
Brolly.sun.start();        // dawn / noon / dusk / night, by local hour
Brolly.sun.set('dusk');    // or pin one
```

All components read tokens (`--canvas`, `--glass`, `--ink`, `--accent`, …), so a theme change needs no component changes. The `br-theme` event fires on `document` when the active theme changes. Full reference: [Brolly.sun API](docs/api.md#brollysun).

## Examples

Each example is a working productivity tool showing a different slice of the kit. Open `examples/index.html`, or run `npm run preview` and visit `/examples/`.

| Example | What it exercises |
| --- | --- |
| [`examples/tasks/`](examples/tasks/) | rail, rows, drag reorder, lasso, command bar, chart, progress, date field, dialogs, toasts |
| [`examples/notes/`](examples/notes/) | sidebar list, autosave, search, word count, delete confirmation, empty states |
| [`examples/habits/`](examples/habits/) | week grid, streak maths, progress ring, chart, add/remove |
| [`examples/focus/`](examples/focus/) | large ring timer, start/pause/reset, tabs, sound, session log, chart |
| [`examples/library/`](examples/library/) | read-later cards, filters, search, add dialog with validation, read/unread |
| [`examples/expenses/`](examples/expenses/) | forms, validation, natural-language dates, period tabs, table, chart, totals |
| [`examples/journal/`](examples/journal/) | date navigation, mood radios, prompts, autosave, search, delete |
| [`examples/flashcards/`](examples/flashcards/) | decks, reveal, keyboard grading, deck progress, chart |

The examples share only `examples/_shared.css` and `examples/_shared.js` (local storage, dates, theme cycling), so each page can be lifted out and edited in isolation. `examples/tasks/` is generated from `design/previews/Showcase/preview.html` by the build; the other seven are hand-written.

## Structure

```
src/css/             fonts, tokens, base styles, one file per component group
src/js/components/   core plus one file per component, concatenated in order
design/              component previews, component notes, design guides, token metadata
build.mjs            concatenates src → dist and regenerates docs previews
dist/                CSS, JS, ESM, fonts, token/component metadata
docs/                component gallery, API reference, generated previews
examples/            eight example tools plus the index
tests/               Playwright smoke, interaction, ESM and example checks
```

## Development

Node.js 18+ is needed for the build. Python 3.10+ is needed for the tests.

```bash
npm run build      # dist + docs previews + examples/tasks
npm run preview    # http://localhost:4173/docs/  (examples at /examples/)
```

To run the test suite:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r tests/requirements.txt
python -m playwright install chromium
npm test           # previews, interactions, ESM and all examples
```

Set `BROLLY_CHROMIUM` to use an existing Chromium instead of the Playwright download. See [tests/README.md](tests/README.md) for details. `build.mjs` uses only Node's standard library; the shipped kit has no build step and no runtime dependencies.

## Customising

**Tokens.** Override any custom property on `.br-stage` or `:root`.

```css
.br-stage {
  --accent: #0b6f63;
  --grad-start: #0b6f63;
  --grad-end: #1c80c6;
}
```

**Component styles.** App CSS is unlayered, so it wins over `@layer brolly.*` without extra specificity.

```css
.br-btn--primary {
  letter-spacing: 0.02em;
}
```

**Behaviour.** `Brolly.init()` wires anything with a `data-br` hook (`tabs`, `sortable`, `lasso`, `orb`, `date`, …). Components emit bubbling custom events such as `br-tab`, `br-date`, `br-reorder`, and `br-bulk`.

**Source.** Edit `src/`, then run `npm run build`. Don't edit `dist/` or the generated previews by hand.

## Accessibility and motion

Components use native controls where possible, visible focus rings, text labels alongside colour, keyboard support, and `prefers-reduced-motion` handling. Fonts are self-hosted with `font-display: swap`.

The full notes live in [`design/guides/accessibility.md`](design/guides/accessibility.md), with behaviour, motion, and copy guidance alongside it.

## Browser support

Chromium 111+, Firefox 113+, and Safari 16.2+ (roughly mid-to-late 2023). This covers the baseline for `@layer`, `color-mix()`, `backdrop-filter`, and `100dvh`. Newer features such as `corner-shape` are progressive enhancements.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). The initial release is tagged [v1.0.0](https://github.com/SBTopZZZ-LG/brolly/releases/tag/v1.0.0).

## License

MIT. See [LICENSE](LICENSE).
