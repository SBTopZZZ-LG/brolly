The frosted-glass surface that everything sits on: translucent fill, backdrop blur, a hairline edge and a soft glow.

Use `.br-glass` (with `.br-glass--pad` for padding, `.br-glass--strong` for a second layer) or `Brolly.Glass.html(inner, {strong, pad})`.

- Stack at most two layers: base glass, then strong glass for things that sit on it (menus, popovers, rows inside cards).
- Tokens: `--glass`, `--glass-strong`, `--glass-edge`, `--blur-md`, `--sat-glass`, `--glow-rest`.
- Falls back to solid surfaces under reduced transparency.
- Don't put body text on glass over busy imagery; there is none in this kit, keep it that way.
