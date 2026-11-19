/* ───────── command bar: Cmd/Ctrl+K does everything ───────── */
var Palette = (function () {
  var items = [], root, input, list, sel = 0, shown = [], recent = [], trig = null;
  function ensure() {
    if (root && root.isConnected) return;
    root = mk('<div class="br-cmd" role="dialog" aria-modal="true" aria-label="Command bar"><div class="br-cmd__scrim"></div><div class="br-cmd__panel"><div class="br-cmd__top">' + icon('search', 'br-icon--lg') + '<input class="br-cmd__input" type="text" placeholder="Go anywhere, do anything…" aria-label="Search commands" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="br-cmd-list"/><kbd class="br-key">Esc</kbd></div><div class="br-cmd__list" id="br-cmd-list" role="listbox"></div><div class="br-cmd__foot"><span>↑ ↓ move</span><span>↵ run</span><span>esc close</span><span style="margin-left:auto">F  hints</span></div></div></div>');
    (D.querySelector('.br-stage') || D.body).appendChild(root);
    input = $('.br-cmd__input', root); list = $('.br-cmd__list', root);
    input.addEventListener('input', function () { sel = 0; render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); run(shown[sel]); } else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Home') { sel = 0; paint(); } else if (e.key === 'End') { sel = shown.length - 1; paint(); }
    });
    $('.br-cmd__scrim', root).addEventListener('pointerdown', close);
    list.addEventListener('pointermove', function (e) { var r = e.target.closest('.br-cmd__item'); if (r) { var i = +r.getAttribute('data-i'); if (i !== sel) { sel = i; paint(); } } });
    list.addEventListener('click', function (e) { var r = e.target.closest('.br-cmd__item'); if (r) run(shown[+r.getAttribute('data-i')]); });
  }
  function score(q, it) {
    var hay = (it.title + ' ' + (it.keywords || '') + ' ' + (it.group || '')).toLowerCase(), t = it.title.toLowerCase(); q = q.toLowerCase();
    if (t.indexOf(q) === 0) return 100 - t.length * 0.1; var ix = t.indexOf(q); if (ix >= 0) return 80 - ix; if (hay.indexOf(q) >= 0) return 50;
    var i = 0, s = 0, last = -2; for (var k = 0; k < t.length && i < q.length; k++) { if (t[k] === q[i]) { s += (k === last + 1 ? 3 : 1) + (k === 0 || t[k - 1] === ' ' ? 2 : 0); last = k; i++; } }
    return i === q.length ? 10 + s : -1;
  }
  function hl(title, q) {
    if (!q) return esc(title); var t = title.toLowerCase(), ix = t.indexOf(q.toLowerCase());
    if (ix >= 0) return esc(title.slice(0, ix)) + '<mark>' + esc(title.slice(ix, ix + q.length)) + '</mark>' + esc(title.slice(ix + q.length));
    var out = '', i = 0, ql = q.toLowerCase(); for (var k = 0; k < title.length; k++) { if (i < ql.length && t[k] === ql[i]) { out += '<mark>' + esc(title[k]) + '</mark>'; i++; } else out += esc(title[k]); } return out;
  }
  function render() {
    var q = input.value.trim(), groups = {}, order = [];
    var pool = items.filter(function (it) { return !it.when || it.when(); });
    if (q) { shown = pool.map(function (it) { return { it: it, s: score(q, it) }; }).filter(function (x) { return x.s >= 0; }).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.it; }); }
    else { var rc = recent.map(function (id) { return pool.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean).slice(0, 3); shown = rc.concat(pool.filter(function (p) { return rc.indexOf(p) < 0; })); }
    var html = '', lastG = null;
    shown.forEach(function (it, i) {
      var g = q ? (i === 0 ? 'Best match' : (it.group || 'Other')) : (recent.indexOf(it.id) >= 0 && i < 3 ? 'Recent' : (it.group || 'Other'));
      if (g !== lastG) { html += '<div class="br-cmd__group br-label" role="presentation">' + esc(g) + '</div>'; lastG = g; }
      html += '<div class="br-cmd__item" role="option" id="br-cmd-' + i + '" data-i="' + i + '" aria-selected="false">' + icon(it.icon || 'sparkle') + '<div class="br-cmd__title">' + hl(it.title, q) + (it.hint ? '<small>' + esc(it.hint) + '</small>' : '') + '</div>' + (it.keys ? B.Keycap.html(it.keys) : '') + '</div>';
    });
    if (!shown.length) html = '<div class="br-cmd__empty"><p class="br-h3" style="margin:0 0 4px">Nothing by that name.</p><p class="br-wit" style="margin:0">Not even a rumour.</p></div>';
    list.innerHTML = html; paint();
  }
  function paint() {
    $$('.br-cmd__item', list).forEach(function (r) { var on = +r.getAttribute('data-i') === sel; r.setAttribute('aria-selected', on); if (on) { input.setAttribute('aria-activedescendant', r.id); r.scrollIntoView({ block: 'nearest' }); } });
  }
  function move(n) { if (!shown.length) return; sel = (sel + n + shown.length) % shown.length; paint(); Sensory.play('tick'); }
  function run(it) { if (!it) return; recent = [it.id].concat(recent.filter(function (x) { return x !== it.id; })).slice(0, 6); close(); setTimeout(function () { if (it.run) it.run(); }, 140); }
  function open() {
    ensure(); trig = D.activeElement; root.classList.add('is-open'); input.value = ''; sel = 0; render();
    requestAnimationFrame(function () { root.classList.add('is-in'); input.focus(); }); Sensory.play('open'); emit(root, 'br-palette', { open: true });
  }
  function close() { if (!root || !root.classList.contains('is-open')) return; root.classList.remove('is-in'); Sensory.play('close'); setTimeout(function () { root.classList.remove('is-open'); if (trig && trig.focus) try { trig.focus({ preventScroll: true }); } catch (e) {} }, rm() ? 1 : 220); }
  function toggle() { if (root && root.classList.contains('is-open')) close(); else open(); }
  Keys.on('mod+k', function () { toggle(); }, { inInputs: true });
  return { register: function (arr) { items = items.concat(arr); return Palette; }, set: function (arr) { items = arr; return Palette; }, open: open, close: close, toggle: toggle, items: function () { return items; } };
})();
B.CommandBar = Palette; B.palette = Palette;

