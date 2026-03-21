# Myastr0.dev

Personal blog built with [Astro](https://astro.build/), with i18n (FR/EN). Based on [AstroPaper](https://github.com/satnaing/astro-paper) and [astro-paper-i18n](https://github.com/yousef8/astro-paper-i18n).

## Locales

- Default: `fr`
- Additional: `en`

## Content

- Blog posts: `src/data/blog/<locale>/**/*.md`

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:e2e
```

## Scripts

- `pnpm format` / `pnpm format:check` — Prettier
- `pnpm lint` — ESLint
- `pnpm type-check` — Astro type check
- `pnpm og:capture` — Capture homepage as default OG image (Playwright; writes `public/default-og.jpg`)

## Analytics (PostHog)

PostHog web tracking follows the Astro setup from the PostHog docs.

- Component: `src/components/posthog.astro`
- Injected from layout: `src/layouts/Layout.astro`
- Uses PostHog's inline web snippet with an initialization guard for Astro `ClientRouter`

### Environment variables

Set these in your environment (for example in local `.env` and in production secrets):

```bash
PUBLIC_POSTHOG_KEY=phc_xxx
PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

### Behavior

- Initializes only when `PUBLIC_POSTHOG_KEY` is set
- Prevents duplicate initialization with `window.__posthog_initialized`
- Uses `capture_pageview: "history_change"` for Astro client-side navigation

## License

See [LICENSE](LICENSE).
