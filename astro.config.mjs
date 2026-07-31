import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

// Add a trailing slash to internal markdown links so they match `trailingSlash:
// 'always'` — no 308 redirect hop in prod, no 404 in dev. Covers current and
// future cross-links automatically, so authors don't have to remember the slash.
function trailingSlashLinks() {
  const needsSlash = (href) =>
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.endsWith('/') &&
    !href.includes('#') &&
    !href.includes('?') &&
    !/\.[a-z0-9]+$/i.test(href); // skip file links (.pdf, .svg, …)

  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties && needsSlash(node.properties.href)) {
      node.properties.href += '/';
    }
    node.children?.forEach(visit);
  };
  return (tree) => visit(tree);
}

export default defineConfig({
  output: 'static',
  site: 'https://de-google.us',
  trailingSlash: 'always',
  // Astro 7's default markdown processor (Sätteri) runs no remark/rehype
  // plugins, and the trailingSlashLinks rewrite is load-bearing under
  // `trailingSlash: 'always'` — so markdown stays on the unified pipeline.
  markdown: {
    processor: unified({
      rehypePlugins: [trailingSlashLinks],
    }),
  },
  // Astro 7 defaults compressHTML to 'jsx', which strips spaces between
  // adjacent inline elements — the exact bug class this estate has hit twice
  // (wizard-web footer, tgwab-web nav). Keep classic whitespace handling.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
