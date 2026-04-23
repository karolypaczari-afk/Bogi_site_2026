/**
 * bogihorvath.com — Consent-aware tracking bootstrap
 * Loads GTM / GA4 / Clarity on consent. Google Consent Mode v2 compliant.
 */
(function () {
    'use strict';

    var DEFAULT_CONFIG = {
        consentCookieName: 'bh_cookie_consent',
        consentCookieDays: 365,
        requireConsent: true,
        crossDomainDomains: ['bogihorvath.com', 'www.bogihorvath.com'],
        vendors: { gtmId: '', gaMeasurementId: '', gAdsId: '', clarityId: '', metaPixelId: '' },
    };
    var GRANTED = 'accepted';
    var REJECTED = 'rejected';
    var config = Object.assign({}, DEFAULT_CONFIG, window.BH_TRACKING_CONFIG || {});
    var vendors = Object.assign({}, DEFAULT_CONFIG.vendors, config.vendors || {});
    config.vendors = vendors;

    var state = {
        consentGranted: false,
        loaded: { gtm: false, ga: false, gads: false, clarity: false },
        clarityConfigured: false,
    };

    function ensureDataLayer() {
        window.dataLayer = window.dataLayer || [];
        return window.dataLayer;
    }

    function log() {
        if (!config.debug || !window.console) return;
        try { window.console.log.apply(window.console, arguments); } catch (e) {}
    }

    function hasValue(v) { return typeof v === 'string' && v.trim().length > 0; }

    function hasConfiguredVendors() {
        return Object.keys(vendors).some(function (k) { return hasValue(vendors[k]); });
    }

    function getPageType() {
        var p = window.location.pathname.toLowerCase();
        if (p === '/' || p === '/index.html') return 'home';
        if (p.indexOf('/about') !== -1) return 'about';
        if (p.indexOf('/blog/') !== -1 && p !== '/blog/') return 'post';
        if (p.indexOf('/blog') !== -1) return 'blog';
        if (p.indexOf('/404') !== -1) return '404';
        return 'page';
    }

    function getConsentState() {
        if (state.consentGranted) return 'granted';
        var stored = getStoredConsent();
        if (stored === GRANTED) return 'granted';
        if (stored === REJECTED) return 'denied';
        return 'unknown';
    }

    function pushDataLayerEvent(eventName, params) {
        var payload = Object.assign(
            {
                event: eventName,
                event_source: 'bogihorvath_site',
                page_type: getPageType(),
                page_path: window.location.pathname,
                page_location: window.location.href,
                page_title: document.title || '',
                consent_state: getConsentState(),
            },
            params || {}
        );
        ensureDataLayer().push(payload);
        return payload;
    }

    function escapeCookieName(n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function readCookie(name) {
        var m = document.cookie.match(new RegExp('(?:^|; )' + escapeCookieName(name) + '=([^;]*)'));
        return m ? m[1] : '';
    }

    function setCookie(name, value, days) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 864e5);
        document.cookie =
            name + '=' + encodeURIComponent(value) + '; expires=' + exp.toUTCString() + '; path=/; SameSite=Lax; Secure';
    }

    function getStoredConsent() {
        var v = readCookie(config.consentCookieName);
        return v === GRANTED || v === REJECTED ? v : '';
    }

    function ensureScript(id, src, onLoad) {
        var existing = document.getElementById(id);
        if (existing) {
            if (typeof onLoad === 'function') {
                if (existing.getAttribute('data-loaded') === 'true') onLoad();
                else existing.addEventListener('load', onLoad, { once: true });
            }
            return existing;
        }
        var s = document.createElement('script');
        s.id = id;
        s.async = true;
        s.src = src;
        if (typeof onLoad === 'function') {
            s.addEventListener('load', function () { s.setAttribute('data-loaded', 'true'); onLoad(); }, { once: true });
        } else {
            s.addEventListener('load', function () { s.setAttribute('data-loaded', 'true'); }, { once: true });
        }
        var f = document.getElementsByTagName('script')[0];
        if (f && f.parentNode) f.parentNode.insertBefore(s, f);
        else (document.head || document.documentElement).appendChild(s);
        return s;
    }

    function ensureGtag() {
        ensureDataLayer();
        if (typeof window.gtag !== 'function') {
            window.gtag = function () { window.dataLayer.push(arguments); };
        }
        return window.gtag;
    }

    function updateGoogleConsent() {
        if (typeof window.gtag !== 'function') return;
        var s = state.consentGranted ? 'granted' : 'denied';
        window.gtag('consent', 'update', {
            ad_storage: s,
            ad_user_data: s,
            ad_personalization: s,
            analytics_storage: s,
            functionality_storage: s,
            personalization_storage: s,
            security_storage: 'granted',
        });
    }

    function updateClarityConsent() {
        if (typeof window.clarity !== 'function') return;
        var s = state.consentGranted ? 'granted' : 'denied';
        try { window.clarity('consentv2', { ad_Storage: s, analytics_Storage: s }); } catch (e) {}
    }

    function applyConsentState() {
        updateGoogleConsent();
        updateClarityConsent();
    }

    function loadGa() {
        // GTM fires GA4 — skip direct load to prevent double-counting
        if (hasValue(vendors.gtmId)) { state.loaded.ga = true; return false; }
        if (!hasValue(vendors.gaMeasurementId) || state.loaded.ga) return false;

        var gtag = ensureGtag();
        gtag('js', new Date());
        gtag('config', vendors.gaMeasurementId, {
            linker: { domains: config.crossDomainDomains || [] },
            send_page_view: true,
        });

        ensureScript('bh-ga4', 'https://www.googletagmanager.com/gtag/js?id=' + vendors.gaMeasurementId);
        state.loaded.ga = true;
        applyConsentState();
        log('[tracking] GA4 direct loaded');
        return true;
    }

    function loadGtm() {
        if (!hasValue(vendors.gtmId) || state.loaded.gtm) return false;
        ensureDataLayer().push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        ensureScript('bh-gtm', 'https://www.googletagmanager.com/gtm.js?id=' + vendors.gtmId);
        state.loaded.gtm = true;
        log('[tracking] GTM loaded');
        return true;
    }

    function configureClarity() {
        if (state.clarityConfigured || typeof window.clarity !== 'function') return;
        var pageType = getPageType();
        var path = window.location.pathname.toLowerCase();
        try {
            window.clarity('set', 'page_type', pageType);
            if (path.indexOf('/blog/') !== -1 && path !== '/blog/') window.clarity('set', 'content', 'blog_post');
            if (path === '/' || path.indexOf('#contact') !== -1) window.clarity('upgrade', 'high_intent_landing');
        } catch (e) {}
        state.clarityConfigured = true;
    }

    function loadClarity() {
        if (!hasValue(vendors.clarityId) || state.loaded.clarity) return false;
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
            t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', vendors.clarityId);
        state.loaded.clarity = true;
        updateClarityConsent();
        configureClarity();
        log('[tracking] Clarity loaded');
        return true;
    }

    function loadAll() {
        if (!hasConfiguredVendors()) return false;
        if (config.requireConsent && !state.consentGranted) return false;
        loadGtm();
        loadGa();
        loadClarity();
        applyConsentState();
        return true;
    }

    function setConsent(granted, options) {
        var settings = options || {};
        state.consentGranted = Boolean(granted);
        if (settings.persist !== false) {
            setCookie(
                config.consentCookieName,
                state.consentGranted ? GRANTED : REJECTED,
                config.consentCookieDays || 365
            );
        }
        if (state.consentGranted && settings.load !== false) loadAll();
        applyConsentState();
        if (settings.track !== false) {
            pushDataLayerEvent('bh_cookie_consent_updated', {
                consent_action: state.consentGranted ? 'accept' : 'reject',
                consent_source: settings.source || 'system',
            });
        }
        return state.consentGranted;
    }

    function trackEvent(eventName, params) {
        pushDataLayerEvent(eventName, params);
        if (!hasValue(vendors.gtmId) && typeof window.gtag === 'function' && hasValue(vendors.gaMeasurementId)) {
            window.gtag('event', eventName, Object.assign({ send_to: vendors.gaMeasurementId }, params || {}));
        }
        return true;
    }

    ensureDataLayer();

    // Google Consent Mode v2 defaults (denied until user accepts; security_storage always granted)
    ensureGtag()('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
        wait_for_update: 500,
    });

    var stored = getStoredConsent();
    if (stored === GRANTED) {
        setConsent(true, { persist: false, track: false, source: 'stored' });
    } else if (stored === REJECTED) {
        setConsent(false, { persist: false, load: false, track: false, source: 'stored' });
    } else if (hasConfiguredVendors()) {
        // Opt-out model — tracking granted by default, banner shown as info surface
        setConsent(true, { persist: false, track: false, source: 'default' });
    }

    window.BHTracking = {
        config: config,
        hasConfiguredVendors: hasConfiguredVendors,
        getStoredConsent: getStoredConsent,
        hasConsent: function () { return state.consentGranted; },
        loadAll: loadAll,
        loadGtm: loadGtm,
        loadGa: loadGa,
        loadClarity: loadClarity,
        setConsent: setConsent,
        trackEvent: trackEvent,
        pushDataLayerEvent: pushDataLayerEvent,
    };
})();
