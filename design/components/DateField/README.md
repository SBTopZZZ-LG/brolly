A date field that understands plain words, day-first, and shows how it understood you before you commit.

Markup: `Brolly.DateField.html()` or an element with `data-br="date"`. Typing "next friday 3pm", "in 3 days" or "tomorrow" resolves live to a line like "Friday 20 Nov · 15:00 · in 2 days"; the calendar button opens a calendar bloom. Listen for the `br-date` change event.

- `Brolly.When.parse(text)` and `Brolly.When.format(date)` are available standalone.
- Dates are day-first (British) and times are 24-hour.
- Don't use `<input type="date">` anywhere in a Brolly tool.
