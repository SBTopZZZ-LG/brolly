/* Brolly v1.0.0 — generated from src/js. Do not edit. */
/* ───────── core: helpers, config, icons, voice ───────── */
var D = document, ROOT = D.documentElement;
var B = { version: '1.0.0', config: { wit: true, sound: true, haptics: true } };

function $(s, r) { return (r || D).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function mk(html) { var t = D.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function emit(el, name, detail) { var e = new CustomEvent(name, { bubbles: true, detail: detail }); el.dispatchEvent(e); return e; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function pick(a, last) { var x; var n = 0; do { x = a[Math.floor(Math.random() * a.length)]; n++; } while (x === last && a.length > 1 && n < 6); return x; }
function store(k, v) { try { if (v === undefined) return localStorage.getItem('brolly.' + k); localStorage.setItem('brolly.' + k, v); } catch (e) { return null; } }
function cssVar(n, el) { return getComputedStyle(el || ROOT).getPropertyValue(n).trim(); }
function ms(n, d) { var v = cssVar(n); var m = /([\d.]+)(ms|s)/.exec(v); return m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : d; }
function rm() { return (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || ROOT.getAttribute('data-br-motion') === 'off'; }
function fine() { return window.matchMedia && matchMedia('(pointer: fine)').matches; }
var SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)', SETTLE = 'cubic-bezier(0.22, 1, 0.36, 1)';
function anim(el, kf, o) { o = o || {}; var d = rm() ? 1 : (o.duration || 260); return el.animate(kf, { duration: d, easing: o.easing || SPRING, fill: o.fill || 'both', delay: rm() ? 0 : (o.delay || 0) }); }
function editing(t) { return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); }
function visible(el) { var r = el.getBoundingClientRect(); var cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth; }
B.util = { $: $, $$: $$, esc: esc, mk: mk, emit: emit, clamp: clamp, rm: rm };


/* ───────── hairline icons ───────── */
var ICONS = {
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  inbox: '<path d="M4 13l2.5-7h11L20 13"/><path d="M4 13v5.5h16V13h-5l-1 2h-4l-1-2z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
  chart: '<path d="M4 19h16"/><path d="M5.5 15l4-4.5 3 2.5 5.5-6.5"/>',
  settings: '<path d="M5 8h9M18 8h1M5 16h1M10 16h9"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>',
  trash: '<path d="M5 7h14M10 4h4M7 7l1 12h8l1-12"/><path d="M10 11v5M14 11v5"/>',
  archive: '<rect x="4" y="5" width="16" height="4" rx="1.5"/><path d="M5.5 9v9.5h13V9M10 13h4"/>',
  folder: '<path d="M4 7.5A1.5 1.5 0 015.5 6H10l2 2.5h6.5A1.5 1.5 0 0120 10v7.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5z"/>',
  tag: '<path d="M4 12V5.5A1.5 1.5 0 015.5 4H12l8 8-7.5 7.5z"/><circle cx="8.5" cy="8.5" r="1"/>',
  star: '<path d="M12 4l2.5 5.2 5.5.8-4 4 1 5.6-5-2.7-5 2.7 1-5.6-4-4 5.5-.8z"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5h4"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-4 3.5-5.5 7-5.5s6.2 1.5 7 5.5"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
  'chevron-down': '<path d="M6 9.5l6 6 6-6"/>',
  'chevron-left': '<path d="M14.5 6l-6 6 6 6"/>',
  'chevron-right': '<path d="M9.5 6l6 6-6 6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M18 6l-1.4 1.4M7.4 16.6L6 18"/>',
  moon: '<path d="M19 14.5A7.5 7.5 0 019.5 5 7.5 7.5 0 1019 14.5z"/>',
  sparkle: '<path d="M12 4l1.6 5.4L19 11l-5.4 1.6L12 18l-1.6-5.4L5 11l5.4-1.6z"/>',
  umbrella: '<path d="M3.5 12.5a8.5 8.5 0 0117 0z"/><path d="M12 12.5V18a2 2 0 004 0"/>',
  cup: '<path d="M5 9h11v5a5 5 0 01-5 5h-1a5 5 0 01-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 010 5H16"/><path d="M8 4v2M11 4v2"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  edit: '<path d="M5 19l1-4 9.5-9.5a2 2 0 013 3L9 18z"/><path d="M14 7l3 3"/>',
  grip: '<circle cx="9" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="17" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="1.1" fill="currentColor" stroke="none"/>',
  filter: '<path d="M4 6h16l-6 7v5l-4 2v-7z"/>',
  undo: '<path d="M9 6L4 11l5 5"/><path d="M4 11h10a5 5 0 010 10h-3"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
  alert: '<path d="M12 4.5l8.5 15h-17z"/><path d="M12 10v4.5M12 17v.01"/>',
  bolt: '<path d="M13 3.5L6 13h5l-1 7.5L18 11h-5z"/>',
  pin: '<path d="M9 4h6l-1 5 3 3H7l3-3zM12 12v8"/>',
  layers: '<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"/>',
  keyboard: '<rect x="3.5" y="6.5" width="17" height="11" rx="2.5"/><path d="M7 10.5h.01M10 10.5h.01M13 10.5h.01M16 10.5h.01M8 14h8"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2.5"/><path d="M5 15V7a2 2 0 012-2h8"/>',
  sound: '<path d="M5 10v4h3l5 4V6l-5 4z"/><path d="M16 9.5a3.5 3.5 0 010 5"/>',
  mute: '<path d="M5 10v4h3l5 4V6l-5 4z"/><path d="M16.5 10l4 4M20.5 10l-4 4"/>',
  dot: '<circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>'
};
function icon(name, cls) { return '<svg class="br-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.dot) + '</svg>'; }
B.icon = icon; B.iconNames = Object.keys(ICONS);
B.Icons = { names: B.iconNames, svg: icon };


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


/* ───────── keys: tiny shortcut registry ───────── */
var Keys = (function () {
  var map = [];
  function combo(e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    return ((e.metaKey || e.ctrlKey) ? 'mod+' : '') + (e.altKey ? 'alt+' : '') + (e.shiftKey && e.key.length > 1 ? 'shift+' : '') + k;
  }
  D.addEventListener('keydown', function (e) {
    var c = combo(e);
    for (var i = 0; i < map.length; i++) {
      var m = map[i];
      if (m.combo === c && (!m.noEdit || !editing(e.target)) && (!m.when || m.when(e))) { if (m.fn(e) !== false) e.preventDefault(); return; }
    }
  });
  return { on: function (combo, fn, o) { map.push({ combo: combo, fn: fn, noEdit: !(o && o.inInputs) && !/^mod\+/.test(combo), when: o && o.when }); return function () { map = map.filter(function (m) { return m.fn !== fn; }); }; } };
})();
B.Keys = Keys;


/* ───────── tooltips: dry wit, real information ───────── */
var Tooltip = (function () {
  var tip, timer, cur, warm = 0, id = 0;
  function ensure() { if (tip && tip.isConnected) return tip; tip = mk('<div class="br-tip" role="tooltip"></div>'); D.body.appendChild(tip); return tip; }
  function keys(s) { return s ? '<span class="br-keys">' + s.split(' ').map(function (k) { return '<kbd class="br-key">' + esc(k) + '</kbd>'; }).join('') + '</span>' : ''; }
  function show(el) {
    var t = ensure(); cur = el;
    var title = el.getAttribute('data-br-tip'), wit = el.getAttribute('data-br-wit'), k = el.getAttribute('data-br-keys');
    t.innerHTML = '<div class="br-tip__row"><span class="br-tip__title">' + esc(title) + '</span>' + keys(k) + '</div>' + (wit && B.config.wit ? '<div class="br-tip__wit">' + esc(wit) + '</div>' : '');
    if (!t.id) t.id = 'br-tip-' + (++id);
    el.setAttribute('aria-describedby', t.id);
    t.style.left = '0px'; t.style.top = '0px'; t.classList.remove('is-open');
    var r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight;
    var below = r.top < h + 16;
    var x = clamp(r.left + r.width / 2 - w / 2, 8, innerWidth - w - 8);
    t.style.left = x + 'px'; t.style.top = (below ? r.bottom + 10 : r.top - h - 10) + 'px';
    t.style.setProperty('--tip-origin', (r.left + r.width / 2 - x) + 'px ' + (below ? '0%' : '100%'));
    requestAnimationFrame(function () { t.classList.add('is-open'); });
    warm = Date.now();
  }
  function hide() { clearTimeout(timer); if (cur) { cur.removeAttribute('aria-describedby'); cur = null; } if (tip) tip.classList.remove('is-open'); }
  function over(e) {
    var el = e.target.closest && e.target.closest('[data-br-tip]');
    if (!el || el === cur) return;
    if (el.closest('.br-rail[data-expanded="true"]')) return;
    clearTimeout(timer);
    timer = setTimeout(function () { show(el); }, Date.now() - warm < 600 ? 40 : (e.type === 'focusin' ? 0 : 380));
  }
  function out(e) { var el = e.target.closest && e.target.closest('[data-br-tip]'); if (el) hide(); }
  D.addEventListener('pointerover', over); D.addEventListener('focusin', over);
  D.addEventListener('pointerout', out); D.addEventListener('focusout', out);
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  D.addEventListener('pointerdown', hide); addEventListener('scroll', hide, true);
  return { show: show, hide: hide, html: function (title, wit, k) { return 'data-br-tip="' + esc(title) + '"' + (wit ? ' data-br-wit="' + esc(wit) + '"' : '') + (k ? ' data-br-keys="' + esc(k) + '"' : ''); } };
})();
B.Tooltip = Tooltip;


/* ───────── aurora: drifts on its own, leans toward you ───────── */
var Aurora = (function () {
  var live = [], raf = 0, px = 0.5, py = 0.5;
  function build() { return mk('<div class="br-aurora" aria-hidden="true"><span class="br-aurora__blob" data-i="1"><i></i></span><span class="br-aurora__blob" data-i="2"><i></i></span><span class="br-aurora__blob" data-i="3"><i></i></span></div>'); }
  function tick() {
    raf = 0; var more = false;
    live.forEach(function (a) {
      if (!a.el.isConnected) return;
      a.blobs.forEach(function (b, i) {
        var k = [70, -90, 60][i];
        var tx = (px - 0.5) * k * (a.react ? 1 : 0), ty = (py - 0.5) * k * 0.7 * (a.react ? 1 : 0);
        b.x += (tx - b.x) * 0.045; b.y += (ty - b.y) * 0.045;
        if (Math.abs(tx - b.x) > 0.05 || Math.abs(ty - b.y) > 0.05) more = true;
        b.el.style.setProperty('--ox', b.x.toFixed(2) + 'px'); b.el.style.setProperty('--oy', b.y.toFixed(2) + 'px');
      });
    });
    if (more) raf = requestAnimationFrame(tick);
  }
  D.addEventListener('pointermove', function (e) { px = e.clientX / innerWidth; py = e.clientY / innerHeight; if (!raf && !rm()) raf = requestAnimationFrame(tick); }, { passive: true });
  function mount(stage) {
    stage = stage || $('.br-stage') || D.body;
    var el = $('.br-aurora', stage);
    if (!el) { el = build(); stage.insertBefore(el, stage.firstChild); }
    if (el._br) return el._br;
    var a = { el: el, react: stage.getAttribute('data-aurora') !== 'static', blobs: $$('.br-aurora__blob', el).map(function (b) { return { el: b, x: 0, y: 0 }; }) };
    el._br = a; live.push(a);
    if (stage.getAttribute('data-aurora') === 'static') el.setAttribute('data-static', '');
    return a;
  }
  function setMood(m, stage) { var a = mount(stage); a.el.setAttribute('data-mood', m || 'calm'); }
  function flare(stage, ms2) { var a = mount(stage); var prev = a.el.getAttribute('data-mood') || 'calm'; a.el.setAttribute('data-mood', 'joy'); setTimeout(function () { a.el.setAttribute('data-mood', prev); }, ms2 || 1800); }
  return { mount: mount, mood: setMood, flare: flare, html: build };
})();
B.Aurora = Aurora;


/* ───────── buttons: magnetic lean + html helper ───────── */
var Button = (function () {
  var cur = null;
  function leave(el) { if (!el) return; el.classList.remove('is-following'); el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); }
  D.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || rm()) return;
    var el = e.target.closest && e.target.closest('.br-btn:not([disabled]):not(.br-hold.is-holding),[data-br-magnetic]');
    if (cur && cur !== el) { leave(cur); cur = null; }
    if (!el) return;
    cur = el; var r = el.getBoundingClientRect();
    var dx = (e.clientX - (r.left + r.width / 2)) * 0.16, dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
    el.classList.add('is-following'); el.style.setProperty('--tx', clamp(dx, -9, 9).toFixed(1) + 'px'); el.style.setProperty('--ty', clamp(dy, -6, 6).toFixed(1) + 'px');
  }, { passive: true });
  D.addEventListener('pointerleave', function () { leave(cur); cur = null; }, true);
  function html(o) {
    o = o || {};
    var cls = 'br-btn' + (o.variant ? ' br-btn--' + o.variant : '') + (o.size ? ' br-btn--' + o.size : '') + (o.iconOnly ? ' br-btn--icon' : '');
    return '<button class="' + cls + '" type="' + (o.type || 'button') + '"' + (o.label && o.iconOnly ? ' aria-label="' + esc(o.label) + '"' : '') + '>' + (o.icon ? icon(o.icon) : '') + (o.iconOnly ? '' : '<span>' + esc(o.label || '') + '</span>') + '</button>';
  }
  return { html: html };
})();
B.Button = Button;


