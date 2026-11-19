/* ───────── empty states with illustrations ───────── */
var ART = {
  teapot: '<ellipse class="v" cx="96" cy="98" rx="52" ry="38"/><g class="bob"><path class="l" d="M52 94c0-22 20-36 46-36s46 14 46 36c0 20-18 34-46 34S52 114 52 94z"/><path class="l" d="M74 64c4-8 12-12 24-12s20 4 24 12"/><circle class="l" cx="98" cy="47" r="4"/><path class="l" d="M141 82l20-18 4 6-19 17"/><path class="l" d="M54 82c-18-4-26 8-22 20s16 12 26 6"/><path class="k" d="M88 38c-6-6 6-10 0-18M104 36c-6-6 6-10 0-18"/></g><path class="l" d="M36 142h128"/>',
  biscuit: '<circle class="s" cx="92" cy="74" r="40"/><circle class="l" cx="92" cy="74" r="34"/><path class="l" d="M118 100l34 34M146 128l10 10"/><circle class="r" cx="92" cy="74" r="15"/><circle class="l" cx="92" cy="74" r="15"/><path class="l" d="M86 70h.01M98 68h.01M92 80h.01"/><path class="k" d="M146 60l4 4-4 4M44 118l4 4"/><path class="l" d="M36 142h128"/>',
  umbrella: '<path class="r" d="M42 62c6 40 34 54 58 54s52-14 58-54c-10 8-22 6-30-4-8 10-18 12-28 12s-20-2-28-12c-8 10-20 12-30 4z"/><path class="l" d="M42 62c6 40 34 54 58 54s52-14 58-54c-10 8-22 6-30-4-8 10-18 12-28 12s-20-2-28-12c-8 10-20 12-30 4z"/><path class="l" d="M100 116v26c0 8 14 8 14-2M60 54l-8-20M100 40V16M140 54l8-20"/><path class="k" d="M26 40v8M172 22v8M18 92v8M180 84v8"/>',
  plug: '<circle class="s" cx="100" cy="82" r="48"/><rect class="l" x="28" y="56" width="46" height="48" rx="14"/><path class="l" d="M60 74h8M60 86h8"/><rect class="l" x="112" y="62" width="44" height="36" rx="12"/><path class="l" d="M112 72h-10M112 88h-10"/><path class="l" d="M156 80c20 0 24 30 8 36s-30 4-30 20"/><path class="k" d="M84 68l6 6-6 6 6 6"/><path class="l" d="M36 142h128"/>',
  cloud: '<path class="s" d="M60 114h84a22 22 0 000-44 30 30 0 00-58-8 26 26 0 00-26 52z"/><path class="l" d="M60 114h84a22 22 0 000-44 30 30 0 00-58-8 26 26 0 00-26 52z"/><path class="l" d="M82 90h.01M110 90h.01M88 100c6 4 14 4 20 0"/><path class="k" d="M150 38h12l-12 14h12M170 24h8l-8 9h8"/>',
  tray: '<circle class="v" cx="100" cy="82" r="50"/><path class="l" d="M36 98l16-42h96l16 42v32H36z"/><path class="l" d="M36 98h42l6 12h32l6-12h42"/><circle class="l" cx="100" cy="72" r="11"/><path class="l" d="M94 70c3 5 9 5 12 0M92 76c4 4 12 4 16 0"/><path class="k" d="M160 40l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>',
  door: '<rect class="v" x="62" y="28" width="76" height="106" rx="8"/><rect class="l" x="64" y="30" width="72" height="104" rx="6"/><path class="l" d="M136 30l24 10v104l-24-10"/><circle class="l" cx="124" cy="84" r="3"/><rect class="r" x="82" y="52" width="36" height="24" rx="4"/><rect class="l" x="82" y="52" width="36" height="24" rx="4"/><path class="l" d="M88 60h24M88 68h14"/><path class="l" d="M36 144h128"/>'
};
B.art = function (n) { return '<svg class="br-empty__art" viewBox="0 0 200 160" role="img" aria-label="' + esc(n) + ' illustration">' + (ART[n] || ART.teapot) + '</svg>'; };
B.artNames = Object.keys(ART);
var EmptyState = {
  html: function (key, o) {
    var v = typeof key === 'string' ? (VOICE.empty[key] || VOICE.empty.tasks) : key; o = o || {};
    return '<div class="br-empty">' + B.art(v.art) + '<h2 class="br-h2 br-empty__title">' + esc(o.title || v.title) + '</h2><p class="br-empty__wit">' + esc(o.wit || v.wit) + '</p>' + (o.noAction ? '' : '<div class="br-empty__actions"><button type="button" class="br-btn br-btn--primary" data-br-act="empty">' + esc(o.action || v.action) + '</button></div>') + '</div>';
  },
  mount: function (el, key, o) { el.innerHTML = EmptyState.html(key, o); }
};
B.EmptyState = EmptyState;

