/* ───────── init: wire everything that is in the page ───────── */
B.init = function (root) {
  root = root || D;
  var stage = root.querySelector ? (root.matches && root.matches('.br-stage') ? root : root.querySelector('.br-stage')) : null;
  if (stage && stage.getAttribute('data-aurora') !== 'off') Aurora.mount(stage);
  Field.mount(root);
  $$('[data-br="tabs"],.br-tabs', root).forEach(Tabs.mount);
  $$('[data-br="orb"]', root).forEach(function (e) { Orb.mount(e); });
  $$('[data-br="date"]', root).forEach(DateField.mount);
  $$('.br-rail', root).forEach(Rail.mount);
  $$('[data-br="sortable"]', root).forEach(function (e) { Sortable.mount(e); });
  $$('[data-br="lasso"]', root).forEach(function (e) { Lasso.mount(e); });
  Progress.ensureDefs();
  return B;
};

