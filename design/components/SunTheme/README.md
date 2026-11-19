Follow-the-sun theming: dawn, noon, dusk and night, switching by the local hour.

`Brolly.sun.start()` follows the clock; `Brolly.sun.set('auto'|'dawn'|'noon'|'dusk'|'night')` overrides and remembers; a `br-theme` event fires on change. It sets `data-theme` on the root.

- Offer the four themes plus Auto in settings or the command bar.
- Never hard-code theme-specific colours in your app.