/* ───────── hold-to-confirm ───────── */
var Hold = (function () {
  var cur = null;
  function label(el, k) { var l = $('[data-hold-label]', el); if (l) l.textContent = (el.getAttribute('data-' + k) || VOICE.hold[k]); }
  function start(el) {
    if (cur || el.disabled) return;
    var dur = parseFloat(el.getAttribute('data-hold')) || ms('--dur-hold', 900);
    if (rm()) dur = Math.min(dur, 900);
    cur = { el: el, t0: performance.now(), dur: dur, raf: 0, done: false };
    el.classList.remove('is-releasing', 'is-done'); el.classList.add('is-holding'); label(el, 'holding');
    Sensory.haptic('tick');
    (function step(now) {
      if (!cur || cur.el !== el) return;
      var p = clamp((now - cur.t0) / cur.dur, 0, 1); el.style.setProperty('--p', p.toFixed(4));
      el.setAttribute('aria-valuenow', Math.round(p * 100));
      if (p >= 1) return finish(); cur.raf = requestAnimationFrame(step);
    })(performance.now());
  }
  function finish() {
    var el = cur.el; cur.done = true; cancelAnimationFrame(cur.raf); cur = null;
    el.classList.remove('is-holding'); el.classList.add('is-done'); label(el, 'done'); Sensory.fire('confirm');
    emit(el, 'br-confirm', { el: el });
    setTimeout(function () { el.classList.remove('is-done'); el.classList.add('is-releasing'); el.style.setProperty('--p', 0); label(el, 'idle'); }, 1100);
  }
  function stop() {
    if (!cur) return; var el = cur.el; cancelAnimationFrame(cur.raf); cur = null;
    el.classList.remove('is-holding'); el.classList.add('is-releasing'); el.style.setProperty('--p', 0); label(el, 'idle'); el.removeAttribute('aria-valuenow');
    setTimeout(function () { el.classList.remove('is-releasing'); }, 400);
  }
  D.addEventListener('pointerdown', function (e) { var el = e.target.closest && e.target.closest('.br-hold'); if (el && e.button === 0) start(el); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { D.addEventListener(n, function (e) { if (!cur) return; if (n === 'pointerleave' && e.target !== cur.el) return; stop(); }, true); });
  D.addEventListener('keydown', function (e) { var el = e.target.closest && e.target.closest('.br-hold'); if (el && (e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); start(el); } });
  D.addEventListener('keyup', function (e) { if (cur && (e.key === 'Enter' || e.key === ' ')) stop(); });
  D.addEventListener('click', function (e) { var el = e.target.closest && e.target.closest('.br-hold'); if (el) e.preventDefault(); });
  function html(o) {
    o = o || {};
    return '<button type="button" class="br-btn br-btn--danger br-hold' + (o.size ? ' br-btn--' + o.size : '') + '" data-hold="' + (o.ms || '') + '" role="button" aria-label="' + esc(o.aria || 'Press and hold to confirm') + '">' +
      '<svg class="br-hold__ring" viewBox="0 0 20 20" aria-hidden="true"><circle class="t" cx="10" cy="10" r="8"/><circle class="f" cx="10" cy="10" r="8"/></svg>' +
      '<span data-hold-label>' + esc(o.label || VOICE.hold.idle) + '</span></button>';
  }
  return { html: html, start: start, stop: stop };
})();
B.HoldButton = Hold;


/* ───────── fields, sliders, switches ───────── */
var Field = (function () {
  function slider(inp) {
    var p = (inp.value - (inp.min || 0)) / ((inp.max || 100) - (inp.min || 0)) * 100;
    inp.style.setProperty('--fill', p + '%');
    var out = inp.closest('.br-slider') && $('output', inp.closest('.br-slider')); if (out) out.textContent = inp.value + (inp.getAttribute('data-unit') || '');
  }
  D.addEventListener('input', function (e) { if (e.target.matches && e.target.matches('.br-slider input')) { slider(e.target); if (e.isTrusted) Sensory.play('tick'); } });
  D.addEventListener('change', function (e) {
    var t = e.target; if (!t.matches) return;
    if (t.matches('.br-switch input')) Sensory.fire(t.checked ? 'pop' : 'tick');
    if (t.matches('.br-check input,.br-radio input')) Sensory.play('tick');
  });
  function setInvalid(field, msg) { field.setAttribute('data-invalid', msg ? 'true' : 'false'); var m = $('.br-field__msg', field); if (m) m.innerHTML = (msg ? icon('alert', 'br-icon--sm') + '<span>' + esc(msg) + '</span>' : ''); }
  function mount(root) {
    $$('.br-slider input', root).forEach(slider);
    $$('.br-check input[data-indeterminate]', root).forEach(function (i) { i.indeterminate = true; });
  }
  function html(o) {
    o = o || {}; var id = o.id || 'f' + Math.random().toString(36).slice(2, 7);
    return '<label class="br-field' + (o.select ? ' br-field--select' : '') + '" for="' + id + '"><input class="br-field__input" id="' + id + '" placeholder=" " type="' + (o.type || 'text') + '"/><span class="br-field__label">' + esc(o.label || '') + '</span></label>';
  }
  return { mount: mount, setInvalid: setInvalid, html: html, slider: slider };
})();
B.Field = Field; B.Controls = { mount: Field.mount, slider: Field.slider };


/* ───────── tabs with a sliding glass thumb ───────── */
var Tabs = (function () {
  function mount(el) {
    if (el._br) return; el._br = 1;
    el.setAttribute('role', 'tablist');
    var thumb = $('.br-tabs__thumb', el) || el.insertBefore(mk('<span class="br-tabs__thumb"></span>'), el.firstChild);
    var tabs = $$('.br-tabs__tab', el);
    function place(t, instant) {
      thumb.style.transition = instant ? 'none' : ''; thumb.style.width = t.offsetWidth + 'px'; thumb.style.transform = 'translateX(' + t.offsetLeft + 'px)';
      if (instant) { thumb.offsetWidth; thumb.style.transition = ''; }
    }
    function select(t, focus) {
      tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
      place(t); if (focus) t.focus(); Sensory.play('tick'); emit(el, 'br-tab', { id: t.getAttribute('data-id') || t.textContent.trim(), tab: t });
    }
    tabs.forEach(function (t) { t.setAttribute('role', 'tab'); t.addEventListener('click', function () { select(t); }); });
    el.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(D.activeElement); if (i < 0) return;
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
      if (n >= 0) { e.preventDefault(); select(tabs[(n + tabs.length) % tabs.length], true); }
    });
    var first = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    tabs.forEach(function (x) { x.tabIndex = x === first ? 0 : -1; x.setAttribute('aria-selected', x === first); });
    requestAnimationFrame(function () { place(first, true); });
    if (window.ResizeObserver) new ResizeObserver(function () { var s = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0]; if (s) place(s, true); }).observe(el);
  }
  return { mount: mount };
})();
B.Tabs = Tabs;


/* ───────── gem + keycap html helpers ───────── */
B.Gem = { html: function (text, tone, ic) { return '<span class="br-gem" data-tone="' + (tone || '') + '">' + (ic ? icon(ic) : '') + esc(text) + '</span>'; }, icons: { success: 'check', warning: 'alert', danger: 'x', info: 'info' } };
B.Keycap = { html: function (keys) { return '<span class="br-keys">' + String(keys).split(' ').map(function (k) { return '<kbd class="br-key">' + esc(k) + '</kbd>'; }).join('') + '</span>'; } };
B.Glass = { html: function (inner, o) { o = o || {}; return '<div class="br-glass' + (o.strong ? ' br-glass--strong' : '') + (o.pad === false ? '' : ' br-glass--pad') + '">' + inner + '</div>'; } };

