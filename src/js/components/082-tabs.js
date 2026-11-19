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

