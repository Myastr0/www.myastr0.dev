---
name: article-seo-review
description: Reviews a blog article for SEO readiness and provides prioritized, actionable fixes (intent match, on-page structure, internal linking, metadata, snippets, schema, and E-E-A-T). Use when the user asks for SEO feedback, an SEO audit of an article, improving organic traffic, optimizing headings/keywords/meta, or provides a draft/markdown blog post.
---

# Article SEO review

## Goal

Produce an **actionable SEO review** of an article (often Markdown) with:
- a decision **PASS / NEEDS WORK**
- prioritized fixes (P0 → P2) with concrete rewrites
- a keyword/intention assessment (primary + secondary terms)
- recommended metadata (title, slug, meta description)
- snippet opportunities (featured snippet / PAA) when relevant
- technical/on-page notes (links, images, schema) when applicable

## Expected input

- Full article text (or file path), ideally with YAML frontmatter if your system uses it.
- Optional context (use if provided; otherwise infer from the text):
  - target audience + country/language
  - product/company/site context (what should be linked internally)
  - the target query or “what should this rank for?”
  - constraints (tone, length, CTA, mandatory links)

If details are missing, **infer** and proceed (don’t block).

## Procedure (recommended order)

### 1) Quick understanding + intent

- Identify: topic, promise, audience, funnel stage (TOFU/MOFU/BOFU), desired action.
- Infer the most likely **primary search intent**: informational / commercial investigation / transactional / navigational.
- Extract candidate **primary keyword** + 3–8 **secondary keywords** (including long-tails).

### 2) SERP fit (lightweight, no live browsing required)

Without running searches, estimate the SERP expectations:
- What formats usually win? (guide, checklist, comparison, glossary, tool page)
- What must be covered to satisfy intent?
- What is missing/overly long/off-topic vs that expectation?

If the user explicitly asks for SERP research and web access is allowed, you may suggest doing live SERP checks separately; otherwise keep this section heuristic and honest.

### 3) On-page structure & scannability

Check and propose improvements with excerpts:
- **Title & H1**: clear promise, includes primary term naturally, not clickbait.
- **H2/H3 outline**: logical progression, covers intent, avoids duplicate headings.
- **Intro**: states outcome quickly, sets expectations, defines audience.
- **Depth & completeness**: missing definitions, steps, examples, edge cases.
- **Internal consistency**: terms defined once, no contradictions.
- **Readability**: short paragraphs, lists, tables where helpful, “so what” clarity.

### 4) Keyword usage (natural, not stuffing)

- Check: primary term appears early (title/H1/intro), then naturally.
- Identify opportunities for:
  - synonyms/variants (semantic coverage)
  - exact-match phrases only when they read naturally
  - keyword-to-section mapping (each major section supports intent)
- Flag over-optimization: repetitive phrasing, unnatural anchors, awkward headings.

### 5) Internal linking & information architecture

- Propose 3–10 internal links:
  - **From this article → other pages** (supporting topics, product pages, related posts)
  - **To this article ← other pages** (which existing posts should link here)
- Recommend anchors: descriptive, varied, non-generic (“click here” discouraged).
- Identify orphan risks and suggest hub/cluster placement when appropriate.

### 6) Snippet opportunities (optional but high value)

When relevant, propose:
- a “definition” paragraph (40–60 words) for featured snippet
- a short ordered list (steps) or table (comparison) optimized for PAA/snippets
- FAQs (2–6) with concise answers (avoid adding new claims)

### 7) Metadata & technical on-page checks

Provide:
- 3 title tag options (≤ 60 chars as a guideline; avoid truncation)
- 1 preferred slug (short, lowercase, hyphenated, includes primary term if sensible)
- 2 meta description options (aim 140–160 chars; include value + keyword naturally)
- OpenGraph/Twitter suggestion only if user asks

Technical/UX notes (only if applicable to the content provided):
- images: alt text opportunities, file names, where an image would clarify
- outgoing links: credibility, no affiliate-like spam, descriptive link text
- tables/code blocks: make scannable
- schema suggestions: Article, FAQPage, HowTo (only if the page truly matches)

### 8) E-E-A-T signals (content-side)

Assess and suggest improvements:
- **Experience**: first-hand steps, screenshots, benchmarks (if appropriate)
- **Expertise**: accurate definitions, constraints, trade-offs
- **Authoritativeness**: references to reputable sources, clear positioning
- **Trust**: dates, assumptions, limitations, disclaimers for risky topics

## Output format (must follow)

```markdown
## Verdict
PASS / NEEDS WORK

## Quick SEO summary (5–8 lines)
- Primary intent:
- Suggested primary keyword:
- Secondary keywords:
- Biggest opportunities:
- Biggest risks:

## Prioritized fixes (P0 → P2)
### P0 (blocking)
- [excerpt or section] → issue → concrete fix (rewrite if needed)

### P1 (important)
- ...

### P2 (nice to have)
- ...

## Proposed outline (recommended)
- H1: ...
  - H2: ...
    - H3: ...

## Metadata
- Title tag (preferred):
- Title tag (alts):
  - ...
  - ...
- Slug:
- Meta description (preferred):
- Meta description (alt):

## Internal links
### Links to add from this article
- Target page: ... | Anchor: ... | Placement: ...

### Pages that should link to this article
- Source page: ... | Anchor: ... | Where to place:

## Snippet/FAQ opportunities (optional)
- Featured snippet paragraph (40–60 words):
...
- FAQ (2–6):
  - Q:
    A:

## E-E-A-T improvements (optional)
- Experience:
- Sources/citations:
- Trust/assumptions:
```

## PASS vs NEEDS WORK rubric

- **NEEDS WORK** if at least one:
  - intent mismatch (article doesn’t satisfy the likely query)
  - weak structure (missing key sections; outline doesn’t cover intent)
  - misleading title/meta vs content
  - obvious keyword stuffing or unreadable headings
  - thin content for the query (missing essential definitions/steps)
- **PASS** if:
  - intent is satisfied, structure is strong, metadata is aligned
  - remaining issues are mostly P2 or minor P1

