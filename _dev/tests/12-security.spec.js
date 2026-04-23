// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('inline scripts are limited to tracking loaders', async ({ page }) => {
    await page.goto('/');
    const inlineScripts = await page.$$eval('script:not([src])', (els) =>
        els.map((s) => s.textContent.trim())
    );
    // Allowed inline scripts: GTM, GA4 gtag config, Microsoft Clarity, JSON-LD (type="application/ld+json")
    const suspicious = inlineScripts.filter(
        (s) =>
            s.length > 0 &&
            !/googletagmanager|gtag\(|dataLayer|clarity\.ms|clarity", "script"|@context/i.test(s)
    );
    expect(suspicious).toEqual([]);
});

test('external links to blog/LinkedIn use rel="noopener"', async ({ page }) => {
    await page.goto('/');
    const externalLinks = await page.$$eval('a[target="_blank"]', (links) =>
        links.map((a) => ({ href: a.getAttribute('href'), rel: a.getAttribute('rel') || '' }))
    );
    for (const { href, rel } of externalLinks) {
        expect(rel, `missing rel on ${href}`).toMatch(/noopener/);
    }
});

test('no hardcoded api keys or secrets in served HTML', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    // AWS keys, Stripe live secret, GitHub token formats
    expect(html).not.toMatch(/AKIA[0-9A-Z]{16}/);
    expect(html).not.toMatch(/sk_live_[0-9a-zA-Z]{24,}/);
    expect(html).not.toMatch(/ghp_[0-9A-Za-z]{36,}/);
});

test('css and js source files do not contain supabase credentials', () => {
    const root = path.resolve(__dirname, '../..');
    const walk = (dir) => {
        const out = [];
        for (const f of fs.readdirSync(dir)) {
            const full = path.join(dir, f);
            if (f === 'node_modules' || f.startsWith('.')) continue;
            const stat = fs.statSync(full);
            if (stat.isDirectory()) out.push(...walk(full));
            else if (/\.(js|css|njk|html|json)$/.test(f)) out.push(full);
        }
        return out;
    };
    const files = walk(root);
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        expect(content, `supabase URL leaked in ${file}`).not.toMatch(/rhrclbsseerdtiaizyiq/);
        expect(content, `supabase anon key in ${file}`).not.toMatch(/sb_publishable_/);
    }
});
