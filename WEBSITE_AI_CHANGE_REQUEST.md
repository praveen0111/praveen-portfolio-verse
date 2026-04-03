# Website AI Change Request (Vite + React + TS)

Use this Markdown as a **single message** to any AI to request changes to this website.  
It is structured to force the AI to ask the right questions, touch the right files, and return copy/paste-ready output.

---

## 1) Project context (do not ignore)

- **Project type**: Vite + React + TypeScript
- **Main app entry**: `src/App.tsx`
- **Common component locations**: `src/components/**`
- **Public assets**: `public/**`
- **Styling**: `src/index.css` (and any Tailwind/CSS utilities already in the project)
- **Package manager**: npm

### Constraints

- **Do not change tech stack** (no framework migration).
- **Do not introduce new dependencies** unless explicitly requested in this document.
- **Keep existing design language** unless the request says to redesign.
- **Keep changes minimal**: edit only files that are necessary.
- **No placeholder text** in final output. If content is unknown, ask me what to use.

---

## 2) What I want you (the AI) to do

### My goal

<Describe the end goal in 1–3 sentences. Example: “Improve the hero section with clearer positioning and better CTAs, keeping it minimal and fast.”>

### Scope

- **Must change**:
  - <List pages/components/sections that must be updated>
- **Must NOT change**:
  - <List anything that should remain unchanged (colors, layout, content, routes, animations, etc.)>
- **Nice to have**:
  - <Optional enhancements>

### Target pages / routes (if applicable)

- <Route/path and what should happen there>

---

## 3) Current problems (be specific)

List the issues you see. Use short bullets, and include “where” and “why it’s bad”.

- **Issue**: <What is wrong>
  - **Where**: <page/section/component>
  - **Why**: <impact: confusing, ugly, slow, inaccessible, etc.>

---

## 4) Desired outcome (acceptance criteria)

Write as “done when…”.

- [ ] **UX**: <e.g., CTA visible above the fold on desktop and mobile>
- [ ] **Design**: <e.g., spacing consistent, typography improved, not cluttered>
- [ ] **Performance**: <e.g., no new heavy libraries; avoid huge images>
- [ ] **Accessibility**: <e.g., keyboard navigable; contrast OK; alt text present>
- [ ] **No regressions**: <e.g., routes still work; animations not broken>

---

## 5) Inputs you can use (paste real data here)

### Content (final copy)

- **Name / title**: <…>
- **Short bio**: <…>
- **Primary CTA text + link**: <…>
- **Secondary CTA text + link**: <…>
- **Social links**:
  - GitHub: <…>
  - LinkedIn: <…>
  - Email: <…>
  - Other: <…>

### Assets

- **Logo**: <path or description>
- **Hero image(s)**: <path(s) in `public/` or `src/assets/` if any>
- **Icons**: <what set, or “use existing lucide-react icons”>

### SEO / Meta (if changing)

- **Title**: <…>
- **Description**: <…>
- **Keywords**: <…>

---

## 6) Evidence (optional but strongly recommended)

### Screenshots / recordings

Attach images and reference them here:

- Screenshot: <describe what it shows>

### Links

- Deployed URL (if any): <…>
- Relevant inspiration links: <…>

---

## 7) Files likely involved (help the AI target changes)

Check any that apply (add more paths if you know them).

- [ ] `src/App.tsx`
- [ ] `src/index.css`
- [ ] `src/components/HeroSlider.tsx`
- [ ] `src/components/CreativePage.tsx`
- [ ] `src/components/ThinkPage.tsx`
- [ ] `src/components/ContactPage.tsx`
- [ ] `index.html`
- [ ] `public/robots.txt`
- [ ] `public/sitemap.xml`
- [ ] Other: `<path>`

---

## 8) Guardrails (important)

- **No breaking changes** to routing/navigation.
- **No removal** of existing sections unless asked.
- **No giant refactors** unless asked.
- **No secrets**: do not request API keys; do not embed secrets in code.
- **If you’re unsure** about content or intent, ask questions before writing final code.

---

## 9) Output format I want from you (the AI)

### Step A — Clarifying questions (only if needed)

Ask up to **7** questions. Keep them short and concrete.

### Step B — Proposed changes (high-level)

- **Summary**: 3–6 bullets describing what you will change and why.
- **Risk notes**: any likely side effects (layout shifts, mobile, animations).

### Step C — Exact edits (copy/paste-ready)

Provide one of these:

1) **Unified diffs per file** (preferred), OR  
2) **Full file replacements** only when smaller diffs are too messy.

Rules:

- Do not omit required imports.
- Keep TypeScript types correct.
- Do not invent files that do not exist unless you clearly mark them as “new file”.
- If you add new files, include their full contents.

### Step D — How to verify

Give a short test checklist:

- `npm install`
- `npm run dev`
- Manual checks: <bullets>

---

## 10) My request (fill this in)

### Change request title

<Example: “Make the hero section clearer and more modern”>

### Change request details

<Paste the full request here. Be explicit about the section names, what should change, and what should stay.>

### Dependency policy (choose one)

- [ ] **No new dependencies allowed**
- [ ] **New dependencies allowed if justified**

### Deadline / priority (optional)

<e.g., “High priority; needs to be ready today.”>

