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
  // §15: assert the securitypolicyviolation DOM event itself — console text is
  // not the gate ("expected console noise is a pass" is the hole §15 names).
  await page.addInitScript(() => {
    (window as any).__spv = [] as string[];
    document.addEventListener('securitypolicyviolation', (e) =>
      (window as any).__spv.push(`${e.violatedDirective}: ${e.blockedURI}`),
    );
  });
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
  const spv = await page.evaluate(() => (window as any).__spv as string[]);
  expect(spv, `securitypolicyviolation events:\n${spv.join('\n')}`).toHaveLength(0);
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

test('no horizontal overflow at mobile widths', async ({ page }) => {
  // Regression: the nav link row used to have a fixed intrinsic width (~361px)
  // that forced horizontal scroll on phones, shifting every page left.
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ['/', '/start-here/', '/privacy/']) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} overflows by ${overflow}px at ${width}px`).toBe(0);
    }
  }
});

test('nav collapses to a hamburger menu on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');

  // Inline links are hidden; the hamburger opens a panel with all destinations.
  const summary = page.locator('details.mobile-menu summary');
  await expect(summary).toBeVisible();
  await expect(page.locator('nav a.nav-link', { hasText: 'Start Here' })).toBeHidden();

  await summary.click();
  const panel = page.locator('details.mobile-menu ul');
  await expect(panel.locator('a', { hasText: 'Start Here' })).toBeVisible();
  await expect(panel.locator('a', { hasText: 'GitHub' })).toBeVisible();

  // The open panel must not widen the page.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);

  // Outside-click closes it; desktop widths hide the hamburger entirely.
  await page.mouse.click(10, 700);
  await expect(panel).toBeHidden();
  await page.setViewportSize({ width: 800, height: 800 });
  await expect(summary).toBeHidden();
  await expect(page.locator('nav a.nav-link', { hasText: 'Start Here' })).toBeVisible();
});

test('security headers are present on the response', async ({ page }) => {
  const resp = await page.goto('/');
  const h = resp!.headers();
  expect(h['x-frame-options']).toBe('DENY');
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('no-referrer');
});
