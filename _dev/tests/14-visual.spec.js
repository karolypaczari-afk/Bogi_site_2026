// @ts-check
const { test, expect } = require('@playwright/test');
const { PAGES, VISUAL_BREAKPOINTS } = require('./helpers/pages');

// Visual regression — snapshots home + about at mobile + desktop widths.
// Run `npx playwright test --grep @visual --update-snapshots` when intentional changes land.

test.describe('@visual full-page snapshots', () => {
    test.setTimeout(60000);

    const VISUAL_PAGES = PAGES.filter((p) => p.path === '/' || p.path === '/about/');

    for (const bp of VISUAL_BREAKPOINTS) {
        test.describe(`@ ${bp.width}px (${bp.name})`, () => {
            test.use({ viewport: { width: bp.width, height: 900 } });

            for (const pg of VISUAL_PAGES) {
                test(`${pg.name}`, async ({ page }) => {
                    // Neutralise animations / transitions for stable pixels
                    await page.addInitScript(() => {
                        const style = document.createElement('style');
                        style.textContent = `
                            *, *::before, *::after {
                                animation-duration: 0s !important;
                                animation-delay: 0s !important;
                                transition-duration: 0s !important;
                                transition-delay: 0s !important;
                                scroll-behavior: auto !important;
                            }
                            .reveal { opacity: 1 !important; transform: none !important; }
                        `;
                        document.addEventListener('DOMContentLoaded', () =>
                            document.head.appendChild(style)
                        );
                    });

                    await page.goto(pg.path, { waitUntil: 'domcontentloaded' });
                    await page.evaluate(() => document.fonts.ready);
                    // Let hero images/portrait settle
                    await page.waitForLoadState('load');

                    const slug = pg.path.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_') || 'home';
                    await expect(page).toHaveScreenshot(`${slug}-${bp.width}px.png`, {
                        fullPage: true,
                        maxDiffPixelRatio: 0.005,
                    });
                });
            }
        });
    }
});
