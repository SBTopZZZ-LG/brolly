Short synthesised sounds and haptic ticks with a single master mute.

`Brolly.sound.play('tick'|'pop'|'open'|'close'|'success'|'confirm'|'error'|'send'|'sigh')`, `Brolly.sound.master(false)` turns sound and haptics off, `.mute(true)` sound only, `.hapticsOff(true)` haptics only. The setting persists.

- Sounds start only after a user gesture.
- Provide a visible mute control in settings.
