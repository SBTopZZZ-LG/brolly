The collapsible left navigation rail that expands on hover and can be pinned.

Markup: `.br-rail` with `.br-rail__item[data-view]` entries (icon + label). It collapses to icons, expands on hover or focus, and `[` pins it. `Brolly.Rail.setActive(rail, view)` marks the current view (`aria-current="page"`); a `br-nav` event with `detail.view` fires when an item is chosen.

- Five to seven destinations; secondary actions go in the command bar.
- Below 900px it becomes a bottom bar.
