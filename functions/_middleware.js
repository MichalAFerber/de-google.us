// Host canonicalization for the de-google.us Cloudflare Pages project.
//
// All four hostnames — de-google.us, www.de-google.us, degoog.us,
// www.degoog.us — are attached to this project as custom domains, so each
// one would otherwise serve the site with a 200 (aliases, not redirects).
// A Pages `_redirects` file matches on path only, never host, so it can't
// single out the short domain. This middleware can:
//
//   degoog.us + www.degoog.us  ->  301  https://de-google.us/<same path+query>
//   de-google.us + www.*       ->  pass straight through to the static assets
//
// The redirect fires at the edge before static serving; the canonical host
// falls through to next(), which serves dist/ with its _headers CSP intact.
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === 'degoog.us' || url.hostname === 'www.degoog.us') {
    url.hostname = 'de-google.us';
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
