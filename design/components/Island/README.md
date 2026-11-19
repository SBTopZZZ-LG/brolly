Dynamic-island toasts that expand from the top centre, hold briefly, and fold away.

`Brolly.toast('saved')` uses a line from the deck; `Brolly.Island.show({title, detail, tone, actions})` is the full form. Tones: `success`, `info`, `warning`, `danger`. They queue one at a time.

- Use for outcomes (saved, copied, sent). Don't use for errors that need a decision; use a bloom dialog.
- `actions: [{label, primary, onClick}]` allows an Undo.
