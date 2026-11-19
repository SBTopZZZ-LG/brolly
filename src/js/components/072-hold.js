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

