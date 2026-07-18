import { test, expect, type ConsoleMessage, type Page } from '@playwright/test';

// §15: exercise the built site under the real production headers. Analytics
// (Plausible) is stubbed so its network is deterministic and silent — the only
// "expected noise" the standard allows. Anything else in the console fails.
const isCSPViolation = (t: string) => /content security policy/i.test(t);

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (m: ConsoleMessage) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

test.beforeEach(async ({ page }) => {
  // Stub the self-hosted Plausible script (analytics noise = expected pass).
  await page.route('**/plausible.thompsonblack.us/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  );
});

test('home loads under production CSP, no unexpected console errors', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  const resp = await page.goto('/');

  expect(resp?.status()).toBe(200);
  await expect(page).toHaveTitle(/phone store did/i);
  // The real CSP is actually being served, not a permissive dev header.
  expect(resp?.headers()['content-security-policy']).toContain("default-src 'none'");

  await page.waitForLoadState('networkidle');
  const violations = errors.filter(isCSPViolation);
  expect(violations, `CSP violations:\n${violations.join('\n')}`).toHaveLength(0);
  expect(errors, `Unexpected console errors:\n${errors.join('\n')}`).toHaveLength(0);
});

test('Pagefind search works under CSP (wasm-unsafe-eval + same-origin fetch)', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/');

  const input = page.locator('.pagefind-ui__search-input');
  await input.waitFor({ state: 'visible' });
  await input.fill('landlord');

  const results = page.locator('.pagefind-ui__result-link');
  await expect(results.first()).toBeVisible({ timeout: 10_000 });
  expect(await results.count()).toBeGreaterThan(0);

  // The weight marker must not leak into result titles (regression guard).
  const first = (await results.first().textContent())?.trim() ?? '';
  expect(first).not.toContain('PAGEFIND_WEIGHT');

  const violations = errors.filter(isCSPViolation);
  expect(violations, `CSP blocked Pagefind:\n${violations.join('\n')}`).toHaveLength(0);
});

test('dark-mode toggle overrides system preference and persists', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Survives reload and beats the light system preference (pre-paint script).
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('unknown route serves the branded 404 with a 404 status', async ({ page }) => {
  const resp = await page.goto('/this-route-does-not-exist/');
  expect(resp?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText(/nothing lives at this address/i);
});

test('security headers are present on the response', async ({ page }) => {
  const resp = await page.goto('/');
  const h = resp!.headers();
  expect(h['x-frame-options']).toBe('DENY');
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('no-referrer');
});
