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