/* ───────── natural dates: type "next friday 3pm" ───────── */
var When = (function () {
  var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  function sod(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function parseTime(s) {
    var m, out = { h: null, m: 0, rest: s };
    if ((m = /\b(?:at\s+)?(noon|midday)\b/.exec(s))) { out.h = 12; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(midnight)\b/.exec(s))) { out.h = 0; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/.exec(s))) { var h = +m[1] % 12; if (m[3] === 'pm') h += 12; out.h = h; out.m = +(m[2] || 0); out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(?:at\s+)?([01]?\d|2[0-3]):([0-5]\d)\b/.exec(s))) { out.h = +m[1]; out.m = +m[2]; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\bat\s+(\d{1,2})\b/.exec(s))) { var hh = +m[1]; if (hh >= 1 && hh <= 7) hh += 12; out.h = hh; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(eod|end of (?:the )?day)\b/.exec(s))) { out.h = 17; out.m = 30; out.rest = s.replace(m[0], ' ') + ' today'; return out; }
    if ((m = /\b(morning)\b/.exec(s))) { out.h = 9; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(afternoon)\b/.exec(s))) { out.h = 14; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(evening)\b/.exec(s))) { out.h = 18; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(tonight)\b/.exec(s))) { out.h = 20; out.rest = s.replace(m[0], ' today '); return out; }
    return out;
  }
  function parse(input, now) {
    now = now || new Date();
    var s = String(input || '').toLowerCase().replace(/[,]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!s) return null;
    var t = parseTime(s); var rest = t.rest.replace(/\s+/g, ' ').trim();
    var today = sod(now), d = null, m;
    if ((m = /^in (\d+|a|an|half an?) ?(min|mins|minutes?|hours?|hrs?|h|days?|d|weeks?|w|months?)$/.exec(rest))) {
      var n = /^(a|an)$/.test(m[1]) ? 1 : /half/.test(m[1]) ? 0.5 : +m[1], u = m[2][0] === 'm' && /^mo/.test(m[2]) ? 'mo' : m[2][0];
      var x = new Date(now);
      if (u === 'm') x = new Date(+now + n * 60000); else if (u === 'h') x = new Date(+now + n * 3600000);
      else if (u === 'd') x = addDays(now, n); else if (u === 'w') x = addDays(now, n * 7); else if (u === 'mo') x.setMonth(x.getMonth() + n);
      return { date: x, hasTime: u === 'm' || u === 'h' || t.h != null ? true : false, fromNow: true };
    }
    if (/^(today|now)?$/.test(rest)) d = (rest === '' && t.h == null) ? null : today;
    else if (/^(tomorrow|tmrw|tmr)$/.test(rest)) d = addDays(today, 1);
    else if (/^(yesterday)$/.test(rest)) d = addDays(today, -1);
    else if (/^(the )?(weekend|this weekend)$/.test(rest)) d = addDays(today, (6 - today.getDay() + 7) % 7 || 7);
    else if (/^(eow|end of (the )?week)$/.test(rest)) d = addDays(today, (5 - today.getDay() + 7) % 7);
    else if (/^next week$/.test(rest)) d = addDays(today, ((8 - today.getDay()) % 7) || 7);
    else if (/^next month$/.test(rest)) { d = new Date(today); d.setMonth(d.getMonth() + 1, 1); }
    else if ((m = /^(next |this |on )?(sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)[a-z]*$/.exec(rest))) {
      var idx = DAYS.map(function (x) { return x.slice(0, 3); }).indexOf(m[2].slice(0, 3));
      var diff = (idx - today.getDay() + 7) % 7; if (diff === 0) diff = 7;
      d = addDays(today, diff);
    } else if ((m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(rest))) d = new Date(+m[1], +m[2] - 1, +m[3]);
    else if ((m = /^(\d{1,2})(?:st|nd|rd|th)? ?([a-z]{3})[a-z]*(?: (\d{4}))?$/.exec(rest)) && MONTHS.indexOf(m[2]) >= 0) d = new Date(m[3] ? +m[3] : today.getFullYear(), MONTHS.indexOf(m[2]), +m[1]);
    else if ((m = /^([a-z]{3})[a-z]* (\d{1,2})(?:st|nd|rd|th)?(?: (\d{4}))?$/.exec(rest)) && MONTHS.indexOf(m[1]) >= 0) d = new Date(m[3] ? +m[3] : today.getFullYear(), MONTHS.indexOf(m[1]), +m[2]);
    else if ((m = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/.exec(rest))) { var yr = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : today.getFullYear(); d = new Date(yr, +m[2] - 1, +m[1]); }
    else return null;
    if (!d) { d = today; if (t.h != null) { var c = new Date(today); c.setHours(t.h, t.m); if (c < now) d = addDays(today, 1); } }
    else if (!/\b\d{4}\b/.test(rest) && d < today && /(\d|[a-z]{3}) ?[a-z]*$/.test(rest) && (MONTHS.indexOf((/[a-z]{3}/.exec(rest) || [''])[0]) >= 0)) d = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    var out = new Date(d); if (t.h != null) out.setHours(t.h, t.m, 0, 0);
    return { date: out, hasTime: t.h != null };
  }
  function fmt(r, now) {
    var d = r.date, f = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }).format(d);
    var t = r.hasTime ? new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d) : '';
    var days = Math.round((sod(d) - sod(now || new Date())) / 864e5);
    var rel = days === 0 ? 'today' : days === 1 ? 'tomorrow' : days === -1 ? 'yesterday' : days > 1 && days < 14 ? 'in ' + days + ' days' : days < 0 ? Math.abs(days) + ' days ago' : '';
    return { day: f, time: t, rel: rel };
  }
  return { parse: parse, format: fmt };
})();
B.When = When;


