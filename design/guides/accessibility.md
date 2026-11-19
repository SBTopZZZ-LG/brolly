# Accessibility

- **Contrast.** Every text and control token was checked against the worst case of its glass over the aurora in all four themes: body text at least 4.5:1, large text and UI edges at least 3:1.
- **Colour is never alone.** Status, validation, chart series and selection also carry an icon, label, shape or position. Charts have a legend, direct labels where space allows, and a table view toggle.
- **Chart palette.** `--data-1…3` are separated for common colour-vision deficiencies in every theme.
- **Focus.** A visible 2px `--focus` ring with offset on every interactive element, including inside glass. Overlays trap focus, close with Esc and return focus to their trigger.
- **Keyboard.** Everything works without a pointer: rows reorder with Alt+arrows, the lasso list has Ctrl/⌘+A and Esc, the chart is traversable with arrow keys, and hold-to-confirm can be held with Space or Enter.
- **Screen readers.** Roles and labels on dialogs, menus, toolbars, progress and tabs; toasts and bulk counts are `aria-live`; illustrations have labels.
- **Reduced motion.** `prefers-reduced-motion` replaces springs with fades, freezes the aurora, and turns off magnets, confetti, chart draw-in and view transitions.
- **Reduced transparency.** `prefers-reduced-transparency` swaps glass for solid surfaces with the same edge.
- **High contrast.** `prefers-contrast: more` strengthens edges and removes glows.
- **Touch.** Hover-only affordances (tooltips, magnets) are optional extras; every action is also reachable by tap or keyboard.
- **Wit is optional.** `Brolly.config.wit = false` swaps the dry lines for plain ones.
