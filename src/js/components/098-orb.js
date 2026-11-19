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

