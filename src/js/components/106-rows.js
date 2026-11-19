/* ───────── rows: lift & shuffle ───────── */
var Sortable = (function () {
  function mount(list, o) {
    if (list._br) return; list._br = 1; o = o || {};
    var live = mk('<div class="br-sr" aria-live="polite"></div>'); list.parentNode.insertBefore(live, list.nextSibling);
    function rows() { return $$(':scope > .br-row', list); }
    function flip(before, skip) {
      rows().forEach(function (r) { if (r === skip) return; var b = before.get(r); if (!b) return; var a = r.getBoundingClientRect(), dy = b.top - a.top; if (Math.abs(dy) < 1) return; anim(r, [{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }], { duration: 340, easing: SPRING }); });
    }
    function snap() { var m = new Map(); rows().forEach(function (r) { m.set(r, r.getBoundingClientRect()); }); return m; }
    function say(r) { var rs = rows(); live.textContent = $('.br-row__title', r).textContent + ' moved to position ' + (rs.indexOf(r) + 1) + ' of ' + rs.length; }
    function done(r) { emit(list, 'br-reorder', { order: rows().map(function (x) { return x.getAttribute('data-id') || x.id || $('.br-row__title', x).textContent; }), moved: r }); if (o.onReorder) o.onReorder(rows()); }
    var drag = null;
    list.addEventListener('pointerdown', function (e) {
      var g = e.target.closest('.br-row__grip'); if (!g || e.button) return; var row = g.closest('.br-row'); if (!row || row.parentNode !== list) return;
      e.preventDefault(); g.setPointerCapture(e.pointerId);
      var r = row.getBoundingClientRect(); drag = { row: row, g: g, id: e.pointerId, y0: e.clientY, grab: e.clientY - r.top, dy: 0, on: false };
    });
    list.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return; var d = drag, row = d.row;
      if (!d.on) { if (Math.abs(e.clientY - d.y0) < 4) return; d.on = true; row.classList.add('is-lifted'); list.classList.add('is-dragging'); Sensory.haptic('tick'); Sensory.play('tick'); }
      var nat = row.getBoundingClientRect().top - d.dy, want = e.clientY - d.grab; d.dy = want - nat; row.style.setProperty('--dy', d.dy + 'px');
      var h = row.offsetHeight, c = want + h / 2, rs = rows(), i = rs.indexOf(row), prev = rs[i - 1], next = rs[i + 1], before;
      if (prev) { var pr = prev.getBoundingClientRect(); if (c < pr.top + pr.height / 2) { before = snap(); list.insertBefore(row, prev); flip(before, row); d.dy = want - (row.getBoundingClientRect().top - d.dy); row.style.setProperty('--dy', d.dy + 'px'); Sensory.haptic('tick'); return; } }
      if (next) { var nr = next.getBoundingClientRect(); if (c > nr.top + nr.height / 2) { before = snap(); list.insertBefore(next, row); flip(before, row); d.dy = want - (row.getBoundingClientRect().top - d.dy); row.style.setProperty('--dy', d.dy + 'px'); Sensory.haptic('tick'); } }
    });
    function end(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return; var d = drag; drag = null;
      if (!d.on) return; var row = d.row;
      row.classList.add('is-settling'); row.classList.remove('is-lifted'); row.style.removeProperty('--dy'); list.classList.remove('is-dragging');
      setTimeout(function () { row.classList.remove('is-settling'); }, 560); Sensory.play('pop'); say(row); done(row);
    }
    list.addEventListener('pointerup', end); list.addEventListener('pointercancel', end);
    list.addEventListener('keydown', function (e) {
      if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
      var row = e.target.closest('.br-row'); if (!row) return; e.preventDefault();
      var rs = rows(), i = rs.indexOf(row), j = i + (e.key === 'ArrowUp' ? -1 : 1); if (j < 0 || j >= rs.length) return;
      var before = snap(); if (j < i) list.insertBefore(row, rs[j]); else list.insertBefore(rs[j], row); flip(before); var f = $('.br-row__grip', row) || row; f.focus(); Sensory.play('tick'); say(row); done(row);
    });
  }
  return { mount: mount };
})();
B.Rows = { html: function (o) { o = o || {}; return '<li class="br-row" data-id="' + esc(o.id || '') + '"' + (o.done ? ' data-done="true"' : '') + ' tabindex="-1"><button type="button" class="br-row__grip" aria-label="Drag to reorder. Alt plus arrow keys also work.">' + icon('grip') + '</button><label class="br-check"><input type="checkbox"' + (o.done ? ' checked' : '') + ' aria-label="Done"/><span class="br-check__box"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg></span></label><div class="br-row__main"><div class="br-row__title">' + esc(o.title) + '</div><div class="br-row__meta">' + esc(o.meta || '') + '</div></div><div class="br-row__end">' + (o.gem || '') + '</div></li>'; } };
B.LiftShuffle = Sortable;

