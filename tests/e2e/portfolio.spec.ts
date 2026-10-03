import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { claims } from '../../src/data/claims';

test('loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  expect(errors).toEqual([]);
});

test('no placeholders, invented stats or tech jargon in rendered text', async ({ page }) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/\\[ADD REAL DETAIL\\]|lorem ipsum|TODO/i);
  expect(text).not.toMatch(/\\b(PyTorch|LangChain|FAISS|Scikit|XGBoost|Pandas|TensorFlow)\\b/i);

  // any percentage or "improved by N" claim must exist in the verified ledger
  const ledger = claims.map((c) => c.text).join(' ');
  const stats = text.match(/\\b\\d[\\d,.]*\\s?%|\\b(increased|reduced|improved|boosted)\\b[^.]{0,40}\\d+/gi) ?? [];
  const unproven = stats.filter((s) => !ledger.includes(s.trim()));
  expect(unproven, 'unverified statistics found').toEqual([]);
});

test('every ledger claim shown is verified', async ({ page }) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  for (const c of claims.filter((c) => c.status !== 'verified')) {
    expect(text).not.toContain(c.text);
  }
});

test('T key toggles theme', async ({ page }) => {
  await page.goto('/');
  const snap = () =>
    page.evaluate(
      () =>
        document.documentElement.className + '|' + document.documentElement.dataset.theme + '|' +
        getComputedStyle(document.body).backgroundColor
    );
  const before = await snap();
  await page.keyboard.press('t');
  await expect.poll(snap).not.toBe(before);
  await page.keyboard.press('t');
  await expect.poll(snap).toBe(before);
});

test('mobile: no horizontal overflow and custom cursor hidden', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByTestId('custom-cursor')).toBeHidden();
  await ctx.close();
});

test('reduced motion still renders content', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await ctx.close();
});

test('prototype: hostel complaint status changes on tap', async ({ page }) => {
  await page.goto('/');
  const card = page.getByTestId('hostel-complaint-0');
  await card.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' }));
  const before = await card.innerText();
  await card.click({ force: true });
  await expect(card).not.toHaveText(before);
});

test('contact links are real and safe', async ({ page, request }) => {
  await page.goto('/');
  expect(await page.locator('a[href="#"]').count()).toBe(0);
  await expect(page.locator('a[href^="mailto:"]').first()).toHaveAttribute(
    'href', /mailto:[^@\\s]+@[^@\\s]+\\.[a-z]+/i
  );
  const resume = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
  expect(resume).toBeTruthy();
  expect((await request.get(resume!)).status()).toBe(200);
  for (const a of await page.locator('a[href^="http"]').all()) {
    await expect(a).toHaveAttribute('rel', /noopener/);
  }
});

test('no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  const r = await new AxeBuilder({ page }).analyze();
  expect(r.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});

test('darkroom: frame develops on click', async ({ page }) => {
  await page.goto('/');
  const frame1 = page.locator('div[role="button"][aria-label*="Frame 01"]');
  await frame1.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await expect(frame1).toContainText('RAW');
  await frame1.click();
  await expect(page.locator('div[role="dialog"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('div[role="dialog"]')).toBeHidden();
  await expect(frame1).toContainText('DEV');
});

test('darkroom: chess puzzle accepts Nf7 as solved and rejects wrong move', async ({ page }) => {
  await page.goto('/');
  const chessFrame = page.locator('div[role="button"][aria-label*="Frame 01"]');
  await chessFrame.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await chessFrame.click();
  await expect(page.locator('div[role="dialog"]')).toBeVisible();

  // Test wrong move: d8 to e6 (Ne6+)
  const d8Square = page.locator('button[aria-label*="Square d8"]');
  const e6Square = page.locator('button[aria-label*="Square e6"]');
  await d8Square.click();
  await e6Square.click();
  await expect(page.locator('[role="region"][aria-live="polite"]')).toContainText(/Mated|Not mate|failed/i);

  // Click Reset
  await page.getByRole('button', { name: 'Reset' }).click();

  // Test correct move: d8 to f7 (Nf7#)
  const f7Square = page.locator('button[aria-label*="Square f7"]');
  await d8Square.click();
  await f7Square.click();
  await expect(page.locator('[role="region"][aria-live="polite"]')).toContainText(/Solved/i);

  // Close dialog
  await page.keyboard.press('Escape');
});

test('pressing t while focused in an input does not change theme', async ({ page }) => {
  await page.goto('/');
  const snap = () =>
    page.evaluate(
      () =>
        document.documentElement.className + '|' + (document.documentElement.dataset.theme || '') + '|' +
        getComputedStyle(document.body).backgroundColor
    );
  const before = await snap();

  // Create temporary input element and focus it
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.id = 'test-input';
    document.body.appendChild(input);
    input.focus();
  });

  await page.keyboard.press('t');
  const after = await snap();
  expect(after).toBe(before);
});
