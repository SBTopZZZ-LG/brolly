/* ───────── chart: glow lines, honest marks ───────── */
var Chart = (function () {
  var uid = 0;
  function nice(max) { var p = Math.pow(10, Math.floor(Math.log10(max || 1))), n = max / p; var s = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10; return s * p; }
  function smooth(pts) {
    if (pts.length < 3) return 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join('L');
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, t = 0.18;
      var c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t], c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      d += 'C' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ' ' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }
  function line(el, o) {
    var id = 'brc' + (++uid), W = 640, H = 260, m = { l: 44, r: 70, t: 14, b: 30 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var S = o.series, L = o.labels, n = L.length, fmt = o.format || function (v) { return String(v); };
    var rawMax = Math.max.apply(null, [].concat.apply([], S.map(function (s) { return s.values; }))), ticks = 4;
    if (!isFinite(rawMax) || rawMax <= 0) rawMax = 1;
    var pw = Math.pow(10, Math.floor(Math.log10(rawMax / ticks || 1))), st = rawMax / ticks / pw, step = (st <= 1 ? 1 : st <= 2 ? 2 : st <= 5 ? 5 : 10) * pw, max = step * ticks;
    function X(i) { return m.l + (n === 1 ? iw / 2 : i * iw / (n - 1)); }
    function Y(v) { return m.t + ih - v / max * ih; }
    el.classList.add('br-chart', 'br-glass');
    var sv = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" tabindex="0" aria-label="' + esc(o.title + '. ' + S.map(function (s) { return s.name + ' ends at ' + fmt(s.values[n - 1]); }).join('; ')) + '">';
    sv += '<defs>' + S.map(function (s, k) { return '<linearGradient id="' + id + 'g' + k + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--data-' + (k + 1) + ')" stop-opacity=".16"/><stop offset="1" stop-color="var(--data-' + (k + 1) + ')" stop-opacity="0"/></linearGradient>'; }).join('') + '</defs>';
    for (var t = 0; t <= ticks; t++) { var v = max / ticks * t, y = Y(v); sv += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y + '" y2="' + y + '"/><text x="' + (m.l - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(fmt(v)) + '</text>'; }
    var step = Math.ceil(n / 7); L.forEach(function (l, i) { if (i % step === 0 || i === n - 1) sv += '<text x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(l) + '</text>'; });
    var ends = [];
    S.forEach(function (s, k) {
      var pts = s.values.map(function (v, i) { return [X(i), Y(v)]; }), d = smooth(pts), c = 'var(--data-' + (k + 1) + ')';
      sv += '<path d="' + d + 'L' + X(n - 1) + ' ' + (m.t + ih) + 'L' + X(0) + ' ' + (m.t + ih) + 'Z" fill="url(#' + id + 'g' + k + ')"/>';
      sv += '<path class="ser" d="' + d + '" stroke="' + c + '" pathLength="1" style="filter:drop-shadow(0 0 5px ' + c + ')"/>';
      sv += '<circle class="dot" cx="' + pts[n - 1][0] + '" cy="' + pts[n - 1][1] + '" r="4.5" fill="' + c + '"/>';
      ends.push({ y: pts[n - 1][1], name: s.name });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    var ok = ends.every(function (e, i) { return i === 0 || e.y - ends[i - 1].y >= 15; }) && S.length <= 4;
    if (ok) ends.forEach(function (e) { sv += '<text x="' + (W - m.r + 12) + '" y="' + (e.y + 4) + '" style="fill:var(--ink)">' + esc(e.name) + '</text>'; });
    sv += '<line class="cross" x1="0" x2="0" y1="' + m.t + '" y2="' + (m.t + ih) + '"/>';
    S.forEach(function (s, k) { sv += '<circle class="dot hov" r="4.5" fill="var(--data-' + (k + 1) + ')" style="opacity:0"/>'; });
    sv += '<rect class="hit" x="' + m.l + '" y="0" width="' + iw + '" height="' + H + '" fill="transparent"/></svg>';
    var legend = S.length > 1 ? '<div class="br-chart__legend">' + S.map(function (s, k) { return '<span style="--c:var(--data-' + (k + 1) + ')"><i></i>' + esc(s.name) + '</span>'; }).join('') + '</div>' : '';
    var table = '<table class="br-chart__table"><thead><tr><th>' + esc(o.xLabel || 'When') + '</th>' + S.map(function (s) { return '<th>' + esc(s.name) + '</th>'; }).join('') + '</tr></thead><tbody>' + L.map(function (l, i) { return '<tr><td>' + esc(l) + '</td>' + S.map(function (s) { return '<td>' + esc(fmt(s.values[i])) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
    el.innerHTML = '<div class="br-chart__head"><div><h3 class="br-h3 br-chart__title">' + esc(o.title) + '</h3>' + (o.subtitle ? '<div class="br-small">' + esc(o.subtitle) + '</div>' : '') + legend + '</div><button type="button" class="br-btn br-btn--ghost br-btn--sm" data-tbl aria-pressed="false">View as table</button></div>' + sv + table + '<div class="br-chart__tip"></div>';
    var svg = $('svg', el), tip = $('.br-chart__tip', el), cross = $('.cross', svg), hov = $$('.hov', svg), idx = -1;
    $$('.ser', svg).forEach(function (p, k) { if (rm()) return; p.animate([{ strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDasharray: 1, strokeDashoffset: 0 }], { duration: 1000, delay: k * 120, easing: SETTLE, fill: 'both' }); });
    function at(i) {
      i = clamp(i, 0, n - 1); if (i === idx) return; idx = i; el.classList.add('is-hover');
      cross.setAttribute('x1', X(i)); cross.setAttribute('x2', X(i)); S.forEach(function (s, k) { hov[k].setAttribute('cx', X(i)); hov[k].setAttribute('cy', Y(s.values[i])); hov[k].style.opacity = 1; });
      tip.innerHTML = '<div class="br-label">' + esc(L[i]) + '</div><dl>' + S.map(function (s, k) { return '<dt style="--c:var(--data-' + (k + 1) + ')"><i></i>' + esc(s.name) + '</dt><dd>' + esc(fmt(s.values[i])) + '</dd>'; }).join('') + '</dl>';
      var sb = svg.getBoundingClientRect(), eb = el.getBoundingClientRect(), px = (X(i) / W) * sb.width + (sb.left - eb.left);
      tip.style.left = clamp(px, 90, eb.width - 90) + 'px'; tip.style.top = (sb.top - eb.top + 8) + 'px';
    }
    function leave() { idx = -1; el.classList.remove('is-hover'); hov.forEach(function (h) { h.style.opacity = 0; }); }
    $('.hit', svg).addEventListener('pointermove', function (e) { var sb = svg.getBoundingClientRect(), x = (e.clientX - sb.left) / sb.width * W; at(Math.round((x - m.l) / iw * (n - 1))); });
    $('.hit', svg).addEventListener('pointerleave', leave);
    svg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); at((idx < 0 ? -1 : idx) + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); at((idx < 0 ? n : idx) - 1); } else if (e.key === 'Escape') leave(); });
    svg.addEventListener('blur', leave);
    $('[data-tbl]', el).addEventListener('click', function (e) { var on = el.classList.toggle('show-table'); e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'View as chart' : 'View as table'; });
  }
  return { line: line };
})();
B.Chart = Chart;

