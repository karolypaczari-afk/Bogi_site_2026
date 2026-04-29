# CLAUDE.md — bogihorvath.com

Project guidance for any AI assistant (Claude Code or otherwise) working on this site.

## What this project is

Personal portfolio for **Boglárka Paczari-Horváth** ("Bogi Horvath"), AI-Augmented Process Transformation Lead. Live at `https://bogihorvath.com`.

Built on **Eleventy 2.0.1** (Nunjucks templates). Zero frontend framework. Vanilla CSS/JS with a small `_dev/build.js` that minifies `*.src.css` / `*.src.js` and injects a `buildHash` for cache-busting. Deployed to **Hostinger** via a `git push origin main` webhook auto-pull (expect ~1 min propagation).

## Working directory invariant

- **Authoritative source:** `C:\claudecode_use\Bogi Site 2026\static-site\` — edit here only.
- **Archived React code:** `C:\claudecode_use\Bogi Site 2026\_archive_old_react_site\` — do not edit, do not delete. Kept as reference.
- **GitHub:** `karolypaczari-afk/Bogi_site_2026`, branch `main`.
- `git remote -v` inside `static-site/` should show that repo. If it doesn't, re-add before acting.

## Deployment flow

```
edit → git add → git commit → git push origin main → Hostinger auto-pull → live in ~1 min
```

No build step runs on the server — Hostinger serves the repo as-is. That means the committed `_site/` output has to be current. Always run `npm run build` before committing changes that touch `*.src.css` / `*.src.js` / `pages/` / `_includes/`.

## Conversion goal hierarchy (do not reorder without explicit instruction)

1. **Primary — recruiter downloads `Bogi_CV.pdf`** (ungated, no email wall, 2 pages).
2. **Secondary — LinkedIn profile click** (outline / linkedin-blue styling).
3. **Tertiary — contact form submission** (Web3Forms, public access key).

Audience is primarily mobile recruiters who scroll ~20% of the page. CTA density and early placement matter more than content depth.

### Conversion invariants (must not be removed without discussion)

- `_includes/partials/sticky-mobile-cta.njk` — primary mobile surface, appears after 100px scroll, shown only `< 768px`.
- `_includes/partials/post-download-modal.njk` — fires 1.5 s after any CV click, offers LinkedIn / message as chained secondary.
- `_includes/partials/for-recruiters-card.njk` — 10-second scan card, first section after hero. Driven by `_data/site.json → recruiterFacts`.
- Three inline CV CTAs on home: after Achievements, after Testimonials, after Services. These use `_includes/partials/inline-cv-cta.njk` with `inlineCtaLocation`, `inlineCtaHeading`, `inlineCtaSub` locals.
- Section order on `index.njk`: Hero → For Recruiters → Achievements → inline CTA → Testimonials → inline CTA → Timeline → How I Work → Services → inline CTA → Skills → Certs → Contact. **Proof-first.** Do not revert to services-first.
- The `/cv` route (`pages/cv.njk`) is a short-link that redirects to `/Bogi_CV.pdf`. Used in LinkedIn bio + email signature.

### `data-cta-location` invariant

Every CV or LinkedIn `<a>` carries a `data-cta-location` attribute. The GA4 event `bh_cv_download` reads this to attribute conversions by surface (e.g. `hero_primary`, `sticky_mobile`, `inline_after_achievements`, `recruiter_card`, `blog_footer`). **Preserve this attribute when editing CTAs.** When adding a new CTA, invent a new location name; do not reuse an existing one.

## Content language strategy

**English only.** Bogi is Hungarian (based in Belgium), fluent in English / Hungarian / German, but recruiter traffic is international and LinkedIn-driven. `hreflang` in `head.njk` is `en` + `x-default`. Do not add a Hungarian variant without an explicit ask — it would fragment analytics and duplicate maintenance.

## Gone by design — do not re-add

- AI chatbot, admin dashboard, Supabase backend, newsletter signup flow. All removed during the 2026-04-23 cutover from the React SPA. If a feature request implies any of these, confirm with Bogi before implementing.
- Mock databases in tests.
- Meta Pixel / Google Ads tags (explicitly blanked in `js/tracking.src.js:19`).

## Tracking & consent

- GTM `GTM-W3LHSQ2R` drives GA4 `G-W1JERJNXLS` + Clarity `mrbhk2dvb4`. No direct `gtag.js` to avoid double-counting.
- Consent Mode v2: **opt-out default** (all granted, `wait_for_update: 500`). Banner flips categories to denied only if user rejects. `BH_TRACKING_CONFIG.requireConsent = true` in `js/tracking.src.js`.
- Server-side failover at `api/log-event.php` — rate-limited (300 events/min/IP), same-origin-only, JSONL-logs to `/api/events/YYYY-MM-DD.jsonl`. `.htaccess` rewrite-denies `api/(events|submissions|rate)`.
- Custom events: `bh_cv_download`, `bh_linkedin_click`, `bh_email_click`, `bh_contact_form_start`, `bh_booking_modal_open`, `bh_sticky_bar_impression`.

## Security / infrastructure already in place

- `.htaccess` enforces HSTS, GZIP, immutable image/font caching, www→apex redirect, HTTPS enforcement, WP-legacy 301 redirects (pulls link equity from GSC), dotfile + `package.json` / `composer.json` / `.mcp.json` deny, directory listing disabled, `api/(events|submissions|rate)` returns 403.
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security max-age=31536000; includeSubDomains`.
- Forms: honeypot `botcheck` field; Web3Forms access key is public-by-design and fine to inline in HTML.

