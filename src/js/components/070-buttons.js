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

