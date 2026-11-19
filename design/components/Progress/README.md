Gradient progress bars and rings for waits where you know how far along you are.

`Brolly.Progress.bar('Uploading', 40)` and `Brolly.Progress.ring(60)` return markup; `Brolly.Progress.set(el, pct)` updates it. Both expose `role="progressbar"` with `aria-valuenow`.

- Always give the bar an accessible label.
- Don't animate fake progress.