/* ───────── bloom: overlays that grow out of what you pressed ───────── */
var Bloom = (function () {
  var stack = [];
  function focusables(p) { return $$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', p).filter(function (e) { return e.offsetParent !== null || e === D.activeElement; }); }
  function open(o) {
    var kind = o.kind || 'dialog', trig = o.trigger || D.activeElement;
    var panel = typeof o.panel === 'string' ? mk(o.panel) : o.panel;
    panel.classList.add('br-bloom', 'br-bloom--' + kind);
    panel.setAttribute('role', kind === 'menu' ? 'menu' : 'dialog'); if (kind === 'dialog') panel.setAttribute('aria-modal', 'true');
    var scrim = mk('<div class="br-bloom-scrim' + (kind === 'dialog' ? '' : ' br-bloom-scrim--clear') + '"></div>');
    var host = (trig && trig.closest && trig.closest('.br-stage')) || D.body;
    host.appendChild(scrim); host.appendChild(panel);
    var tr = trig && trig.getBoundingClientRect ? trig.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    var pw = panel.offsetWidth, ph = panel.offsetHeight, left, top;
    if (kind === 'dialog') { left = (innerWidth - pw) / 2; top = Math.max(16, (innerHeight - ph) / 2); panel.style.transform = 'none'; }
    else { left = clamp(tr.left, 8, innerWidth - pw - 8); top = tr.bottom + 8; if (top + ph > innerHeight - 8) top = Math.max(8, tr.top - ph - 8); }
    panel.style.left = left + 'px'; panel.style.top = top + 'px'; if (kind === 'dialog') panel.style.transform = '';
    var ox = tr.left + tr.width / 2 - left, oy = tr.top + tr.height / 2 - top;
    panel.style.setProperty('--ox', ox + 'px'); panel.style.setProperty('--oy', oy + 'px');
    scrim.classList.add('is-in');
    var a = anim(panel, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1)' }], { duration: ms('--dur-slow', 520), easing: SPRING });
    Sensory.play('open');
    var closed = false;
    var h = { panel: panel, close: close };
    function close(result) {
      if (closed) return; closed = true; stack = stack.filter(function (x) { return x !== h; });
      D.removeEventListener('keydown', key, true); scrim.classList.remove('is-in'); Sensory.play('close');
      var b = anim(panel, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.2)' }], { duration: ms('--dur-base', 260), easing: SETTLE });
      b.onfinish = function () { panel.remove(); scrim.remove(); if (trig && trig.focus && trig.isConnected) try { trig.focus({ preventScroll: true }); } catch (e) {} if (o.onClose) o.onClose(result); };
    }
    function key(e) {
      if (stack[stack.length - 1] !== h) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
      var f = focusables(panel);
      if (e.key === 'Tab' && f.length) { var i = f.indexOf(D.activeElement); if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
      if (kind === 'menu' && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); var items = $$('.br-menu__item', panel), j = items.indexOf(D.activeElement); items[(j + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
    }
    D.addEventListener('keydown', key, true);
    scrim.addEventListener('pointerdown', function () { close(); });
    panel.addEventListener('click', function (e) { var c = e.target.closest('[data-br-close]'); if (c) close(c.getAttribute('data-br-close') || true); });
    stack.push(h);
    setTimeout(function () { var f = $('[autofocus]', panel) || $('.br-menu__item', panel) || focusables(panel)[0]; if (f) f.focus({ preventScroll: true }); }, 60);
    return h;
  }
  function confirm(o) {
    return new Promise(function (res) {
      var danger = o.tone === 'danger';
      var p = '<div><h2 class="br-h2 br-bloom__title">' + esc(o.title || 'Are you sure?') + '</h2><p class="br-small" style="margin:0">' + esc(o.body || '') + '</p>' +
        '<div class="br-bloom__actions"><button class="br-btn br-btn--ghost" data-br-close="no">' + esc(o.cancel || 'Never mind') + '</button><button class="br-btn ' + (danger ? 'br-btn--danger' : 'br-btn--primary') + '" data-br-close="yes">' + esc(o.confirm || 'Go on, then') + '</button></div></div>';
      open({ panel: p, kind: 'dialog', trigger: o.trigger, onClose: function (r) { res(r === 'yes'); } });
    });
  }
  function menu(trigger, items) {
    var html = '<div>' + items.map(function (it) { return it === '-' ? '<div class="br-menu__sep"></div>' : '<button class="br-menu__item" role="menuitem" data-br-close="' + esc(it.id) + '"' + (it.tone ? ' data-tone="' + it.tone + '"' : '') + '>' + (it.icon ? icon(it.icon) : '') + '<span>' + esc(it.label) + '</span>' + (it.keys ? B.Keycap.html(it.keys) : '') + '</button>'; }).join('') + '</div>';
    return new Promise(function (res) { open({ panel: html, kind: 'menu', trigger: trigger, onClose: res }); });
  }
  return { open: open, confirm: confirm, menu: menu };
})();
B.Bloom = Bloom;


/* ───────── date field ───────── */
var DateField = (function () {
  function monthGrid(y, m, sel, now) {
    var first = new Date(y, m, 1), start = (first.getDay() + 6) % 7, cells = '';
    var dows = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(function (d) { return '<span class="br-cal__dow">' + d + '</span>'; }).join('');
    for (var i = 0; i < 42; i++) {
      var d = new Date(y, m, 1 - start + i), out = d.getMonth() !== m;
      var isSel = sel && d.toDateString() === sel.toDateString(), isToday = d.toDateString() === now.toDateString();
      cells += '<button type="button" class="br-cal__day" data-d="' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '" aria-pressed="' + !!isSel + '" data-today="' + isToday + '" data-out="' + out + '">' + d.getDate() + '</button>';
    }
    return dows + cells;
  }
  function mount(el) {
    if (el._br) return; el._br = 1;
    var inp = $('.br-field__input', el), res = $('.br-date__resolved', el), btn = $('.br-date__cal', el), val = null;
    function render() {
      var r = When.parse(inp.value); val = r;
      if (!inp.value.trim()) { res.innerHTML = '<span class="br-wit">Try "next friday 3pm", "in 2 weeks", or "5 nov".</span>'; return; }
      if (!r) { res.innerHTML = B.Gem.html('Hmm', 'warning', 'alert') + '<span class="br-wit">Not a date we recognise. Try "tomorrow 9am".</span>'; return; }
      var f = When.format(r);
      res.innerHTML = B.Gem.html('Got it', 'success', 'check') + '<span><b>' + esc(f.day) + '</b>' + (f.time ? ' · ' + esc(f.time) : '') + (f.rel ? ' · <span class="br-wit" style="font-size:13px">' + esc(f.rel) + '</span>' : '') + '</span>';
    }
    inp.addEventListener('input', render);
    inp.addEventListener('change', function () { if (val) emit(el, 'br-date', { date: val.date, hasTime: val.hasTime, iso: val.date.toISOString() }); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && val) { emit(el, 'br-date', { date: val.date, hasTime: val.hasTime, iso: val.date.toISOString() }); Sensory.play('pop'); } });
    if (btn) btn.addEventListener('click', function () {
      var now = new Date(), cur = val ? val.date : now, y = cur.getFullYear(), m = cur.getMonth();
      var panel = mk('<div class="br-cal"><div class="br-cal__head"><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm" aria-label="Previous month" data-n="-1">' + icon('chevron-left') + '</button><span></span><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm" aria-label="Next month" data-n="1">' + icon('chevron-right') + '</button></div><div class="br-cal__grid"></div></div>');
      var h = Bloom.open({ panel: panel, kind: 'pop', trigger: btn });
      function draw() { $('.br-cal__head span', panel).textContent = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(y, m, 1)); $('.br-cal__grid', panel).innerHTML = monthGrid(y, m, val && val.date, now); }
      draw();
      panel.addEventListener('click', function (e) {
        var n = e.target.closest('[data-n]'); if (n) { m += +n.getAttribute('data-n'); if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } draw(); Sensory.play('tick'); return; }
        var d = e.target.closest('[data-d]'); if (d) { var p = d.getAttribute('data-d').split('-'); var dt = new Date(+p[0], +p[1] - 1, +p[2]); inp.value = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(dt); render(); inp.dispatchEvent(new Event('change')); h.close(); Sensory.play('pop'); }
      });
    });
    render();
  }
  return { mount: mount, html: function () { return '<div class="br-date" data-br="date"><label class="br-field"><input class="br-field__input" placeholder=" "/><span class="br-field__label">Due</span></label><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm br-date__cal" aria-label="Open calendar">' + icon('calendar') + '</button><div class="br-date__resolved" aria-live="polite"></div></div>'; } };
})();
B.DateField = DateField;


/* ───────── command bar: Cmd/Ctrl+K does everything ───────── */
var Palette = (function () {
  var items = [], root, input, list, sel = 0, shown = [], recent = [], trig = null;
  function ensure() {
    if (root && root.isConnected) return;
    root = mk('<div class="br-cmd" role="dialog" aria-modal="true" aria-label="Command bar"><div class="br-cmd__scrim"></div><div class="br-cmd__panel"><div class="br-cmd__top">' + icon('search', 'br-icon--lg') + '<input class="br-cmd__input" type="text" placeholder="Go anywhere, do anything…" aria-label="Search commands" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="br-cmd-list"/><kbd class="br-key">Esc</kbd></div><div class="br-cmd__list" id="br-cmd-list" role="listbox"></div><div class="br-cmd__foot"><span>↑ ↓ move</span><span>↵ run</span><span>esc close</span><span style="margin-left:auto">F  hints</span></div></div></div>');
    (D.querySelector('.br-stage') || D.body).appendChild(root);
    input = $('.br-cmd__input', root); list = $('.br-cmd__list', root);
    input.addEventListener('input', function () { sel = 0; render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); run(shown[sel]); } else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Home') { sel = 0; paint(); } else if (e.key === 'End') { sel = shown.length - 1; paint(); }
    });
    $('.br-cmd__scrim', root).addEventListener('pointerdown', close);
    list.addEventListener('pointermove', function (e) { var r = e.target.closest('.br-cmd__item'); if (r) { var i = +r.getAttribute('data-i'); if (i !== sel) { sel = i; paint(); } } });
    list.addEventListener('click', function (e) { var r = e.target.closest('.br-cmd__item'); if (r) run(shown[+r.getAttribute('data-i')]); });
  }
  function score(q, it) {
    var hay = (it.title + ' ' + (it.keywords || '') + ' ' + (it.group || '')).toLowerCase(), t = it.title.toLowerCase(); q = q.toLowerCase();
    if (t.indexOf(q) === 0) return 100 - t.length * 0.1; var ix = t.indexOf(q); if (ix >= 0) return 80 - ix; if (hay.indexOf(q) >= 0) return 50;
    var i = 0, s = 0, last = -2; for (var k = 0; k < t.length && i < q.length; k++) { if (t[k] === q[i]) { s += (k === last + 1 ? 3 : 1) + (k === 0 || t[k - 1] === ' ' ? 2 : 0); last = k; i++; } }
    return i === q.length ? 10 + s : -1;
  }
  function hl(title, q) {
    if (!q) return esc(title); var t = title.toLowerCase(), ix = t.indexOf(q.toLowerCase());
    if (ix >= 0) return esc(title.slice(0, ix)) + '<mark>' + esc(title.slice(ix, ix + q.length)) + '</mark>' + esc(title.slice(ix + q.length));
    var out = '', i = 0, ql = q.toLowerCase(); for (var k = 0; k < title.length; k++) { if (i < ql.length && t[k] === ql[i]) { out += '<mark>' + esc(title[k]) + '</mark>'; i++; } else out += esc(title[k]); } return out;
  }
  function render() {
    var q = input.value.trim(), groups = {}, order = [];
    var pool = items.filter(function (it) { return !it.when || it.when(); });
    if (q) { shown = pool.map(function (it) { return { it: it, s: score(q, it) }; }).filter(function (x) { return x.s >= 0; }).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.it; }); }
    else { var rc = recent.map(function (id) { return pool.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean).slice(0, 3); shown = rc.concat(pool.filter(function (p) { return rc.indexOf(p) < 0; })); }
    var html = '', lastG = null;
    shown.forEach(function (it, i) {
      var g = q ? (i === 0 ? 'Best match' : (it.group || 'Other')) : (recent.indexOf(it.id) >= 0 && i < 3 ? 'Recent' : (it.group || 'Other'));
      if (g !== lastG) { html += '<div class="br-cmd__group br-label" role="presentation">' + esc(g) + '</div>'; lastG = g; }
      html += '<div class="br-cmd__item" role="option" id="br-cmd-' + i + '" data-i="' + i + '" aria-selected="false">' + icon(it.icon || 'sparkle') + '<div class="br-cmd__title">' + hl(it.title, q) + (it.hint ? '<small>' + esc(it.hint) + '</small>' : '') + '</div>' + (it.keys ? B.Keycap.html(it.keys) : '') + '</div>';
    });
    if (!shown.length) html = '<div class="br-cmd__empty"><p class="br-h3" style="margin:0 0 4px">Nothing by that name.</p><p class="br-wit" style="margin:0">Not even a rumour.</p></div>';
    list.innerHTML = html; paint();
  }
  function paint() {
    $$('.br-cmd__item', list).forEach(function (r) { var on = +r.getAttribute('data-i') === sel; r.setAttribute('aria-selected', on); if (on) { input.setAttribute('aria-activedescendant', r.id); r.scrollIntoView({ block: 'nearest' }); } });
  }
  function move(n) { if (!shown.length) return; sel = (sel + n + shown.length) % shown.length; paint(); Sensory.play('tick'); }
  function run(it) { if (!it) return; recent = [it.id].concat(recent.filter(function (x) { return x !== it.id; })).slice(0, 6); close(); setTimeout(function () { if (it.run) it.run(); }, 140); }
  function open() {
    ensure(); trig = D.activeElement; root.classList.add('is-open'); input.value = ''; sel = 0; render();
    requestAnimationFrame(function () { root.classList.add('is-in'); input.focus(); }); Sensory.play('open'); emit(root, 'br-palette', { open: true });
  }
  function close() { if (!root || !root.classList.contains('is-open')) return; root.classList.remove('is-in'); Sensory.play('close'); setTimeout(function () { root.classList.remove('is-open'); if (trig && trig.focus) try { trig.focus({ preventScroll: true }); } catch (e) {} }, rm() ? 1 : 220); }
  function toggle() { if (root && root.classList.contains('is-open')) close(); else open(); }
  Keys.on('mod+k', function () { toggle(); }, { inInputs: true });
  return { register: function (arr) { items = items.concat(arr); return Palette; }, set: function (arr) { items = arr; return Palette; }, open: open, close: close, toggle: toggle, items: function () { return items; } };
})();
B.CommandBar = Palette; B.palette = Palette;


