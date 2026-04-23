# Analytics & Tracking Audit — 2026-04-23

Reference log of the GA4 / GTM setup for bogihorvath.com, the drift issues
found during the audit, and the diagnostic tricks that resolved them.

## Final live configuration

| Layer | Value |
|---|---|
| GTM container | `GTM-W3LHSQ2R` |
| GA4 Measurement ID | `G-W1JERJNXLS` |
| Microsoft Clarity | `mrbhk2dvb4` |
| Server-side beacon | `/api/log-event.php` → `/api/events/YYYY-MM-DD.jsonl` |

GTM account/container/workspace coordinates (useful for MCP calls):

- `accountId = 6290830582` ("Bogihorvath.com")
- `containerId = 217665531` (public id `GTM-W3LHSQ2R`)
- `workspaceId = 5` (Default Workspace)
- `tagId = 4` (name: "Google-címke", type: `googtag`, fires `G-W1JERJNXLS`)
- `firingTriggerId = 2147479573` (All Pages / Initialization)

## How the tracking stack is wired

Three parallel channels defined in `js/tracking-loader.src.js`:

1. **GTM dataLayer push** — every `trackEvent()` call pushes to `dataLayer`
   so GTM triggers / Clarity / any listener can react.
2. **Direct gtag.js → GA4** — sends the event regardless of whether GTM has
   a matching "GA4 Event" tag (defensive against container-empty state).
3. **Same-origin server beacon** — `navigator.sendBeacon` to
   `/api/log-event.php`. Survives page unload (vital for CV download clicks),
   bypasses ad blockers, always lands even when consent is denied.

Consent Mode v2 uses an **opt-out model** (all granted by default, inline
`gtag('consent', 'default', ...)` in `_includes/partials/head.njk`). Flipped
to denied only if the visitor explicitly rejects via the banner.

### Critical file map

| File | Purpose |
|---|---|
| `_data/site.json` → `tracking.gtm` / `tracking.ga4` / `tracking.clarity` | Canonical IDs (currently `ga4` is declarative only — no template reads it) |
| `_includes/partials/head.njk` | Consent Mode defaults, preconnect hints |
| `_includes/layouts/base.njk` | GTM `<noscript>` iframe (reads `site.tracking.gtm`) |
| `_includes/partials/scripts.njk` | Loads `tracking.js` → `tracking-loader.js` → `cookie-consent.js` |
| `js/tracking.src.js` | **Hardcodes vendor IDs** (`gtmId`, `gaMeasurementId`, `clarityId`). This, not `site.json`, is what ships to browsers. |
| `js/tracking-loader.src.js` | Consent-aware bootstrap; 3-channel `trackEvent()` |
| `api/log-event.php` | Server-side failover log; writes JSONL, no external forwarding |

> ⚠️ `site.tracking.ga4` in `site.json` is **orphan config** — no template
> or script reads it. Only `site.tracking.gtm` is actually rendered (in
> `base.njk` noscript). Always update `js/tracking.src.js` when switching
> the GA4 ID. Consider deleting the orphan field in a future cleanup, or
> refactor `tracking.src.js` to read from `site.json`.

## What the audit found

1. **GA4 ID drift** — `site.json` had `G-W1JERJNXLS`, `tracking.src.js` had
   `G-T517HQQTEQ`. Because only `tracking.src.js` ships to browsers, real
   tracking was going to `G-T517HQQTEQ`; `site.json` was dead config.
2. **GA property mystery** — user could find `G-W1JERJNXLS` in their GA
   account but not `G-T517HQQTEQ`. Yet `G-T517HQQTEQ` was the ID actually
   receiving data per the GTM container.
3. **Ghost spam on the "orphan" property** — `G-W1JERJNXLS` showed realtime
   sessions in GA despite NOT being the ID in GTM. Direct test to
   `https://www.googletagmanager.com/gtag/js?id=G-W1JERJNXLS` returned
   **HTTP 404**, meaning the ID isn't resolvable via gtag. Sessions came
   from bots hitting `/g/collect` directly — classic ghost spam pattern.

**Resolution:** aligned everything on `G-W1JERJNXLS` (the property the
user actually has admin access to):

