// @ts-check
const { test, expect } = require('@playwright/test');

test('@smoke contact form posts to Web3Forms and shows success', async ({ page }) => {
    await page.goto('/');

    // Intercept the Web3Forms request
    await page.route('https://api.web3forms.com/submit', async (route) => {
        const payload = JSON.parse(route.request().postData() || '{}');
        expect(payload.access_key).toBe('0909516c-58b1-4bb3-80f4-e6f68f1e68ac');
        expect(payload.name).toBe('Test User');
        expect(payload.email).toBe('test@example.com');
        expect(payload.message).toContain('Hello');
        await route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify({ success: true, message: 'ok' }),
        });
    });

    await page.locator('#contact-name').fill('Test User');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-message').fill('Hello from Playwright');
    await page.locator('[data-contact-form] [type="submit"]').click();

    await expect(page.locator('[data-contact-success]')).toBeVisible();
    await expect(page.locator('[data-contact-success]')).toContainText(/Message sent/i);
});

test('@smoke contact form shows error on failed submission', async ({ page }) => {
    await page.goto('/');

    await page.route('https://api.web3forms.com/submit', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ success: false, message: 'fail' }),
        });
    });

    await page.locator('#contact-name').fill('X');
    await page.locator('#contact-email').fill('x@x.com');
    await page.locator('#contact-message').fill('Boom');
    await page.locator('[data-contact-form] [type="submit"]').click();

    await expect(page.locator('.form__alert--error')).toBeVisible();
});
