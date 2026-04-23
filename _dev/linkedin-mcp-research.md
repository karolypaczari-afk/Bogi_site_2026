# LinkedIn MCP Server Research (2026-04-23)

Research for connecting an MCP server to Claude Code that can operate LinkedIn on the user's behalf. Goal: drive traffic from LinkedIn → this site (per conversion hierarchy: CV > LinkedIn > form).

## TL;DR

- **Most capable**: [southleft/linkedin-mcp](https://github.com/southleft/linkedin-mcp) — 83 tools, covers posting/scheduling/analytics/messaging/connections. Alpha (v0.2.0), requires LinkedIn Developer App + RapidAPI key.
- **Simplest**: [stickerdaniel/linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server) — 9 tools, one-liner `uvx` install. Read + messaging only, **no posting**.
- **Hosted**: [Composio LinkedIn](https://composio.dev/toolkits/linkedin/framework/claude-code) — 4 tools (post, delete post, company info, profile). Managed OAuth but minimal feature set.

## Comparison Matrix

| Capability | southleft | stickerdaniel | Composio |
|---|---|---|---|
| Total tools | 83 | 9 | 4 |
| Create post | yes | no | yes |
| Drafts | 7 tools | no | no |
| Scheduling | 5 tools | no | no |
| Analytics | 10 tools | no | no |
| Messaging | 6 tools | 5 tools | no |
| Connections/invites | 4 tools | partial (in dev) | no |
| Comments/reactions | yes (needs API approval) | no | no |
| Profile/company scrape | yes (RapidAPI) | yes (browser) | partial |
| Job search | yes | yes | no |
| Install effort | high | low | medium |
| Auth flow | OAuth app + RapidAPI + cookies | browser login | Composio-hosted OAuth |

## Authentication Requirements by Server

### southleft/linkedin-mcp
- **LinkedIn Developer App** (required): https://www.linkedin.com/developers/apps
  - Products: "Share on LinkedIn" + "Sign In with LinkedIn using OpenID Connect" (instant approval). "Community Management API" needed for comments/reactions (requires LinkedIn review — days to weeks, can be denied). "Ad Library API" also behind review.
  - Redirect URL: `http://localhost:8765/callback`
  - Yields `LINKEDIN_CLIENT_ID` + `LINKEDIN_CLIENT_SECRET`
- **RapidAPI key** (recommended): https://rapidapi.com/pnd-team-pnd-team/api/professional-network-data
  - Professional Network Data API: free Basic tier OK for testing; Pro ~$50/mo adds search
  - Without it, profile/company lookups fall back to unreliable cookie scraping
- **Browser cookies** (optional, for messaging/connections/jobs/people search)
  - Extracted via `linkedin-mcp-auth extract-cookies --browser chrome`
  - **Expire every 24–48h** — must be re-extracted
- OAuth flow: `linkedin-mcp-auth oauth`

### stickerdaniel/linkedin-mcp-server
- Opens a LinkedIn login window on first auth-requiring tool call. Persistent browser profile at `~/.linkedin-mcp/profile/`. Uses Patchright (Playwright fork) for stealth.
- No developer app, no RapidAPI key, no OAuth.

### Composio
- Composio API key + hosted MCP URL. They handle LinkedIn OAuth.
- Setup: create `.env` with `COMPOSIO_API_KEY`, run their Python helper to mint an MCP URL, then `claude mcp add --transport http ...`.

## Setup Commands

### southleft/linkedin-mcp (chosen but needs user approval to install)

```bash
git clone https://github.com/southleft/linkedin-mcp.git C:\Users\charl\linkedin-mcp
cd C:\Users\charl\linkedin-mcp
python -m venv .venv
.venv\Scripts\pip install -e .
playwright install chromium   # optional, last-resort scraping fallback
```

Register with Claude Code:
```bash
claude mcp add linkedin-mcp \
  "C:\Users\charl\linkedin-mcp\.venv\Scripts\python.exe" \
  -m linkedin_mcp.main \
  --env LINKEDIN_CLIENT_ID=... \
  --env LINKEDIN_CLIENT_SECRET=... \
  --env LINKEDIN_API_ENABLED=true \
  --env THIRDPARTY_RAPIDAPI_KEY=...
```

Or edit `~/.claude.json` directly:
```json
{
  "mcpServers": {
    "linkedin-mcp": {
      "type": "stdio",
      "command": "C:\\Users\\charl\\linkedin-mcp\\.venv\\Scripts\\python.exe",
      "args": ["-m", "linkedin_mcp.main"],
      "cwd": "C:\\Users\\charl\\linkedin-mcp",
      "env": {
        "LINKEDIN_CLIENT_ID": "...",
        "LINKEDIN_CLIENT_SECRET": "...",
        "LINKEDIN_API_ENABLED": "true",
        "THIRDPARTY_RAPIDAPI_KEY": "...",
        "PYTHONPATH": "C:\\Users\\charl\\linkedin-mcp\\src"
      }
    }
  }
}
```

Important: Claude Desktop does NOT read `.env` files — env vars must be in the MCP config `env` block.

### stickerdaniel/linkedin-mcp-server (fallback one-liner)

```json
{
  "mcpServers": {
    "linkedin": {
      "command": "uvx",
      "args": ["linkedin-scraper-mcp@latest"],
      "env": { "UV_HTTP_TIMEOUT": "300" }
    }
  }
}
```
Requires `uv` (not currently installed on this machine).

## Key Risks / Gotchas

- **LinkedIn TOS**: Unofficial-API use (scraping, bulk actions, mass messaging) can get the account restricted. All three servers use unofficial endpoints for anything beyond OAuth-sanctioned posting.
- **Cookie expiry**: 24–48h for southleft's cookie-based tools (messaging/connections).
- **Community Management API**: Gated by LinkedIn review. If denied, comments/reactions are off the table.
- **Newsletters**: Not exposed by LinkedIn API — no server supports them.
- **southleft version**: v0.2.0 alpha, 57 commits, 23 stars. Functional but not mature.
- **Sandbox**: Installing any of these counts as "Untrusted Code Integration" in Claude Code's default sandbox — user must explicitly approve install + first run.

## Environment State (as of 2026-04-23)

- Python 3.14.2 ✓ (repo requires >=3.11,<4.0 — will work)
- Node 24.13 ✓
- git ✓
- uv ✗ (would need `pip install uv` for stickerdaniel path)
- Clone of southleft completed at `C:\Users\charl\linkedin-mcp` but install blocked pending approval.

## Decision

Recommended southleft for "most things possible." Switch to stickerdaniel if the user wants minimal setup and doesn't need posting. Composio only makes sense if they already have a Composio account.
