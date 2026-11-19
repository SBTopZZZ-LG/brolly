/* ───────── sensory: glass-chime sounds + haptics ───────── */
var Sensory = (function () {
  var ctx = null;
  var s = store('sound'), h = store('haptics');
  if (s === 'off') B.config.sound = false;
  if (h === 'off') B.config.haptics = false;
  function ac() {
    if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { ctx = new C(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function note(c, f, t0, dur, vol, type, glide) {
    var o = c.createOscillator(), g = c.createGain(), o2 = c.createOscillator(), g2 = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0); if (glide) o.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
    o2.type = 'sine'; o2.frequency.setValueAtTime(f * 2.01, t0); if (glide) o2.frequency.exponentialRampToValueAtTime(glide * 2.01, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    g2.gain.setValueAtTime(0.0001, t0); g2.gain.exponentialRampToValueAtTime(vol * 0.25, t0 + 0.01); g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.7);
    o.connect(g); o2.connect(g2); g.connect(c.destination); g2.connect(c.destination);
    o.start(t0); o2.start(t0); o.stop(t0 + dur + 0.05); o2.stop(t0 + dur + 0.05);
  }
  var SOUNDS = {
    tick:    function (c, t) { note(c, 1760, t, 0.05, 0.05); },
    pop:     function (c, t) { note(c, 520, t, 0.14, 0.09, 'sine', 780); },
    success: function (c, t) { note(c, 659.25, t, 0.32, 0.09); note(c, 987.77, t + 0.09, 0.42, 0.08); },
    confirm: function (c, t) { note(c, 523.25, t, 0.3, 0.08); note(c, 659.25, t + 0.07, 0.3, 0.08); note(c, 783.99, t + 0.14, 0.5, 0.08); },
    error:   function (c, t) { note(c, 196, t, 0.28, 0.1, 'triangle', 170); note(c, 207.65, t + 0.04, 0.26, 0.06, 'triangle', 175); },
    send:    function (c, t) { note(c, 420, t, 0.16, 0.08, 'sine', 920); },
    sigh:    function (c, t) { note(c, 392, t, 0.7, 0.05, 'sine', 247); },
    open:    function (c, t) { note(c, 440, t, 0.18, 0.06, 'sine', 660); },
    close:   function (c, t) { note(c, 660, t, 0.16, 0.05, 'sine', 440); }
  };
  var HAP = { tick: [8], pop: [10], success: [10, 40, 12], confirm: [14, 30, 14, 30, 26], error: [30, 40, 30], send: [12], sigh: [], open: [6], close: [6] };
  var api = {
    play: function (n) { if (!B.config.sound || !SOUNDS[n]) return; var c = ac(); if (!c) return; try { SOUNDS[n](c, c.currentTime + 0.01); } catch (e) {} },
    haptic: function (n) { if (!B.config.haptics || !navigator.vibrate || !HAP[n] || !HAP[n].length) return; try { navigator.vibrate(HAP[n]); } catch (e) {} },
    fire: function (n) { api.play(n); api.haptic(n); },
    mute: function (on) { B.config.sound = !on; store('sound', on ? 'off' : 'on'); return on; },
    hapticsOff: function (off) { B.config.haptics = !off; store('haptics', off ? 'off' : 'on'); return off; },
    names: Object.keys(SOUNDS),
    master: function (on) { api.mute(!on); api.hapticsOff(!on); }
  };
  return api;
})();
B.Sensory = Sensory; B.sound = Sensory;

