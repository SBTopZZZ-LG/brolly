The universal command bar, opened with ⌘/Ctrl+K, that reaches every action and destination.

`Brolly.palette.register([{id, title, hint, icon, group, keywords, run}])` adds items; `Brolly.palette.open()` / `.toggle()` opens it. Fuzzy matched, grouped, recents first; Enter runs the item.

- The consumer supplies the items and what `run` does.
- Every action in a tool should be reachable from here.
- Don't add a second search box that does the same job.