- `_data/site.json` — `tracking.ga4` kept as `G-W1JERJNXLS`
- `js/tracking.src.js` — `gaMeasurementId` set to `G-W1JERJNXLS`
- `js/tracking.js` (minified) — manually patched to match
- GTM tag `4` ("Google-címke") — `tagId` parameter set to `G-W1JERJNXLS`

## Diagnostic techniques that worked

### 1. Three-source config triangulation

For any claim about "what ID is tracking", check all three independently:

- What `site.json` declares
- What the compiled JS loads (grep `js/tracking.js`)
- What the GTM container fires (via GTM MCP `gtm_tag list`)

Drift between these is the most common source of "why isn't GA receiving
data" confusion.

### 2. Verify Measurement ID is alive via `gtag/js`

```bash
curl -sL "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" | wc -c
```

- A live, valid ID returns the full gtag library (~470 KB).
- An invalid/deleted ID returns HTTP 404 (the page body is tiny, ~1.5 KB).
- A syntactically valid but non-existent ID (e.g. `G-ZZZZZZZZZZ`) still
  returns the library (~390 KB) — Google doesn't validate the ID at load
  time, only at collection time.

This quickly distinguishes "this ID is dead" from "this ID is unknown to
Google" from "this ID is real but I can't see the property".

### 3. Ghost spam signature

Sessions appearing in a GA4 property's Realtime view, despite no page on
the site actually loading that property's tag, almost always means:

- Bots sending fake hits directly to `/g/collect` using a scraped ID
- Common after a Measurement ID was ever public (old deploy, GitHub, etc.)
- Usually shows telltale signs in the data: `(not set)` hostname,
  impossible page paths, ghost-referrer domains in Acquisition reports

### 4. Live HTML grep

When source code is clean but tracking behaves oddly, fetch the *deployed*
HTML and grep for all `G-`, `GTM-`, `UA-` patterns directly:

```bash
curl -sL https://bogihorvath.com/ -o /tmp/live.html
# then Grep for: G-[A-Z0-9]{6,}|GTM-[A-Z0-9]+|UA-\d+|gtag\s*\(|googletagmanager\.com
```

Catches:
- Host-level injection (Hostinger / CDN / WAF adding their own tags)
- Stale cached HTML still carrying an old ID
- Unexpected direct gtag calls bypassing GTM

### 5. DevTools Network → `collect` filter

The definitive test for "what ID is this page actually sending to":

1. Open page in Chrome → DevTools → Network tab
2. Filter: `collect`
3. Reload
4. Each request to `google-analytics.com/g/collect` has a `tid=G-...` query
   param — that's the exact ID being hit per request.

## MCP tools used & limits

- **GTM MCP** (`mcp__gtm__gtm_*`) — full CRUD on tags, triggers, variables,
  workspaces, versions. Can also publish container versions.
- **GSC MCP** (`mcp__gsc__*`) — Search Console only; not GA4.
- **No GA4 MCP** is configured. GA4 Admin / Data API access would require
  installing a community MCP (e.g. `mcp-server-google-analytics`) via
  `claude mcp add`. Without it, property enumeration / realtime query /
  event inspection must be done by the user in the GA UI.

## Open follow-ups

- Investigate why `gtag/js?id=G-W1JERJNXLS` returns 404 even though the
  property exists in GA. Possible causes: stream ID renumbered, property
  soft-deleted/recreated, or Google's tag-server cache stale. Check
  **Admin → Data Streams → Measurement ID** on the property and confirm it
  still matches `G-W1JERJNXLS` verbatim.
- Locate `G-T517HQQTEQ` — valid on Google's servers, so the property
  exists under *some* Google account. Try Search Console → Settings →
  Associations, or GTM user management trail, to find the owning login.
  Once found, decide whether to retain (if it has historical data worth
  keeping) or delete.
- Clean up the orphan `tracking.ga4` field in `site.json` or refactor
  `tracking.src.js` to read from it — remove the single-source-of-truth
  ambiguity altogether.
- Consider enabling GA4 **"Exclude unwanted referrals"** and Google
  Signals tuning to reduce ghost spam exposure.