## Common commands

```bash
npm run build          # _dev/build.js (minify/hash) + Eleventy build
npm run dev            # Eleventy watch
npm run serve          # http-server on :8080
npm run check          # biome + html-validate + stylelint
npm run test           # full Playwright suite
npm run test:fast      # quick subset (custom runner at _dev/test-fast.js)
npm run test:smoke     # @smoke-tagged specs only
npm run test:a11y      # @a11y-tagged specs only
npm run test:seo       # @seo-tagged specs only
npm run optimize:images:dry  # audit image pipeline without writing
```

## Code conventions

- **Biome formatter enabled** (4-space indent, 120 line width, single quotes, LF endings, trailing commas `es5`).
- **Biome linter enabled** (recommended ruleset). Scope currently: `*.json`, `playwright.config.js`, `_dev/**/*.js`. The public `js/*.src.js` files are **not** yet under lint — they were excluded during the cutover and a rule-by-rule cleanup is Wave 4 territory.
- **html-validate** on `index.html` + `pages/**/index.html`.
- **stylelint** on `css/**/*.css` (`stylelint-config-standard`).
- Nunjucks-only template format.

## Playwright test structure

Specs live in `_dev/tests/`, tagged via spec-name: `@smoke`, `@a11y`, `@seo`, `@responsive`, `@security`, `@forms`, `@content`, `@mobile-nav`. Two browser projects — `chromium` (1280×720) and `webkit-ios` (iPhone 13, only runs `00-ios-smoke.spec.js`). Console error filter deliberately ignores `googletagmanager|clarity|font-awesome|GTM|gtag` noise in dev.

## CI

- `.github/workflows/ci.yml` runs on PR (`check + build + test:smoke + lighthouse`) and on push to `main` (adds `test:a11y + test:seo + test:responsive`).
- `.github/lighthouserc.json` sets **regression-floor** assertions: Performance ≥ 0.75 (warn), Accessibility ≥ 0.9 (error), Best Practices ≥ 0.9 (error), SEO ≥ 0.95 (error), CLS ≤ 0.1 (error), TBT ≤ 500 ms (warn). These are floors, not aspirations — ratchet them up as optimizations land. Baselines at the time of wiring: desktop 81/94/96/100, mobile 48/94/96/100 (mobile drag = render-blocking Google Fonts + Font Awesome CSS).
- Visual regression spec: `_dev/tests/14-visual.spec.js`. Run `npm run test:visual:update` locally once to generate baselines, commit the `__snapshots__/` folder, then CI will diff against them.
- Lighthouse baseline JSON artifacts live in `_dev/lighthouse/*-baseline.json` (mirrors the `lh-*.json` pattern borrowed from `1. HTML Creation`).

## When a request is ambiguous

- "Fix the site" / "edit the page" / "deploy" → always `static-site/`, push to `main`.
- A reference to an old React component (`Hero.tsx`, `Dashboard.tsx`, etc.) → translate intent into Eleventy `.njk` + data JSON, not a React change.
- "Add a CTA" → CV download primary, LinkedIn secondary, form tertiary, `data-cta-location` required.
- "Improve SEO" → edit `_includes/partials/head.njk` + relevant `_data/*.json`, not raw HTML.

## Reference projects on local disk (read-only)

- `C:\claudecode_use\Bagolykaland.hu NEWSITE 2026\` — the Eleventy template that inspired this site. Good source for CSS tokens, test tiers, consent banner variants.
- `C:\claudecode_use\1. HTML Creation\` — sibling project (different audience, PHP/Stripe). Good source for the committed-Lighthouse pattern (`_dev/lh-*.json` artifacts). **Do not import its payment / newsletter flows.**

These are cross-project references only. Never edit them from this project.
