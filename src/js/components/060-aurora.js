/* ───────── aurora: drifts on its own, leans toward you ───────── */
var Aurora = (function () {
  var live = [], raf = 0, px = 0.5, py = 0.5;
  function build() { return mk('<div class="br-aurora" aria-hidden="true"><span class="br-aurora__blob" data-i="1"><i></i></span><span class="br-aurora__blob" data-i="2"><i></i></span><span class="br-aurora__blob" data-i="3"><i></i></span></div>'); }
  function tick() {
    raf = 0; var more = false;
    live.forEach(function (a) {
      if (!a.el.isConnected) return;
      a.blobs.forEach(function (b, i) {
        var k = [70, -90, 60][i];
        var tx = (px - 0.5) * k * (a.react ? 1 : 0), ty = (py - 0.5) * k * 0.7 * (a.react ? 1 : 0);
        b.x += (tx - b.x) * 0.045; b.y += (ty - b.y) * 0.045;
        if (Math.abs(tx - b.x) > 0.05 || Math.abs(ty - b.y) > 0.05) more = true;
        b.el.style.setProperty('--ox', b.x.toFixed(2) + 'px'); b.el.style.setProperty('--oy', b.y.toFixed(2) + 'px');
      });
    });
    if (more) raf = requestAnimationFrame(tick);
  }
  D.addEventListener('pointermove', function (e) { px = e.clientX / innerWidth; py = e.clientY / innerHeight; if (!raf && !rm()) raf = requestAnimationFrame(tick); }, { passive: true });
  function mount(stage) {
    stage = stage || $('.br-stage') || D.body;
    var el = $('.br-aurora', stage);
    if (!el) { el = build(); stage.insertBefore(el, stage.firstChild); }
    if (el._br) return el._br;
    var a = { el: el, react: stage.getAttribute('data-aurora') !== 'static', blobs: $$('.br-aurora__blob', el).map(function (b) { return { el: b, x: 0, y: 0 }; }) };
    el._br = a; live.push(a);
    if (stage.getAttribute('data-aurora') === 'static') el.setAttribute('data-static', '');
    return a;
  }
  function setMood(m, stage) { var a = mount(stage); a.el.setAttribute('data-mood', m || 'calm'); }
  function flare(stage, ms2) { var a = mount(stage); var prev = a.el.getAttribute('data-mood') || 'calm'; a.el.setAttribute('data-mood', 'joy'); setTimeout(function () { a.el.setAttribute('data-mood', prev); }, ms2 || 1800); }
  return { mount: mount, mood: setMood, flare: flare, html: build };
})();
B.Aurora = Aurora;

