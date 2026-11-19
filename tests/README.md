# Tests

The checks are written in Python with Playwright. Node.js is only needed for the build; the kit itself has no runtime dependencies.

## Setup

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r tests/requirements.txt
python -m playwright install chromium
```

On Linux, if the browser needs system libraries:

```bash
python -m playwright install --with-deps chromium
```

To use an existing Chromium instead of the Playwright download:

```bash
export BROLLY_CHROMIUM="$(command -v chromium)"
# or
export BROLLY_CHROMIUM=/path/to/chrome
```

## Run

```bash
npm test
```

That runs, in order:

| File | Checks |
| --- | --- |
| `smoke.py` | every generated preview loads without script errors or missing assets, and the gallery uses the real stylesheet |
| `interactions.py` | tabs, command bar, dialogs, menus, toasts, hold-to-confirm, the full Tasks example, and gallery theme/filtering |
| `esm.py` | the ESM build and example over a local HTTP server |
| `examples.py` | every example loads, fills the viewport, and performs its main action; includes autosave/persistence checks and the expenses date-field layout |

The examples test starts its own temporary HTTP server. `smoke.py` and `interactions.py` use `file://` deliberately, so the docs and previews stay usable without a server.

## Screenshots (optional)

`shots.py` captures all example pages at 1440×1000 and needs a preview server:

```bash
npm run preview                 # terminal 1
python tests/shots.py dawn      # terminal 2
```

Output goes to `$BROLLY_SHOTS_DIR` or a temporary directory. Themes: `dawn`, `noon`, `dusk`, `night`.
