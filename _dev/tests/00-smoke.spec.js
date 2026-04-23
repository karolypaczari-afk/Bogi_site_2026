// @ts-check
const { test, expect } = require('@playwright/test');
const { PAGES } = require('./helpers/pages');

for (const page of PAGES) {
    test.describe(`@smoke ${page.name} (${page.path})`, () => {
        test('loads with 200 status and renders title', async ({ page: pw }) => {
            const res = await pw.goto(page.path);
            expect(res).not.toBeNull();
            // 404.html returns 200 from http-server but we still render
            expect(res.status(), `status for ${page.path}`).toBeLessThan(400);
            await expect(pw).toHaveTitle(/.+/);
        });

        test('has a main landmark and site header', async ({ page: pw }) => {
            await pw.goto(page.path);
            await expect(pw.locator('main#main-content')).toBeVisible();
            await expect(pw.locator('.site-header')).toBeVisible();
            await expect(pw.locator('.site-footer')).toBeVisible();
        });

        test('has no console errors on load', async ({ page: pw }) => {
            const errors = [];
            pw.on('pageerror', (err) => errors.push(err.message));
            pw.on('console', (msg) => {
                if (msg.type() === 'error') errors.push(msg.text());
            });
            await pw.goto(page.path, { waitUntil: 'networkidle' });
            // Allow tracking script noise from missing GTM/Clarity hosts in dev
            const hardErrors = errors.filter(
                (e) =>
                    !/googletagmanager|clarity|font-awesome|GTM|gtag/i.test(e) &&
                    !/Failed to load resource/.test(e)
            );
            expect(hardErrors, `errors on ${page.path}`).toEqual([]);
        });
    });
}
