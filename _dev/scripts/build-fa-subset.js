#!/usr/bin/env node
/**
 * Build a subset of Font Awesome 6.5.1 Free containing only the icons
 * actually referenced on bogihorvath.com (HTML + _data JSON).
 *
 * Inputs (in /fonts, committed):
 *   - fa.css                    full CSS with url() pointing at /fonts/fa-*.woff2
 *   - fa-solid-900.woff2        complete solid font
 *   - fa-regular-400.woff2      complete regular font
 *   - fa-brands-400.woff2       complete brands font
 *
 * Outputs (in /fonts):
 *   - fa-subset.css             only base rules + icon classes we use
 *   - fa-solid-subset.woff2     solid glyphs only for our icons
 *   - fa-regular-subset.woff2   regular glyphs only
 *   - fa-brands-subset.woff2    brands glyphs only
 *
 * After running, `fa.css` + the 4 full woff2 files can be removed, and
 * head.njk should point at fa-subset.css (paths inside the CSS point at
 * the subset woff2 files).
 *
 * Run from static-site/ : `node _dev/scripts/build-fa-subset.js`
 */
const fs = require('node:fs');
const path = require('node:path');
const subsetFont = require('subset-font');

const OUT_DIR = path.resolve(__dirname, '..', '..', 'fonts');
const SRC_DIR = path.resolve(__dirname, '..', 'fonts-pipeline', 'fa-source');

// Icons we actually use, enumerated from the site via grep of _includes,
// pages, index.njk, and _data/*.json. Legacy FA5 names work as aliases in
// FA6 CSS, so the same class names appear in both HTML and the unprefixed
// CSS definitions — we can match by class name directly.
const USED = [
    'fa-arrow-left', 'fa-arrow-right', 'fa-bars', 'fa-bolt', 'fa-book',
    'fa-building', 'fa-chart-bar', 'fa-chart-line', 'fa-chart-pie',
    'fa-check', 'fa-check-circle', 'fa-chess', 'fa-chevron-down',
    'fa-chevron-right', 'fa-chevron-up', 'fa-cogs', 'fa-crown',
    'fa-drafting-compass', 'fa-envelope', 'fa-euro-sign', 'fa-exchange-alt',
    'fa-file-alt', 'fa-file-pdf', 'fa-globe', 'fa-heart', 'fa-home',
    'fa-industry', 'fa-language', 'fa-layer-group', 'fa-linkedin',
    'fa-linkedin-in', 'fa-list-check', 'fa-medal', 'fa-microchip',
    'fa-microsoft', 'fa-network-wired', 'fa-paper-plane', 'fa-project-diagram',
    'fa-robot', 'fa-rocket', 'fa-server', 'fa-sitemap', 'fa-sync',
    'fa-sync-alt', 'fa-tasks', 'fa-times', 'fa-user-check', 'fa-users',
];

