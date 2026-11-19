# Behaviour

Brolly tools behave the same way everywhere. Learn it once.

## Keyboard map

| Keys | Does |
|---|---|
| ⌘/Ctrl + K | Open the command bar |
| F | Show hint letters on everything clickable; type a letter to press it |
| Esc | Close the top overlay, clear the selection, cancel a lasso |
| Alt + ↑ / ↓ | Move the focused row up or down |
| ⌘/Ctrl + A | Select all rows (inside a lasso list) |
| [ | Pin or unpin the rail |
| ↑ / ↓ / Enter | Move through and choose menu and command bar items |
| Tab / Shift + Tab | Move focus; overlays trap it |

Single-letter shortcuts are ignored while typing in a field. Add your own with `Brolly.Keys.on('mod+s', fn)`.

## Command bar

One box for everything: navigate, create, change theme, toggle sound. Fuzzy matching, grouped results, recent first. Register items with `Brolly.palette.register([{id, title, hint, icon, group, keywords, run}])`. If an action exists, it belongs in the command bar.

## Hint overlay

Vimium-style. Press F, small gem labels appear over every interactive element; typing the letters activates it. Esc leaves.

## Destructive actions

Hold to confirm. The button fills while held (`--dur-hold`), springs back if released early, and fires on completion. Bulk delete uses the same. For irreversible choices with context, use `Brolly.Bloom.confirm({title, body, tone})`, which returns a promise of true/false.

## Lists

- Rows float (8px gaps) and lift on grab. Drag by the grip, or Alt+arrows for keyboard.
- Lasso: drag on empty space around the rows to select; Shift or Ctrl/⌘ adds. A bulk bar rises with Archive, Move, Hold to delete and Clear.
- Click a row to open it; the checkbox toggles done.

## Fields

Floating labels. Validation shows beneath the field with an icon and message, never colour alone, and happens on blur, not on every keystroke. Dates accept plain words ("next friday 3pm", day-first) and show how they were understood before you commit; a calendar is one click away.

## Feedback

Short outcomes (saved, copied, sent) are island toasts. Errors that need action are inline or a bloom dialog. Progress is a bar or ring; indeterminate waits use the breathing orb and a line from the loading deck.

## Empty states

Every list has one: illustration, a dry headline, one line of wit, one action. Seven scenes cover tasks, search, inbox, error, offline, quiet and not-found.

## Greetings

Home screens greet by the time of day and by name, with a line that has an opinion.
