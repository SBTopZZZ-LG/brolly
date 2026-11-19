/* ───────── follows the sun ───────── */
var Sun = (function () {
  var timer = 0, mode = store('sun') || 'auto';
  var BANDS = [
    { id: 'dawn', from: 5, to: 10, name: 'Dawn', wit: 'Kettle hour. Nobody speak.' },
    { id: 'noon', from: 10, to: 16.5, name: 'Noon', wit: 'Peak productivity, allegedly.' },
    { id: 'dusk', from: 16.5, to: 20.5, name: 'Dusk', wit: 'The golden hour, for anything that is not a spreadsheet.' },
    { id: 'night', from: 20.5, to: 29, name: 'Night', wit: 'Dark mode, as nature intended.' }
  ];
  function band(h) { var x = h < 5 ? h + 24 : h; return BANDS.filter(function (b) { return x >= b.from && x < b.to; })[0] || BANDS[3]; }
  function hours(d) { d = d || new Date(); return d.getHours() + d.getMinutes() / 60; }
  function apply(id, soft) {
    if (ROOT.getAttribute('data-theme') === id) return;
    var run = function () { ROOT.setAttribute('data-theme', id); };
    if (soft !== false && D.startViewTransition && !rm()) { ROOT.setAttribute('data-br-nav', 'fade'); D.startViewTransition(run).finished.catch(function () {}).then(function () { ROOT.removeAttribute('data-br-nav'); }); } else run();
    emit(D, 'br-theme', { theme: id });
  }
  function tick() { if (mode === 'auto') apply(band(hours()).id); }
  return {
    bands: BANDS, band: band, hours: hours, apply: apply,
    set: function (m) { mode = m; store('sun', m); if (m === 'auto') tick(); else apply(m); },
    mode: function () { return mode; },
    start: function () { tick(); clearInterval(timer); timer = setInterval(tick, 60000); },
    stop: function () { clearInterval(timer); }
  };
})();
B.SunTheme = Sun; B.sun = Sun;

