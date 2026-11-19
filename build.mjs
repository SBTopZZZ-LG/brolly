#!/usr/bin/env node
/* Brolly build: concatenate source modules into dist, then generate docs.
   No runtime dependencies. Edit src/, never dist/. */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const p = (...a) => join(ROOT, ...a);
const read = (f) => readFileSync(p(f), 'utf8');
const write = (f, s) => { mkdirSync(dirname(p(f)), { recursive: true }); writeFileSync(p(f), s); };
const list = (dir) => readdirSync(p(dir)).filter((f) => f.endsWith('.js') || f.endsWith('.css')).sort();

const VERSION = '1.0.0';

/* ── CSS ────────────────────────────────────────────────────────── */
const cssParts = [
  read('src/css/fonts.css'),
  `/* tokens first: components never hard-code colour, space, radius, shadow or duration. */`,
  read('src/css/00-tokens.css'),
  read('src/css/components/00-base.css'),
  ...list('src/css/components').filter((f) => !/^00-/.test(f)).map((f) => read('src/css/components/' + f)),
];
const css = `/* Brolly v${VERSION} — generated from src/css. Do not edit. */
@layer brolly.tokens, brolly.base, brolly.components;
${cssParts[0]}
@layer brolly.tokens {
${cssParts[2]}
}
@layer brolly.base {
${cssParts[3]}
}
@layer brolly.components {
${cssParts.slice(4).join('\n')}
}
`;
write('dist/brolly.css', css);

/* ── JS ─────────────────────────────────────────────────────────── */
const jsBody = list('src/js/components').map((f) => read('src/js/components/' + f)).join('\n');
const banner = `/* Brolly v${VERSION} — generated from src/js. Do not edit. */\n`;
write('dist/brolly.js', `${banner}(function(){'use strict';\n${jsBody}\nwindow.Brolly = B;\n})();\n`);
write('dist/brolly.esm.js', `${banner}${jsBody}\nif (typeof window !== 'undefined') window.Brolly = B;\nexport default B;\nexport { B as Brolly };\n`);

/* ── Docs previews: inject the built assets + theme bootstrap ───── */
const previewDir = 'design/previews';
const components = [];
for (const name of readdirSync(p(previewDir)).sort()) {
  const file = join(previewDir, name, 'preview.html');
  if (!existsSync(p(file))) continue;
  let html = read(file);
  const meta = /@dsCard([^>]*)>/.exec(html);
  const attrs = meta ? meta[1] : '';
  const get = (k) => (new RegExp(k + '="([^"]*)"').exec(attrs) || [])[1] || '';
  const group = get('group') || (/\bpage\b/.test(attrs) ? 'Pages' : 'Components');
  const height = Number((/height=(\d+)/.exec(attrs) || [])[1] || 360);
  const subtitle = get('subtitle') || '';
  const isPage = /\bpage\b/.test(attrs);
  const head = `<link rel="stylesheet" href="../../dist/brolly.css">
<script src="../../dist/brolly.js"></script>
<script>try{var t=new URLSearchParams(location.search).get('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>`;
  html = html.replace('<head>', `<head>\n${head}`);
  write(`docs/previews/${name}.html`, html);
  components.push({ name, group, height, subtitle, page: isPage });
}

/* ── Docs gallery ───────────────────────────────────────────────── */
const groups = [...new Set(components.map((c) => c.group))];
const cards = components.map((c) => `
  <section class="card" data-group="${c.group}" id="${c.name}">
    <header class="card__head">
      <div>
        <span class="br-label">${c.group}</span>
        <h2 class="br-h2" style="margin:2px 0 0">${c.name}</h2>
      </div>
      <div class="card__meta">
        <span class="br-caption">${c.subtitle}</span>
        <a class="br-btn br-btn--ghost br-btn--sm" href="previews/${c.name}.html" target="_blank">Open</a>
      </div>
    </header>
    <iframe src="previews/${c.name}.html" data-src="previews/${c.name}.html" height="${c.height}" loading="lazy" title="${c.name} preview"></iframe>
  </section>`).join('\n');

