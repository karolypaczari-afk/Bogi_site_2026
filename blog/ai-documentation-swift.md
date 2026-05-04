# 60% Documentation-Time Savings via AI-Assisted Source-Code Analysis at a Tier-1 Financial-Messaging Firm

**Category:** AI Transformation
**Author:** Boglárka Paczari-Horváth (https://bogihorvath.com/about/)
**Canonical URL:** https://bogihorvath.com/blog/ai-documentation-swift/

> Production case study: how an offline GitHub Copilot deployment — running inside the enterprise tenant boundary — cut technical-documentation time by 60% on a Tier-1 financial-messaging API consolidation programme, and got engineering, product, and audit to sign off without rework.


Most enterprise AI projects stall in the gap between innovation lab and production audit. This case study shows how I shipped production AI inside a regulated Tier-1 financial-messaging environment — fast enough to ship, careful enough to pass audit, and with no source code, specs, or messaging-format details ever leaving the firm&#39;s tenant boundary.

## The Problem

An API consolidation programme at a Tier-1 financial-messaging firm required updated technical documentation post-API-change. Traditional documentation cycles ran 3–4 weeks per release: engineering writes, product reviews, audit reviews, rework, repeat. The bottleneck wasn&#39;t the writing — it was alignment across three stakeholder groups, each with different expectations. Worse: the existing internal specs for the form-based product were not reliable, so any documentation drafted off them inherited the same drift the audit team was already flagging.

## Step 1: A Business-Approved Blueprint, Anchored to Real Sources

Before any tool decision, I drafted a blueprint and walked it through business approval. Two anchors made the blueprint defensible:

- Source code as source-of-truth #1: for the form-based product, the existing internal specs had drifted from the implementation, so the source code itself became the authoritative reference
- API vendor spec as source-of-truth #2: for the API surface, the contract published by the API vendor became the authoritative reference
- Explicit out-of-scope: the unreliable internal specs were named in the blueprint as not a primary input — only used as a cross-check, never as a generator

The blueprint went to the business for sign-off before any AI workflow was wired up. That single step turned the rest of the project from a tooling experiment into an audit-defensible delivery: every later doc draft could trace back to a source the business had already endorsed.

## Step 2: Tooling Options Evaluated (and Why Offline Won)

I explored and showcased multiple AI-assisted documentation options to the business — including faster cloud-based agentic options that, on raw delivery time alone, would have shaved further days off each release cycle. The shortlist:

- Cloud agentic CLIs (faster, rejected): stronger reasoning and parallel tool-use would have cut delivery time further, but moving source code or proprietary API specs out-of-tenant was a non-starter for a Tier-1 financial-messaging firm
- Cloud Copilot with public-internet retrieval (faster, rejected): same blocker — any retrieval call leaving the tenant boundary was disqualified
- Offline GitHub Copilot inside the tenant (chosen): slower than the cloud options on a benchmark, but the only configuration that satisfied tenant-boundary, content-exclusion, and audit-traceability constraints simultaneously

Showing the business the faster-but-rejected options mattered: it framed the offline choice as a governance trade-off the business made consciously, not a tooling limitation imposed on them. That framing is what made audit comfortable signing off on the AI-drafted output later.

## Step 3: The AI-Augmented Documentation Workflow

With the blueprint approved and the offline tool chosen, I built the documentation workflow on the offline GitHub Copilot deployment — running entirely inside the enterprise tenant, with content-exclusion controls on the firm&#39;s private repositories and no telemetry leaving the boundary. The pipeline:

- Source-code ingest: Copilot reads the changed code paths from the internal Git repository, in-tenant
- API vendor spec ingest: the vendor-published API spec feeds in as the authoritative API contract
- Cross-reference: Copilot generates documentation drafts that map code changes to API-spec changes — surfacing every audit-relevant difference
- Drift check against legacy specs: the unreliable internal specs are pulled in only as a comparator — drift between them and the source code is flagged for the spec owners, not used as a documentation input
- Stakeholder-tailored output: three views of the same content — engineering (technical depth), product (business impact), audit (compliance and traceability)

## Governance Built In

EU AI Act fluency is not optional for regulated enterprises. Every output ran through:

- Tenant-boundary enforcement: no source code, specs, or generated drafts left the firm&#39;s perimeter; no third-party retrieval services were used
- Provenance tracking: every documentation claim cited the underlying code line or vendor-spec section
- Hallucination guard: structured outputs (JSON schema + Pydantic validation) refused to ship docs that referenced non-existent code paths
- Human-in-the-loop sign-off: AI drafted, humans reviewed and approved — never the reverse

## Results

- 60% documentation-time savings — cycle time cut from 3–4 weeks to under 1 week per release
- Zero rework loops — engineering, product and audit signed off on the AI-drafted docs in their first review
- Auditable trail — every doc line traceable to source code or vendor spec, satisfying audit requirements baked into the workflow
- Stakeholder confidence — the documentation became the canonical reference, not an afterthought

## What This Means for Tier-1 AI Adoption

The lesson isn&#39;t that Copilot is magic. The lesson is that production AI inside regulated enterprises requires the same discipline as production code: a business-approved blueprint, anchored sources of truth, an explicit tooling trade-off (faster cloud vs. compliant offline), tenant-boundary controls, versioned inputs, structured outputs, traceability, and human sign-off. Lean Six Sigma + ITIL methodology fluency translates directly into AI risk management — that&#39;s the differentiator versus AI-lab researchers parachuting into banks.

## Stack Used

- Agentic AI: GitHub Copilot (offline / Enterprise mode) — deployed inside the firm&#39;s tenant
- Sources of truth: internal Git repository (source code) + API vendor&#39;s published spec — no reliance on the drifted legacy internal specs
- Validation: JSON schema, Pydantic structured outputs
- Governance frame: EU AI Act mapping, ISO/IEC 42001 alignment, tenant-boundary content exclusion, business-approved blueprint as the gating artefact

## Conclusion

AI in regulated Tier-1 enterprises ships when methodology and governance come first — and tools come second. EUR 1.1M+ saved across 14+ years tells me the same playbook works whether the lever is Lean Six Sigma, SAP S/4HANA, PEGA, or now Copilot running offline inside the tenant — chosen consciously over faster cloud options, because in regulated firms the compliant tool is the fast tool once audit is in the room.


---

*This is an LLM-friendly plain-text mirror of [the HTML article](https://bogihorvath.com/blog/ai-documentation-swift/). Written by Boglárka Paczari-Horváth, AI-Augmented Process Transformation Lead. Contact: horvath.boglarka@hotmail.com | https://www.linkedin.com/in/boglarka-paczari-horvath/*
