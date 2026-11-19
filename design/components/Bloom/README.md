Dialogs, menus and popovers that grow out of the element that opened them and shrink back on close.

`Brolly.Bloom.open({panel, kind: 'dialog'|'popover'|'menu', trigger})`, `Brolly.Bloom.menu(trigger, items)` (resolves with the chosen id), and `Brolly.Bloom.confirm({title, body, tone})` (resolves true/false). Close with Esc, scrim click or an element with `data-br-close`.

- Focus is trapped and returns to the trigger.
- Use confirm for irreversible choices with context; hold-to-confirm for quick destructive actions.
