/**
 * bogihorvath.com — main client script
 * - reveal-on-scroll (IntersectionObserver)
 * - sticky header shadow
 * - mobile nav toggle
 * - testimonial expand/collapse
 * - contact + booking form submission (Web3Forms)
 * - reading progress bar on blog posts
 * - service worker registration
 */
(function () {
    'use strict';

    const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- reveal on scroll ------------------------------------------------
    function initReveals() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        if (!('IntersectionObserver' in window) || prefersReducedMotion) {
            els.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
        );

        els.forEach((el) => io.observe(el));

        document.querySelectorAll('[data-stagger]').forEach((group) => {
            Array.from(group.children).forEach((child, i) => {
                child.style.setProperty('--stagger-index', i);
            });
        });
    }

    // ---- sticky header state --------------------------------------------
    function initHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        let rafPending = false;
        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(() => {
                header.classList.toggle('is-scrolled', window.scrollY > 40);
                rafPending = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---- mobile nav ------------------------------------------------------
    function initMobileNav() {
        const toggle = document.querySelector('[data-nav-toggle]');
        const panel = document.querySelector('[data-mobile-nav]');
        const close = document.querySelector('[data-nav-close]');
        if (!toggle || !panel) return;

        const open = () => {
            panel.classList.add('is-open');
            document.body.classList.add('no-scroll');
            toggle.setAttribute('aria-expanded', 'true');
            const firstLink = panel.querySelector('a, button');
            if (firstLink) firstLink.focus();
        };
        const shut = () => {
            panel.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', open);
        if (close) close.addEventListener('click', shut);

        panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', shut));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.classList.contains('is-open')) shut();
        });
    }

    // ---- testimonials expand/collapse -----------------------------------
    function initTestimonials() {
        document.querySelectorAll('[data-testimonial]').forEach((card) => {
            const btn = card.querySelector('[data-testimonial-toggle]');
            const text = card.querySelector('[data-testimonial-text]');
            if (!btn || !text) return;

            const summary = text.getAttribute('data-summary') || text.textContent.trim();
            const full = text.getAttribute('data-full') || summary;

            btn.addEventListener('click', () => {
                const expanded = card.getAttribute('data-expanded') === 'true';
                card.setAttribute('data-expanded', expanded ? 'false' : 'true');
                text.textContent = expanded ? summary : full;
            });
        });
    }

    // ---- forms -----------------------------------------------------------
    const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
    const SERVER_LOG_URL = '/api/save-submission.php';

    function logToServer(payload) {
        // Failover copy saved to server log — runs in parallel to Web3Forms.
        // Fire-and-forget: any failure is non-fatal for user flow.
        try {
            fetch(SERVER_LOG_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'same-origin',
                keepalive: true,
            }).catch(() => {});
        } catch (err) { /* silent */ }
    }

    function setFormState(form, state) {
        form.setAttribute('data-state', state);
        const submit = form.querySelector('[type="submit"]');
        if (submit) submit.disabled = state === 'submitting';
    }

    function showFormAlert(form, kind, message) {
        let alert = form.querySelector('.form__alert');
        if (!alert) {
            alert = document.createElement('div');
            alert.className = 'form__alert';
            form.insertBefore(alert, form.querySelector('[type="submit"]'));
        }
        alert.className = `form__alert form__alert--${kind}`;
        alert.textContent = message;
    }

    async function submitWeb3Form(form, extraFields) {
        const fd = new FormData(form);

        const honeypot = fd.get('botcheck');
        if (honeypot) return { success: false, message: 'Bot detected.' };

        const formFields = Object.fromEntries(fd.entries());
        delete formFields.botcheck;

        const payload = {
            access_key: form.dataset.accessKey,
            from_name: form.dataset.fromName || 'Bogi Horvath Website',
            subject: form.dataset.subject || `New message from ${fd.get('name') || 'the website'}`,
            cc: form.dataset.cc || '',
            replyto: fd.get('email') || '',
            ...formFields,
            ...(extraFields || {}),
        };

        // Fire server-side failover log in parallel (fire-and-forget)
        logToServer(formFields);

        const response = await fetch(WEB3FORMS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) return { success: false, message: 'Network error.' };
        const result = await response.json();
        return {
            success: Boolean(result.success),
            message: result.message || (result.success ? 'Submitted.' : 'Submission failed.'),
        };
    }

    function initContactForm() {
        const form = document.querySelector('[data-contact-form]');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            setFormState(form, 'submitting');
            const prevAlert = form.querySelector('.form__alert');
            if (prevAlert) prevAlert.remove();

            try {
                const { success, message } = await submitWeb3Form(form);
                if (success) {
                    setFormState(form, 'success');
                    const successView = document.querySelector('[data-contact-success]');
                    if (successView) {
                        form.hidden = true;
                        successView.hidden = false;
                    }
                    form.reset();

                    const resetBtn = successView && successView.querySelector('[data-contact-reset]');
                    if (resetBtn) {
                        resetBtn.addEventListener(
                            'click',
                            () => {
                                form.hidden = false;
                                successView.hidden = true;
                                setFormState(form, 'idle');
                            },
                            { once: true }
                        );
                    }
                } else {
                    setFormState(form, 'error');
                    showFormAlert(form, 'error', message || 'Something went wrong. Please try again.');
                }
            } catch (err) {
                console.error('contact form error', err);
                setFormState(form, 'error');
                showFormAlert(form, 'error', 'Network error. Please try again or email directly.');
            }
        });
    }

    function initBookingModal() {
        const modal = document.querySelector('[data-booking-modal]');
        if (!modal) return;

        const openers = document.querySelectorAll('[data-booking-open]');
        const closers = modal.querySelectorAll('[data-booking-close]');
        const form = modal.querySelector('[data-booking-form]');
        const overlay = modal.querySelector('[data-booking-overlay]');

        const open = () => {
            modal.removeAttribute('inert');
            modal.classList.add('is-open');
            document.body.classList.add('no-scroll');
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        };
        const shut = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('inert', '');
            document.body.classList.remove('no-scroll');
        };

        openers.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); open(); }));
        closers.forEach((btn) => btn.addEventListener('click', shut));
        if (overlay) overlay.addEventListener('click', shut);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) shut();
        });

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            setFormState(form, 'submitting');
            const prev = form.querySelector('.form__alert');
            if (prev) prev.remove();

            try {
                const { success, message } = await submitWeb3Form(form);
                if (success) {
                    const successView = modal.querySelector('[data-booking-success]');
                    if (successView) {
                        form.hidden = true;
                        successView.hidden = false;
                    }
                    setFormState(form, 'success');
                    form.reset();
                } else {
                    setFormState(form, 'error');
                    showFormAlert(form, 'error', message || 'Submission failed. Please email directly.');
                }
            } catch (err) {
                console.error('booking form error', err);
                setFormState(form, 'error');
                showFormAlert(form, 'error', 'Network error. Please try again.');
            }
        });
    }

    // ---- reading progress -----------------------------------------------
    function initReadingProgress() {
        const bar = document.querySelector('[data-reading-progress]');
        if (!bar) return;

        let rafPending = false;
        const update = () => {
            const doc = document.documentElement;
            const total = doc.scrollHeight - window.innerHeight;
            const pct = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
            bar.style.transform = `scaleX(${pct})`;
            rafPending = false;
        };
        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    // ---- service worker --------------------------------------------------
    function initServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        if (window.location.protocol === 'file:') return;
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').catch(() => {});
        });
    }

    // ---- dataLayer events (consent-gated; BHTracking inserts consent_state) ----
    function track(name, params) {
        if (window.BHTracking && typeof window.BHTracking.trackEvent === 'function') {
            window.BHTracking.trackEvent(name, params);
        } else {
            (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, params || {}));
        }
    }

    // Resolve a CTA location: explicit data-cta-location wins, else section id, else 'unknown'.
    function ctaLocationFor(el) {
        return el.getAttribute('data-cta-location') || el.closest('section')?.id || 'unknown';
    }

    function initEventTracking() {
        // CV download — also triggers post-download modal
        document.querySelectorAll('a[href$=".pdf"], a[href*="/Bogi_CV"]').forEach((a) => {
            a.addEventListener(
                'click',
                () => {
                    const loc = ctaLocationFor(a);
                    track('bh_cv_download', { cta_location: loc, url: a.href });
                    openPostDownloadModal(loc);
                },
                { passive: true }
            );
        });

        // LinkedIn click
        document.querySelectorAll('a[href*="linkedin.com"]').forEach((a) => {
            a.addEventListener(
                'click',
                () => track('bh_linkedin_click', { cta_location: ctaLocationFor(a) }),
                { passive: true }
            );
        });

        // Email click
        document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
            a.addEventListener(
                'click',
                () => track('bh_email_click', { cta_location: ctaLocationFor(a) }),
                { passive: true }
            );
        });

        // Contact form interactions
        const contactForm = document.querySelector('[data-contact-form]');
        if (contactForm) {
            contactForm.addEventListener(
                'focusin',
                function onFocus() {
                    track('bh_contact_form_start');
                    contactForm.removeEventListener('focusin', onFocus);
                },
                { once: true }
            );
        }

        // Booking modal open
        document.querySelectorAll('[data-booking-open]').forEach((b) => {
            b.addEventListener('click', () => track('bh_booking_modal_open'), { passive: true });
        });
    }

    // ---- form event wrappers (augment submit handlers) ----
    function wrapFormTracking() {
        const contact = document.querySelector('[data-contact-form]');
        if (contact) {
            contact.addEventListener('submit', () => track('bh_contact_submit_attempt'));
        }
        const booking = document.querySelector('[data-booking-form]');
        if (booking) {
            booking.addEventListener('submit', () => track('bh_booking_submit_attempt'));
        }
    }

    // ---- sticky mobile CTA bar ------------------------------------------
    function initStickyCta() {
        const bar = document.querySelector('[data-sticky-cta]');
        if (!bar) return;
        document.body.classList.add('has-sticky-cta');

        let impressionFired = false;
        let rafPending = false;
        const mql = window.matchMedia('(max-width: 767px)');

        const update = () => {
            const shouldShow = mql.matches && window.scrollY > 100;
            bar.classList.toggle('is-visible', shouldShow);
            if (shouldShow && !impressionFired) {
                impressionFired = true;
                track('bh_sticky_bar_impression');
            }
            rafPending = false;
        };
        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    // ---- scroll-depth / exit-intent CTA ---------------------------------
    function initScrollCta() {
        const card = document.querySelector('[data-scroll-cta]');
        if (!card) return;

        const STORAGE_KEY = 'bh_scroll_cta_dismissed';
        try {
            if (window.sessionStorage.getItem(STORAGE_KEY)) return;
        } catch (_e) { /* ignore */ }

        const mqlMobile = window.matchMedia('(max-width: 767px)');
        let fired = false;

        const open = (trigger) => {
            if (fired) return;
            fired = true;
            card.hidden = false;
            card.setAttribute('aria-hidden', 'false');
            // next frame for transition
            requestAnimationFrame(() => card.classList.add('is-open'));
            track('bh_scroll_cta_shown', { trigger: trigger });
        };

        const close = (silent) => {
            card.classList.remove('is-open');
            card.setAttribute('aria-hidden', 'true');
            window.setTimeout(() => { card.hidden = true; }, 350);
            try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_e) { /* ignore */ }
            if (!silent) track('bh_scroll_cta_dismissed');
        };

        // Mobile trigger: 70% scroll depth
        let rafPending = false;
        const onScroll = () => {
            if (fired || !mqlMobile.matches) return;
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(() => {
                const doc = document.documentElement;
                const total = doc.scrollHeight - window.innerHeight;
                const pct = total > 0 ? window.scrollY / total : 0;
                if (pct >= 0.7) open('scroll_70');
                rafPending = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // Desktop trigger: mouseleave top edge
        const onMouseOut = (e) => {
            if (fired || mqlMobile.matches) return;
            if (!e.relatedTarget && e.clientY <= 0) open('exit_intent');
        };
        document.addEventListener('mouseout', onMouseOut);

        // Close handlers (dismiss/close buttons are tracked as dismissed)
        card.querySelectorAll('[data-scroll-cta-close], [data-scroll-cta-dismiss]').forEach((btn) => {
            btn.addEventListener('click', () => close());
        });
        // Accept click — track, close the card so post-download modal is unobscured
        const accept = card.querySelector('[data-scroll-cta-accept]');
        if (accept) {
            accept.addEventListener('click', () => {
                track('bh_scroll_cta_clicked');
                try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_e) { /* ignore */ }
                close(true); // silent — the download counts, don't also log a dismissal
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !card.hidden) close();
        });
    }

    // ---- post-download modal --------------------------------------------
    let postDlEl = null;
    let postDlTimer = null;

    function openPostDownloadModal(sourceLocation) {
        // Avoid firing the modal when the click came from within the modal itself
        if (sourceLocation && sourceLocation.indexOf('post_download_modal') === 0) return;
        if (!postDlEl) postDlEl = document.querySelector('[data-post-dl]');
        if (!postDlEl) return;
        if (postDlTimer) window.clearTimeout(postDlTimer);
        postDlTimer = window.setTimeout(() => {
            postDlEl.hidden = false;
            postDlEl.setAttribute('aria-hidden', 'false');
            requestAnimationFrame(() => postDlEl.classList.add('is-open'));
            track('bh_post_download_modal_shown', { source: sourceLocation || 'unknown' });
        }, 1500);
    }

    function closePostDownloadModal() {
        if (!postDlEl) return;
        postDlEl.classList.remove('is-open');
        postDlEl.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => { postDlEl.hidden = true; }, 350);
    }

    function initPostDownloadModal() {
        postDlEl = document.querySelector('[data-post-dl]');
        if (!postDlEl) return;

        postDlEl.querySelectorAll('[data-post-dl-close]').forEach((b) => {
            b.addEventListener('click', closePostDownloadModal);
        });
        const liBtn = postDlEl.querySelector('[data-post-dl-linkedin]');
        if (liBtn) {
            liBtn.addEventListener('click', () => {
                track('bh_post_download_modal_linkedin_clicked');
                closePostDownloadModal();
            });
        }
        const msgBtn = postDlEl.querySelector('[data-post-dl-message]');
        if (msgBtn) {
            msgBtn.addEventListener('click', () => {
                track('bh_post_download_modal_message_clicked');
                closePostDownloadModal();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && postDlEl.classList.contains('is-open')) closePostDownloadModal();
        });
    }

    // ---- count-up animation on stat numbers -----------------------------
    // Pulls numeric magnitude from data-final (e.g. "EUR 700k+" -> 700).
    // Preserves prefix/suffix around the animated digit portion. One pass,
    // respects prefers-reduced-motion (sets final value immediately).
    function initCountUp() {
        const els = document.querySelectorAll('[data-countup]');
        if (!els.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            return; // final values already rendered server-side
        }

        const animate = (el) => {
            const final = el.getAttribute('data-final') || el.textContent;
            // Split into prefix, magnitude, suffix. "EUR 700k+" -> ["EUR ", "700", "k+"]
            const match = final.match(/^(\D*)(\d[\d.,]*)(.*)$/);
            if (!match) return;
            const prefix = match[1];
            const raw = match[2].replace(/[,\s]/g, '');
            const target = parseFloat(raw);
            if (!isFinite(target) || target <= 0) return;
            const suffix = match[3];

            const duration = 1200;
            const start = performance.now();
            el.setAttribute('data-counting', 'true');
            const formatInt = (n) => {
                // Preserve original number formatting (e.g., keep the integer shape)
                if (raw.indexOf('.') === -1) return String(Math.round(n));
                const decimals = raw.split('.')[1].length;
                return n.toFixed(decimals);
            };
            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                // easeOutExpo
                const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                const v = target * eased;
                el.textContent = prefix + formatInt(v) + suffix;
                if (t < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = final;
                    el.setAttribute('data-counting', 'false');
                }
            };
            requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );
        els.forEach((el) => io.observe(el));
    }

    // ---- cursor-follow spotlight on hero (desktop only) -----------------
    function initHeroSpotlight() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const fine = window.matchMedia('(pointer: fine)').matches;
        if (!fine || prefersReducedMotion) return;

        let rafPending = false;
        let pendingX = 0;
        let pendingY = 0;

        const apply = () => {
            hero.style.setProperty('--mx', pendingX + 'px');
            hero.style.setProperty('--my', pendingY + 'px');
            rafPending = false;
        };
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            pendingX = e.clientX - rect.left;
            pendingY = e.clientY - rect.top;
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(apply);
        }, { passive: true });
    }

    // ---- boot ------------------------------------------------------------
    function boot() {
        initReveals();
        initHeader();
        initMobileNav();
        initTestimonials();
        initContactForm();
        initBookingModal();
        initReadingProgress();
        initServiceWorker();
        initPostDownloadModal(); // bind modal handlers before CV click listeners
        initEventTracking();
        initStickyCta();
        initScrollCta();
        initCountUp();
        initHeroSpotlight();
        wrapFormTracking();
        initWebVitals();
        initScrollDepth();
    }

    // ---- scroll-depth tracking ------------------------------------------
    // Fires bh_scroll_depth dataLayer events at 25/50/75/100% of page reach.
    // Once per threshold per page load. Validates the "recruiters only
    // scroll 20%" assumption with live telemetry over time.
    function initScrollDepth() {
        if (!window.dataLayer) return;
        const thresholds = [25, 50, 75, 100];
        const fired = new Set();
        let rafPending = false;

        const measure = () => {
            rafPending = false;
            const doc = document.documentElement;
            const pageH = Math.max(doc.scrollHeight, document.body.scrollHeight);
            const viewH = window.innerHeight || doc.clientHeight;
            const scrollable = pageH - viewH;
            if (scrollable <= 0) return;
            const scrolled = window.scrollY || doc.scrollTop;
            const pct = Math.min(100, Math.round((scrolled / scrollable) * 100));
            for (const t of thresholds) {
                if (pct >= t && !fired.has(t)) {
                    fired.add(t);
                    try {
                        window.dataLayer.push({
                            event: 'bh_scroll_depth',
                            scroll_pct: t,
                            page_path: location.pathname,
                        });
                    } catch (_) { /* noop */ }
                }
            }
            if (fired.size === thresholds.length) {
                window.removeEventListener('scroll', onScroll);
            }
        };

        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(measure);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        measure(); // in case landing already exceeds a threshold
    }

    // ---- Core Web Vitals → dataLayer (LCP / CLS / INP / FID) -------------
    // Uses PerformanceObserver directly — no web-vitals npm dependency.
    // GTM can forward `bh_web_vital` dataLayer events into GA4 as a custom event.
    function initWebVitals() {
        if (!('PerformanceObserver' in window) || !window.dataLayer) return;

        const push = (name, value, extra) => {
            try {
                window.dataLayer.push(Object.assign({
                    event: 'bh_web_vital',
                    vital_name: name,
                    vital_value: Math.round(value),
                    page_path: location.pathname,
                }, extra || {}));
            } catch (_) { /* noop */ }
        };

        // LCP — fires at pagehide so we capture the final value after user interaction.
        let lastLcp = 0;
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                lastLcp = entries[entries.length - 1].startTime;
            }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (_) {}

        // CLS — cumulative, reported at pagehide.
        let cls = 0;
        try {
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    if (!e.hadRecentInput) cls += e.value;
                }
            }).observe({ type: 'layout-shift', buffered: true });
        } catch (_) {}

        // FID — first input latency, one-shot.
        try {
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    push('FID', e.processingStart - e.startTime);
                }
            }).observe({ type: 'first-input', buffered: true });
        } catch (_) {}

        // INP — largest interaction so far; reported at pagehide.
        let worstInp = 0;
        try {
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    if (e.duration > worstInp) worstInp = e.duration;
                }
            }).observe({ type: 'event', buffered: true, durationThreshold: 40 });
        } catch (_) {}

        // Dispatch accumulated metrics on pagehide (or visibilitychange hidden for Safari).
        const flush = () => {
            push('LCP', lastLcp);
            push('CLS', cls * 1000); // × 1000 so dataLayer carries an integer
            if (worstInp) push('INP', worstInp);
        };
        addEventListener('pagehide', flush, { once: true });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') flush();
        }, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
