/* ───────── voice: the dry copy deck ───────── */
var VOICE = {
  empty: {
    tasks:    { art: 'teapot',   title: 'Nothing to do. Suspicious.', wit: "Either you've finished, or you've lost them. Tea?", action: 'Add something, then' },
    search:   { art: 'biscuit',  title: 'Not a sausage.', wit: 'Try different words. Or the same words, but sterner.', action: 'Clear the search' },
    inbox:    { art: 'tray',     title: "Inbox zero. Don't let it go to your head.", wit: "It won't last. Nothing nice does.", action: 'Go and look smug' },
    error:    { art: 'umbrella', title: 'That went rather badly.', wit: 'The server has gone for a lie-down. Try again, or be cross at it quietly.', action: 'Try again' },
    offline:  { art: 'plug',     title: "You've gone offline. Marvellous.", wit: "Peace and quiet, with a side of mild panic. We'll catch up when you're back.", action: 'Check the connection' },
    quiet:    { art: 'cloud',    title: 'Nobody needs you.', wit: 'Enjoy it while it lasts, which is until about nine past the hour.', action: 'Do nothing, gloriously' },
    notfound: { art: 'door',     title: 'This page has popped out.', wit: 'Back in five. Or never. The note is unclear.', action: 'Go home' }
  },
  toast: {
    saved:   { title: 'Saved.',  detail: 'Smugly, but saved.', tone: 'success' },
    deleted: { title: 'Gone.',   detail: "We'll pretend it never happened.", tone: 'info' },
    sent:    { title: 'Sent.',   detail: 'No take-backs. Well, a few seconds of them.', tone: 'success' },
    failed:  { title: "That didn't work.", detail: 'Not our finest hour. Shall we have another go?', tone: 'danger' },
    copied:  { title: 'Copied.', detail: 'To the clipboard, with care.', tone: 'success' },
    done:    { title: 'Done.',   detail: 'Gold star. Not literally.', tone: 'success' },
    warn:    { title: 'Careful.', detail: 'That is rather a lot of things to delete at once.', tone: 'warning' }
  },
  loading: ['Putting the kettle on…', 'Queueing politely…', 'Apologising to the server…', 'Counting to ten, slowly…', 'Looking busy…', 'Nearly there. Technically.', 'Consulting the small print…'],
  idle: [
    { after: 45, mood: 'focus', title: 'Still there?', detail: 'The tasks are, unfortunately.' },
    { after: 100, mood: 'sulk', title: 'Sulking, gently.', detail: "No, no. Take your time. We've got all day." },
    { after: 190, mood: 'sulk', dim: true, title: 'Dimming the lights.', detail: 'Do carry on ignoring me.' }
  ],
  welcomeBack: { title: 'Oh, there you are.', detail: 'We were just talking about you. Not kindly.' },
  hold: { idle: 'Hold to delete', holding: 'Keep holding…', done: 'Gone.' },
  tips: {
    save: ['Save', 'Because "it\'s in my head" is not a backup.', '⌘ S'],
    palette: ['Command bar', 'Everything, from one box. Very civilised.', '⌘ K'],
    hints: ['Hint overlay', "Press F, then a letter. It's like Vimium, only politer.", 'F'],
    theme: ['Follows the sun', 'Unlike the British, who follow the forecast and then ignore it.'],
    delete: ['Delete', "Hold it. Properly. We're not animals.", ''],
    undo: ['Undo', "Time travel, but only a few seconds' worth.", '⌘ Z']
  }
};
B.voice = VOICE;
