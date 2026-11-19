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

