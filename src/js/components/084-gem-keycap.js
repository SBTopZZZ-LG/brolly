/* ───────── gem + keycap html helpers ───────── */
B.Gem = { html: function (text, tone, ic) { return '<span class="br-gem" data-tone="' + (tone || '') + '">' + (ic ? icon(ic) : '') + esc(text) + '</span>'; }, icons: { success: 'check', warning: 'alert', danger: 'x', info: 'info' } };
B.Keycap = { html: function (keys) { return '<span class="br-keys">' + String(keys).split(' ').map(function (k) { return '<kbd class="br-key">' + esc(k) + '</kbd>'; }).join('') + '</span>'; } };
B.Glass = { html: function (inner, o) { o = o || {}; return '<div class="br-glass' + (o.strong ? ' br-glass--strong' : '') + (o.pad === false ? '' : ' br-glass--pad') + '">' + inner + '</div>'; } };
