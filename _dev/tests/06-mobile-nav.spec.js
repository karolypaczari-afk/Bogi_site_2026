// @ts-check
const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 375, height: 800 } });

test.describe('Mobile nav', () => {
    test('toggle opens and closes the mobile menu', async ({ page }) => {
        await page.goto('/');
        const toggle = page.locator('[data-nav-toggle]');
        const panel = page.locator('[data-mobile-nav]');

        await expect(toggle).toBeVisible();
        await expect(panel).toBeHidden();

        await toggle.click();
        await expect(panel).toBeVisible();
        await expect(panel).toHaveClass(/is-open/);

        const closeBtn = page.locator('[data-nav-close]');
        await closeBtn.click();
        await expect(panel).not.toHaveClass(/is-open/);
    });

    test('escape key closes the mobile menu', async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-nav-toggle]').click();
        await page.keyboard.press('Escape');
        await expect(page.locator('[data-mobile-nav]')).not.toHaveClass(/is-open/);
    });
});
