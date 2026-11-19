# Design sources

This directory holds the source material for the kit's documentation and examples.

- `previews/<Component>/preview.html` — standalone component previews. These are the source for `docs/previews/` and for the generated Tasks example.
- `components/<Component>/README.md` — short component notes: markup, API and usage rules.
- `guides/` — behaviour, motion, voice and accessibility guidance.
- `manifest.json` — component names, groups and summaries.
- `tokens.json` — token metadata (the runtime tokens live in `src/css/00-tokens.css`).

The previews are intentionally plain HTML. They load the built assets when copied into `docs/previews/` by `build.mjs`.
