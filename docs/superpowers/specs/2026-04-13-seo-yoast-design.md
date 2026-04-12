# Design Specification: Yoast SEO Principles — All Pages

**Date:** 2026-04-13
**Project:** Senex Solar Power — Full SEO Audit & Implementation
**Approach:** Layer-by-layer (B) — Meta → Schemas → Headings → robots.txt + alt text

---

## Current State (What's Already Good)

- `BaseLayout.astro`: canonical URL, OG tags, Twitter Cards, JSON-LD injection, hreflang ro/x-default, publishDate for articles ✅
- `src/lib/schema.ts`: LocalBusiness, Organization, FAQ, BlogPost schema generators ✅
- Sitemap auto-generated via `@astrojs/sitemap` ✅
- Google Search Console verified, GA4 active ✅
- Blog posts: use `getBlogPostSchema()` correctly ✅

---

## Layer 1: Meta Titles + Descriptions

### Rules (Yoast)
- Title: 50–60 chars, focus keyword near start, brand at end via `| Senex Solar`
- Description: 150–160 chars, includes focus keyword, value prop, CTA
- Each page has a unique, non-duplicate title + description
- Focus keyword appears in title, description, H1, and first paragraph

### Per-Page Targets

| Page | Focus Keyword | Optimized Title (~60 chars) | Description (150–160 chars) |
|------|--------------|-----------------------------|-----------------------------|
| `/` | "panouri solare Iași" | "Instalare Panouri Solare Iași — Sisteme Fotovoltaice" | "Instalare panouri fotovoltaice în Iași și Moldova. Sisteme rezidențiale și comerciale, rate TBI Bank, garanție 25 ani. Analiză gratuită." |
| `/rezidential` | "panouri solare rezidențiale Iași" | "Panouri Solare Rezidențiale Iași — Case și Vile" | "Sisteme fotovoltaice 3–15 kWp pentru case din Iași. Instalare completă, finanțare rate TBI Bank, grant AFM Casa Verde. Analiză gratuită." |
| `/comercial` | "panouri solare comerciale Iași" | "Panouri Solare Comerciale Iași — Firme și Hale" | "Sisteme fotovoltaice 10–500 kWp pentru firme și hale din Iași. Reducere facturi cu 70–90%, ROI 3–5 ani. Ofertă personalizată gratuită." |
| `/subventii-casa-verde` | "grant AFM Casa Verde 2026" | "Grant AFM Casa Verde 2026 Iași — Ghid Complet" | "Ghid complet pentru grantul AFM Casa Verde 2026 în Iași. 20.000 RON nerambursabil pentru panouri solare. Cum aplici și ce condiții sunt." |
| `/contact` | "contact panouri solare Iași" | "Contact Senex Solar Power Iași — Analiză Gratuită" | "Contactează Senex Solar Power din Iași. Telefon, WhatsApp, email. Analiză gratuită fără obligații. Program L–V 8:00–18:00, Sâmbătă 9:00–14:00." |
| `/cerere-oferta` | "cerere ofertă panouri solare" | "Cerere Ofertă Panouri Solare Iași — Senex Solar" | "Solicită ofertă gratuită pentru panouri solare în Iași. Completează formularul și primești calculul de economii și opțiuni de finanțare." |
| `/blog` | "blog panouri solare Iași" | "Blog Solar Iași — Sfaturi și Ghiduri Fotovoltaice" | "Articole despre panouri solare, stocarea energiei, vehicule electrice și subvenții AFM. Ghiduri practice pentru proprietari din Iași." |
| `/blog/[slug]` | per-article (already in frontmatter) | `post.data.title \| Senex Solar` | `post.data.description` (already 155–160 chars per article) ✅ |

**Implementation:** Edit each `.astro` page's `<BaseLayout title="..." description="...">` props.

---

## Layer 2: JSON-LD Schemas

### New Schemas to Add

#### 2a. WebSite Schema (BaseLayout)
Add to `BaseLayout.astro` as a constant schema injected on every page:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Senex Solar Power",
  "url": "https://senexsolar.pages.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://senexsolar.pages.dev/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### 2b. Service Schema (rezidential + comercial pages)
