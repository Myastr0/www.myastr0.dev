---
name: chief-editor
description: Orchestrates a strict blog workflow for French posts: editorial+fact-check review (FR) → SEO review → faithful FR→EN translation. Use when the user wants an end-to-end writing/editing/reviewing/translating process, asks to “review then SEO then translate”, or provides a `src/data/blog/fr/**/*.md` post to publish in both locales. Enforces quality gates (PASS required) before moving to the next stage and writes the English mirror to `src/data/blog/en/**`.
---

# Chief editor (FR → SEO → EN)

## What this skill does

This skill is a **workflow orchestrator**. It coordinates three existing skills in this repo, in this exact order:

1) `article-review-fr` (editorial + fact-check)  
2) `article-seo-review` (SEO readiness)  
3) `translate-blog-fr-to-en` (faithful FR→EN translation)

It enforces **strict stop/go gates**: **do not proceed** to the next step until the current step is **PASS**.

## Inputs (expected)

- A French Markdown file path under `src/data/blog/fr/**/*.md`

If the user provides pasted markdown instead of a path, write it to the correct FR path first (or ask for the intended FR path only if it is impossible to infer).

## Output (guarantees)

- The French source file is edited until it passes:
  - `article-review-fr` (PASS), then
  - `article-seo-review` (PASS)
- The English translation is produced and saved to the mirrored path:
  - `src/data/blog/fr/<subpath>/<file>.md` → `src/data/blog/en/<subpath>/<file>.md`

## Orchestration rules (non-negotiable)

- **One step at a time**: never combine steps.
- **PASS gating**: never start the next step if the current step verdict is **NEEDS WORK**.
- **Apply fixes in the source file**: when a step yields fixes, update the FR file accordingly (keeping meaning intact).
- **Iterate until PASS**:
  - Re-run the same step after applying fixes.
  - If you are stuck after 3 iterations, stop and report what’s blocking PASS (with excerpts) and the smallest set of changes needed to pass.
- **No “creative additions”**:
  - During editorial + SEO steps, you may rewrite for clarity/structure, but do **not** add new factual claims unless you can support them.
  - During translation, follow the translation skill’s verbatim-zone rules strictly.

## Workflow (follow exactly)

### Step 0 — Load the FR post (and compute the EN target path)

1. Read the French file.
2. Compute target EN path by mirroring:
   - Replace the first path segment `src/data/blog/fr/` with `src/data/blog/en/`
3. Ensure the target directory exists (create it if needed).
4. If the EN target file already exists, plan to **overwrite it** with the new translation at Step 3 (the workflow is intended to be repeatable and keep EN in sync with FR).

### Step 1 — Editorial review + fact-check (FR) gate

Run the `article-review-fr` workflow on the full FR post.

- If verdict is **PASS**:
  - Proceed to Step 2.
- If verdict is **NEEDS WORK**:
  - Apply **all P0 fixes** in the FR file.
  - Apply P1 fixes needed to satisfy the PASS rubric (do not defer P1 if it blocks clarity/structure).
  - Re-run Step 1 until **PASS** (max 3 loops, then stop as described above).

### Step 2 — SEO review gate

Run the `article-seo-review` workflow on the updated FR post.

- If verdict is **PASS**:
  - Proceed to Step 3.
- If verdict is **NEEDS WORK**:
  - Apply **all P0 fixes** in the FR file first.
  - Apply P1 fixes needed to satisfy the PASS rubric.
  - Re-run Step 2 until **PASS** (max 3 loops, then stop as described above).

Important constraints while applying SEO fixes:
- Do not introduce new claims in FAQs/snippets.
- Keep headings natural; avoid keyword stuffing.
- Preserve repo/frontmatter conventions (keep existing keys unless the post format requires changes).

### Step 3 — Translate FR → EN (write mirrored EN file)

Run `translate-blog-fr-to-en` using the final FR file as the source.

Then:
- Save the translated markdown to the computed EN target path.
- Final check: ensure verbatim zones (code, inline code, URLs, paths, commands, numbers/units, proper nouns) are unchanged per the translation skill.

## Operator checklist (use internally)

- [ ] FR editorial review verdict is PASS
- [ ] FR SEO review verdict is PASS
- [ ] EN output path computed by mirroring `fr/` → `en/`
- [ ] EN file written and ready to publish
- [ ] No verbatim zones changed in translation

## Example triggers

- “Review this French post, make it publish-ready, then do an SEO pass, then translate it to English and save it.”
- “Orchestrate the full workflow: editorial review FR → SEO → translate FR→EN for `src/data/blog/fr/...`.”
