// @ts-check
const { test, expect } = require('@playwright/test');
const { PAGES } = require('./helpers/pages');

for (const p of PAGES) {
    test.describe(`@seo ${p.name}`, () => {
        test('has title, description, canonical, and og tags', async ({ page }) => {
            await page.goto(p.path);
            await expect(page).toHaveTitle(/.{10,}/);
            const description = await page.locator('meta[name="description"]').getAttribute('content');
            expect(description, `description on ${p.path}`).toBeTruthy();
            expect(description.length).toBeGreaterThan(30);

            const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
            expect(canonical, `canonical on ${p.path}`).toMatch(/^https:\/\/bogihorvath\.com/);

            await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
            await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
            await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https?:\/\//);
        });

        test('has Person JSON-LD on every page', async ({ page }) => {
            await page.goto(p.path);
            const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
            expect(scripts.length).toBeGreaterThanOrEqual(1);
            const combined = scripts.join(' ');
            expect(combined).toContain('"Person"');
            expect(combined).toContain('Boglarka');
        });

        test('has exactly one h1', async ({ page }) => {
            await page.goto(p.path);
            const count = await page.locator('h1').count();
            expect(count, `h1 count on ${p.path}`).toBe(1);
        });
    });
}
