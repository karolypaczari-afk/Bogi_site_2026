/**
 * bogihorvath.com — Tracking configuration
 *
 * GTM container drives GA4 + Clarity. Google Ads / Meta Pixel unused here.
 * Direct gtag.js is NOT loaded when gtmId is set — prevents double-counting.
 */
(function () {
    'use strict';

    var existing = window.BH_TRACKING_CONFIG || {};
    var existingVendors = existing.vendors || {};

    var defaultVendors = {
        gtmId: 'GTM-W3LHSQ2R',
        gaMeasurementId: 'G-W1JERJNXLS',
        gAdsId: '',
        gAdsLabel: '',
        clarityId: 'mrbhk2dvb4',
        metaPixelId: '',
    };

    window.BH_TRACKING_CONFIG = Object.assign(
        {
            siteName: 'BogiHorvath',
            consentCookieName: 'bh_cookie_consent',
            consentCookieDays: 365,
            requireConsent: true,
            showBannerWithoutVendors: false,
            cookiePolicyUrl: '/#contact',
            crossDomainDomains: ['bogihorvath.com', 'www.bogihorvath.com'],
            debug: false,
        },
        existing
    );

    window.BH_TRACKING_CONFIG.vendors = Object.assign({}, defaultVendors, existingVendors);
})();
