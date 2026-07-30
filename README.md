# de-google.us

**Live:** <https://de-google.us> · (also answers at `degoog.us` and `www`, both canonicalized to the apex) · **Class A — open source, MIT** (§10)

A warm, plain-English guide to limiting Big Tech without blowing up your life —
written first-person by someone who runs an IT company, is a Microsoft Partner,
and admits he couldn't fully leave Google or Apple either. Long-form editorial
reading, not a product funnel. The through-line: *the enemy was never Big Tech,
it's default — turn every default into a decision.*

## Features

- Eight-page guided reading path (home → why → start here → guides), driven by
  an Astro content collection — new guides are one markdown file away
- In-browser search ([Pagefind](https://pagefind.app)) — queries never leave the
  visitor's device
- Self-hosted everything: fonts (Latin-subset woff2), search index, analytics.
  **Zero requests to Google** — this site eats its own dog food
- Light and dark themes, defaulting to system preference with a header toggle
- Full SEO kit: canonical URLs, sitemap, Open Graph/Twitter cards, JSON-LD,
  strict security headers

## Stack

Astro 5 (static) · Tailwind 4 · Pagefind · Cloudflare Pages (build `pnpm build`,
output `dist`) · self-hosted Plausible analytics.

## Develop & deploy

```bash
pnpm install
pnpm dev        # local dev (search inert — Pagefind indexes at build time)
pnpm build      # astro build && pagefind --site dist
pnpm preview    # serve dist locally
```

Deploys: merge to `main` → Cloudflare Pages auto-builds. Feature work goes
through a branch + PR, never straight to `main`.

## How it works

Content lives in `src/content/pages/*.md` with a typed frontmatter schema
(`src/content/config.ts`). A catch-all route renders each page; `tier-1`/`tier-2`
entries automatically join the Guides nav and reading order. `trailingSlash:
'always'` plus a small rehype plugin keeps every internal link canonical (no
redirect hops). A custom 404 page keeps unknown routes from soft-404ing.

## Privacy

No cookies, no fingerprinting, no third-party trackers, no Google anything.
Page views are counted by a self-hosted [Plausible](https://plausible.io)
instance (`plausible.thompsonblack.us`) — cookieless, no IPs stored, disclosed
plainly in [/privacy](https://de-google.us/privacy/). Search runs entirely in
the visitor's browser.

Built to the TGWAB Dev Standards **v2.10.1** (internal).

## Deviations

- §1 — JetBrains Mono display face — Cinzel stands in for the brand's classical inscriptional serif (license-clean Trajan family); swap via `--font-display` in `src/styles/global.css` — 2026-07-30 — permanent
- §15 — audit gate at `--audit-level=high` — two `astro` advisories (GHSA-8hv8-536x-4wqp, GHSA-2pvr-wf23-7pc7) are patched only in Astro 6; ignored via `pnpm.auditConfig` pending the Astro 6 migration — 2026-07-30 — review 2026-09-01
- §1 — "bold and bright" palette — warm paper register is the deliberate anti-manifesto choice for long-form reading; brand red `#c5282f` remains the through-line — 2026-07-30 — permanent

Everything else follows the sheet: exact ❤️ footer credit (build-time year),
Octocat header + footer, and CI (§15) — type-check, build, no-eval and mailto
gates, and a headless-Chromium Playwright harness serving `dist/` under the real
`_headers` CSP on every PR (`scripts/serve-with-csp.mjs`, `tests/`).

## Credits

| Component | Version | License |
| --- | --- | --- |
| [Astro](https://astro.build) | 5.x | MIT |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | MIT |
| [Pagefind](https://pagefind.app) | 1.x | MIT |
| [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) | 3.x | MIT |
| [Cinzel](https://fonts.google.com/specimen/Cinzel) (via @fontsource) | 5.x | SIL OFL 1.1 |
| [Inter](https://rsms.me/inter/) (via @fontsource) | 5.x | SIL OFL 1.1 |
| [Plausible Analytics](https://plausible.io) (self-hosted) | — | AGPL-3.0 |

## License

[MIT](LICENSE) © 2026 Michal Ferber (ThompsonBlack LLC d.b.a. TechGuyWithABeard)
