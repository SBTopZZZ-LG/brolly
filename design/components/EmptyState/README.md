An illustrated empty state with a dry headline, a line of wit and one action.

`Brolly.EmptyState.html('tasks', {title, wit, action, noAction})` (all options optional; the action button carries `data-br-act="empty"` for your handler) or the lower-level `Brolly.art(name)`. Scenes: `teapot` (tasks), `biscuit` (search), `tray` (inbox), `umbrella` (error), `plug` (offline), `cloud` (quiet), `door` (not found). The consumer wires the action button.

- Every list, search result and error state uses one.
- Extend the deck in `Brolly.voice.empty` rather than writing ad-hoc copy; keep new lines in the same register.
