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

