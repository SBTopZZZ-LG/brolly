/* ───────── date field ───────── */
var DateField = (function () {
  function monthGrid(y, m, sel, now) {
    var first = new Date(y, m, 1), start = (first.getDay() + 6) % 7, cells = '';
    var dows = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(function (d) { return '<span class="br-cal__dow">' + d + '</span>'; }).join('');
    for (var i = 0; i < 42; i++) {
      var d = new Date(y, m, 1 - start + i), out = d.getMonth() !== m;
      var isSel = sel && d.toDateString() === sel.toDateString(), isToday = d.toDateString() === now.toDateString();
      cells += '<button type="button" class="br-cal__day" data-d="' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '" aria-pressed="' + !!isSel + '" data-today="' + isToday + '" data-out="' + out + '">' + d.getDate() + '</button>';
    }
    return dows + cells;
  }
  function mount(el) {
    if (el._br) return; el._br = 1;
    var inp = $('.br-field__input', el), res = $('.br-date__resolved', el), btn = $('.br-date__cal', el), val = null;
    function render() {
      var r = When.parse(inp.value); val = r;
      if (!inp.value.trim()) { res.innerHTML = '<span class="br-wit">Try "next friday 3pm", "in 2 weeks", or "5 nov".</span>'; return; }
      if (!r) { res.innerHTML = B.Gem.html('Hmm', 'warning', 'alert') + '<span class="br-wit">Not a date we recognise. Try "tomorrow 9am".</span>'; return; }
      var f = When.format(r);
      res.innerHTML = B.Gem.html('Got it', 'success', 'check') + '<span><b>' + esc(f.day) + '</b>' + (f.time ? ' · ' + esc(f.time) : '') + (f.rel ? ' · <span class="br-wit" style="font-size:13px">' + esc(f.rel) + '</span>' : '') + '</span>';
    }
    inp.addEventListener('input', render);
    inp.addEventListener('change', function () { if (val) emit(el, 'br-date', { date: val.date, hasTime: val.hasTime, iso: val.date.toISOString() }); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && val) { emit(el, 'br-date', { date: val.date, hasTime: val.hasTime, iso: val.date.toISOString() }); Sensory.play('pop'); } });
    if (btn) btn.addEventListener('click', function () {
      var now = new Date(), cur = val ? val.date : now, y = cur.getFullYear(), m = cur.getMonth();
      var panel = mk('<div class="br-cal"><div class="br-cal__head"><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm" aria-label="Previous month" data-n="-1">' + icon('chevron-left') + '</button><span></span><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm" aria-label="Next month" data-n="1">' + icon('chevron-right') + '</button></div><div class="br-cal__grid"></div></div>');
      var h = Bloom.open({ panel: panel, kind: 'pop', trigger: btn });
      function draw() { $('.br-cal__head span', panel).textContent = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(y, m, 1)); $('.br-cal__grid', panel).innerHTML = monthGrid(y, m, val && val.date, now); }
      draw();
      panel.addEventListener('click', function (e) {
        var n = e.target.closest('[data-n]'); if (n) { m += +n.getAttribute('data-n'); if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } draw(); Sensory.play('tick'); return; }
        var d = e.target.closest('[data-d]'); if (d) { var p = d.getAttribute('data-d').split('-'); var dt = new Date(+p[0], +p[1] - 1, +p[2]); inp.value = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(dt); render(); inp.dispatchEvent(new Event('change')); h.close(); Sensory.play('pop'); }
      });
    });
    render();
  }
  return { mount: mount, html: function () { return '<div class="br-date" data-br="date"><label class="br-field"><input class="br-field__input" placeholder=" "/><span class="br-field__label">Due</span></label><button type="button" class="br-btn br-btn--ghost br-btn--icon br-btn--sm br-date__cal" aria-label="Open calendar">' + icon('calendar') + '</button><div class="br-date__resolved" aria-live="polite"></div></div>'; } };
})();
B.DateField = DateField;