/* ───────── hint overlay: press F, then a letter, to click anything ───────── */
var Hints = (function () {
  var on = false, layer, typed = '', targets = [], ALPHA = 'asdfjklgh';
  var SEL = 'a[href],button:not([disabled]),input:not([type=hidden]):not([disabled]),select,textarea,summary,[role=button],[role=tab],[role=menuitem],[data-br-hint],[tabindex]:not([tabindex="-1"])';
  function labels(n) {
    if (n <= ALPHA.length) return ALPHA.split('').slice(0, n);
    var out = []; for (var i = 0; i < ALPHA.length && out.length < n; i++) for (var j = 0; j < ALPHA.length && out.length < n; j++) out.push(ALPHA[i] + ALPHA[j]);
    return out;
  }
  function collect() {
    var seen = [];
    return $$(SEL).filter(function (el) { if (el.closest('.br-hints') || el.closest('[inert]')) return false; if (el.matches('input[type=checkbox],input[type=radio],input[type=range]') && el.closest('label')) { el = el.closest('label'); } if (seen.indexOf(el) >= 0) return false; seen.push(el); return visible(el); }).filter(function (el, i, a) { return a.indexOf(el) === i; });
  }
  function start() {
    if (on) return; targets = collect(); if (!targets.length) return; on = true; typed = '';
    layer = mk('<div class="br-hints" aria-hidden="true"><div class="br-hints__veil"></div><div class="br-hints__bar">' + icon('keyboard') + '<span>Type a letter to jump</span><kbd class="br-key">Esc</kbd></div></div>');
    (D.querySelector('.br-stage') || D.body).appendChild(layer);
    var L = labels(targets.length);
    targets = targets.map(function (el, i) {
      var r = el.getBoundingClientRect(), h = mk('<span class="br-hint" data-k="' + L[i] + '"></span>');
      h.style.left = clamp(r.left - 4, 4, innerWidth - 40) + 'px'; h.style.top = clamp(r.top - 10, 4, innerHeight - 24) + 'px'; h.style.animationDelay = Math.min(i * 12, 240) + 'ms'; layer.appendChild(h);
      return { el: el, k: L[i], h: h };
    });
    paint(); Sensory.play('open');
  }
  function paint() { targets.forEach(function (t) { var m = t.k.indexOf(typed) === 0; t.h.style.display = m ? '' : 'none'; t.h.innerHTML = '<span class="typed">' + esc(t.k.slice(0, typed.length)) + '</span><b>' + esc(t.k.slice(typed.length)) + '</b>'; }); }
  function stop() { if (!on) return; on = false; if (layer) layer.remove(); layer = null; targets = []; }
  function fire(t) {
    stop(); var el = t.el; Sensory.fire('pop');
    var inp = el.matches('input,textarea,select') ? el : null; if (inp && !inp.matches('[type=checkbox],[type=radio],[type=range],[type=button],[type=submit]')) { inp.focus(); return; }
    el.focus && el.focus({ preventScroll: true }); el.click();
  }
  D.addEventListener('keydown', function (e) {
    if (on) {
      if (e.key === 'Escape') { e.preventDefault(); stop(); return; }
      if (e.key === 'Backspace') { e.preventDefault(); typed = typed.slice(0, -1); paint(); return; }
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) { e.preventDefault(); e.stopPropagation(); var n = typed + e.key.toLowerCase(); var m = targets.filter(function (t) { return t.k.indexOf(n) === 0; }); if (!m.length) { Sensory.play('error'); return; } typed = n; if (m.length === 1 && m[0].k === n) fire(m[0]); else paint(); }
      return;
    }
    if (e.key === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey && !editing(e.target) && !D.querySelector('.br-bloom,.br-cmd.is-open')) { e.preventDefault(); start(); }
  }, true);
  addEventListener('scroll', stop, true); addEventListener('resize', stop);
  return { start: start, stop: stop, toggle: function () { on ? stop() : start(); }, active: function () { return on; } };
})();
B.HintOverlay = Hints; B.hints = Hints;


/* ───────── island: a toast that morphs ───────── */
var Island = (function () {
  var host, cur = null, queue = [];
  function ensureHost() { if (host && host.isConnected) return host; host = mk('<div class="br-island-host" role="status" aria-live="polite"></div>'); (D.querySelector('.br-stage') || D.body).appendChild(host); return host; }
  var ICON = { success: 'check', danger: 'x', warning: 'alert', info: 'info' }, SOUND = { success: 'success', danger: 'error', warning: 'error', info: 'pop' };
  function fit(el) { var inner = $('.br-island__inner', el); el.style.width = inner.offsetWidth + 'px'; el.style.height = inner.offsetHeight + 'px'; }
  function show(o) {
    o = typeof o === 'string' ? { title: o } : o;
    if (cur) { queue.push(o); return { update: function () {}, close: function () {} }; }
    ensureHost();
    var tone = o.tone || 'info', rich = !!(o.detail || (o.actions && o.actions.length));
    var el = mk('<div class="br-island is-enter" data-state="compact" data-tone="' + tone + '"' + (tone === 'danger' ? ' role="alert"' : '') + '><div class="br-island__inner"><div class="br-island__head"><span class="br-island__gem">' + icon(o.icon || ICON[tone] || 'sparkle', 'br-icon--sm') + '</span><span class="br-island__title"></span></div><div class="br-island__detail"></div><div class="br-island__bar"><i></i></div><div class="br-island__actions"></div></div></div>');
    $('.br-island__title', el).textContent = o.title || ''; $('.br-island__detail', el).textContent = o.detail || '';
    (o.actions || []).forEach(function (a) { var b = mk('<button type="button" class="br-btn br-btn--sm' + (a.primary ? ' br-btn--primary' : '') + '">' + esc(a.label) + '</button>'); b.addEventListener('click', function () { if (a.onClick) a.onClick(); h.close(); }); $('.br-island__actions', el).appendChild(b); });
    if (o.progress != null) { el.setAttribute('data-progress', 'true'); el.style.setProperty('--p', o.progress + '%'); }
    host.appendChild(el); cur = el; fit(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove('is-enter'); }); });
    Sensory.fire(SOUND[tone] || 'pop');
    var timer = 0, hover = false;
    function arm(ms2) { clearTimeout(timer); if (o.sticky || o.progress != null && o.progress < 100) return; timer = setTimeout(function () { if (hover) arm(1200); else h.close(); }, ms2); }
    function expand() { if (!el.isConnected || el.getAttribute('data-state') === 'open') return; el.setAttribute('data-state', 'open'); requestAnimationFrame(function () { fit(el); }); }
    if (rich) setTimeout(expand, o.open ? 30 : rm() ? 30 : 650);
    arm(o.duration || (rich ? 5600 : 2800));
    el.addEventListener('pointerenter', function () { hover = true; if (!rich) expand(); }); el.addEventListener('pointerleave', function () { hover = false; });
    var h = {
      el: el,
      update: function (u) {
        if (u.title != null) $('.br-island__title', el).textContent = u.title;
        if (u.detail != null) { $('.br-island__detail', el).textContent = u.detail; if (u.detail) expand(); }
        if (u.progress != null) { el.setAttribute('data-progress', 'true'); el.style.setProperty('--p', u.progress + '%'); if (u.progress >= 100) arm(1800); }
        if (u.tone) { el.setAttribute('data-tone', u.tone); $('.br-island__gem', el).innerHTML = icon(ICON[u.tone] || 'sparkle', 'br-icon--sm'); Sensory.fire(SOUND[u.tone] || 'pop'); }
        requestAnimationFrame(function () { fit(el); });
      },
      close: function () {
        clearTimeout(timer); if (el._closed) return; el._closed = true; el.classList.add('is-leave');
        setTimeout(function () { el.remove(); cur = null; if (queue.length) show(queue.shift()); }, rm() ? 1 : 340);
      }
    };
    return h;
  }
  return { show: show, toast: function (key, extra) { var t = VOICE.toast[key] || { title: key }; var o = {}; for (var k in t) o[k] = t[k]; for (var j in extra || {}) o[j] = extra[j]; return show(o); } };
})();
B.Island = Island; B.toast = Island.toast;

/* ───────── orb: breathing loader with commentary ───────── */
var Orb = (function () {
  function mount(el, o) {
    if (el._br) return el._br; o = o || {};
    var lines = o.lines || (el.getAttribute('data-lines') ? el.getAttribute('data-lines').split('|') : VOICE.loading);
    el.classList.add('br-orb'); el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
    el.innerHTML = '<span class="br-orb__ball"></span><span class="br-orb__line"></span>';
    var line = $('.br-orb__line', el), i = Math.floor(Math.random() * lines.length), t = 0;
    function say() { line.classList.add('is-out'); setTimeout(function () { line.textContent = lines[i++ % lines.length]; line.classList.remove('is-out'); }, rm() ? 1 : 240); }
    line.textContent = lines[i++ % lines.length]; t = setInterval(function () { if (!el.isConnected) return clearInterval(t); say(); }, o.interval || 2600);
    el._br = { stop: function () { clearInterval(t); }, say: function (s) { lines = [s]; i = 0; say(); } }; return el._br;
  }
  return { mount: mount, html: function (size) { return '<div class="br-orb' + (size ? ' br-orb--' + size : '') + '" data-br="orb"></div>'; } };
})();
B.Orb = Orb;


/* ───────── progress ───────── */
var Progress = (function () {
  function set(el, pct) { pct = clamp(pct, 0, 100); el.style.setProperty('--p', el.classList.contains('br-ring') ? (pct / 100) : pct + '%'); el.setAttribute('aria-valuenow', Math.round(pct)); var o = $('[data-out]', el); if (o) o.textContent = Math.round(pct) + '%'; }
  var defs = false;
  function ensureDefs() { if (defs || $('#br-ring-grad')) return; defs = true; D.body.appendChild(mk('<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="br-ring-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--grad-start)"/><stop offset="1" style="stop-color:var(--grad-end)"/></linearGradient></defs></svg>')); }
  return {
    set: set,
    bar: function (label, pct) { return '<div class="br-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="' + esc(label) + '" style="--p:' + pct + '%"><div class="br-progress__top"><span>' + esc(label) + '</span><span data-out>' + pct + '%</span></div><div class="br-progress__track"><span class="br-progress__fill"></span></div></div>'; },
    ring: function (pct) { ensureDefs(); return '<div class="br-ring" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" style="--p:' + (pct / 100) + '"><svg viewBox="0 0 84 84"><circle class="t" cx="42" cy="42" r="36"/><circle class="f" cx="42" cy="42" r="36"/></svg><b data-out>' + pct + '%</b></div>'; },
    ensureDefs: ensureDefs
  };
})();
B.Progress = Progress;