const gallery = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Brolly — UI kit</title>
<link rel="stylesheet" href="../dist/brolly.css">
<style>
  body{margin:0}
  .wrap{max-width:1180px;margin:0 auto;padding:var(--space-8) var(--space-6) var(--space-16)}
  .top{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-6);flex-wrap:wrap;margin-bottom:var(--space-8)}
  .themes{display:flex;gap:var(--space-2);flex-wrap:wrap}
  .filters{display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-6)}
  .card{background:var(--glass);border:1px solid var(--line);box-shadow:var(--glow-rest);border-radius:var(--radius-lg);padding:var(--space-4);margin-bottom:var(--space-6);backdrop-filter:blur(var(--blur-md)) saturate(var(--sat-glass))}
  .card__head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);margin-bottom:var(--space-3)}
  .card__meta{display:flex;align-items:center;gap:var(--space-3);text-align:right;flex-wrap:wrap;justify-content:flex-end}
  .card iframe{display:block;width:100%;border:1px solid var(--line);border-radius:var(--radius-md);background:var(--canvas)}
  .hero-orb{width:12px;height:12px;border-radius:50%;display:inline-block;background:linear-gradient(135deg,var(--grad-start),var(--grad-end))}
</style>
</head>
<body>
<div class="br-stage">
<div class="wrap">
  <header class="top">
    <div>
      <span class="br-label"><span class="hero-orb"></span> UI kit for productivity tools</span>
      <h1 class="br-display" style="margin:var(--space-2) 0">Brolly.</h1>
      <p class="br-body-lg" style="margin:0;max-width:52ch">Aurora glass over a lavender haze. Fraunces and DM Mono. Springy, keyboard-first, dry about it.</p>
    </div>
    <div class="themes" role="group" aria-label="Theme">
      <a class="br-btn br-btn--ghost br-btn--sm" href="../examples/index.html">Example tools</a>
      <button class="br-btn br-btn--sm" data-set-theme="dawn">Dawn</button>
      <button class="br-btn br-btn--sm" data-set-theme="noon">Noon</button>
      <button class="br-btn br-btn--sm" data-set-theme="dusk">Dusk</button>
      <button class="br-btn br-btn--sm" data-set-theme="night">Night</button>
    </div>
  </header>
  <nav class="filters" aria-label="Filter components">
    <button class="br-btn br-btn--sm br-btn--primary" data-filter="all">All ${components.length}</button>
    ${groups.map((g) => `<button class="br-btn br-btn--sm" data-filter="${g}">${g}</button>`).join('\n    ')}
  </nav>
  <main id="cards">
${cards}
  </main>
  <footer class="br-small" style="margin-top:var(--space-12)">
    Generated from <code>src/</code> by <code>build.mjs</code>. Edit the source, not <code>dist/</code>.
  </footer>
</div>
</div>
<script>
var root=document.documentElement;
function setTheme(t){
  root.setAttribute('data-theme',t);
  document.querySelectorAll('.card iframe').forEach(function(f){
    f.src=f.dataset.src+'?theme='+encodeURIComponent(t);
  });
  document.querySelectorAll('[data-set-theme]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.setTheme===t));});
}
document.querySelectorAll('[data-set-theme]').forEach(function(b){b.addEventListener('click',function(){setTheme(b.dataset.setTheme);});});
document.querySelectorAll('[data-filter]').forEach(function(b){
  b.addEventListener('click',function(){
    var g=b.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(function(x){x.classList.remove('br-btn--primary');});
    b.classList.add('br-btn--primary');
    document.querySelectorAll('.card').forEach(function(c){c.hidden=g!=='all'&&c.dataset.group!==g;});
  });
});
</script>
</body>
</html>`;
write('docs/index.html', gallery);

/* ── Tasks example: the Showcase page, on the built kit ─────────── */
if (existsSync(p('docs/previews/Showcase.html'))) {
  const showcase = read('docs/previews/Showcase.html')
    .replace('<button class="br-btn" id="cmd"', '<a class="br-btn br-btn--ghost br-btn--sm" href="../index.html">← Examples</a>\n       <button class="br-btn" id="cmd"');
  write('examples/tasks/index.html', showcase);
}

/* ── Root redirect ──────────────────────────────────────────────── */
write('index.html', `<!doctype html><meta charset="utf-8"><title>Brolly</title><meta http-equiv="refresh" content="0; url=docs/index.html"><a href="docs/index.html">Brolly docs</a>\n`);

/* ── Quick manifest for tooling ─────────────────────────────────── */
write('dist/components.json', JSON.stringify({ version: VERSION, components }, null, 2) + '\n');

console.log(`Brolly v${VERSION}`);
console.log(`  dist/brolly.css     ${(css.length / 1024).toFixed(1)} KB`);
console.log(`  dist/brolly.js      ${(jsBody.length / 1024).toFixed(1)} KB body`);
console.log(`  docs/previews       ${components.length} pages`);
console.log(`  docs/index.html`);
