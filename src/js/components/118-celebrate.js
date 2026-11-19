/* ───────── celebrate: tasteful, brief, a little smug ───────── */
var Celebrate = (function () {
  var cv, ctx2, parts = [], raf = 0;
  function colors() { return ['--grad-start', '--grad-end', '--aurora-sky', '--aurora-violet', '--aurora-rose', '--data-2'].map(function (v) { return cssVar(v); }); }
  function loop(t) {
    ctx2.clearRect(0, 0, cv.width, cv.height); var now = performance.now();
    parts = parts.filter(function (p) { return now - p.t0 < p.life; });
    parts.forEach(function (p) {
      var a = (now - p.t0) / 1000; p.vy += 900 * 0.016; p.vx *= 0.985; p.x += p.vx * 0.016; p.y += p.vy * 0.016; p.r += p.vr * 0.016;
      var k = 1 - (now - p.t0) / p.life; ctx2.save(); ctx2.globalAlpha = Math.min(1, k * 2); ctx2.translate(p.x, p.y); ctx2.rotate(p.r); ctx2.fillStyle = p.c;
      if (p.s) ctx2.fillRect(-p.z / 2, -p.z / 3, p.z, p.z * 0.66); else { ctx2.beginPath(); ctx2.arc(0, 0, p.z / 2.4, 0, 6.3); ctx2.fill(); }
      ctx2.restore();
    });
    raf = parts.length ? requestAnimationFrame(loop) : 0; if (!raf) cv.remove();
  }
  function burst(o) {
    o = o || {}; Sensory.fire('success');
    if (o.stage !== false) Aurora.flare(o.stage instanceof Element ? o.stage : null, 1800);
    if (rm()) return;
    if (!cv || !cv.isConnected) { cv = mk('<canvas class="br-confetti" aria-hidden="true"></canvas>'); (D.querySelector('.br-stage') || D.body).appendChild(cv); }
    var dpr = devicePixelRatio || 1; cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx2 = cv.getContext('2d'); ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cs = colors(), n = o.count || 46, x = o.x == null ? innerWidth / 2 : o.x, y = o.y == null ? innerHeight * 0.45 : o.y, t0 = performance.now();
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + (Math.random() - 0.5) * 2.1, v = 260 + Math.random() * 420; parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 12, z: 6 + Math.random() * 8, c: cs[i % cs.length], s: Math.random() > 0.4, t0: t0, life: 1500 + Math.random() * 700 }); }
    if (!raf) raf = requestAnimationFrame(loop);
  }
  return { burst: burst, done: function (el, msg) { var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null; burst({ x: r ? r.left + r.width / 2 : null, y: r ? r.top + r.height / 2 : null }); if (msg !== false) Island.toast('done'); } };
})();

