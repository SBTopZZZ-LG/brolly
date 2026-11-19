/* ───────── keys: tiny shortcut registry ───────── */
var Keys = (function () {
  var map = [];
  function combo(e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    return ((e.metaKey || e.ctrlKey) ? 'mod+' : '') + (e.altKey ? 'alt+' : '') + (e.shiftKey && e.key.length > 1 ? 'shift+' : '') + k;
  }
  D.addEventListener('keydown', function (e) {
    var c = combo(e);
    for (var i = 0; i < map.length; i++) {
      var m = map[i];
      if (m.combo === c && (!m.noEdit || !editing(e.target)) && (!m.when || m.when(e))) { if (m.fn(e) !== false) e.preventDefault(); return; }
    }
  });
  return { on: function (combo, fn, o) { map.push({ combo: combo, fn: fn, noEdit: !(o && o.inInputs) && !/^mod\+/.test(combo), when: o && o.when }); return function () { map = map.filter(function (m) { return m.fn !== fn; }); }; } };
})();
B.Keys = Keys;

