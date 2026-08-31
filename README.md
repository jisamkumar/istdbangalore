# ISTD Bangalore Chapter — Website

A complete Angular 18 site for the ISTD Bangalore Chapter (standalone components,
routed pages, SCSS design system).

## Run it locally

```bash
npm install
npm start        # ng serve — opens on http://localhost:4200
```

## Build for production

```bash
npm run build     # outputs to dist/istd-bangalore/browser
```
Upload the contents of `dist/istd-bangalore/browser` to any static host
(Netlify, Vercel, GitHub Pages, your own server, etc.).

## Where to edit content

Everything editable lives in **one file**:

```
src/app/data/content.ts
```

Sections marked `⚠ PLACEHOLDER` contain invented sample content — replace with
real details (committee names, events, membership fees, address, about copy)
and the whole site updates automatically. No component code needs to change
for content updates.

## Project structure

```
src/app/
  data/content.ts         ← all editable site content
  shared/navbar/           ← sticky header + nav
  shared/footer/           ← footer
  pages/
    home/                  ← hero, stats, teasers, CTA
    about/                 ← mission, history, affiliations
    committee/             ← office bearers + EC members
    events/                ← filterable events calendar
    membership/             ← tiers + how-to-join steps
    gallery/               ← photo grid (placeholder tiles until photos added)
    contact/               ← contact info, map, demo form
    questionnaire/         ← Member Questionnaire (9-section reactive form)
public/assets/istd-logo.png ← your uploaded logo
```

## Member Questionnaire (`/questionnaire`)

A full reactive-form implementation of the chapter's Member Questionnaire
(personal + professional details, preferred role, training preferences,
company representation, major clients, uploads, and declaration — mirroring
`ISTD_BC_Questionnaire_2026.docx`). Notes:

- **Demo submission only** — like the contact form, it confirms in-page but
  doesn't send data anywhere. Wire `onSubmit()` in
  `questionnaire.component.ts` to a real backend before going live.
- **File uploads are simulated** — filenames are captured for display, not
  file contents. A real backend/file storage integration is needed to
  actually receive uploaded files.
- After submission, the filled form stays visible (read-only) so the
  **"Print / Save as PDF"** button produces a usable record of the response.
- Conditional company fields (Section 6) only appear once "Yes" is selected
  for company representation.

## Notes

- The contact form (`pages/contact`) is a **front-end demo only** — it
  confirms in-page but doesn't send anywhere yet. Wire it to a real backend
  (Formspree, a serverless function, or the chapter's mail server) before
  going live.
- Google Fonts (Fraunces, Work Sans, JetBrains Mono) are loaded via CDN link
  in `src/index.html` — no local font files needed.
- Color/type tokens are defined as CSS variables in `src/styles.scss`,
  derived from the ISTD emblem's red, with navy and gold as supporting colors.
