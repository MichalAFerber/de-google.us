import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

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
  markdown: {
    rehypePlugins: [trailingSlashLinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
