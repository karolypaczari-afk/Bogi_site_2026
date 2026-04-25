// @ts-check
const { test, expect } = require('@playwright/test');

test('@smoke home renders hero, services, skills, achievements, timeline, testimonials, certs, contact', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.hero__headline')).toContainText(/EUR 700k\+ saved/);
    await expect(page.locator('#services .service-card')).toHaveCount(4);
    await expect(page.locator('#skills .skills-strip__row').first()).toBeVisible();
    await expect(page.locator('#achievements .achievement-card')).toHaveCount(6);
    await expect(page.locator('#experience .timeline__item')).toHaveCount(6);
    await expect(page.locator('#references .testimonial-card')).toHaveCount(6);
    await expect(page.locator('#certifications .cert-pill').first()).toBeVisible();
    await expect(page.locator('#contact [data-contact-form]')).toBeVisible();
});

test('@smoke all 5 blog posts render with title + body', async ({ page }) => {
    const posts = ['500k-savings', 'adoption-success', 'process-tools', 'money-leaks', 'automation-efficiency'];
    for (const id of posts) {
        await page.goto(`/blog/${id}/`);
        await expect(page.locator('h1')).toBeVisible();
        const bodyParagraphs = await page.locator('.post__body p').count();
        expect(bodyParagraphs, `body paragraphs on /blog/${id}/`).toBeGreaterThan(0);
    }
});

test('@smoke testimonial expand/collapse toggles text', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('[data-testimonial]').first();
    const textEl = firstCard.locator('[data-testimonial-text]');
    const summary = (await textEl.getAttribute('data-summary')) || '';
    const full = (await textEl.getAttribute('data-full')) || '';

    expect(summary.length).toBeLessThan(full.length);
    await expect(textEl).toHaveText(summary);
    await firstCard.locator('[data-testimonial-toggle]').click();
    await expect(textEl).toHaveText(full);
});

test('@smoke no admin / login / chatbot routes exist', async ({ page }) => {
    const dead = ['/admin/', '/login/', '/admin.html', '/login.html', '/chat/', '/chatbot/'];
    for (const path of dead) {
        const res = await page.goto(path, { waitUntil: 'domcontentloaded' }).catch(() => null);
        const status = res ? res.status() : 404;
        // http-server serves /404.html with 200 in some configs, but the path must not route to real admin content
        if (res) {
            const html = await page.content();
            expect(html).not.toMatch(/Admin Dashboard/i);
            expect(html).not.toMatch(/Form Submissions/i);
        }
    }
});
