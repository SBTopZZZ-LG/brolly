/* ───────── view transitions: morph for drill-ins, depth push for peers ───────── */
var View = (function () {
  var has = !!D.startViewTransition;
  function go(update, o) {
    o = o || {}; var kind = o.kind || 'push';
    if (!has || rm()) { update(); return Promise.resolve(); }
    ROOT.setAttribute('data-br-nav', kind === 'morph' ? 'morph' : kind);
    if (o.source) o.source.style.viewTransitionName = 'br-morph';
    var vt = D.startViewTransition(function () {
      if (o.source) o.source.style.viewTransitionName = '';
      update();
      var t = typeof o.target === 'function' ? o.target() : o.target; if (t) t.style.viewTransitionName = 'br-morph';
    });
    return vt.finished.catch(function () {}).then(function () { ROOT.removeAttribute('data-br-nav'); var t = typeof o.target === 'function' ? o.target() : o.target; if (t) t.style.viewTransitionName = ''; });
  }
  function swap(host, node, o) {
    o = o || {};
    if (has && !rm()) return go(function () { host.replaceChildren(node); }, o);
    var old = host.firstElementChild; node.classList.add('br-view'); node.setAttribute('data-dir', o.kind === 'pop' ? 'back' : 'fwd');
    if (old && !rm()) { old.classList.add('is-leaving'); return new Promise(function (r) { setTimeout(function () { host.replaceChildren(node); r(); }, 200); }); }
    host.replaceChildren(node); return Promise.resolve();
  }
  return { go: go, swap: swap, supported: has };
})();
B.Transitions = View; B.view = View;

