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
