# Website overview (for AI and collaborators)

This document describes **what this site is**, **how it is structured in code**, and **where to change content**. Use it as context when asking an AI to modify the portfolio.

---

## 1. What this website is

This is a **personal portfolio** for **Praveen Elanchezhian**, positioned publicly as:

- **Creative filmmaker** (short films, ads, promos, VFX work, cinematography, editing, direction).
- **Think strategist** (MBA candidate at NIT Trichy; product, marketing, and UX-oriented professional narrative).
- **Contact hub** (social links and a message form).

The **visual language** is intentional: a **high-energy “comic book / Spider-Verse–inspired”** UI—neon-on-dark palettes, thick borders, comic typography (e.g. Bangers), halftone/dot textures, particle effects, and panel-like layouts. It is **not** a minimal corporate template.

---

## 2. Technical stack

| Layer | Choice |
|--------|--------|
| Build | **Vite** (`vite`, `@vitejs/plugin-react-swc`) |
| UI | **React 18** + **TypeScript** |
| Routing | **react-router-dom** — but see §3 (most navigation is **in-page state**, not URLs) |
| Styling | **Tailwind CSS** + design tokens in `src/index.css` (CSS variables for Think / Creative / Contact “zones”) |
| Component primitives | **Radix UI** + **shadcn-style** components under `src/components/ui/` |
| Animation / effects | **GSAP**, **Motion**, **ogl**, custom SVG/comic components (e.g. `HeroSlider`, `ComicParticles`) |
| Forms | **Web3Forms** (`https://api.web3forms.com/submit`) + **hCaptcha** on the contact form |
| Icons | **lucide-react** |

**Commands:** `npm run dev` (dev server), `npm run build` (production build), `npm run preview` (preview build).

---

## 3. Information architecture and routing

### Routes (URL-level)

Defined in `src/App.tsx`:

- **`/`** → `src/pages/Index.tsx` — the entire interactive portfolio.
- **`*`** (anything else) → `src/pages/NotFound.tsx` — simple 404 with link back to `/`.

There are **no separate paths** like `/creative` or `/think` in the router. Sub-pages are **views inside `Index`**.

### In-app “pages” (state, not routes)

`Index.tsx` holds React state `currentView` with values:

`home` → `creative` → `think` → `contact`

- **Home:** full-viewport **hero** with a draggable **vertical divider** between two background halves (**THINK** vs **CREATE**). User can go to Creative or Think from here; there is a **loading → blur/reveal → intro animation** sequence; navigation is **locked** until intro completes.
- **Creative:** film/ad/promo **portfolio** with a filterable project grid, dialogs/carousels, and rich per-project copy.
- **Think:** **resume / strategy / MBA** narrative in a comic-panel layout; content is largely driven by data in `thinkPageData.ts` at the **repo root** (imported as `../../thinkPageData` from `ThinkPage.tsx`).
- **Contact:** **social logo marquee** (`LogoLoop`) + **contact form** (Web3Forms + captcha).

Switching views **scrolls to top** and uses `PageTransition` to show/hide sections (mostly “render only the active view”).

**Implication for AI:** Changing “routes” usually means editing **`Index.tsx` state and handlers**, not adding `<Route>` entries—unless you explicitly want URL-based sections.

---

## 4. Key files and responsibilities

| File / area | Role |
|-------------|------|
| `index.html` | Document title, meta description, OG/Twitter tags, preload for hero image |
| `src/main.tsx` | React mount, imports global CSS |
| `src/App.tsx` | Router, global providers (toasts, tooltips), **document-level image protection** (blocks context menu / drag on `<img>` to discourage saving images) |
| `src/pages/Index.tsx` | Orchestrates home loading, `currentView`, lazy-loaded Creative/Think/Contact, `HeroSlider`, `ClickSpark`, `Noise` on home |
| `src/components/HeroSlider.tsx` | Home hero: split backgrounds, draggable divider, intro sweep, navigation to Creative/Think |
| `src/components/CreativePage.tsx` | Creative portfolio: **`projects` array** (titles, links, filters, awards, images under `public/Create/...`) |
| `src/components/ThinkPage.tsx` | Think page layout; imports copy from **`thinkPageData.ts`** |
| `thinkPageData.ts` (project root) | **Single source of truth** for Think page: meta, manifesto, education, experience, skills, tools, certifications |
| `src/components/ContactPage.tsx` | Contact UI, **`LogoLoop`**, form POST to Web3Forms, hCaptcha |
| `src/index.css` | **Design system**: CSS variables (`--think-*`, `--creative-*`, fusion/contact), Tailwind layers, comic utilities |
| `public/images/` | Hero backgrounds (e.g. `think-background.webp`), profile image references, etc. |
| `public/Create/` | Per-project WebP stills for Creative page carousels |
| `public/robots.txt`, `public/sitemap.xml` | SEO: allow crawlers; sitemap points to `/` |

### Components worth knowing

- **`PageTransition.tsx`:** Wraps a view; when not active, returns `null`. Home can use `fitViewport` for a locked viewport height.
- **`ComicParticles` / `DotGrid` / `ComicPopHeadlinePlate`:** Shared visual language across sections.
- **`BookNavigation.tsx`:** Fixed chevron prev/next — **defined in the repo but not wired into `Index` in the current flow** (may be legacy or reserved).

---

## 5. Content sources (where to edit copy)

| Content | Where |
|---------|--------|
| Think page (bio, CV button, education, jobs, skills, tools) | **`thinkPageData.ts`** |
| Creative projects (films, ads, filters, links, awards) | **`src/components/CreativePage.tsx`** — top-level `projects` array and `projectImages` |
| Contact (social URLs, form behavior) | **`src/components/ContactPage.tsx`** |
| Site title / SEO snippet / OG image | **`index.html`** |
| Global colors and comic theme | **`src/index.css`** (`:root` variables and utilities) |

---

## 6. Contact form behavior

- Submits to **Web3Forms** via `fetch` with JSON.
- Expects **`VITE_WEB3FORMS_ACCESS_KEY`** in environment for production; the component may use a fallback if env is missing—**rotate keys if exposed** and prefer env-only in deployment.
- **hCaptcha** must be completed before submit; Web3Forms client script is injected in `ContactPage`.
- Success shows a **thanks dialog** with a humorous confirmation line.

---

## 7. Performance and UX notes

- Home **preloads** hero-related WebP images and shows a short **“Entering…”** state before the hero is fully interactive.
- On **home**, `document.body` overflow is **hidden** so the hero behaves like a full-screen stage; other views use normal document scroll.
- **`@vercel/speed-insights`** is listed in `package.json` but **not required** for describing behavior; instrumentation may or may not be mounted in `App`—check `App.tsx` if you add analytics.

---

## 8. Security / privacy behaviors

- **Images:** `App.tsx` listens for `contextmenu` and `dragstart` on images and **prevents default** to reduce casual “save image” / drag-out behavior.
- **Forms:** Use HTTPS API for Web3Forms; keep access keys in **env**, not committed secrets.

---

## 9. Summary one-liner

**A single-page, comic-themed React portfolio that splits “strategy/resume” (Think) and “filmmaking work” (Creative) from a split-screen hero, with a separate Contact section and content split between `thinkPageData.ts` and inline data in `CreativePage.tsx`.**