function extractCodepoints(css, iconNames) {
    // Map class -> codepoint by parsing lines like:
    //   .fa-home:before,.fa-house:before{content:"\f015"}
    // or newer FA6 format:
    //   .fa-home:before{content:"\f015"}
    const cpByIcon = {};
    const re = /\.([a-z0-9-]+(?::before)?(?:,\.[a-z0-9-]+(?::before)?)*)\s*\{\s*content\s*:\s*['"](\\[0-9a-f]+)['"]/gi;
    let m;
    while ((m = re.exec(css)) !== null) {
        const selectors = m[1].split(',');
        const cp = m[2];
        for (const sel of selectors) {
            const clean = sel.replace(':before', '').replace('.', '').trim();
            if (clean.startsWith('fa-')) cpByIcon[clean] = cp;
        }
    }
    const result = {};
    for (const name of iconNames) {
        if (cpByIcon[name]) result[name] = cpByIcon[name];
        else console.warn('No codepoint found for', name);
    }
    return result;
}

// Classify each icon by which font file its glyph lives in.
// We do this by checking which font-family base rule wraps each icon class.
// Simpler heuristic: FA6 Free puts *all* legacy-named solid icons in fa-solid-900;
// a small number in fa-regular-400 (the 'far' style); brands in fa-brands-400.
// We already know the style from HTML: fas=solid, far=regular, fab=brands.
// Data-only icons (fa-euro-sign, fa-chart-line, etc. from _data) use `fas` via
// the template `<i class="fas {{ icon }}">`, so all of those are solid.
// Only explicit `far` or `fab` icons live outside solid.
const REGULAR_ICONS = new Set(['fa-envelope', 'fa-file-alt', 'fa-file-pdf']);
// Note: fa-envelope also has a solid variant; the `fas fa-envelope` usage uses that one.
const BRANDS_ICONS = new Set(['fa-linkedin', 'fa-linkedin-in', 'fa-microsoft']);

function classify(iconName) {
    if (BRANDS_ICONS.has(iconName)) return 'brands';
    if (REGULAR_ICONS.has(iconName)) return 'regular';
    return 'solid';
}

async function subsetAndWrite(fontFile, codepoints, outFile) {
    if (!codepoints.length) {
        console.log(`  ${outFile}: no codepoints, skipping`);
        return;
    }
    const buf = fs.readFileSync(path.join(SRC_DIR, fontFile));
    // subset-font takes a string of characters, not codepoints — convert.
    const text = codepoints.map((cp) => String.fromCodePoint(parseInt(cp.replace('\\', ''), 16))).join('');
    const subset = await subsetFont(buf, text, { targetFormat: 'woff2' });
    fs.writeFileSync(path.join(OUT_DIR, outFile), subset);
    console.log(`  ${outFile}: ${buf.length} B -> ${subset.length} B (${Math.round((1 - subset.length/buf.length) * 100)}% smaller, ${codepoints.length} glyphs)`);
}

function buildSubsetCSS(originalCss, usedClasses) {
    // Extract @font-face blocks (keep all 3, path them at subset files).
    const atFace = [];
    const faceRe = /@font-face\s*\{[^}]*\}/g;
    let fm;
    while ((fm = faceRe.exec(originalCss)) !== null) {
        let block = fm[0];
        // Only keep blocks for the three families we care about; skip v4compatibility.
        if (/FontAwesome[^\w]/.test(block)) continue;
        block = block.replace(/fa-solid-900\.woff2/g, 'fa-solid-subset.woff2');
        block = block.replace(/fa-regular-400\.woff2/g, 'fa-regular-subset.woff2');
        block = block.replace(/fa-brands-400\.woff2/g, 'fa-brands-subset.woff2');
        // Strip .ttf fallback URLs — we don't ship TTFs (all modern browsers support woff2).
        block = block.replace(/\s*,\s*url\([^)]+\.ttf\)\s*format\(["']truetype["']\)/g, '');
        atFace.push(block);
    }

    // Extract BASE style rules (.fa, .fas, .far, .fab, .fa-classic, etc + ::before display).
    // We identify by the family assignment or by shape: "font-family:..." inside.
    const baseRules = [];
    const ruleRe = /(\.[a-z0-9_,:\-\s.]+)\s*\{([^}]+)\}/gi;
    let rm;
    while ((rm = ruleRe.exec(originalCss)) !== null) {
        const sel = rm[1].trim();
        const body = rm[2];
        // Keep if: (a) rule references font-family/font-weight for FA families,
        // or (b) it's a display/pseudo rule for .fa/.fas/.far/.fab bare classes
        const isBase = /font-family\s*:\s*['"]?Font\s*Awesome/i.test(body) ||
                       /^\.(fa|fas|far|fab|fa-solid|fa-regular|fa-brands|fa-classic)(::?before)?(\s*,.*)?$/i.test(sel) ||
                       (sel.includes(':before') && /display|content\s*:\s*var/.test(body));
        // Exclude icon-specific rules (they look like .fa-home:before { content: "\f015" })
        const isIconContent = /^\.fa-[a-z0-9-]+:before/i.test(sel) && /content\s*:\s*['"]/.test(body);
        if (isBase && !isIconContent) {
            baseRules.push(rm[0]);
        }
    }

    // Extract icon content declarations for ONLY our used classes.
    const iconRules = [];
    const cre = /(\.fa-[a-z0-9-]+(?::before)?(?:\s*,\s*\.fa-[a-z0-9-]+(?::before)?)*)\s*\{\s*content\s*:\s*(['"]\\[0-9a-f]+['"])\s*\}/gi;
    let cm;
    while ((cm = cre.exec(originalCss)) !== null) {
        const selList = cm[1].split(',').map((s) => s.trim());
        const cleanNames = selList.map((s) => s.replace(':before', '').replace('.', ''));
        const usedSubset = selList.filter((_, i) => usedClasses.has(cleanNames[i]));
        if (usedSubset.length) {
            iconRules.push(`${usedSubset.join(',')}{content:${cm[2]}}`);
        }
    }

    const header = '/* Font Awesome 6.5.1 Free — subset for bogihorvath.com (only used icons).\n' +
                   `   Generated ${new Date().toISOString().slice(0,10)} by _dev/scripts/build-fa-subset.js\n` +
                   '   Full CSS/fonts were ~500 KB on first visit; subset is ~20-30 KB. */\n';

    return header + atFace.join('\n') + '\n' + baseRules.join('') + iconRules.join('');
}

async function main() {
    const fullCss = fs.readFileSync(path.join(SRC_DIR, 'fa.css'), 'utf8');
    const codepoints = extractCodepoints(fullCss, USED);

    const used = new Set(USED);

    // Split codepoints by target font file.
    const byFont = { solid: [], regular: [], brands: [] };
    for (const [icon, cp] of Object.entries(codepoints)) {
        const style = classify(icon);
        byFont[style].push(cp);
    }
    console.log('Subsetting:');
    console.log(`  solid:   ${byFont.solid.length} glyphs`);
    console.log(`  regular: ${byFont.regular.length} glyphs`);
    console.log(`  brands:  ${byFont.brands.length} glyphs`);

    // Write subset fonts. Solid must always get fa-check-circle (used by CSS ::before pseudo).
    // Already included via USED list.
    await subsetAndWrite('fa-solid-900.woff2',   byFont.solid,   'fa-solid-subset.woff2');
    await subsetAndWrite('fa-regular-400.woff2', byFont.regular, 'fa-regular-subset.woff2');
    await subsetAndWrite('fa-brands-400.woff2',  byFont.brands,  'fa-brands-subset.woff2');

    const subsetCss = buildSubsetCSS(fullCss, used);
    fs.writeFileSync(path.join(OUT_DIR, 'fa-subset.css'), subsetCss);
    console.log(`  fa-subset.css: ${fullCss.length} B -> ${subsetCss.length} B (${Math.round((1 - subsetCss.length/fullCss.length) * 100)}% smaller)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
