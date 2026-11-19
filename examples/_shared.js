/* Shared scaffolding for the examples. Not part of Brolly itself. */
window.EX = (function () {
  var NS = 'brolly.example.';
  var THEMES = ['dawn', 'noon', 'dusk', 'night'];

  function load(key, fallback) {
    try { var v = localStorage.getItem(NS + key); return v == null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function iso(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function fromISO(key) { var p = key.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }
  function shortDate(d) { return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(d); }
  function longDate(d) { return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(d); }
  function money(n) { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0); }
  function esc(s) { return Brolly.util.esc(s); }
  function icon(name, cls) { return Brolly.icon(name, cls); }
  function words(s) { var t = (s || '').trim(); return t ? t.split(/\s+/).length : 0; }

  function themeInit() {
    try { var t = localStorage.getItem('brolly.example.theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
  }
  function themeCycle() {
    var cur = document.documentElement.getAttribute('data-theme') || 'dawn';
    var next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('brolly.example.theme', next); } catch (e) {}
    return next;
  }
  function mountTheme() {
    themeInit();
    document.querySelectorAll('[data-ex-theme]').forEach(function (b) {
      if (!b.firstElementChild) b.innerHTML = icon('sun');
      b.addEventListener('click', function () {
        var t = themeCycle();
        Brolly.toast({ title: 'Theme: ' + t, tone: 'info' });
      });
    });
  }

  function confirm(message, title) {
    return Brolly.Bloom.confirm({ title: title || 'Are you sure?', body: message, tone: 'danger' });
  }
  function el(html) { return Brolly.util.mk(html); }
  function byId(id) { return document.getElementById(id); }
  function on(parent, selector, event, fn) {
    (parent || document).addEventListener(event, function (e) {
      var t = e.target.closest(selector);
      if (t && (parent || document).contains(t)) fn(e, t);
    });
  }
  function cmd(items) { Brolly.palette.register(items); }
  function themeCommands() {
    return THEMES.map(function (t) {
      return { id: 'theme-' + t, group: 'Theme', icon: 'sun', title: 'Theme: ' + t, run: function () { document.documentElement.setAttribute('data-theme', t); try { localStorage.setItem('brolly.example.theme', t); } catch (e) {} Brolly.toast({ title: 'Theme: ' + t, tone: 'info' }); } };
    });
  }

  return {
    load: load, save: save, uid: uid, iso: iso, fromISO: fromISO, addDays: addDays,
    shortDate: shortDate, longDate: longDate, money: money, esc: esc, icon: icon, words: words,
    themeInit: themeInit, themeCycle: themeCycle, mountTheme: mountTheme, confirm: confirm,
    el: el, byId: byId, on: on, cmd: cmd, themeCommands: themeCommands
  };
})();
