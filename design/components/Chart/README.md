Glow-line charts with a hover crosshair, legend, keyboard traversal and a table view.

`Brolly.Chart.line(el, {series: [{name, values}], labels, ...})`. Colours are assigned in fixed order from `--data-1…3`. Hover or arrow keys show a tooltip; the table toggle shows the same data as a table.

- At most three series; fold or split beyond that.
- Always keep the legend and table view; colour is never the only identifier.
