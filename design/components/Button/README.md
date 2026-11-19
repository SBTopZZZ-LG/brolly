The gradient-pill primary button and its quieter siblings, with a magnetic lean and a springy press.

Markup: `<button class="br-btn br-btn--primary">`. Variants: `br-btn--primary` (gradient pill), default (glass), `--ghost`, `--danger`, `--icon` (square, needs `aria-label`); sizes `--sm`, `--lg`. Put an icon first with `Brolly.icon('plus')`.

- One primary per view.
- The consumer supplies the label (verb, sentence case) and the click handler.
- Magnetic lean is for mouse pointers only and is off under reduced motion.
- Don't colour buttons by hand; use a variant.
