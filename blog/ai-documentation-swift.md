# 60% Documentation-Time Savings via AI-Assisted Source-Code Analysis at SWIFT

**Category:** AI Transformation
**Author:** Boglárka Paczari-Horváth (https://bogihorvath.com/about/)
**Canonical URL:** https://bogihorvath.com/blog/ai-documentation-swift/

> Production case study: how Claude Code CLI + Model Context Protocol (MCP) cut technical-documentation time by 60% on a Tier-1 financial-messaging API consolidation programme — and got engineering, product, and audit to sign off without rework.


Most enterprise AI projects stall in the gap between innovation lab and production audit. This case study shows how I shipped production AI inside a regulated Tier-1 financial-messaging environment — fast enough to ship, careful enough to pass audit.

## The Problem

An E-form optimisation and API consolidation programme at S.W.I.F.T. required updated technical documentation post-API-change. Traditional documentation cycles ran 3–4 weeks per release: engineering writes, product reviews, audit reviews, rework, repeat. The bottleneck wasn&#39;t the writing — it was alignment across three stakeholder groups, each with different expectations.

## The AI-Augmented Approach

I built an AI-assisted documentation workflow on Claude Code CLI plus Model Context Protocol (MCP) — the same agentic stack I run daily. The pipeline:

- Source-code ingest: Claude Code CLI reads the changed code paths via GitHub MCP server
- API spec ingest: the API design specs feed in via Context7 MCP for current-state documentation
- Cross-reference: Claude generates documentation drafts that map code changes to spec changes — surfacing every audit-relevant difference
- Stakeholder-tailored output: three views of the same content — engineering (technical depth), product (business impact), audit (compliance and traceability)

## Governance Built In

EU AI Act fluency is not optional for regulated enterprises. Every output ran through:

- Provenance tracking: every documentation claim cited the underlying code or spec line
- Hallucination guard: structured outputs (JSON schema + Pydantic validation) refused to ship docs that referenced non-existent code paths
- Human-in-the-loop sign-off: AI drafted, humans reviewed and approved — never the reverse

## Results

- 60% documentation-time savings — cycle time cut from 3–4 weeks to under 1 week per release
- Zero rework loops — engineering, product and audit signed off on the AI-drafted docs in their first review
- Auditable trail — every doc line traceable to source code or spec, satisfying audit requirements baked into the workflow
- Stakeholder confidence — the documentation became the canonical reference, not an afterthought

## What This Means for Tier-1 AI Adoption

The lesson isn&#39;t that Claude or MCP is magic. The lesson is that production AI inside regulated enterprises requires the same discipline as production code: versioned inputs, structured outputs, traceability, and human sign-off. Lean Six Sigma + ITIL methodology fluency translates directly into AI risk management — that&#39;s the differentiator versus AI-lab researchers parachuting into banks.

## Stack Used

- Agentic AI: Claude Code CLI, Anthropic SDK, Model Context Protocol
- MCP servers: GitHub (code retrieval), Context7 (live API docs), Tavily (research)
- Validation: JSON schema, Pydantic structured outputs
- Governance frame: EU AI Act mapping, ISO/IEC 42001 alignment

## Conclusion

AI in regulated Tier-1 enterprises ships when methodology and governance come first — and tools come second. EUR 1.1M+ saved across 14+ years tells me the same playbook works whether the lever is Lean Six Sigma, SAP S/4HANA, PEGA, or now Claude Code + MCP.


---

*This is an LLM-friendly plain-text mirror of [the HTML article](https://bogihorvath.com/blog/ai-documentation-swift/). Written by Boglárka Paczari-Horváth, AI-Augmented Process Transformation Lead. Contact: horvath.boglarka@hotmail.com | https://www.linkedin.com/in/boglarka-paczari-horvath/*
