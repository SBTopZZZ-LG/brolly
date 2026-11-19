Floating-label text inputs, textareas, selects and search fields with inline validation.

Markup: `<label class="br-field"><input class="br-field__input" placeholder=" "><span class="br-field__label">Name</span></label>`. Variants: `br-field--search`, `br-field--select`, `br-field--static`. `Brolly.Field.html({...})` builds markup; `Brolly.Field.setInvalid(field, message)` shows or clears an error.

- The `placeholder=" "` (a single space) is required for the label to float.
- The consumer supplies the label text and the validation rule; validate on blur.
- Errors show an icon and message, never colour alone.
- Don't use a separate label above the input.
