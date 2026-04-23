/**
 * bogihorvath.com — Cookie consent banner (opt-out model)
 * Shown once on first visit. Scroll or outside click = accept.
 */
(function () {
    'use strict';

    var tracking = window.BHTracking;
    if (!tracking || !tracking.config) return;

    var config = tracking.config;
    var storedConsent = typeof tracking.getStoredConsent === 'function' ? tracking.getStoredConsent() : '';

    var shouldShowBanner =
        (tracking.hasConfiguredVendors() || config.showBannerWithoutVendors) && !storedConsent;
    if (!shouldShowBanner) return;

    function closeBanner(banner) {
        banner.classList.remove('is-visible');
        window.setTimeout(function () {
            if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 400);
    }

    function render() {
        if (!document.body || document.getElementById('bh-cookie-consent')) return;

        tracking.setConsent(true, { persist: true, load: false, track: false, source: 'default' });

        var banner = document.createElement('aside');
        banner.id = 'bh-cookie-consent';
        banner.className = 'bh-cookie-consent';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML =
            '<div class="bh-cookie-consent__inner">' +
            '  <div class="bh-cookie-consent__copy">' +
            '    <p>This site uses cookies for analytics and to improve your experience. ' +
            'See the <a href="' + (config.cookiePolicyUrl || '/#contact') + '">contact page</a> for details.</p>' +
            '  </div>' +
            '  <div class="bh-cookie-consent__actions">' +
            '    <button type="button" class="bh-cookie-consent__btn bh-cookie-consent__btn--primary" data-bh-consent="accept">Accept</button>' +
            '    <button type="button" class="bh-cookie-consent__btn bh-cookie-consent__btn--secondary" data-bh-consent="reject">Reject</button>' +
            '  </div>' +
            '</div>';

        document.body.appendChild(banner);
        tracking.trackEvent('bh_cookie_banner_view', { banner_variant: 'opt-out' });

        function onScroll() {
            if (window.scrollY > 300) {
                cleanup();
                tracking.setConsent(true, { source: 'scroll' });
                closeBanner(banner);
            }
        }

        function onDocClick(event) {
            if (!banner.contains(event.target)) {
                cleanup();
                tracking.setConsent(true, { source: 'interaction' });
                closeBanner(banner);
            }
        }

        function cleanup() {
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('click', onDocClick, true);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('click', onDocClick, true);

        banner.addEventListener('click', function (event) {
            var action = event.target && event.target.getAttribute('data-bh-consent');
            if (!action) return;
            cleanup();
            tracking.setConsent(action === 'accept', { source: 'banner' });
            closeBanner(banner);
        });

        window.requestAnimationFrame(function () { banner.classList.add('is-visible'); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render, { once: true });
    } else {
        render();
    }
})();
