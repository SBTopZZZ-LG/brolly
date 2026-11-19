Floating list rows with a checkbox, title, meta line and optional gems.

`Brolly.Rows.html({id, title, meta, done, gem})` (`gem` is a ready-made `Brolly.Gem.html(...)` string) builds a `.br-row` inside a `.br-rows` list. Rows are 64px, float with gaps and lift on hover.

- Combine with `LiftShuffle` for reordering and `Lasso` for multi-select.
- Don't use a table for lists of things; tables are for comparing columns.
