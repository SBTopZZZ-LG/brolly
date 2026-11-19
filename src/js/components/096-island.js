/* ───────── island: a toast that morphs ───────── */
var Island = (function () {
  var host, cur = null, queue = [];
  function ensureHost() { if (host && host.isConnected) return host; host = mk('<div class="br-island-host" role="status" aria-live="polite"></div>'); (D.querySelector('.br-stage') || D.body).appendChild(host); return host; }
  var ICON = { success: 'check', danger: 'x', warning: 'alert', info: 'info' }, SOUND = { success: 'success', danger: 'error', warning: 'error', info: 'pop' };
  function fit(el) { var inner = $('.br-island__inner', el); el.style.width = inner.offsetWidth + 'px'; el.style.height = inner.offsetHeight + 'px'; }
  function show(o) {
    o = typeof o === 'string' ? { title: o } : o;
    if (cur) { queue.push(o); return { update: function () {}, close: function () {} }; }
    ensureHost();
    var tone = o.tone || 'info', rich = !!(o.detail || (o.actions && o.actions.length));
    var el = mk('<div class="br-island is-enter" data-state="compact" data-tone="' + tone + '"' + (tone === 'danger' ? ' role="alert"' : '') + '><div class="br-island__inner"><div class="br-island__head"><span class="br-island__gem">' + icon(o.icon || ICON[tone] || 'sparkle', 'br-icon--sm') + '</span><span class="br-island__title"></span></div><div class="br-island__detail"></div><div class="br-island__bar"><i></i></div><div class="br-island__actions"></div></div></div>');
    $('.br-island__title', el).textContent = o.title || ''; $('.br-island__detail', el).textContent = o.detail || '';
    (o.actions || []).forEach(function (a) { var b = mk('<button type="button" class="br-btn br-btn--sm' + (a.primary ? ' br-btn--primary' : '') + '">' + esc(a.label) + '</button>'); b.addEventListener('click', function () { if (a.onClick) a.onClick(); h.close(); }); $('.br-island__actions', el).appendChild(b); });
    if (o.progress != null) { el.setAttribute('data-progress', 'true'); el.style.setProperty('--p', o.progress + '%'); }
    host.appendChild(el); cur = el; fit(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove('is-enter'); }); });
    Sensory.fire(SOUND[tone] || 'pop');
    var timer = 0, hover = false;
    function arm(ms2) { clearTimeout(timer); if (o.sticky || o.progress != null && o.progress < 100) return; timer = setTimeout(function () { if (hover) arm(1200); else h.close(); }, ms2); }
    function expand() { if (!el.isConnected || el.getAttribute('data-state') === 'open') return; el.setAttribute('data-state', 'open'); requestAnimationFrame(function () { fit(el); }); }
    if (rich) setTimeout(expand, o.open ? 30 : rm() ? 30 : 650);
    arm(o.duration || (rich ? 5600 : 2800));
    el.addEventListener('pointerenter', function () { hover = true; if (!rich) expand(); }); el.addEventListener('pointerleave', function () { hover = false; });
    var h = {
      el: el,
      update: function (u) {
        if (u.title != null) $('.br-island__title', el).textContent = u.title;
        if (u.detail != null) { $('.br-island__detail', el).textContent = u.detail; if (u.detail) expand(); }
        if (u.progress != null) { el.setAttribute('data-progress', 'true'); el.style.setProperty('--p', u.progress + '%'); if (u.progress >= 100) arm(1800); }
        if (u.tone) { el.setAttribute('data-tone', u.tone); $('.br-island__gem', el).innerHTML = icon(ICON[u.tone] || 'sparkle', 'br-icon--sm'); Sensory.fire(SOUND[u.tone] || 'pop'); }
        requestAnimationFrame(function () { fit(el); });
      },
      close: function () {
        clearTimeout(timer); if (el._closed) return; el._closed = true; el.classList.add('is-leave');
        setTimeout(function () { el.remove(); cur = null; if (queue.length) show(queue.shift()); }, rm() ? 1 : 340);
      }
    };
    return h;
  }
  return { show: show, toast: function (key, extra) { var t = VOICE.toast[key] || { title: key }; var o = {}; for (var k in t) o[k] = t[k]; for (var j in extra || {}) o[j] = extra[j]; return show(o); } };
})();
B.Island = Island; B.toast = Island.toast;
