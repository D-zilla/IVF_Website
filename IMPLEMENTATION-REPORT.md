# Alchemy IVF Website — Implementation Report

Snapshot of the codebase as it stands. Audited by reading every source file
under [app/](app/), [components/](components/), [content/](content/),
[lib/](lib/) and [public/](public/). This report describes what exists in the
code today, not what was planned.

---

## 1. Project setup

From [package.json](package.json):

| Dependency | Version |
|---|---|
| `next` | `15.5.18` |
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `typescript` | `^5.6.3` |
| `tailwindcss` | `^3.4.14` |
| `eslint` / `eslint-config-next` | `^9.14.0` / `15.5.18` |
| `postcss` / `autoprefixer` | `^8.4.49` / `^10.4.20` |
| `@types/node` / `@types/react` / `@types/react-dom` | `^22.9.0` / `^18.3.12` / `^18.3.1` |

- **Router**: App Router (files live under [app/](app/), no `pages/` directory).
- **TypeScript**: strict mode on, `noEmit: true`, path alias `@/* → ./*` (see [tsconfig.json](tsconfig.json)).
- **Scripts** ([package.json:5-10](package.json#L5-L10)): `dev`, `build`, `start`, `lint`.
- **Lint config**: minimal — [.eslintrc.json](.eslintrc.json) extends `next/core-web-vitals` only.

### Tailwind setup

[tailwind.config.ts](tailwind.config.ts) extends the default theme. All tokens
defined under `theme.extend`. Note: the file still carries the original
"Placeholder design tokens" comment but values have been tuned (twice) for
AA contrast — see Phase 5 fixes.

**Colors** ([tailwind.config.ts:12-70](tailwind.config.ts#L12-L70)):

- `primary` (CTA orange — deepened for AA on white): `DEFAULT #B85416`,
  `50 #FFF4EB`, `100 #FFE4CC`, `200 #FCC79A`, `300 #FAAA68`, `400 #F89B53`,
  **`500 #F58A3F` (lighter brand orange, used on TopBar / accent surfaces)**,
  `600 #D9531F`, `700 #B45913`, `800 #7E3E0D`, `900 #4A2407`.
- `secondary` (navy): `DEFAULT/500 #102A56`, plus 50–900 shades.
- `accent` (WhatsApp green — deepened for AA on white): `DEFAULT #15803D`,
  `50 #E8FAF0`, `100 #C5F2D7`, **`500 #25D366` (true WhatsApp brand, non-text use)**,
  `600 #1FB958`, `700 #188F44`.
- `peach`: `50 #FFF8F1`, `100 #FFF1E6`, `200 #FFE0C7`, `300 #FFCFA8`.
- `ink`: `DEFAULT #111827`, `muted #4B5563`, `subtle #6B7280`, `inverse #FFFFFF`.
- `surface`: `DEFAULT #FFFFFF`, `alt #FAFAFA`, `peach #FFF1E6`, `navy #0B1F3A`.
- `divider`: `#E5E7EB`.

**Fonts** ([tailwind.config.ts:71-75](tailwind.config.ts#L71-L75)):

- `sans`: `var(--font-sans), ui-sans-serif, system-ui, sans-serif`
- `display`: `var(--font-display), Georgia, serif`

The CSS variables are set to system defaults in [app/globals.css](app/globals.css).
**No `next/font` family has been wired in yet** — the Figma file's actual font
name was never extracted (see §8).

**Spacing** ([tailwind.config.ts:76-80](tailwind.config.ts#L76-L80)): adds
`section: 4rem`, `section-lg: 6rem`, `section-xl: 8rem` on top of Tailwind defaults.

**Border radius** ([tailwind.config.ts:81-90](tailwind.config.ts#L81-L90)):
`sm 0.375rem` · `DEFAULT 0.5rem` · `md 0.75rem` · `lg 1rem` · `xl 1.25rem` ·
`2xl 1.5rem` · `3xl 2rem` · `pill 9999px`.

**Other** ([tailwind.config.ts:91-96](tailwind.config.ts#L91-L96)):
`maxWidth.container: 1280px`, `boxShadow.card`.

---

## 2. Folder structure

```
app/
├── about/page.tsx          — stub page (uses content/stubs.json)
├── blog/page.tsx           — stub page
├── contact/page.tsx        — contact landing (HeroForm + ComplianceNotice)
├── doctors/page.tsx        — stub page
├── treatments/page.tsx     — stub page
├── globals.css             — Tailwind directives + CSS vars + base styles
├── icon.svg                — favicon (served as /icon.svg)
├── layout.tsx              — root shell: TopBar + Header + main + Footer + WhatsAppFloat + MedicalClinic JSON-LD
├── page.tsx                — home: composes 9 home sections + FAQPage JSON-LD
├── robots.ts               — Next robots metadata route
└── sitemap.ts              — Next sitemap metadata route (6 URLs)

components/
├── JsonLd.tsx              — generic <script type="application/ld+json"> emitter
├── layout/                 — site-chrome (TopBar, Header, Footer, Logo, WhatsAppFloat)
├── sections/               — page sections (heroes, grids, FAQ, CTA, etc.)
└── ui/                     — primitives (Button, Card, Accordion, FormField)

content/
├── site.json               — sitewide chrome content (TopBar, Header nav, Footer columns, WhatsApp)
├── home.json               — full home-page content
├── contact.json            — full contact-page content
└── stubs.json              — copy for /about /treatments /doctors /blog placeholder routes

lib/
├── schema.ts               — JSON-LD builders
├── seo.ts                  — SITE_URL/NAME constants + buildMetadata() helper
├── types.ts                — all TS interfaces for the content layer
└── utils.ts                — cn() className helper only

public/
└── images/                 — 17 placeholder SVGs (hero, 5 doctors, 6 stories, 4 avatars, 1 compliance illustration)
```

No remaining `.gitkeep` files. All folders contain real files.

---

## 3. Routes / pages

Build output: 11 static routes (`○`), zero dynamic.

| Route | File | Type | Metadata source | Notes |
|---|---|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Full page | `buildMetadata(content.meta)` (static) | Composes 9 section components + injects FAQ JSON-LD |
| `/contact` | [app/contact/page.tsx](app/contact/page.tsx) | Full page | `buildMetadata(content.meta)` (static) | HeroForm + ComplianceNotice |
| `/about` | [app/about/page.tsx](app/about/page.tsx) | **Stub** | `buildMetadata({...})` (static) | Renders `<StubPage>` from `stubs.about` |
| `/treatments` | [app/treatments/page.tsx](app/treatments/page.tsx) | **Stub** | `buildMetadata({...})` (static) | `stubs.treatments` |
| `/doctors` | [app/doctors/page.tsx](app/doctors/page.tsx) | **Stub** | `buildMetadata({...})` (static) | `stubs.doctors` |
| `/blog` | [app/blog/page.tsx](app/blog/page.tsx) | **Stub** | `buildMetadata({...})` (static) | `stubs.blog` |
| `/robots.txt` | [app/robots.ts](app/robots.ts) | Metadata route | n/a | Sitemap + host pointers |
| `/sitemap.xml` | [app/sitemap.ts](app/sitemap.ts) | Metadata route | n/a | 6 URLs |
| `/icon.svg` | [app/icon.svg](app/icon.svg) | Static asset | n/a | Favicon |

**No route uses `generateMetadata`** — all metadata is static (`export const metadata`).
Root [app/layout.tsx](app/layout.tsx) sets `metadataBase: new URL(SITE_URL)`,
default title/template, OG, Twitter, `robots: { index, follow }`.

The footer links to deeper treatment routes (`/treatments/counseling`,
`/treatments/laparoscopy-hysteroscopy`, `/treatments/gestational-carrier`) and
the SpecialtyCard CTAs link to `/treatments/ivf`, `/treatments/iui`, etc.
**None of these deeper routes exist** — they 404. See §9.

---

## 4. Components

### Layout — [components/layout/](components/layout/)

| Component | File | Purpose | Props |
|---|---|---|---|
| `TopBar` | [TopBar.tsx](components/layout/TopBar.tsx) | Orange band above header: location + phone | `{ content: TopBarContent }` |
| `Header` | [Header.tsx](components/layout/Header.tsx) | Sticky white header: logo, 6-link nav, CTA pill, mobile hamburger with scroll-lock | `{ content: HeaderContent }` (client component) |
| `Footer` | [Footer.tsx](components/layout/Footer.tsx) | Navy footer: brand+tagline, Quick Links, Services, Contact columns, copyright | `{ content: FooterContent }` |
| `Logo` | [Logo.tsx](components/layout/Logo.tsx) | Inline SVG logo (placeholder mark + "Alchemy IVF" text) | `{ variant?: "color" \| "inverse", ...SVGProps }` |
| `WhatsAppFloat` | [WhatsAppFloat.tsx](components/layout/WhatsAppFloat.tsx) | Fixed bottom-right pill linking to wa.me with optional prefilled message | `{ content: WhatsAppContent }` |

### Sections — [components/sections/](components/sections/)

| Component | File | Purpose | Props |
|---|---|---|---|
| `HeroImage` | [HeroImage.tsx](components/sections/HeroImage.tsx) | Home hero: eyebrow, h1, description, `StatBlock`, dual CTAs, hero image | `{ content: HeroImageContent }` |
| `HeroForm` | [HeroForm.tsx](components/sections/HeroForm.tsx) | Contact hero: trust badge + avatars + rating, headline pair, feature tiles, embedded `ConsultationForm`, WhatsApp CTA | `{ content: HeroFormContent }` |
| `StatBlock` | [StatBlock.tsx](components/sections/StatBlock.tsx) | Semantic `<dl>` 3-stat block; default + inverse tones | `{ stats: Stat[], align?, tone?, className? }` |
| `SpecialtyCard` | [SpecialtyCard.tsx](components/sections/SpecialtyCard.tsx) | Single specialty tile: icon + title + description + "Learn more {title} →" link | `{ item: SpecialtyCardContent }` |
| `SpecialtiesGrid` | [SpecialtiesGrid.tsx](components/sections/SpecialtiesGrid.tsx) | Section wrapper around `SpecialtyCard` grid (2/3/5 cols) | `{ content: SpecialtiesSectionContent }` |
| `TrustSection` | [TrustSection.tsx](components/sections/TrustSection.tsx) | Navy "Why Patients Trust Us": bullets + 6 highlight tiles + dual CTAs | `{ content: TrustSectionContent }` |
| `DoctorCard` | [DoctorCard.tsx](components/sections/DoctorCard.tsx) | Circular doctor portrait + name + title, optional `<Link>` wrapper | `{ doctor: DoctorCardContent }` |
| `DoctorsGrid` | [DoctorsGrid.tsx](components/sections/DoctorsGrid.tsx) | Section wrapper around `DoctorCard` grid (2/3/5 cols) + optional view-all | `{ content: DoctorsSectionContent }` |
| `TestimonialVideoGallery` | [TestimonialVideoGallery.tsx](components/sections/TestimonialVideoGallery.tsx) | Desktop 6-cell collage, mobile scroll-snap carousel | `{ content: TestimonialGalleryContent }` |
| `ReviewCard` | [ReviewCard.tsx](components/sections/ReviewCard.tsx) | Single review: avatar letter, author, time, stars (`role="img"`), body, source badge | `{ review: ReviewContent }` |
| `ReviewsCarousel` | [ReviewsCarousel.tsx](components/sections/ReviewsCarousel.tsx) | Scroll-snap track, prev/next buttons enabled by JS bounds detection | `{ content: ReviewsSectionContent }` (client component) |
| `WhyChooseSection` | [WhyChooseSection.tsx](components/sections/WhyChooseSection.tsx) | Navy 4-up icon row | `{ content: WhyChooseSectionContent }` |
| `FAQAccordion` | [FAQAccordion.tsx](components/sections/FAQAccordion.tsx) | 2-column accordion grid at lg+, splits items in half | `{ content: FAQSectionContent }` |
| `CTASection` | [CTASection.tsx](components/sections/CTASection.tsx) | Navy CTA band with heart icon, primary + outlineInverse buttons, trust pills | `{ content: CTASectionContent }` |
| `ConsultationForm` | [ConsultationForm.tsx](components/sections/ConsultationForm.tsx) | Typed-field form with submit, reassurance, disclaimer | `{ content: ConsultationFormContent, className? }` |
| `ComplianceNotice` | [ComplianceNotice.tsx](components/sections/ComplianceNotice.tsx) | Navy band, orange bullets + side image | `{ content: ComplianceNoticeContent }` |
| `StubPage` | [StubPage.tsx](components/sections/StubPage.tsx) | Placeholder h1 + body paragraph for /about, /blog, /doctors, /treatments | `{ content: StubPageContent }` |

### UI — [components/ui/](components/ui/)

| Component | File | Purpose | Props |
|---|---|---|---|
| `Button` / `ButtonLink` | [Button.tsx](components/ui/Button.tsx) | Forms button or anchor; 6 variants (`primary`, `secondary`, `outline`, `outlineInverse`, `whatsapp`, `ghost`), 3 sizes, optional icons | `Button`: `{ variant?, size?, fullWidth?, iconLeft?, iconRight?, ...ButtonHTMLAttributes }`. `ButtonLink`: same + `{ href, external? }` |
| `Card` | [Card.tsx](components/ui/Card.tsx) | Tone × padding × radius wrapper, polymorphic `as` | `{ tone?: "default"\|"peach"\|"navy"\|"primary"\|"outline", padding?: "sm"\|"md"\|"lg", radius?: "md"\|"lg"\|"xl"\|"2xl", as?, ...HTMLAttributes }` |
| `Accordion` | [Accordion.tsx](components/ui/Accordion.tsx) | ARIA-correct accordion; collapsible with `aria-expanded` / `aria-controls`; supports multiple-open | `{ items: AccordionItemContent[], allowMultiple?, defaultOpen?: number[], className? }` (client component) |
| `FormField` | [FormField.tsx](components/ui/FormField.tsx) | Labelled input with hint/error, `aria-invalid`, `aria-describedby`; `forwardRef` | `{ label, hint?, error?, required?, id?, ...InputHTMLAttributes }` |

### Other — [components/](components/)

| Component | File | Purpose | Props |
|---|---|---|---|
| `JsonLd` | [JsonLd.tsx](components/JsonLd.tsx) | Emits `<script type="application/ld+json">` with `JSON.stringify(data)` | `{ data: object \| object[], id? }` |

### Hardcoded text audit

Grep across [components/](components/) for non-prop user-facing strings:

- **No section or layout component contains user-facing copy in JSX.** Every
  visible string comes from props.
- The only string literals are SVG icon paths, Tailwind class names, and
  `aria-label` accessibility strings (e.g. `"Patient avatars"`, `"Primary"`,
  `"Mobile"`, `"Previous review"`, `"Next review"`, `"Patient story carousel"`,
  `"Open menu"` / `"Close menu"`). These are infrastructure strings; per
  CLAUDE.md they could be moved to content in a future pass but are
  currently inline. **Flagged as a minor deviation** — see §9.
- The placeholder `Logo` ([components/layout/Logo.tsx](components/layout/Logo.tsx))
  renders the literal text "Alchemy" / "IVF" inside the SVG. It's a
  placeholder asset, not content-driven; replace when the real logo lands.

---

## 5. Content layer

### Files in [content/](content/)

| File | What it holds | Type |
|---|---|---|
| [site.json](content/site.json) | TopBar (location, phone), Header (brand, 6 nav links, CTA), Footer (description, 3 link columns, address, 2 phones, copyright), WhatsApp (number, label, default message) | `SiteContent` |
| [home.json](content/home.json) | Home `meta` + 9 section blocks: `hero`, `specialties` (**5 distinct items**: IVF, IUI, ICSI, Donor Program, Fertility Preservation), `trust` (4 bullets, 6 highlights), `doctors` (**5 distinct doctors**), `testimonials` (6 distinct videos), `whyChoose` (4 features), `reviews` (5 distinct reviews), `faq` (**8 distinct Q/A pairs**), `cta` | `HomeContent` |
| [contact.json](content/contact.json) | Contact `meta` + `hero` (trust badge, 4 avatars, rating, 3 feature tiles, 4-field form, WhatsApp CTA) + `compliance` (6 bullets, image) | `ContactContent` |
| [stubs.json](content/stubs.json) | One block each for `about`, `treatments`, `doctors`, `blog` — title, description, heading, body | `StubsContent` |

### Interfaces — [lib/types.ts](lib/types.ts)

All declared in a single file. Atoms:

- `NavLink`, `PhoneNumber`, `ImageAsset`, `CTAAction`, `Stat`, `BrandContent`.

Sitewide chrome:

- `TopBarContent`, `HeaderContent`, `FooterColumn`, `FooterContactItem`,
  `FooterContent`, `WhatsAppContent`, `SiteContent`.

Section content:

- `HeroImageContent`, `HeroFormContent` (+ `HeroFormTrust`, `HeroFormFeature`),
  `SpecialtyCardContent` + `SpecialtiesSectionContent`,
  `TrustHighlight` + `TrustSectionContent`,
  `DoctorCardContent` + `DoctorsSectionContent`,
  `TestimonialVideo` + `TestimonialGalleryContent`,
  `WhyChooseFeature` + `WhyChooseSectionContent`,
  `ReviewContent` + `ReviewsSectionContent`,
  `FAQItem` + `FAQSectionContent`,
  `CTASectionContent`,
  `FormFieldType` + `ConsultationFormField` + `ConsultationFormContent`,
  `ComplianceNoticeContent`.

Page-level:

- `PageMeta` (with optional `ogImage`), `HomeContent`, `ContactContent`,
  `StubPageContent`, `StubsContent`.

### Content-driven verification

- Each page imports its JSON and casts to the corresponding interface — e.g.
  `const content = homeContent as HomeContent;` ([app/page.tsx:17](app/page.tsx#L17)).
- **No literal user-facing copy exists in any page file or section component.**
- Aria-label strings in components are the only inline strings (see §4
  hardcoded text audit).
- Cast pattern (`as ContentType`) is used because JSON imports are typed as
  `any`-equivalent in Next 15; this is acceptable but does not validate
  shape at runtime. No JSON validation layer (e.g. zod) is wired in.

---

## 6. SEO implementation

### Metadata

- Root [app/layout.tsx:16-43](app/layout.tsx#L16-L43) sets sitewide defaults:
  `metadataBase`, title template (`%s | Alchemy IVF`), default description,
  canonical `/`, full `openGraph` (type, siteName, title, description, url,
  images, locale), `twitter` (`summary_large_image`), `robots`.
- Every page-level route exports `metadata` built with
  `buildMetadata(meta: PageMeta)` from [lib/seo.ts](lib/seo.ts).
  `buildMetadata` produces title + description + `alternates.canonical` +
  `openGraph` (with image fallback to `DEFAULT_OG_IMAGE`) + `twitter`.
- Pages using `buildMetadata`: `/`, `/contact`, `/about`, `/treatments`,
  `/doctors`, `/blog` — **6 of 6 page routes**.

### JSON-LD

- [components/JsonLd.tsx](components/JsonLd.tsx) — generic injector
  emitting `<script type="application/ld+json">`.
- [lib/schema.ts](lib/schema.ts) — three builders:
  - `medicalClinicSchema({ site, imagePath? })` — `MedicalClinic` with `name`,
    `url`, `image`, `description`, `address` (PostalAddress derived from
    `site.topBar.location` and `site.footer.contact.address.value`),
    `telephone`, `contactPoint` (array, mapped from `footer.contact.phones`),
    `medicalSpecialty: "Reproductive Endocrinology"`.
  - `faqPageSchema(faq)` — `FAQPage` with `mainEntity` mapped from each FAQ item.
  - `breadcrumbListSchema(items)` — defined and exported but **not used by
    any page yet**. Wiring pending future treatment / doctor detail pages.

### Where the schemas are wired

| Schema | Injection site | Notes |
|---|---|---|
| `MedicalClinic` | [app/layout.tsx:64](app/layout.tsx#L64) (sitewide via root layout) | Built once at module load from `site.json` |
| `FAQPage` | [app/page.tsx:35](app/page.tsx#L35) (home only) | Built from `content.faq.items` |
| `BreadcrumbList` | not wired | helper exists, no callsite |

### sitemap & robots

- [app/sitemap.ts](app/sitemap.ts) returns six entries: `/` (priority 1.0),
  `/treatments` (0.8), `/contact` (0.9), `/about` (0.7), `/doctors` (0.7),
  `/blog` (0.5), all `changeFrequency: "weekly"`, `lastModified: new Date()`
  (rebuild bumps it to build time).
- [app/robots.ts](app/robots.ts) allows all user agents, points to
  `${SITE_URL}/sitemap.xml`, and sets `host: SITE_URL`.
- Both pull `SITE_URL` from [lib/seo.ts](lib/seo.ts), which is currently
  `https://example.com`. **Real production domain has not been set** — see §9.

---

## 7. Responsiveness

Mobile-first throughout. Tailwind responsive prefixes used: `sm` (640px),
`md` (768px, used sparingly), `lg` (1024px), no `xl`/`2xl` usage. The four
named breakpoints from CLAUDE.md (360 / 768 / 1024 / 1440) map cleanly:

- 360 → base utilities (no prefix)
- 768 → between `sm` (640) and `lg` (1024); inherits `sm:` styles
- 1024 → `lg:` prefix activates
- 1440 → still `lg:` (no `xl:` rules defined); container caps at 1280px

### Behaviour at each breakpoint

| Section | < sm (360) | sm (640–1023) | lg+ (1024–1440) |
|---|---|---|---|
| TopBar | Stacked (location above phone), centered | Inline `flex-row`, 40px gap | same |
| Header | Hamburger only, logo + menu button | same | Full nav inline + "Contact Us" pill |
| Mobile menu | Body-scroll-locked overlay panel | same | n/a (hamburger hidden) |
| HeroImage | Stacked: text above image | same (still stacked) | 2-column grid |
| SpecialtiesGrid | 2 columns | 3 columns at `sm` | **5 columns at `lg`** (target met) |
| TrustSection | Stacked; highlights 2-col | Stacked; highlights 3-col at `sm` | 2-column outer; highlights 3-col |
| DoctorsGrid | 2 cols | 3 cols at `sm` | 5 cols at `lg` |
| TestimonialVideoGallery | **Scroll-snap mobile carousel** (`< lg`) | same | **6-cell desktop collage** (varied cell shapes) |
| WhyChooseSection | 1 col | 2 cols at `sm` | 4 cols at `lg` |
| ReviewsCarousel | Card width 85% (snap) | 60% at `sm`, prev/next buttons appear | 32% at `lg`, 3 cards visible |
| FAQAccordion | 1 column | same | **2-column grid** (target met) |
| CTASection | Stacked CTAs | side-by-side at `sm` | same |
| ConsultationForm | Full width | same | side-by-side with HeroForm left column at `lg` |
| ComplianceNotice | Single column | same | `2fr 1fr` two-column |
| Footer | 1 column | 2 cols at `sm` | 4 cols at `lg` |
| WhatsAppFloat | 14×14 button | 16×16 at `sm+` | same |

### Mobile testimonial collage behaviour

[TestimonialVideoGallery.tsx](components/sections/TestimonialVideoGallery.tsx)
ships **two completely separate DOM structures**:

- `< lg`: `flex snap-x snap-mandatory overflow-x-auto` carousel, each tile
  `w-[70%] sm:w-[45%]` so 1.5 cards are visible per swipe-window.
- `≥ lg`: 6-cell `grid-cols-6 grid-rows-2` collage with varied cell spans
  (`col-span-2 row-span-2`, `col-span-2 row-span-1`, `col-span-1 row-span-1`,
  etc.) — first 6 videos only.

There is no JS-driven carousel logic for this one; touch swipe = native
scroll. Tested visually only via Lighthouse mobile emulation.

### Components flagged

None are desktop-only. The only client components are `Header` (state for
hamburger menu), `Accordion` (open/close state), and `ReviewsCarousel`
(scroll-position state for arrow enable/disable). All other section
components are server components.

---

## 8. Figma fidelity

### Source

- **Phase 2/3 design source**: two static screenshots provided by the user —
  one Home composite and one Contact frame. Figma MCP **was not used** (no
  Figma MCP server is configured in this environment). The user explicitly
  chose "I'll share screenshots instead" and "Skip Figma MCP, use links only"
  during Phase 2.
- Colours, spacing, radii, and layout proportions were eyeballed from the
  screenshots and refined for AA contrast (see §6 Phase 5 fixes).

### What was matched

- Overall section order and composition (TopBar → Header → Hero → Specialties
  → Trust → Doctors → Testimonials → WhyChoose → Reviews → FAQ → CTA → Footer).
- Orange + navy + WhatsApp green palette, peach surfaces, pill buttons,
  navy compliance band.
- Hero stat-block layout, contact form fieldset, 4-column footer.

### Known visual gaps vs the design

- **Font family is not the Figma font.** The Figma file's actual typeface
  was never extracted; CSS variables fall back to `ui-sans-serif` /
  `system-ui` / `Georgia`. Visually close-but-not-matching.
- **Brand logo is a placeholder SVG** ([components/layout/Logo.tsx](components/layout/Logo.tsx))
  — a hand-drawn drop + spermatozoon tail with the text "Alchemy IVF". The
  real logo asset has not been supplied.
- All **patient/doctor/story imagery is placeholder SVGs** in
  [public/images/](public/images/) — gradient + initial-letter avatars; no
  real photography.
- **Brand orange is deeper than the Figma** (CTA orange `#B85416` vs
  Figma-ish `#F58A3F`). This was a deliberate AA-contrast decision — the
  lighter brand orange `#F58A3F` fails WCAG AA against white text on
  buttons (ratio 2.44). The lighter tone is retained as `primary-500` for
  surfaces (TopBar background, peach tints). If the brand mandates the
  lighter button colour, the affected components need either a darker text
  fill or a larger type ramp.
- **WhatsApp green button uses `#15803D`** (AA-compliant) instead of the
  WhatsApp brand `#25D366` (kept as `accent-500` for icon usage only).
- **Specialty card icons** are a fallback teardrop SVG; the Figma shows a
  small flame/drop mark — close enough but not pixel-matched.
- The **"Trusted by millions" badge avatars** in the contact hero are
  simple coloured circles, not real avatar photos.
- Doctor names, story captions, and review bodies are placeholder copy,
  not real patient testimonials.

---

## 9. Known issues / TODOs / shortcuts

### Not done from CLAUDE.md

- **`Physician` and `MedicalProcedure` JSON-LD** — listed in CLAUDE.md under
  "JSON-LD via a <JsonLd> component" but no builders exist yet. They'd
  attach to doctor and treatment detail pages that haven't been built.
- **`BreadcrumbList`** — helper is defined in [lib/schema.ts:57](lib/schema.ts#L57)
  but no page emits a breadcrumb. Same root cause: detail pages don't exist
  yet.
- **Real fonts (Figma)** — CLAUDE.md says "All colors/fonts/spacing/radius =
  tokens in tailwind.config.ts. Components reference tokens, never raw hex."
  Components do reference tokens; fonts are token-based but the underlying
  CSS-var values are system defaults rather than the Figma font.
- **Doctor / treatment / blog detail routes** — the SpecialtyCard CTAs and
  Footer "Services" column link to `/treatments/ivf`, `/treatments/iui`,
  etc., and Doctor cards link to `/doctors/{slug}`. None of these routes
  exist; all 404.
- **`/treatments/patient-stories`** (testimonial view-all link) — 404.
- **A real production domain** in [lib/seo.ts](lib/seo.ts) `SITE_URL` — still
  `https://example.com`. This propagates to canonical URLs, OG URLs,
  sitemap entries, robots host, and the MedicalClinic JSON-LD. Must be
  updated before deploy.

### Shortcuts & placeholders

- **Placeholder copy** throughout `home.json` and `contact.json` is realistic
  but not authoritative — needs review by the clinic. Same for the
  Compliance Notice bullets (currently generic Ayurvedic-program-style
  language that doesn't fit a fertility clinic perfectly).
- **All imagery** is procedurally-generated SVG placeholders. The contact
  hero compliance illustration in particular is a rough outline.
- **`<dl>` in `StatBlock`** uses `<dd>` then `<dt>` order (value first, label
  second) — semantically OK per the HTML spec, axe-compliant; just unusual.
- **Form submission** is a plain `<form action={content.action} method="post">`
  with no endpoint wired. `action` is currently `undefined` in
  [content/contact.json](content/contact.json), so the form posts to the
  same URL and 405s.
- **Aria-label strings** like `"Primary"`, `"Mobile"`, `"Patient avatars"`,
  `"Previous review"`, `"Open menu"` are inline in components rather than
  in `site.json`. Pragmatic but technically a small deviation from the
  "no hardcoded text" rule.
- **Tailwind file header still says "Placeholder design tokens"** — the
  values have been tuned twice (Phase 2 from screenshots, Phase 5 for
  AA contrast). The comment is stale.

### Build status

- `npm run build` **passes cleanly** as of this report. Latest output:

  ```
  Route (app)                                 Size  First Load JS
  ┌ ○ /                                    2.74 kB         114 kB
  ├ ○ /_not-found                            997 B         103 kB
  ├ ○ /about                                 139 B         103 kB
  ├ ○ /blog                                  139 B         103 kB
  ├ ○ /contact                               174 B         111 kB
  ├ ○ /doctors                               139 B         103 kB
  ├ ○ /icon.svg                                0 B            0 B
  ├ ○ /robots.txt                            139 B         103 kB
  ├ ○ /sitemap.xml                           139 B         103 kB
  └ ○ /treatments                            139 B         103 kB
  + First Load JS shared by all             102 kB
  ```

  All 9 page-bearing routes prerender as static (`○`). No lint or
  type-check errors. No console warnings during build.

- **Latest Lighthouse scores** (mobile, headless Chrome, prod build):

  | Page | Perf | A11y | Best Practices | SEO |
  |---|---|---|---|---|
  | `/` | 99 | 100 | 100 | 100 |
  | `/contact` | 99 | 100 | 100 | 100 |

  Stub pages were not Lighthouse-tested (trivial content).

---

## 10. How to run

```bash
# install
npm install

# dev server (http://localhost:3000)
npm run dev

# production build + start
npm run build
npm run start

# lint
npm run lint
```

- Node 20+ (developed against v24.6.0).
- No environment variables required.
- No backend or database — the contact form posts to nowhere (see §9).
- Default dev URL: <http://localhost:3000>. Override with `PORT=…`.
