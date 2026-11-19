A pill tab bar with a gliding glass thumb that springs to the selected tab.

Markup: `<div class="br-tabs" role="tablist">` with `.br-tabs__tab` children; `data-br="tabs"` mounts it. Arrow keys move between tabs; a `br-tab` event fires on change.

- Use for peer views of one subject; swap content with `Brolly.view.swap` for the depth-push transition.
- Keep to two to six tabs with short labels.
