---
name: translate-blog-fr-to-en
description: Translates French blog articles (Markdown) into American English with maximum fidelity. Preserves Markdown structure, code blocks, inline code, URLs, commands, file paths, numbers, and proper nouns. Preserves YAML frontmatter while translating only selected fields (title/description by default). Use when translating a French blog post to English, creating `src/data/blog/en/**/*.md` from `src/data/blog/fr/**/*.md`, or when the user asks for an exact FR→EN blog translation.
---

# Translate blog article (FR → EN)

## Goal

Produce an **English translation** of a French blog post that is:
- **Meaning-faithful** (no additions, no omissions, no “creative” rewrites)
- **American English**
- **Ultra-strict about verbatim zones** (code/URLs/tokens unchanged)
- **Publish-ready** for this repo’s structure (`src/data/blog/<locale>/**/*.md`)

## Expected input

- A full French article in Markdown (text or file path), typically located under `src/data/blog/fr/`.
- Optional: target filename/path, SEO constraints, a glossary (preferred translations), and “do-not-translate” terms.

If details are missing, **infer** the target output path as the same filename under `src/data/blog/en/`.

## Non-negotiable preservation rules (verbatim zones)

Do **not** change anything inside these zones:
- **Code blocks** (triple backticks) including the language tag and every character inside
- **Inline code** (single backticks)
- **URLs** (including link targets in Markdown links)
- **File paths**, CLI commands, flags, environment variables, identifiers, package names
- **Numbers, units, and currency values** (unless the French text contains a formatting issue; fix formatting without changing value)
- **Proper nouns / product names / model names** (e.g., Claude Code, Cursor, Anthropic, Rust Token Killer, `rtk`)

If translating would require changing a verbatim zone, **keep it verbatim** and adjust surrounding prose only.

## YAML frontmatter rules

Frontmatter is the top `--- ... ---` block.

- **Preserve all keys and values exactly as-is** *except*:
  - `title`: translate to American English
  - `description`: translate to American English (can be empty; keep empty if empty)
- **Keep unchanged**: `pubDatetime`, `draft`, `tags` (including capitalization and ordering)
- Keep quotes style as-is (if the source uses `"..."`, keep `"..."`).

If the post contains an **extra `---` block** immediately after frontmatter (as a visual separator), **preserve it unchanged**.

## Light SEO (allowed, constrained)

Allowed only when it does **not** change meaning:
- Make headings more natural in English (still faithful)
- Slightly improve clarity/scannability (shorten overly long headings)
- Prefer common English search phrasing *when it’s a direct equivalent*

Not allowed:
- Adding new sections, claims, examples, CTAs, or facts
- Removing nuance or hedging present in French
- Reframing the article’s intent

## Translation procedure (follow in order)

### 1) Parse the structure

- Identify frontmatter and body.
- Detect verbatim zones and protect them.
- Keep Markdown structure: headings, lists, blockquotes, tables, horizontal rules, emphasis, and link text.

### 2) Translate faithfully

- Translate sentence by sentence, keeping tone and intent.
- Keep the author’s emphasis (bold/italic) and punctuation intent.
- Fix obvious French-to-English typography issues (spacing before `?`, `!`, `:`, etc.) **in the translated text only**.

### 3) Quality pass (no scope creep)

- Ensure no verbatim zone changed.
- Ensure all numbers and units match exactly.
- Ensure headings remain aligned with the original meaning.
- Ensure American English spelling and conventions.

## Output format (must follow)

Return the full translated Markdown post, ready to save as the English counterpart.

If a file path was provided, also state the **target path** you used (e.g., `src/data/blog/en/<same-file>.md`).

## Final self-check (must pass)

- [ ] `title` translated; `description` translated (or left empty if empty)
- [ ] `pubDatetime`, `draft`, `tags` unchanged
- [ ] Code fences and inline code unchanged
- [ ] URLs unchanged
- [ ] Numbers/units/currency unchanged
- [ ] No added/removed claims, steps, or examples
- [ ] American English throughout