/* ───────── empty states with illustrations ───────── */
var ART = {
  teapot: '<ellipse class="v" cx="96" cy="98" rx="52" ry="38"/><g class="bob"><path class="l" d="M52 94c0-22 20-36 46-36s46 14 46 36c0 20-18 34-46 34S52 114 52 94z"/><path class="l" d="M74 64c4-8 12-12 24-12s20 4 24 12"/><circle class="l" cx="98" cy="47" r="4"/><path class="l" d="M141 82l20-18 4 6-19 17"/><path class="l" d="M54 82c-18-4-26 8-22 20s16 12 26 6"/><path class="k" d="M88 38c-6-6 6-10 0-18M104 36c-6-6 6-10 0-18"/></g><path class="l" d="M36 142h128"/>',
  biscuit: '<circle class="s" cx="92" cy="74" r="40"/><circle class="l" cx="92" cy="74" r="34"/><path class="l" d="M118 100l34 34M146 128l10 10"/><circle class="r" cx="92" cy="74" r="15"/><circle class="l" cx="92" cy="74" r="15"/><path class="l" d="M86 70h.01M98 68h.01M92 80h.01"/><path class="k" d="M146 60l4 4-4 4M44 118l4 4"/><path class="l" d="M36 142h128"/>',
  umbrella: '<path class="r" d="M42 62c6 40 34 54 58 54s52-14 58-54c-10 8-22 6-30-4-8 10-18 12-28 12s-20-2-28-12c-8 10-20 12-30 4z"/><path class="l" d="M42 62c6 40 34 54 58 54s52-14 58-54c-10 8-22 6-30-4-8 10-18 12-28 12s-20-2-28-12c-8 10-20 12-30 4z"/><path class="l" d="M100 116v26c0 8 14 8 14-2M60 54l-8-20M100 40V16M140 54l8-20"/><path class="k" d="M26 40v8M172 22v8M18 92v8M180 84v8"/>',
  plug: '<circle class="s" cx="100" cy="82" r="48"/><rect class="l" x="28" y="56" width="46" height="48" rx="14"/><path class="l" d="M60 74h8M60 86h8"/><rect class="l" x="112" y="62" width="44" height="36" rx="12"/><path class="l" d="M112 72h-10M112 88h-10"/><path class="l" d="M156 80c20 0 24 30 8 36s-30 4-30 20"/><path class="k" d="M84 68l6 6-6 6 6 6"/><path class="l" d="M36 142h128"/>',
  cloud: '<path class="s" d="M60 114h84a22 22 0 000-44 30 30 0 00-58-8 26 26 0 00-26 52z"/><path class="l" d="M60 114h84a22 22 0 000-44 30 30 0 00-58-8 26 26 0 00-26 52z"/><path class="l" d="M82 90h.01M110 90h.01M88 100c6 4 14 4 20 0"/><path class="k" d="M150 38h12l-12 14h12M170 24h8l-8 9h8"/>',
  tray: '<circle class="v" cx="100" cy="82" r="50"/><path class="l" d="M36 98l16-42h96l16 42v32H36z"/><path class="l" d="M36 98h42l6 12h32l6-12h42"/><circle class="l" cx="100" cy="72" r="11"/><path class="l" d="M94 70c3 5 9 5 12 0M92 76c4 4 12 4 16 0"/><path class="k" d="M160 40l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>',
  door: '<rect class="v" x="62" y="28" width="76" height="106" rx="8"/><rect class="l" x="64" y="30" width="72" height="104" rx="6"/><path class="l" d="M136 30l24 10v104l-24-10"/><circle class="l" cx="124" cy="84" r="3"/><rect class="r" x="82" y="52" width="36" height="24" rx="4"/><rect class="l" x="82" y="52" width="36" height="24" rx="4"/><path class="l" d="M88 60h24M88 68h14"/><path class="l" d="M36 144h128"/>'
};
B.art = function (n) { return '<svg class="br-empty__art" viewBox="0 0 200 160" role="img" aria-label="' + esc(n) + ' illustration">' + (ART[n] || ART.teapot) + '</svg>'; };
B.artNames = Object.keys(ART);
var EmptyState = {
  html: function (key, o) {
    var v = typeof key === 'string' ? (VOICE.empty[key] || VOICE.empty.tasks) : key; o = o || {};
    return '<div class="br-empty">' + B.art(v.art) + '<h2 class="br-h2 br-empty__title">' + esc(o.title || v.title) + '</h2><p class="br-empty__wit">' + esc(o.wit || v.wit) + '</p>' + (o.noAction ? '' : '<div class="br-empty__actions"><button type="button" class="br-btn br-btn--primary" data-br-act="empty">' + esc(o.action || v.action) + '</button></div>') + '</div>';
  },
  mount: function (el, key, o) { el.innerHTML = EmptyState.html(key, o); }
};
B.EmptyState = EmptyState;


/* ───────── rail ───────── */
var Rail = (function () {
  function mount(el) {
    if (el._br) return; el._br = 1; var t1, t2;
    function set(on) { el.setAttribute('data-expanded', on ? 'true' : 'false'); }
    function pinned() { return el.getAttribute('data-pinned') === 'true'; }
    set(pinned());
    el.addEventListener('pointerenter', function () { if (!fine()) return; clearTimeout(t2); t1 = setTimeout(function () { set(true); }, 140); });
    el.addEventListener('pointerleave', function () { clearTimeout(t1); t2 = setTimeout(function () { if (!pinned()) set(false); }, 220); });
    el.addEventListener('focusin', function () { set(true); });
    el.addEventListener('focusout', function (e) { if (!el.contains(e.relatedTarget) && !pinned()) set(false); });
    el.addEventListener('click', function (e) {
      var pin = e.target.closest('[data-br-pin]'); if (pin) { var p = !pinned(); el.setAttribute('data-pinned', p); set(p); pin.setAttribute('aria-pressed', p); Sensory.play('tick'); return; }
      var it = e.target.closest('.br-rail__item[data-view]'); if (it) { setActive(el, it.getAttribute('data-view')); emit(el, 'br-nav', { view: it.getAttribute('data-view') }); Sensory.play('tick'); }
    });
    Keys.on('[', function () { var p = !pinned(); el.setAttribute('data-pinned', p); set(p); });
  }
  function setActive(el, view) { $$('.br-rail__item[data-view]', el).forEach(function (i) { if (i.getAttribute('data-view') === view) i.setAttribute('aria-current', 'page'); else i.removeAttribute('aria-current'); }); }
  return { mount: mount, setActive: setActive };
})();
B.Rail = Rail;


/* ───────── rows: lift & shuffle ───────── */
var Sortable = (function () {
  function mount(list, o) {
    if (list._br) return; list._br = 1; o = o || {};
    var live = mk('<div class="br-sr" aria-live="polite"></div>'); list.parentNode.insertBefore(live, list.nextSibling);
    function rows() { return $$(':scope > .br-row', list); }
    function flip(before, skip) {
      rows().forEach(function (r) { if (r === skip) return; var b = before.get(r); if (!b) return; var a = r.getBoundingClientRect(), dy = b.top - a.top; if (Math.abs(dy) < 1) return; anim(r, [{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }], { duration: 340, easing: SPRING }); });
    }
    function snap() { var m = new Map(); rows().forEach(function (r) { m.set(r, r.getBoundingClientRect()); }); return m; }
    function say(r) { var rs = rows(); live.textContent = $('.br-row__title', r).textContent + ' moved to position ' + (rs.indexOf(r) + 1) + ' of ' + rs.length; }
    function done(r) { emit(list, 'br-reorder', { order: rows().map(function (x) { return x.getAttribute('data-id') || x.id || $('.br-row__title', x).textContent; }), moved: r }); if (o.onReorder) o.onReorder(rows()); }
    var drag = null;
    list.addEventListener('pointerdown', function (e) {
      var g = e.target.closest('.br-row__grip'); if (!g || e.button) return; var row = g.closest('.br-row'); if (!row || row.parentNode !== list) return;
      e.preventDefault(); g.setPointerCapture(e.pointerId);
      var r = row.getBoundingClientRect(); drag = { row: row, g: g, id: e.pointerId, y0: e.clientY, grab: e.clientY - r.top, dy: 0, on: false };
    });
    list.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return; var d = drag, row = d.row;
      if (!d.on) { if (Math.abs(e.clientY - d.y0) < 4) return; d.on = true; row.classList.add('is-lifted'); list.classList.add('is-dragging'); Sensory.haptic('tick'); Sensory.play('tick'); }
      var nat = row.getBoundingClientRect().top - d.dy, want = e.clientY - d.grab; d.dy = want - nat; row.style.setProperty('--dy', d.dy + 'px');
      var h = row.offsetHeight, c = want + h / 2, rs = rows(), i = rs.indexOf(row), prev = rs[i - 1], next = rs[i + 1], before;
      if (prev) { var pr = prev.getBoundingClientRect(); if (c < pr.top + pr.height / 2) { before = snap(); list.insertBefore(row, prev); flip(before, row); d.dy = want - (row.getBoundingClientRect().top - d.dy); row.style.setProperty('--dy', d.dy + 'px'); Sensory.haptic('tick'); return; } }
      if (next) { var nr = next.getBoundingClientRect(); if (c > nr.top + nr.height / 2) { before = snap(); list.insertBefore(next, row); flip(before, row); d.dy = want - (row.getBoundingClientRect().top - d.dy); row.style.setProperty('--dy', d.dy + 'px'); Sensory.haptic('tick'); } }
    });
    function end(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return; var d = drag; drag = null;
      if (!d.on) return; var row = d.row;
      row.classList.add('is-settling'); row.classList.remove('is-lifted'); row.style.removeProperty('--dy'); list.classList.remove('is-dragging');
      setTimeout(function () { row.classList.remove('is-settling'); }, 560); Sensory.play('pop'); say(row); done(row);
    }
    list.addEventListener('pointerup', end); list.addEventListener('pointercancel', end);
    list.addEventListener('keydown', function (e) {
      if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
      var row = e.target.closest('.br-row'); if (!row) return; e.preventDefault();
      var rs = rows(), i = rs.indexOf(row), j = i + (e.key === 'ArrowUp' ? -1 : 1); if (j < 0 || j >= rs.length) return;
      var before = snap(); if (j < i) list.insertBefore(row, rs[j]); else list.insertBefore(rs[j], row); flip(before); var f = $('.br-row__grip', row) || row; f.focus(); Sensory.play('tick'); say(row); done(row);
    });
  }
  return { mount: mount };
})();
B.Rows = { html: function (o) { o = o || {}; return '<li class="br-row" data-id="' + esc(o.id || '') + '"' + (o.done ? ' data-done="true"' : '') + ' tabindex="-1"><button type="button" class="br-row__grip" aria-label="Drag to reorder. Alt plus arrow keys also work.">' + icon('grip') + '</button><label class="br-check"><input type="checkbox"' + (o.done ? ' checked' : '') + ' aria-label="Done"/><span class="br-check__box"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg></span></label><div class="br-row__main"><div class="br-row__title">' + esc(o.title) + '</div><div class="br-row__meta">' + esc(o.meta || '') + '</div></div><div class="br-row__end">' + (o.gem || '') + '</div></li>'; } };
B.LiftShuffle = Sortable;


