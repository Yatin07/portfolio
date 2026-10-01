# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> mobile: no horizontal overflow and custom cursor hidden
- Location: tests\e2e\portfolio.spec.ts:50:5

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  getByTestId('custom-cursor')
Expected: hidden
Received: visible
Timeout:  5000ms

Call log:
  - Expect "toBeHidden" getByTestId('custom-cursor') with timeout 5000ms
  - waiting for getByTestId('custom-cursor')
    12 × locator resolved to <div data-testid="custom-cursor">…</div>
       - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]: YATIN.
      - generic [ref=e5]: Press 'T' for magic
    - generic [ref=e7]:
      - generic [ref=e8]: UI/UX Designer
      - heading "Designing interfaces that feel completely effortless." [level=1] [ref=e9]:
        - text: Designing interfaces that feel completely
        - generic [ref=e10]: effortless.
      - paragraph [ref=e11]: I'm Yatin, crafting intuitive, data-driven experiences for complex digital products.
      - generic [ref=e12]:
        - link [ref=e13] [cursor=pointer]:
          - /url: "#work"
        - link "About Me" [ref=e17] [cursor=pointer]:
          - /url: "#about"
    - generic [ref=e20]:
      - generic [ref=e21]:
        - heading "I show the thinking behind it." [level=2] [ref=e22]
        - paragraph [ref=e23]: The raw, unpolished process of getting to effortless.
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: STAGE 01
          - heading "Problem" [level=3] [ref=e27]
          - paragraph [ref=e28]: Understanding the true friction point.
          - generic [ref=e29]:
            - generic [ref=e30]: "What actually happened:"
            - generic [ref=e31]: I initially assumed wrong.
        - generic [ref=e32]:
          - generic [ref=e33]: STAGE 02
          - heading "Approach" [level=3] [ref=e34]
          - paragraph [ref=e35]: Mapping user journeys and constraints.
          - generic [ref=e36]:
            - generic [ref=e37]: "What actually happened:"
            - generic [ref=e38]: Threw away 3 initial drafts.
        - generic [ref=e39]:
          - generic [ref=e40]: STAGE 03
          - heading "Build" [level=3] [ref=e41]
          - paragraph [ref=e42]: Prototyping high-fidelity interactions.
          - generic [ref=e43]:
            - generic [ref=e44]: "What actually happened:"
            - generic [ref=e45]: Framer Motion took some tweaking.
        - generic [ref=e46]:
          - generic [ref=e47]: STAGE 04
          - heading "Result" [level=3] [ref=e48]
          - paragraph [ref=e49]: A seamless, tested experience.
          - generic [ref=e50]:
            - generic [ref=e51]: "What actually happened:"
            - generic [ref=e52]: Users still found edge cases.
        - generic [ref=e53]:
          - generic [ref=e54]: STAGE 05
          - heading "Learning" [level=3] [ref=e55]
          - paragraph [ref=e56]: Iteration never truly ends.
          - generic [ref=e57]:
            - generic [ref=e58]: "What actually happened:"
            - generic [ref=e59]: Less is always more.
    - generic [ref=e63]:
      - generic [ref=e65]:
        - generic [ref=e66]:
          - generic [ref=e67]: SELECTED WORK 01
          - heading "Face Attribute Analysis" [level=3] [ref=e68]
          - generic [ref=e69]:
            - generic [ref=e70]:
              - strong [ref=e71]: Role
              - text: Product Designer
            - generic [ref=e72]:
              - strong [ref=e73]: Problem
              - text: AI results were too technical for everyday users.
            - generic [ref=e74]:
              - strong [ref=e75]: Decision
              - text: Designed a friendly, human-readable slider interface instead of raw JSON output.
        - generic [ref=e76]:
          - paragraph [ref=e77]: Interactive Prototype
          - generic [ref=e78]:
            - generic [ref=e79]: Confidence Slider (Sample data)
            - slider "Confidence Slider" [ref=e80]: "50"
            - generic [ref=e81]: 50% Match
      - generic [ref=e83]:
        - generic [ref=e84]:
          - generic [ref=e85]: SELECTED WORK 02
          - heading "Document Q&A Experience" [level=3] [ref=e86]
          - generic [ref=e87]:
            - generic [ref=e88]:
              - strong [ref=e89]: Role
              - text: UX Designer
            - generic [ref=e90]:
              - strong [ref=e91]: Problem
              - text: Users could not verify where the AI got its answers.
            - generic [ref=e92]:
              - strong [ref=e93]: Decision
              - text: Created a dual-pane view highlighting source snippets alongside answers.
        - generic [ref=e94]:
          - paragraph [ref=e95]: Interactive Prototype
          - generic [ref=e97] [cursor=pointer]:
            - text: Where is the data stored?
            - generic [ref=e98]: (Sample data)
            - generic [ref=e99]: +
      - generic [ref=e101]:
        - generic [ref=e102]:
          - generic [ref=e103]: SELECTED WORK 03
          - heading "Hostel Complaint Management" [level=3] [ref=e104]
          - generic [ref=e105]:
            - generic [ref=e106]:
              - strong [ref=e107]: Role
              - text: UI/UX Designer & Dev
            - generic [ref=e108]:
              - strong [ref=e109]: Problem
              - text: Reporting issues was chaotic and untracked.
            - generic [ref=e110]:
              - strong [ref=e111]: Decision
              - text: A simple Kanban-style swipe interface for students and wardens.
        - generic [ref=e112]:
          - paragraph [ref=e113]: Interactive Prototype
          - generic [ref=e114] [cursor=pointer]:
            - generic [ref=e115]: "Issue: AC not working (Sample data)"
            - generic [ref=e120]: Open (Tap to update)
    - generic [ref=e122]:
      - heading "Beyond pixels." [level=2] [ref=e123]
      - paragraph [ref=e124]: What shapes my thinking when I close my laptop.
      - generic [ref=e125]:
        - generic [ref=e127] [cursor=pointer]
        - generic [ref=e144] [cursor=pointer]
        - generic [ref=e148]:
          - img "Yatin" [ref=e149]
          - generic [ref=e150]: Yatin Patil
    - generic [ref=e152]:
      - generic [ref=e153]:
        - img "Yatin Patil" [ref=e155]
        - generic [ref=e156]:
          - paragraph [ref=e157]: Yatin Patil
          - paragraph [ref=e158]: Navi Mumbai, India
      - generic [ref=e159]:
        - heading "I build for humans." [level=2] [ref=e160]
        - paragraph [ref=e161]: Hi, I'm Yatin. I'm a digital designer currently studying Information Technology. I believe the best interfaces are the ones you don't even notice—they just work, fluidly and effortlessly.
        - heading "Things I'm obsessed with" [level=3] [ref=e162]
        - generic [ref=e163]:
          - paragraph [ref=e164]: Drag around
          - generic [ref=e165]: Micro-interactions
          - generic [ref=e166]: Kinetic Typography
          - generic [ref=e167]: Dieter Rams
          - generic [ref=e168]: Subtle Grain
          - generic [ref=e169]: Framer Motion
    - generic [ref=e171]:
      - heading "How I work." [level=2] [ref=e172]
      - generic [ref=e173]:
        - generic [ref=e174] [cursor=pointer]:
          - generic [ref=e175]: "01"
          - heading "Understand" [level=3] [ref=e176]
          - paragraph [ref=e177]: I don't touch Figma until I know exactly what the user is trying to achieve and what business metric we are driving.
        - generic [ref=e178] [cursor=pointer]:
          - generic [ref=e179]: "02"
          - heading "Explore" [level=3] [ref=e180]
        - generic [ref=e181] [cursor=pointer]:
          - generic [ref=e182]: "03"
          - heading "Build" [level=3] [ref=e183]
        - generic [ref=e184] [cursor=pointer]:
          - generic [ref=e185]: "04"
          - heading "Iterate" [level=3] [ref=e186]
    - generic [ref=e188]:
      - heading "Moments that mattered." [level=2] [ref=e189]
      - paragraph [ref=e190]: Swipe to explore my timeline.
      - generic [ref=e191]:
        - generic [ref=e193]:
          - generic [ref=e194]: 2023-2027
          - heading "B.Tech IT - MPSTME" [level=3] [ref=e195]
          - paragraph [ref=e196]: Pursuing B.Tech in Information Technology at NMIMS University.
        - generic [ref=e198]:
          - generic [ref=e199]: "2024"
          - heading "IBM SkillsBuild Internship" [level=3] [ref=e200]
          - paragraph [ref=e201]: Designed analytical reports and dashboards for data-driven decision making.
        - generic [ref=e203]:
          - generic [ref=e204]: "2026"
          - heading "Buildathon 2026" [level=3] [ref=e205]
          - paragraph [ref=e206]: Participated in national-level hackathons, developing prototypes under time constraints.
        - generic [ref=e207]:
          - generic [ref=e208]:
            - generic [ref=e209]: "2025"
            - heading "SAS Curiosity Cup" [level=3] [ref=e210]
            - paragraph [ref=e211]: Competed in a Global Data Analytics Competition, applying problem-solving to real-world challenges.
          - generic [ref=e212]: Swipe ↔
    - generic [ref=e214]:
      - heading "Design Lab." [level=2] [ref=e215]
      - paragraph [ref=e216]: A playground for micro-interactions, components, and tiny details that bring interfaces to life.
      - generic [ref=e217]:
        - generic [ref=e218]:
          - paragraph [ref=e219]: 01 / BUTTON
          - button "Submit" [ref=e220] [cursor=pointer]
        - generic [ref=e221]:
          - paragraph [ref=e222]: 02 / TOGGLE
          - generic [ref=e223] [cursor=pointer]
        - paragraph [ref=e226]: 03 / CARD
    - generic [ref=e231]:
      - heading "Have something worth building?" [level=2] [ref=e232]
      - paragraph [ref=e233]: I'm currently looking for UI/UX Designer roles. Let's make something effortless.
      - generic [ref=e234]:
        - link [ref=e235] [cursor=pointer]:
          - /url: mailto:yatin@example.com
        - link "Resume" [ref=e239] [cursor=pointer]:
          - /url: /resume.pdf
      - generic [ref=e243]:
        - link "LinkedIn Profile" [ref=e244] [cursor=pointer]:
          - /url: https://linkedin.com/in/yatin-patil
        - link "GitHub Profile" [ref=e249] [cursor=pointer]:
          - /url: https://github.com/Yatin07
  - button "Open Next.js Dev Tools" [ref=e258] [cursor=pointer]
  - alert [ref=e262]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | import { claims } from '../../src/data/claims';
  4  | 
  5  | test('loads without console errors', async ({ page }) => {
  6  |   const errors: string[] = [];
  7  |   page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  8  |   page.on('pageerror', (e) => errors.push(e.message));
  9  |   await page.goto('/');
  10 |   await expect(page.locator('h1')).toBeVisible();
  11 |   expect(errors).toEqual([]);
  12 | });
  13 | 
  14 | test('no placeholders, invented stats or tech jargon in rendered text', async ({ page }) => {
  15 |   await page.goto('/');
  16 |   const text = await page.locator('body').innerText();
  17 |   expect(text).not.toMatch(/\\[ADD REAL DETAIL\\]|lorem ipsum|TODO/i);
  18 |   expect(text).not.toMatch(/\\b(PyTorch|LangChain|FAISS|Scikit|XGBoost|Pandas|TensorFlow)\\b/i);
  19 | 
  20 |   // any percentage or "improved by N" claim must exist in the verified ledger
  21 |   const ledger = claims.map((c) => c.text).join(' ');
  22 |   const stats = text.match(/\\b\\d[\\d,.]*\\s?%|\\b(increased|reduced|improved|boosted)\\b[^.]{0,40}\\d+/gi) ?? [];
  23 |   const unproven = stats.filter((s) => !ledger.includes(s.trim()));
  24 |   expect(unproven, 'unverified statistics found').toEqual([]);
  25 | });
  26 | 
  27 | test('every ledger claim shown is verified', async ({ page }) => {
  28 |   await page.goto('/');
  29 |   const text = await page.locator('body').innerText();
  30 |   for (const c of claims.filter((c) => c.status !== 'verified')) {
  31 |     expect(text).not.toContain(c.text);
  32 |   }
  33 | });
  34 | 
  35 | test('T key toggles theme', async ({ page }) => {
  36 |   await page.goto('/');
  37 |   const snap = () =>
  38 |     page.evaluate(
  39 |       () =>
  40 |         document.documentElement.className + '|' + document.documentElement.dataset.theme + '|' +
  41 |         getComputedStyle(document.body).backgroundColor
  42 |     );
  43 |   const before = await snap();
  44 |   await page.keyboard.press('t');
  45 |   await expect.poll(snap).not.toBe(before);
  46 |   await page.keyboard.press('t');
  47 |   await expect.poll(snap).toBe(before);
  48 | });
  49 | 
  50 | test('mobile: no horizontal overflow and custom cursor hidden', async ({ browser }) => {
  51 |   const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  52 |   const page = await ctx.newPage();
  53 |   await page.goto('/');
  54 |   const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  55 |   expect(overflow).toBeLessThanOrEqual(1);
> 56 |   await expect(page.getByTestId('custom-cursor')).toBeHidden();
     |                                                   ^ Error: expect(locator).toBeHidden() failed
  57 |   await ctx.close();
  58 | });
  59 | 
  60 | test('reduced motion still renders content', async ({ browser }) => {
  61 |   const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  62 |   const page = await ctx.newPage();
  63 |   await page.goto('/');
  64 |   await expect(page.locator('h1')).toBeVisible();
  65 |   await ctx.close();
  66 | });
  67 | 
  68 | test('prototype: hostel complaint status changes on tap', async ({ page }) => {
  69 |   await page.goto('/');
  70 |   const card = page.getByTestId('hostel-complaint-0');
  71 |   await card.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' }));
  72 |   const before = await card.innerText();
  73 |   await card.click({ force: true });
  74 |   await expect(card).not.toHaveText(before);
  75 | });
  76 | 
  77 | test('contact links are real and safe', async ({ page, request }) => {
  78 |   await page.goto('/');
  79 |   expect(await page.locator('a[href="#"]').count()).toBe(0);
  80 |   await expect(page.locator('a[href^="mailto:"]').first()).toHaveAttribute(
  81 |     'href', /mailto:[^@\\s]+@[^@\\s]+\\.[a-z]+/i
  82 |   );
  83 |   const resume = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
  84 |   expect(resume).toBeTruthy();
  85 |   expect((await request.get(resume!)).status()).toBe(200);
  86 |   for (const a of await page.locator('a[href^="http"]').all()) {
  87 |     await expect(a).toHaveAttribute('rel', /noopener/);
  88 |   }
  89 | });
  90 | 
  91 | test('no serious accessibility violations', async ({ page }) => {
  92 |   await page.goto('/');
  93 |   const r = await new AxeBuilder({ page }).analyze();
  94 |   expect(r.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
  95 | });
  96 | 
```