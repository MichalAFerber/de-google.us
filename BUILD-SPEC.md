# degoog.us — Build Spec

Standalone Astro site. Deploys to Cloudflare Pages. Content is written; this spec
is the shell around it.

## Stack
- Astro 5, static output (`output: 'static'`)
- Tailwind 4 (`@tailwindcss/vite`)
- Pagefind for search (postbuild: `pagefind --site dist`)
- Self-hosted fonts only — NO Google Fonts (it's the de-Google site; eat your own dog food)
- Cloudflare Pages, git-push deploy. Build cmd `pnpm build`, output dir `dist`.

## Repo
Standalone, NOT in the TGWAB monorepo — but pull the brand tokens over so it reads as
family. Brand red `#c5282f`. Trajan for display headings (the MICHAL/FERBER classical
serif), a clean humanist sans for body (Inter/Source Sans self-hosted, woff2, subset).
degoog gets its own accent if you want differentiation, but keep red as the through-line.

## Content — all live, no stubs needed

All eight pages are written and live in `src/content/pages/*.md`. Build the shell
around what's there; do NOT generate placeholder pages.

| File | Slug | Tier | Role |
|---|---|---|---|
| `index.md` | `/` | home | The cold-open hero ("the phone store did") |
| `illusion-of-choice.md` | `/illusion-of-choice` | philosophy | The cattle-chute thesis |
| `start-here.md` | `/start-here` | tier-0 | The 80/20 SSO conversion page |
| `reclaim-your-logins.md` | `/reclaim-your-logins` | tier-1 | Triage the accounts you already gave away |
| `the-three-landlords.md` | `/the-three-landlords` | philosophy | Google watches / Apple pampers / Microsoft employs |
| `cheap-vs-load-bearing.md` | `/cheap-vs-load-bearing` | philosophy | The screenshot page; the spine |
| `what-i-couldnt-leave.md` | `/what-i-couldnt-leave` | philosophy | Credibility / lock-in inventory |
| `move-your-inbox.md` | `/move-your-inbox` | tier-1 | Tier-1 email migration walkthrough |

### Frontmatter schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    tier: z.enum(['home','philosophy','tier-0','tier-1','tier-2']),
    cta: z.object({
      label: z.string(),
      href: z.string(),
      note: z.string().optional(),
    }).optional(),
  }),
});
export const collections = { pages };
```

## Routing
- `/`            → render `index.md` hero, big CTA button, no chrome clutter
- `/[slug]`      → catch-all from collection (slug = filename sans `.md`)
- Render `cta` block as a styled button + optional muted `note` line beneath the page body
- Markdown `##` → section headers; keep prose measure ~65ch, generous line-height.
  This is long-form reading, optimize for it.
- Internal links in markdown (`/start-here`, `/cheap-vs-load-bearing`, etc.) must
  resolve to the catch-all route. Several pages cross-link — don't break those.

## Nav
Keep it dead simple.

- **Top nav:** Home · Why (`/illusion-of-choice`) · Start Here (`/start-here`) · Guides (dropdown or section page listing the tier-1/tier-2 entries)
- **Footer:** link to `/what-i-couldnt-leave` (the credibility page lives in the footer, not the main nav — it's an "about" not a destination) + Pagefind search box

## Page reading order (the canonical path)
This is the intended journey, useful for "next" buttons / progress indicators if
you build any. Each page's `cta` already points to the next step:

1. `/` (home)
2. `/illusion-of-choice`
3. `/start-here`
4. `/reclaim-your-logins`
5. `/the-three-landlords`
6. `/cheap-vs-load-bearing`
7. `/move-your-inbox` (first guide; entry to tier-1)

`/what-i-couldnt-leave` sits off to the side as the credibility/about page.

## Future content (NOT for the initial build — do not stub)
More guides are coming but will be added one at a time as drafts complete.
Don't generate empty pages for these; the nav handles their absence fine
until they exist:

- Tier 1: move contacts/calendar, kill the data-broker trail
- Tier 2: proton-everything, self-host, nuke dead accounts

## Tone guardrail (for any new copy you generate)
Anti-manifesto. Warm, specific, first-person, zero preaching, zero AI-hedging.
The boomer with the 20-year Gmail must never feel judged. If a sentence sounds like
a privacy zealot wrote it, kill it. When in doubt, match the voice of `index.md`
and `illusion-of-choice.md` — those set the register.