/* ───────── lasso select + floating action bar ───────── */
var Lasso = (function () {
  function mount(box, o) {
    if (box._br) return; box._br = 1; o = o || {}; var sel = o.item || '.br-row';
    box.setAttribute('tabindex', '0'); var bar = null, rect = null, st = null;
    function items() { return $$(sel, box); }
    function chosen() { return items().filter(function (i) { return i.getAttribute('aria-selected') === 'true'; }); }
    function ensureBar() {
      if (bar && bar.isConnected) return bar;
      bar = mk('<div class="br-bulk is-hidden" role="toolbar" aria-label="Bulk actions"><span class="br-bulk__count" aria-live="polite"></span><button type="button" class="br-btn br-btn--ghost br-btn--sm" data-act="archive">' + icon('archive', 'br-icon--sm') + 'Archive</button><button type="button" class="br-btn br-btn--sm" data-act="move">' + icon('folder', 'br-icon--sm') + 'Move</button><button type="button" class="br-btn br-btn--danger br-btn--sm br-hold" data-hold="800" aria-label="Press and hold to delete selected"><span data-hold-label data-idle="Hold to delete" data-holding="Keep holding…" data-done="Gone.">Hold to delete</span></button><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm" data-act="clear" aria-label="Clear selection">' + icon('x', 'br-icon--sm') + '</button></div>');
      (o.barHost ? $(o.barHost) : (box.closest('.br-stage') || D.body)).appendChild(bar);
      bar.addEventListener('click', function (e) { var a = e.target.closest('[data-act]'); if (!a) return; var act = a.getAttribute('data-act'); if (act === 'clear') clear(); else { emit(box, 'br-bulk', { action: act, items: chosen() }); if (act === 'archive') clear(); } });
      bar.addEventListener('br-confirm', function () { var c = chosen(); emit(box, 'br-bulk', { action: 'delete', items: c }); c.forEach(function (i) { anim(i, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.9)' }], { duration: 300, easing: SETTLE }).onfinish = function () { i.remove(); sync(); }; }); });
      return bar;
    }
    function sync() { var n = chosen().length; ensureBar(); $('.br-bulk__count', bar).innerHTML = '<b>' + n + '</b> selected'; bar.classList.toggle('is-hidden', n === 0); }
    function set(i, on) { i.setAttribute('aria-selected', on ? 'true' : 'false'); }
    function clear() { items().forEach(function (i) { set(i, false); }); sync(); }
    function overlap(a, b) { return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom); }
    box.addEventListener('pointerdown', function (e) {
      if (e.button || e.target.closest(sel + ' button,' + sel + ' input,' + sel + ' label,[data-br-nolasso],.br-bulk') ) return;
      if (e.target.closest(sel) && !e.shiftKey) return;
      st = { x: e.clientX, y: e.clientY, on: false, add: e.shiftKey || e.metaKey || e.ctrlKey, base: chosen() };
      box.setPointerCapture(e.pointerId);
    });
    box.addEventListener('pointermove', function (e) {
      if (!st) return; var dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!st.on) { if (Math.hypot(dx, dy) < 5) return; st.on = true; rect = mk('<div class="br-lasso"></div>'); (box.closest('.br-stage') || D.body).appendChild(rect); Sensory.play('tick'); }
      var r = { left: Math.min(st.x, e.clientX), top: Math.min(st.y, e.clientY), right: Math.max(st.x, e.clientX), bottom: Math.max(st.y, e.clientY) };
      rect.style.left = r.left + 'px'; rect.style.top = r.top + 'px'; rect.style.width = (r.right - r.left) + 'px'; rect.style.height = (r.bottom - r.top) + 'px';
      items().forEach(function (i) { var hit = overlap(r, i.getBoundingClientRect()); var was = st.add && st.base.indexOf(i) >= 0; var prev = i.getAttribute('aria-selected') === 'true'; set(i, hit || was); if ((hit || was) !== prev) Sensory.haptic('tick'); });
      sync();
    });
    function up() { if (!st) return; var wasDrag = st.on; if (rect) { rect.remove(); rect = null; } if (!wasDrag && !st.add) clear(); st = null; if (wasDrag) sync(); }
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    box.addEventListener('click', function (e) { var it = e.target.closest(sel); if (it && (e.shiftKey || e.metaKey || e.ctrlKey) && !e.target.closest('button,input,label')) { set(it, it.getAttribute('aria-selected') !== 'true'); sync(); Sensory.play('tick'); } });
    box.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') { e.preventDefault(); items().forEach(function (i) { set(i, true); }); sync(); }
      else if (e.key === 'Escape' && chosen().length) { e.preventDefault(); clear(); }
    });
    box._br = { clear: clear, selected: chosen, sync: sync };
  }
  return { mount: mount };
})();
B.Lasso = Lasso;

