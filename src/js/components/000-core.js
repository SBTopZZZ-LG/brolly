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

