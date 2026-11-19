/* ───────── bloom: overlays that grow out of what you pressed ───────── */
var Bloom = (function () {
  var stack = [];
  function focusables(p) { return $$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', p).filter(function (e) { return e.offsetParent !== null || e === D.activeElement; }); }
  function open(o) {
    var kind = o.kind || 'dialog', trig = o.trigger || D.activeElement;
    var panel = typeof o.panel === 'string' ? mk(o.panel) : o.panel;
    panel.classList.add('br-bloom', 'br-bloom--' + kind);
    panel.setAttribute('role', kind === 'menu' ? 'menu' : 'dialog'); if (kind === 'dialog') panel.setAttribute('aria-modal', 'true');
    var scrim = mk('<div class="br-bloom-scrim' + (kind === 'dialog' ? '' : ' br-bloom-scrim--clear') + '"></div>');
    var host = (trig && trig.closest && trig.closest('.br-stage')) || D.body;
    host.appendChild(scrim); host.appendChild(panel);
    var tr = trig && trig.getBoundingClientRect ? trig.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    var pw = panel.offsetWidth, ph = panel.offsetHeight, left, top;
    if (kind === 'dialog') { left = (innerWidth - pw) / 2; top = Math.max(16, (innerHeight - ph) / 2); panel.style.transform = 'none'; }
    else { left = clamp(tr.left, 8, innerWidth - pw - 8); top = tr.bottom + 8; if (top + ph > innerHeight - 8) top = Math.max(8, tr.top - ph - 8); }
    panel.style.left = left + 'px'; panel.style.top = top + 'px'; if (kind === 'dialog') panel.style.transform = '';
    var ox = tr.left + tr.width / 2 - left, oy = tr.top + tr.height / 2 - top;
    panel.style.setProperty('--ox', ox + 'px'); panel.style.setProperty('--oy', oy + 'px');
    scrim.classList.add('is-in');
    var a = anim(panel, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1)' }], { duration: ms('--dur-slow', 520), easing: SPRING });
    Sensory.play('open');
    var closed = false;
    var h = { panel: panel, close: close };
    function close(result) {
      if (closed) return; closed = true; stack = stack.filter(function (x) { return x !== h; });
      D.removeEventListener('keydown', key, true); scrim.classList.remove('is-in'); Sensory.play('close');
      var b = anim(panel, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.2)' }], { duration: ms('--dur-base', 260), easing: SETTLE });
      b.onfinish = function () { panel.remove(); scrim.remove(); if (trig && trig.focus && trig.isConnected) try { trig.focus({ preventScroll: true }); } catch (e) {} if (o.onClose) o.onClose(result); };
    }
    function key(e) {
      if (stack[stack.length - 1] !== h) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
      var f = focusables(panel);
      if (e.key === 'Tab' && f.length) { var i = f.indexOf(D.activeElement); if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
      if (kind === 'menu' && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); var items = $$('.br-menu__item', panel), j = items.indexOf(D.activeElement); items[(j + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
    }
    D.addEventListener('keydown', key, true);
    scrim.addEventListener('pointerdown', function () { close(); });
    panel.addEventListener('click', function (e) { var c = e.target.closest('[data-br-close]'); if (c) close(c.getAttribute('data-br-close') || true); });
    stack.push(h);
    setTimeout(function () { var f = $('[autofocus]', panel) || $('.br-menu__item', panel) || focusables(panel)[0]; if (f) f.focus({ preventScroll: true }); }, 60);
    return h;
  }
  function confirm(o) {
    return new Promise(function (res) {
      var danger = o.tone === 'danger';
      var p = '<div><h2 class="br-h2 br-bloom__title">' + esc(o.title || 'Are you sure?') + '</h2><p class="br-small" style="margin:0">' + esc(o.body || '') + '</p>' +
        '<div class="br-bloom__actions"><button class="br-btn br-btn--ghost" data-br-close="no">' + esc(o.cancel || 'Never mind') + '</button><button class="br-btn ' + (danger ? 'br-btn--danger' : 'br-btn--primary') + '" data-br-close="yes">' + esc(o.confirm || 'Go on, then') + '</button></div></div>';
      open({ panel: p, kind: 'dialog', trigger: o.trigger, onClose: function (r) { res(r === 'yes'); } });
    });
  }
  function menu(trigger, items) {
    var html = '<div>' + items.map(function (it) { return it === '-' ? '<div class="br-menu__sep"></div>' : '<button class="br-menu__item" role="menuitem" data-br-close="' + esc(it.id) + '"' + (it.tone ? ' data-tone="' + it.tone + '"' : '') + '>' + (it.icon ? icon(it.icon) : '') + '<span>' + esc(it.label) + '</span>' + (it.keys ? B.Keycap.html(it.keys) : '') + '</button>'; }).join('') + '</div>';
    return new Promise(function (res) { open({ panel: html, kind: 'menu', trigger: trigger, onClose: res }); });
  }
  return { open: open, confirm: confirm, menu: menu };
})();
B.Bloom = Bloom;

