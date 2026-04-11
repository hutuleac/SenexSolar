# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Senex Solar Power — Romanian solar installer website (Iași). Conversion-focused static site with interactive React islands. Deployed on Cloudflare Pages at `senexsolar.pages.dev`.

**Stack:** Astro 6 · React 19 · Tailwind CSS v4 · Motion 12 · Swiper · react-hook-form + Zod · Cloudflare Pages Functions

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview built output locally
```

No test suite. Verify changes with `npm run build` — TypeScript errors surface here.

## Architecture

### Output Mode
`output: 'static'` in `astro.config.mjs` — every page is pre-rendered. The `@astrojs/cloudflare` adapter is **not installed** (removed to fix a CF Pages ASSETS binding conflict). The `functions/` directory is auto-detected by Cloudflare Pages for serverless API routes.

### Design System
Tailwind v4 with **no `tailwind.config.mjs`**. All design tokens are in `src/styles/global.css` inside `@theme {}`. Colors: `--color-green: #1E6B3A`, `--color-orange: #F5A623`, `--color-beige: #F7F6F2`. Fonts: Instrument Serif (display/headings) via `@fontsource/instrument-serif`, Inter Variable (body) via `@fontsource-variable/inter`.

### Content Collections (Astro 6 Content Layer API)
Config is at `src/content.config.ts` (not `src/content/config.ts`). Uses `glob()` loaders — not the legacy `defineCollection` with `type`. Two collections: `blog` (Markdown) and `caseStudies` (JSON).

### React Islands
Components in `src/components/islands/` hydrate selectively:
- `client:visible` — SavingsCalculator, AnimatedCounter, TestimonialCarousel, FAQAccordion
- `client:load` — ContactForm (must be ready on page load)

Calculator logic lives in `src/lib/calculator.ts` (pure TS, no side effects) and is imported by the React island.

### Sections vs Islands
`src/components/sections/` — pure Astro, zero client JS, use CSS `animation-timeline: view()` for scroll animations via `.animate-on-scroll` class. `src/components/islands/` — React only where interactivity is needed.

## Key Files

| File | Purpose |
|---|---|
| `src/lib/constants.ts` | Phone, email, address, OG config — single source of truth |
| `src/lib/calculator.ts` | Solar savings calculation logic |
| `src/lib/counties.ts` | All 41 RO counties with peak sun hours |
| `src/lib/schema.ts` | JSON-LD generators (LocalBusiness, FAQ) |
| `src/styles/global.css` | Tailwind import, `@theme {}` tokens, `@font-face`, scroll animation keyframes |
| `functions/api/contact.ts` | CF Pages Function — form handler, sends email via Resend if `RESEND_API_KEY` env var is set |
| `wrangler.toml` | CF Pages config — only name, compatibility_date, vars. Do NOT add `pages_build_output_dir` (causes ASSETS binding conflict) |

## Common Change Patterns

**Add a nav link:** Edit `NAV_LINKS` array in `src/lib/constants.ts`.

**Add a blog post:** Create `src/content/blog/slug.md` with frontmatter: `title`, `description`, `publishDate` (YYYY-MM-DD), `tags` (array).

**Change phone/email/address:** Edit `SITE` object in `src/lib/constants.ts` — propagates everywhere.

**Add a page section:** Create `src/components/sections/NewSection.astro`, import and add to `src/pages/index.astro`.

**Modify calculator logic:** Edit `src/lib/calculator.ts`. Constants: `TARIFF = 0.85` RON/kWh, `COST_PER_KWP_RESIDENTIAL = 1100` EUR, `AFM_SUBSIDY = 20000` RON.

**Enable email delivery:** Add `RESEND_API_KEY` environment variable in CF Pages dashboard → Settings → Environment Variables. The function at `functions/api/contact.ts` activates email sending automatically.

## Deployment

Push to `master` on `hutuleac/SenexSolar` → auto-deploys to Cloudflare Pages.

**Do NOT add `pages_build_output_dir` to `wrangler.toml`** — it causes CF Pages to process the dist wrangler.json and fail with "ASSETS name is reserved".
