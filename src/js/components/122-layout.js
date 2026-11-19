/* ───────── layout helpers ───────── */
B.Layout = { tile: function (inner, span, extra) { return '<section class="br-tile br-span-' + (span || 4) + (extra ? ' ' + extra : '') + '">' + inner + '</section>'; } };

