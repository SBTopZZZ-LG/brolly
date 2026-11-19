View transitions: a morph for drill-ins and a depth push for peer views.

`Brolly.view.go(update, {kind: 'morph', source, target})` morphs a card into its detail; `Brolly.view.swap(host, node)` does a depth push between peers. Browsers without View Transitions fall back to a short fade; reduced motion skips them.

- Morph for parent to child, push for siblings. Don't mix.
