Drag a soft rectangle around rows to select them; a bulk bar rises with Archive, Move and hold-to-delete.

Add `data-br="lasso"` to a padded container of rows (the lasso starts on the empty space inside it). Shift or Ctrl/⌘ adds; Ctrl/⌘+A selects all; Esc clears. Handle the `br-bulk` event (`detail.action`, `detail.items`).

- The container needs some padding so there is somewhere to start the drag.
- The consumer performs the bulk actions.
