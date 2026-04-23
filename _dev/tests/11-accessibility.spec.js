// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PAGES } = require('./helpers/pages');

for (const p of PAGES) {
    test(`@a11y ${p.name} has no serious/critical axe violations`, async ({ page }) => {
        await page.goto(p.path);
        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
            .disableRules(['color-contrast'])
            .analyze();

        const serious = results.violations.filter(
            (v) => v.impact === 'serious' || v.impact === 'critical'
        );
        if (serious.length) {
            console.log(
                `axe violations on ${p.path}:`,
                serious.map((v) => `${v.id} (${v.nodes.length})`).join(', ')
            );
        }
        expect(serious).toEqual([]);
    });
}

test('@a11y skip link is first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const activeText = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    expect(activeText).toMatch(/Skip to content/i);
});
