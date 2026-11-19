/* ───────── idle antics ───────── */
var Idle = (function () {
  var timers = [], on = false, sulking = false, stage, scale = 1, stages;
  function reset() { if (!on) return; timers.forEach(clearTimeout); timers = []; if (sulking) { sulking = false; Aurora.mood('calm', stage); stage.removeAttribute('data-idle'); Island.show(VOICE.welcomeBack); } arm(); }
  function arm() {
    stages.forEach(function (s, i) {
      timers.push(setTimeout(function () {
        Aurora.mood(s.mood, stage); stage.setAttribute('data-idle', String(i + 1)); if (s.mood === 'sulk') sulking = true;
        if (s.dim) stage.setAttribute('data-idle', '3'); else if (i < 2) stage.setAttribute('data-idle', String(i + 1));
        Island.show({ title: s.title, detail: s.detail, tone: 'info', icon: i === 0 ? 'clock' : 'moon', duration: 6000, open: true }); Sensory.play('sigh');
      }, s.after * 1000 * scale));
    });
  }
  function start(o) {
    o = o || {}; stop(); stage = o.stage || D.querySelector('.br-stage') || D.body; scale = o.scale || 1; stages = o.stages || VOICE.idle; on = true; arm();
    ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (n) { addEventListener(n, bump, { passive: true }); });
  }
  var lastBump = 0;
  function bump() { var now = Date.now(); if (now - lastBump < 400) return; lastBump = now; if (sulking) reset(); else if (on && timers.length) { timers.forEach(clearTimeout); timers = []; arm(); } }
  function stop() { on = false; timers.forEach(clearTimeout); timers = []; if (stage) { stage.removeAttribute('data-idle'); } ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (n) { removeEventListener(n, bump); }); }
  return { start: start, stop: stop };
})();
B.Delight = { greet: Greet.line, greeting: Greet.html, celebrate: Celebrate.burst, done: Celebrate.done, idle: Idle };
B.greet = Greet.line; B.celebrate = Celebrate; B.idle = Idle;

