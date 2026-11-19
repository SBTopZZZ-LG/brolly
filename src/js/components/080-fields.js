/* ───────── fields, sliders, switches ───────── */
var Field = (function () {
  function slider(inp) {
    var p = (inp.value - (inp.min || 0)) / ((inp.max || 100) - (inp.min || 0)) * 100;
    inp.style.setProperty('--fill', p + '%');
    var out = inp.closest('.br-slider') && $('output', inp.closest('.br-slider')); if (out) out.textContent = inp.value + (inp.getAttribute('data-unit') || '');
  }
  D.addEventListener('input', function (e) { if (e.target.matches && e.target.matches('.br-slider input')) { slider(e.target); if (e.isTrusted) Sensory.play('tick'); } });
  D.addEventListener('change', function (e) {
    var t = e.target; if (!t.matches) return;
    if (t.matches('.br-switch input')) Sensory.fire(t.checked ? 'pop' : 'tick');
    if (t.matches('.br-check input,.br-radio input')) Sensory.play('tick');
  });
  function setInvalid(field, msg) { field.setAttribute('data-invalid', msg ? 'true' : 'false'); var m = $('.br-field__msg', field); if (m) m.innerHTML = (msg ? icon('alert', 'br-icon--sm') + '<span>' + esc(msg) + '</span>' : ''); }
  function mount(root) {
    $$('.br-slider input', root).forEach(slider);
    $$('.br-check input[data-indeterminate]', root).forEach(function (i) { i.indeterminate = true; });
  }
  function html(o) {
    o = o || {}; var id = o.id || 'f' + Math.random().toString(36).slice(2, 7);
    return '<label class="br-field' + (o.select ? ' br-field--select' : '') + '" for="' + id + '"><input class="br-field__input" id="' + id + '" placeholder=" " type="' + (o.type || 'text') + '"/><span class="br-field__label">' + esc(o.label || '') + '</span></label>';
  }
  return { mount: mount, setInvalid: setInvalid, html: html, slider: slider };
})();
B.Field = Field; B.Controls = { mount: Field.mount, slider: Field.slider };

