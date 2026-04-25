# Fonts self-hosting pipeline

**What:** `fonts/fonts.css` + `fonts/*.woff2` at the site root are self-hosted
copies of the Google Fonts previously loaded from `fonts.googleapis.com`.
Served by Hostinger directly; no third-party handshake on first byte.

**Why:** Google Fonts' stylesheet was the single largest render-blocking
resource on mobile — dropped mobile Lighthouse Performance to 48 in the
2026-04-24 audit. Self-hosting removes the cross-origin CSS request and lets
`.htaccess` apply `immutable` caching to the woff2 files.

## How to regenerate (e.g. if Google adds a new subset or you want a new weight)

1. Set the Google Fonts URL you want (same syntax as the old `head.njk` link
   but with whichever families/weights you need).

2. From `static-site/`, fetch with a modern Chrome User-Agent so Google
   returns woff2 URLs (the non-UA response gives TTF which is bigger):

   ```bash
   curl -sL -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
     "<google fonts css2 URL>" > _dev/fonts-pipeline/source.css
   ```

3. Download each `woff2` URL to `fonts/` and build a URL → filename map.
   The filename pattern is `<family-slug>-<google-hash>.woff2` (preserved
   across regenerations so preload links in `head.njk` don't break).

   ```bash
   cd fonts
   node -e "
   const fs=require('fs'), https=require('https');
   const css=fs.readFileSync('../_dev/fonts-pipeline/source.css','utf8');
   const urls=[...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g)||[])];
   const map={};
   let done=0;
   urls.forEach(u=>{
     const family=u.match(/\/s\/([^/]+)\//)[1];
     const hash=u.split('/').pop().replace('.woff2','');
     const fname=family+'-'+hash+'.woff2';
     map[u]=fname;
     https.get(u,r=>{const f=fs.createWriteStream(fname); r.pipe(f); f.on('finish',()=>{f.close();done++;if(done===urls.length)fs.writeFileSync('../_dev/fonts-pipeline/url-map.json',JSON.stringify(map,null,2));});});
   });
   "
   ```

4. Rewrite the CSS to point at local files:

   ```bash
   node -e "
   const fs=require('fs');
   let css=fs.readFileSync('_dev/fonts-pipeline/source.css','utf8');
   const map=JSON.parse(fs.readFileSync('_dev/fonts-pipeline/url-map.json','utf8'));
   for(const [u,n] of Object.entries(map)) css=css.split(u).join('/fonts/'+n);
   fs.writeFileSync('fonts/fonts.css', '/* Self-hosted Google Fonts. Regenerated '+new Date().toISOString().slice(0,10)+' */\n'+css);
   "
   ```

5. If any preloaded file's hash changed, update the `<link rel="preload">`
   entries in `_includes/partials/head.njk`. The critical latin subsets to
   preload are usually:
   - Fraunces latin normal (variable, `font-style: normal`, `font-weight: 400 900`)
   - Inter Tight latin 400 (frequently a single file shared across all weights)

6. `npm run build` + push. No `.htaccess` change needed — font caching rules
   already cover `.woff2` with `max-age=31536000, immutable`.

## Size

As of 2026-04-24 regeneration: **19 unique woff2 files, ~880 KB total on disk**.
Individual visitor downloads only the subsets matching their page's
unicode-range (`latin` + `latin-ext` for English/Hungarian/German is typical,
~150 KB of actual bytes on the wire).

---

# Font Awesome subset pipeline

Full-FA sources live at `fa-source/` (not served — Hostinger deny rule on
`_dev/`). The build script reads from there and emits compact subsets to
`/fonts/` (served).

## Files

- `fa-source/fa.css` — full 102 KB FA 6.5.1 Free CSS (from cdnjs)
- `fa-source/fa-solid-900.woff2`, `fa-regular-400.woff2`, `fa-brands-400.woff2`,
  `fa-v4compatibility.woff2` — full source woff2 files (~300 KB together)

## How it works

`_dev/scripts/build-fa-subset.js`:

1. Hardcoded `USED` array lists every icon class referenced anywhere on the
   site (HTML templates + `_data/*.json`). Keep it in sync when adding or
   removing icons.
2. Extracts the codepoint map from `fa.css` (`.fa-X:before { content: "\fXXX" }`).
3. Classifies each icon as `solid` / `regular` / `brands` (hardcoded sets
   for the small regular/brands exceptions).
4. Uses `subset-font` (harfbuzz WASM) to generate per-style subset woff2s
   containing only those glyphs.
5. Builds a minimal CSS: 3 `@font-face` blocks pointing at the subset
   woff2s + base display rules + only the `::before` content declarations
   we need.

Run from `static-site/`:
```
node _dev/scripts/build-fa-subset.js
```

Outputs to `fonts/`:
- `fa-subset.css` (~3 KB, was 102 KB — 97% smaller)
- `fa-solid-subset.woff2` (~4.5 KB, was 156 KB)
- `fa-regular-subset.woff2` (~0.85 KB, was 25 KB)
- `fa-brands-subset.woff2` (~0.7 KB, was 117 KB)

Total FA footprint on first visit: **~10 KB** (was ~400 KB).

## When to re-run

- Added a new `<i class="fa-new-icon">` somewhere → add it to `USED` and re-run.
- Added a new `"icon": "fa-something"` in a data file → same.
- Removed an icon → optional cleanup (still-included icons cost ~100-200 B each).

The Lighthouse "unused CSS" warning against the full FA CSS goes away once
the subset lands.