Generator function `getServiceSchema(type)` in `schema.ts`:
- `/rezidential`: Service name "Instalare sistem fotovoltaic rezidențial", areaServed Iași
- `/comercial`: Service name "Instalare sistem fotovoltaic comercial", areaServed Iași

#### 2c. FAQPage Schema (index + rezidential + comercial)
`getFAQSchema()` already exists in `schema.ts` — connect it to pages that have `<FAQ />` sections by passing FAQ data as `schema` prop to BaseLayout.

#### 2d. BreadcrumbList Schema (all inner pages)
Generator function `getBreadcrumbSchema(items)` in `schema.ts`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://senexsolar.pages.dev"},
    {"@type": "ListItem", "position": 2, "name": "Rezidențial", "item": "https://senexsolar.pages.dev/rezidential"}
  ]
}
```
Used on: rezidential, comercial, subventii, contact, cerere-oferta, blog, blog/[slug]

### Files to Modify
- `src/lib/schema.ts` — add `getWebSiteSchema()`, `getServiceSchema()`, `getBreadcrumbSchema()`
- `src/layouts/BaseLayout.astro` — inject WebSite schema globally
- `src/pages/rezidential.astro` — add Service + Breadcrumb + FAQ schemas
- `src/pages/comercial.astro` — add Service + Breadcrumb + FAQ schemas
- `src/pages/index.astro` — add FAQ schema (page has `<FAQ />` section)
- `src/pages/subventii-casa-verde.astro` — add Breadcrumb schema
- `src/pages/contact.astro` — add Breadcrumb schema
- `src/pages/cerere-oferta.astro` — add Breadcrumb schema
- `src/pages/blog/index.astro` — add Breadcrumb schema
- `src/pages/blog/[...slug].astro` — add Breadcrumb schema (already has BlogPost ✅)

---

## Layer 3: Heading Hierarchy Audit

### Rules (Yoast)
- Exactly **1× H1** per page, containing focus keyword
- H2 for main sections, H3 for subsections
- No skipping levels (H1 → H3 without H2)
- H1 should be the first heading seen by crawlers

### Audit Scope
Read each page's section components to verify H1 presence and hierarchy. If a section uses `<h2>` as page title (because it's a component), it may need `<h1>` promoted at page level.

**Known risk:** Section components may use `<h2>` for their titles — acceptable if the page layout has an implicit H1 in Hero. Need to verify Hero component has `<h1>`.

### Files to Audit + Potentially Modify
- `src/components/sections/Hero.astro` — verify H1
- `src/components/sections/*.astro` — verify H2/H3 hierarchy
- Each page that lacks a Hero may need an explicit H1

---

## Layer 4: robots.txt + Image Alt Text

### robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://senexsolar.pages.dev/sitemap-index.xml
```
Note: `noindex` pages (if any) are handled via meta tag in BaseLayout, not robots.txt.

### Image Alt Text Audit
Scan all `<img>` and `<Image>` tags across section components. Ensure:
- Decorative images: `alt=""`
- Content images: descriptive alt with keywords where natural
- Logo: `alt="Senex Solar Power"` ✅ (already set in Footer/Header)

---

## Implementation Order

1. **Layer 1** — Meta titles + descriptions (8 pages) → commit
2. **Layer 2** — Schema functions in schema.ts → commit, then wire to pages → commit
3. **Layer 3** — Heading hierarchy audit + fixes → commit
4. **Layer 4** — robots.txt + alt text → commit

---

## Success Criteria

- ✅ All 8 pages have unique, keyword-optimized titles (50–60 chars)
- ✅ All 8 pages have unique descriptions (150–160 chars) with focus keyword + CTA
- ✅ WebSite schema on every page
- ✅ Service schema on `/rezidential` and `/comercial`
- ✅ FAQPage schema on `/`, `/rezidential`, `/comercial`
- ✅ BreadcrumbList on all inner pages
- ✅ Exactly 1× H1 per page containing focus keyword
- ✅ robots.txt with sitemap reference
- ✅ All content images have descriptive alt text
- ✅ `npm run build` passes with no errors
