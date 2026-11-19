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

