# Alchemy IVF — Website

Marketing + lead-generation website for an IVF / fertility clinic.
SEO and mobile responsiveness are first-class requirements.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (design tokens in tailwind.config.ts)
- Content: typed JSON files in /content (MDX for blog later). No CMS.
- Images: next/image only. Deploy target: Vercel (static generation).

## Project structure
/app          — routes; pages only wire content -> components
/components/layout     — TopBar, Header, Footer
/components/sections   — page sections (Hero, FAQ, etc.)
/components/ui         — primitives (Button, Card, Accordion, Input)
/content      — all site text/data as JSON, validated by /lib/types.ts
/lib          — types.ts, schema.ts (JSON-LD builders), utils
/public       — static assets

## Golden rules
1. NO hardcoded text in components. Every component receives content via
   props. All copy/data lives in /content/*.json. Placeholder content is
   expected and WILL be replaced — keep components fully content-agnostic.
2. Every content file is typed. Define interfaces in /lib/types.ts; the
   JSON in /content must satisfy them.
3. Build the component library FIRST, then assemble pages from it.
   Any repeated UI = one reusable component.
4. Mobile-first. Every component works at 360 / 768 / 1024 / 1440px.
   Tailwind responsive prefixes; no fixed pixel widths on layout.
5. Images: next/image only, with sizes set. Never a raw <img>.
6. Semantic HTML: one <h1> per page, correct heading order, <nav>,
   <main>, <footer>, <section> with aria-labels.
7. SEO per route: export Next.js Metadata + relevant JSON-LD.
8. Accessibility: AA contrast, visible focus states, alt text, labelled
   inputs, keyboard-operable accordions/carousels.

## SEO requirements
- Static metadata or generateMetadata on every route.
- JSON-LD via a <JsonLd> component:
  - MedicalClinic — sitewide (root layout) with full NAP
  - FAQPage — any page with an FAQ section
  - Physician / MedicalProcedure / BreadcrumbList — on later pages
- app/sitemap.ts and app/robots.ts. Descriptive alt + link text.

## Design system (confirm exact values from Figma via MCP)
- Primary orange | Secondary navy | Accent WhatsApp-green
- Backgrounds: white + soft peach tints | Fonts: confirm from Figma
- All colors/fonts/spacing/radius = tokens in tailwind.config.ts.
  Components reference tokens, never raw hex.

## Design source
Designs are in Figma; use the Figma MCP server. Given a frame link, match
spacing, sizes, colours, layout precisely. The designer will add more
frames over time (treatments, doctors, blog) — new pages reuse the
existing component library.

## Known design cleanups (apply regardless of placeholder copy)
- Header needs real nav: Home, About, Treatments, Doctors, Blog, Contact
  (current design shows only logo + "Contact Us").
- Specialty/treatment cards link to treatment pages (stub routes for now),
  not a direct booking action.
- Build the correct NUMBER of distinct items even if placeholder text
  repeats (5 different specialty cards, 8 separate FAQ entries, etc.).
- Contact page = lead-capture landing page; include address + map area +
  hours block for local-SEO NAP consistency.

## Workflow
Work in phases. After each phase ensure `npm run build` passes, report
what was done, and STOP. Do not start the next phase unprompted.