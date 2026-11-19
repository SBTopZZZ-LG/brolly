A press-and-hold button that fills as you hold and only fires when it completes, for anything destructive.

Markup: `<button class="br-btn br-btn--danger br-hold" data-hold="800"><span data-hold-label data-idle="Hold to delete" data-holding="Keep holding…" data-done="Gone.">Hold to delete</span></button>`. Listen for the `br-confirm` event on the button.

- Releasing early springs the fill back with no effect; Space or Enter held on the keyboard works the same.
- `data-hold` is the duration in ms (default `--dur-hold`).
- Do use it for delete, discard and anything irreversible. Don't use it for routine saves.
