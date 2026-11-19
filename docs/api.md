# API reference

The kit exposes one global, `Brolly`, when loaded with `dist/brolly.js`, and the same object as the default export of `dist/brolly.esm.js`.

## Core

| Member | Description |
| --- | --- |
| `Brolly.init(root?)` | Mounts behaviour for every `data-br` hook inside `root` (default: `document`). Call once after the DOM is ready. Returns `Brolly`. |
| `Brolly.icon(name, className?)` | Returns an SVG string for one of `Brolly.iconNames`. Unknown names fall back to a dot. |
| `Brolly.toast(keyOrTitle, extra?)` | Shows an island toast. A known voice key (`'saved'`, `'done'`, …) supplies the copy; a string is used as the title. |
| `Brolly.config` | Runtime switches: `wit`, `sound`, `haptics`. |
| `Brolly.version` | The kit version. |

## Brolly.sun

Follow-the-sun theming. The active theme is written as `data-theme` on the root `<html>` element.

```js
Brolly.sun.start();          // follow the local clock
Brolly.sun.set('night');     // pin a theme
Brolly.sun.set('auto');      // back to following the clock
Brolly.sun.stop();           // stop the minute timer
```

| Member | Description |
| --- | --- |
| `Brolly.sun.bands` | Array of four bands: `{ id, from, to, name, wit }`. |
| `Brolly.sun.band(hour)` | Returns the band for a decimal local hour. Hours before `05:00` are treated as the previous late night, so the night band runs to `29` (05:00). |
| `Brolly.sun.hours(date?)` | Returns decimal local hours for a `Date` (default: now). |
| `Brolly.sun.apply(id, soft?)` | Applies `dawn`, `noon`, `dusk`, or `night` immediately. Does not persist the choice. `soft: false` skips the view transition. |
| `Brolly.sun.set(mode)` | Sets `auto`, `dawn`, `noon`, `dusk`, or `night`; persists the mode; applies it immediately. |
| `Brolly.sun.mode()` | Returns the current mode: `auto` or a theme id. |
| `Brolly.sun.start()` | Starts the minute timer. In `auto` mode it applies the current band immediately. |
| `Brolly.sun.stop()` | Stops the timer. The last applied theme stays. |

Defaults: the mode is read from `localStorage['brolly.sun']`; if nothing is stored, it is `auto`. `start()` is required to begin following the clock — loading the script alone does not change the theme.

Events:

```js
document.addEventListener('br-theme', (event) => {
  console.log(event.detail.theme); // 'dawn' | 'noon' | 'dusk' | 'night'
});
```

`br-theme` is dispatched on `document` and is skipped when the requested theme is already active. When supported and motion is allowed, `apply()` wraps the switch in a short view transition with `data-br-nav="fade"` on the root.

Band definitions:

| Band | From | To | Theme |
| --- | --- | --- | --- |
| Dawn | 05:00 | 10:00 | `dawn` |
| Noon | 10:00 | 16:30 | `noon` |
| Dusk | 16:30 | 20:30 | `dusk` |
| Night | 20:30 | 05:00 | `night` |

## Command bar

| Member | Description |
| --- | --- |
| `Brolly.palette.register(items)` | Appends items to the command bar. |
| `Brolly.palette.set(items)` | Replaces the item list. |
| `Brolly.palette.open()` / `.close()` / `.toggle()` | Controls the bar. |
| `Brolly.palette.items()` | Returns the current items. |

An item is `{ id, title, group?, icon?, hint?, keywords?, keys?, run }`. The bar also opens with <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>.
