# Motion

Motion in Brolly is springy but brief: things arrive with a little overshoot and settle quickly.

## Easing and duration

- `--ease-spring` (cubic-bezier(0.34, 1.56, 0.64, 1)): arrivals, presses, blooms, lifts. The default for anything that appears or responds to touch.
- `--ease-settle`: departures and colour/opacity changes. No overshoot.
- `--ease-snap`: tiny state changes (switch bead, checkbox).
- `--dur-fast` for hovers and ticks, `--dur-base` for most transitions, `--dur-slow` for overlays growing from their trigger, `--dur-hold` for hold-to-confirm, `--dur-aurora` for the background drift.

## Signature moves

- **Magnetic buttons**: buttons lean a few pixels toward the pointer and spring back. Off under reduced motion.
- **Bloom**: menus, popovers and dialogs grow from the element that opened them and shrink back into it on close; focus returns to the trigger.
- **Floating rows**: rows lift on grab (larger shadow, slight scale), neighbours shuffle out of the way with a spring, and the row settles into its slot.
- **Lasso**: a soft translucent rectangle with a faint blur; rows tick as they are caught.
- **Dynamic-island toasts**: a pill that expands from the top centre, holds, then folds away. Queued, one at a time.
- **Breathing orb**: a slow gradient orb for loading and thinking states (`data-br="orb"`).
- **Glow-line charts**: lines draw in; the hover crosshair follows the pointer.
- **Celebrations**: confetti plus an aurora flare for a finished list or milestone (`Brolly.celebrate.burst()`), never for routine saves.
- **Idle antics**: after 45s of nothing the app asks if you are still there; after 100s it sulks; after 190s it dims. Any input wakes it with a "welcome back".

## Transitions between views

- **Drill-in** (list to detail, card to page): the View Transitions API morphs the card into the page (`Brolly.view.go(update, {kind: 'morph', source, target})`).
- **Peers** (tabs, rail destinations): depth push, where the old view recedes and the new one comes forward (`Brolly.view.swap(host, node)`).
- **Theme change** cross-fades.
- Browsers without View Transitions get a short fade; nothing breaks.

## Reduced motion

With `prefers-reduced-motion`, springs become short fades, the aurora freezes, magnets switch off, confetti is skipped (the aurora flare stays), line charts do not draw in, and view transitions are skipped. Every state change is still visible.

## Sound and haptics

Short WebAudio ticks, opens, closes, success and error cues; haptic ticks where the device supports them. One master switch (`Brolly.sound.master(false)`), plus separate `mute` and `hapticsOff`; the choice is remembered between visits.
