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

        const payload = {
            access_key: form.dataset.accessKey,
            from_name: form.dataset.fromName || 'Bogi Horvath Website',
            subject: form.dataset.subject || `New message from ${fd.get('name') || 'the website'}`,
            cc: form.dataset.cc || '',
            replyto: fd.get('email') || '',
            ...Object.fromEntries(fd.entries()),
            ...(extraFields || {}),
        };
        delete payload.botcheck;

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
            modal.classList.add('is-open');
            document.body.classList.add('no-scroll');
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        };
        const shut = () => {
            modal.classList.remove('is-open');
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