/* ───────── chart: glow lines, honest marks ───────── */
var Chart = (function () {
  var uid = 0;
  function nice(max) { var p = Math.pow(10, Math.floor(Math.log10(max || 1))), n = max / p; var s = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10; return s * p; }
  function smooth(pts) {
    if (pts.length < 3) return 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join('L');
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, t = 0.18;
      var c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t], c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      d += 'C' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ' ' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }
  function line(el, o) {
    var id = 'brc' + (++uid), W = 640, H = 260, m = { l: 44, r: 70, t: 14, b: 30 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var S = o.series, L = o.labels, n = L.length, fmt = o.format || function (v) { return String(v); };
    var rawMax = Math.max.apply(null, [].concat.apply([], S.map(function (s) { return s.values; }))), ticks = 4;
    if (!isFinite(rawMax) || rawMax <= 0) rawMax = 1;
    var pw = Math.pow(10, Math.floor(Math.log10(rawMax / ticks || 1))), st = rawMax / ticks / pw, step = (st <= 1 ? 1 : st <= 2 ? 2 : st <= 5 ? 5 : 10) * pw, max = step * ticks;
    function X(i) { return m.l + (n === 1 ? iw / 2 : i * iw / (n - 1)); }
    function Y(v) { return m.t + ih - v / max * ih; }
    el.classList.add('br-chart', 'br-glass');
    var sv = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" tabindex="0" aria-label="' + esc(o.title + '. ' + S.map(function (s) { return s.name + ' ends at ' + fmt(s.values[n - 1]); }).join('; ')) + '">';
    sv += '<defs>' + S.map(function (s, k) { return '<linearGradient id="' + id + 'g' + k + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--data-' + (k + 1) + ')" stop-opacity=".16"/><stop offset="1" stop-color="var(--data-' + (k + 1) + ')" stop-opacity="0"/></linearGradient>'; }).join('') + '</defs>';
    for (var t = 0; t <= ticks; t++) { var v = max / ticks * t, y = Y(v); sv += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y + '" y2="' + y + '"/><text x="' + (m.l - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(fmt(v)) + '</text>'; }
    var step = Math.ceil(n / 7); L.forEach(function (l, i) { if (i % step === 0 || i === n - 1) sv += '<text x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(l) + '</text>'; });
    var ends = [];
    S.forEach(function (s, k) {
      var pts = s.values.map(function (v, i) { return [X(i), Y(v)]; }), d = smooth(pts), c = 'var(--data-' + (k + 1) + ')';
      sv += '<path d="' + d + 'L' + X(n - 1) + ' ' + (m.t + ih) + 'L' + X(0) + ' ' + (m.t + ih) + 'Z" fill="url(#' + id + 'g' + k + ')"/>';
      sv += '<path class="ser" d="' + d + '" stroke="' + c + '" pathLength="1" style="filter:drop-shadow(0 0 5px ' + c + ')"/>';
      sv += '<circle class="dot" cx="' + pts[n - 1][0] + '" cy="' + pts[n - 1][1] + '" r="4.5" fill="' + c + '"/>';
      ends.push({ y: pts[n - 1][1], name: s.name });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    var ok = ends.every(function (e, i) { return i === 0 || e.y - ends[i - 1].y >= 15; }) && S.length <= 4;
    if (ok) ends.forEach(function (e) { sv += '<text x="' + (W - m.r + 12) + '" y="' + (e.y + 4) + '" style="fill:var(--ink)">' + esc(e.name) + '</text>'; });
    sv += '<line class="cross" x1="0" x2="0" y1="' + m.t + '" y2="' + (m.t + ih) + '"/>';
    S.forEach(function (s, k) { sv += '<circle class="dot hov" r="4.5" fill="var(--data-' + (k + 1) + ')" style="opacity:0"/>'; });
    sv += '<rect class="hit" x="' + m.l + '" y="0" width="' + iw + '" height="' + H + '" fill="transparent"/></svg>';
    var legend = S.length > 1 ? '<div class="br-chart__legend">' + S.map(function (s, k) { return '<span style="--c:var(--data-' + (k + 1) + ')"><i></i>' + esc(s.name) + '</span>'; }).join('') + '</div>' : '';
    var table = '<table class="br-chart__table"><thead><tr><th>' + esc(o.xLabel || 'When') + '</th>' + S.map(function (s) { return '<th>' + esc(s.name) + '</th>'; }).join('') + '</tr></thead><tbody>' + L.map(function (l, i) { return '<tr><td>' + esc(l) + '</td>' + S.map(function (s) { return '<td>' + esc(fmt(s.values[i])) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
    el.innerHTML = '<div class="br-chart__head"><div><h3 class="br-h3 br-chart__title">' + esc(o.title) + '</h3>' + (o.subtitle ? '<div class="br-small">' + esc(o.subtitle) + '</div>' : '') + legend + '</div><button type="button" class="br-btn br-btn--ghost br-btn--sm" data-tbl aria-pressed="false">View as table</button></div>' + sv + table + '<div class="br-chart__tip"></div>';
    var svg = $('svg', el), tip = $('.br-chart__tip', el), cross = $('.cross', svg), hov = $$('.hov', svg), idx = -1;
    $$('.ser', svg).forEach(function (p, k) { if (rm()) return; p.animate([{ strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDasharray: 1, strokeDashoffset: 0 }], { duration: 1000, delay: k * 120, easing: SETTLE, fill: 'both' }); });
    function at(i) {
      i = clamp(i, 0, n - 1); if (i === idx) return; idx = i; el.classList.add('is-hover');
      cross.setAttribute('x1', X(i)); cross.setAttribute('x2', X(i)); S.forEach(function (s, k) { hov[k].setAttribute('cx', X(i)); hov[k].setAttribute('cy', Y(s.values[i])); hov[k].style.opacity = 1; });
      tip.innerHTML = '<div class="br-label">' + esc(L[i]) + '</div><dl>' + S.map(function (s, k) { return '<dt style="--c:var(--data-' + (k + 1) + ')"><i></i>' + esc(s.name) + '</dt><dd>' + esc(fmt(s.values[i])) + '</dd>'; }).join('') + '</dl>';
      var sb = svg.getBoundingClientRect(), eb = el.getBoundingClientRect(), px = (X(i) / W) * sb.width + (sb.left - eb.left);
      tip.style.left = clamp(px, 90, eb.width - 90) + 'px'; tip.style.top = (sb.top - eb.top + 8) + 'px';
    }
    function leave() { idx = -1; el.classList.remove('is-hover'); hov.forEach(function (h) { h.style.opacity = 0; }); }
    $('.hit', svg).addEventListener('pointermove', function (e) { var sb = svg.getBoundingClientRect(), x = (e.clientX - sb.left) / sb.width * W; at(Math.round((x - m.l) / iw * (n - 1))); });
    $('.hit', svg).addEventListener('pointerleave', leave);
    svg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); at((idx < 0 ? -1 : idx) + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); at((idx < 0 ? n : idx) - 1); } else if (e.key === 'Escape') leave(); });
    svg.addEventListener('blur', leave);
    $('[data-tbl]', el).addEventListener('click', function (e) { var on = el.classList.toggle('show-table'); e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'View as chart' : 'View as table'; });
  }
  return { line: line };
})();
B.Chart = Chart;


/* ───────── view transitions: morph for drill-ins, depth push for peers ───────── */
var View = (function () {
  var has = !!D.startViewTransition;
  function go(update, o) {
    o = o || {}; var kind = o.kind || 'push';
    if (!has || rm()) { update(); return Promise.resolve(); }
    ROOT.setAttribute('data-br-nav', kind === 'morph' ? 'morph' : kind);
    if (o.source) o.source.style.viewTransitionName = 'br-morph';
    var vt = D.startViewTransition(function () {
      if (o.source) o.source.style.viewTransitionName = '';
      update();
      var t = typeof o.target === 'function' ? o.target() : o.target; if (t) t.style.viewTransitionName = 'br-morph';
    });
    return vt.finished.catch(function () {}).then(function () { ROOT.removeAttribute('data-br-nav'); var t = typeof o.target === 'function' ? o.target() : o.target; if (t) t.style.viewTransitionName = ''; });
  }
  function swap(host, node, o) {
    o = o || {};
    if (has && !rm()) return go(function () { host.replaceChildren(node); }, o);
    var old = host.firstElementChild; node.classList.add('br-view'); node.setAttribute('data-dir', o.kind === 'pop' ? 'back' : 'fwd');
    if (old && !rm()) { old.classList.add('is-leaving'); return new Promise(function (r) { setTimeout(function () { host.replaceChildren(node); r(); }, 200); }); }
    host.replaceChildren(node); return Promise.resolve();
  }
  return { go: go, swap: swap, supported: has };
})();
B.Transitions = View; B.view = View;


/* ───────── follows the sun ───────── */
var Sun = (function () {
  var timer = 0, mode = store('sun') || 'auto';
  var BANDS = [
    { id: 'dawn', from: 5, to: 10, name: 'Dawn', wit: 'Kettle hour. Nobody speak.' },
    { id: 'noon', from: 10, to: 16.5, name: 'Noon', wit: 'Peak productivity, allegedly.' },
    { id: 'dusk', from: 16.5, to: 20.5, name: 'Dusk', wit: 'The golden hour, for anything that is not a spreadsheet.' },
    { id: 'night', from: 20.5, to: 29, name: 'Night', wit: 'Dark mode, as nature intended.' }
  ];
  function band(h) { var x = h < 5 ? h + 24 : h; return BANDS.filter(function (b) { return x >= b.from && x < b.to; })[0] || BANDS[3]; }
  function hours(d) { d = d || new Date(); return d.getHours() + d.getMinutes() / 60; }
  function apply(id, soft) {
    if (ROOT.getAttribute('data-theme') === id) return;
    var run = function () { ROOT.setAttribute('data-theme', id); };
    if (soft !== false && D.startViewTransition && !rm()) { ROOT.setAttribute('data-br-nav', 'fade'); D.startViewTransition(run).finished.catch(function () {}).then(function () { ROOT.removeAttribute('data-br-nav'); }); } else run();
    emit(D, 'br-theme', { theme: id });
  }
  function tick() { if (mode === 'auto') apply(band(hours()).id); }
  return {
    bands: BANDS, band: band, hours: hours, apply: apply,
    set: function (m) { mode = m; store('sun', m); if (m === 'auto') tick(); else apply(m); },
    mode: function () { return mode; },
    start: function () { tick(); clearInterval(timer); timer = setInterval(tick, 60000); },
    stop: function () { clearInterval(timer); }
  };
})();
B.SunTheme = Sun; B.sun = Sun;


/* ───────── greetings with opinions ───────── */
var Greet = (function () {
  var last = '';
  var BANDS = [
    [[0, 5], 'Still up, {n}?', ['Bold choice. The tasks will still be here, sadly.', 'Nothing good happens after 2am, apart from deploys, apparently.', 'Sleep is a feature. You might want to enable it.']],
    [[5, 9], 'Morning, {n}.', ['Up before the kettle. Terrifying.', 'Tea first. Productivity second. Rules are rules.', 'The early bird gets the worm. The worm, one imagines, had objections.']],
    [[9, 12], 'Good morning, {n}.', ["Let's pretend we have this under control.", 'Plenty of day left to disappoint yourself in.', 'Coffee is a valid first task.']],
    [[12, 14], 'Afternoon-ish, {n}.', ['Lunch is also a task. Do consider it.', 'Technically still morning somewhere. Not here.', 'A sandwich would fix at least three of these problems.']],
    [[14, 17], 'Afternoon, {n}.', ['Peak slump. A biscuit is strongly advised.', 'The afternoon: nature\'s way of testing resolve.', 'Almost there. "There" being a nebulous concept.']],
    [[17, 21], 'Evening, {n}.', ['Technically off the clock. Spiritually, too.', 'Whatever is left can wait. Probably. Possibly.', 'Ah, the traditional hour of ambitious plans.']],
    [[21, 24], 'Late one, {n}.', ['Any more tasks and we shall start charging overtime.', 'The day has been good to you. Mostly. Go to bed.', 'Last one, then. And you do not mean it.']]
  ];
  function line(name, o) {
    o = o || {}; var h = o.now ? o.now.getHours() : new Date().getHours(), b = BANDS.filter(function (x) { return h >= x[0][0] && h < x[0][1]; })[0] || BANDS[0];
    var wit;
    if (o.left === 0) wit = 'Nothing left. Suspiciously efficient.';
    else if (o.left > 12) wit = o.left + ' to go. Ambitious. Optimistic, even.';
    else if (o.done > 4 && o.left < 5) wit = 'Look at you, being productive in public.';
    else wit = pick(b[2], last);
    last = wit; return { hi: b[1].replace('{n}', name || 'you'), wit: wit, name: name || 'you' };
  }
  return { line: line, html: function (name, o) { var g = line(name, o); return '<div class="br-greeting"><h2 class="br-greeting__hi">' + esc(g.hi).replace(esc(g.name), '<em>' + esc(g.name) + '</em>') + '</h2><p class="br-wit br-body-lg" style="margin:0">' + esc(g.wit) + '</p></div>'; } };
})();


/* ───────── celebrate: tasteful, brief, a little smug ───────── */
var Celebrate = (function () {
  var cv, ctx2, parts = [], raf = 0;
  function colors() { return ['--grad-start', '--grad-end', '--aurora-sky', '--aurora-violet', '--aurora-rose', '--data-2'].map(function (v) { return cssVar(v); }); }
  function loop(t) {
    ctx2.clearRect(0, 0, cv.width, cv.height); var now = performance.now();
    parts = parts.filter(function (p) { return now - p.t0 < p.life; });
    parts.forEach(function (p) {
      var a = (now - p.t0) / 1000; p.vy += 900 * 0.016; p.vx *= 0.985; p.x += p.vx * 0.016; p.y += p.vy * 0.016; p.r += p.vr * 0.016;
      var k = 1 - (now - p.t0) / p.life; ctx2.save(); ctx2.globalAlpha = Math.min(1, k * 2); ctx2.translate(p.x, p.y); ctx2.rotate(p.r); ctx2.fillStyle = p.c;
      if (p.s) ctx2.fillRect(-p.z / 2, -p.z / 3, p.z, p.z * 0.66); else { ctx2.beginPath(); ctx2.arc(0, 0, p.z / 2.4, 0, 6.3); ctx2.fill(); }
      ctx2.restore();
    });
    raf = parts.length ? requestAnimationFrame(loop) : 0; if (!raf) cv.remove();
  }
  function burst(o) {
    o = o || {}; Sensory.fire('success');
    if (o.stage !== false) Aurora.flare(o.stage instanceof Element ? o.stage : null, 1800);
    if (rm()) return;
    if (!cv || !cv.isConnected) { cv = mk('<canvas class="br-confetti" aria-hidden="true"></canvas>'); (D.querySelector('.br-stage') || D.body).appendChild(cv); }
    var dpr = devicePixelRatio || 1; cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx2 = cv.getContext('2d'); ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cs = colors(), n = o.count || 46, x = o.x == null ? innerWidth / 2 : o.x, y = o.y == null ? innerHeight * 0.45 : o.y, t0 = performance.now();
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + (Math.random() - 0.5) * 2.1, v = 260 + Math.random() * 420; parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 12, z: 6 + Math.random() * 8, c: cs[i % cs.length], s: Math.random() > 0.4, t0: t0, life: 1500 + Math.random() * 700 }); }
    if (!raf) raf = requestAnimationFrame(loop);
  }
  return { burst: burst, done: function (el, msg) { var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null; burst({ x: r ? r.left + r.width / 2 : null, y: r ? r.top + r.height / 2 : null }); if (msg !== false) Island.toast('done'); } };
})();


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


/* ───────── layout helpers ───────── */
B.Layout = { tile: function (inner, span, extra) { return '<section class="br-tile br-span-' + (span || 4) + (extra ? ' ' + extra : '') + '">' + inner + '</section>'; } };


/* ───────── init: wire everything that is in the page ───────── */
B.init = function (root) {
  root = root || D;
  var stage = root.querySelector ? (root.matches && root.matches('.br-stage') ? root : root.querySelector('.br-stage')) : null;
  if (stage && stage.getAttribute('data-aurora') !== 'off') Aurora.mount(stage);
  Field.mount(root);
  $$('[data-br="tabs"],.br-tabs', root).forEach(Tabs.mount);
  $$('[data-br="orb"]', root).forEach(function (e) { Orb.mount(e); });
  $$('[data-br="date"]', root).forEach(DateField.mount);
  $$('.br-rail', root).forEach(Rail.mount);
  $$('[data-br="sortable"]', root).forEach(function (e) { Sortable.mount(e); });
  $$('[data-br="lasso"]', root).forEach(function (e) { Lasso.mount(e); });
  Progress.ensureDefs();
  return B;
};


if (typeof window !== 'undefined') window.Brolly = B;
export default B;
export { B as Brolly };
