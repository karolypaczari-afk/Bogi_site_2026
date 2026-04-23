// @ts-check
const { test, expect } = require('@playwright/test');
const { PAGES } = require('./helpers/pages');

const viewports = [
    { w: 375, h: 800, label: 'mobile' },
    { w: 768, h: 1024, label: 'tablet' },
    { w: 1280, h: 800, label: 'desktop' },
];

for (const vp of viewports) {
    for (const p of PAGES) {
        test(`@responsive ${p.name} at ${vp.label} has no horizontal overflow`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await page.goto(p.path);
            const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            const viewportWidth = await page.evaluate(() => window.innerWidth);
            // 1px tolerance for sub-pixel rendering
            expect(docWidth - viewportWidth, `overflow on ${p.path}`).toBeLessThanOrEqual(1);
        });
    }
}
