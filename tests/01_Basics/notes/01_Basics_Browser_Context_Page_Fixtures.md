# Basics — Playwright Test, Browser → Context → Page, Fixtures & Test Options

> A single walkthrough of everything in `tests/01_Basics/`. Read it top to bottom: first we run Playwright the *raw* way (by hand), then we let the **Test Runner** do that work for us with **fixtures**, then we customise the context with **test options**.

---

## 1. What is inside `tests/01_Basics/`

| File | What it teaches |
| --- | --- |
| `01_example.spec.ts` | Anatomy of a Playwright test — `test()`, `page` fixture, `expect()`, auto-waiting |
| `02_multiple_context.spec.ts` | Two **isolated** contexts (admin vs viewer) — manual launch, no fixtures |
| `02_multiple_context_fixture.spec.ts` | Same multi-user idea via the `browser` fixture, with a `localStorage` assertion that actually proves isolation |
| `03_normal_pw.spec.ts` | Raw Playwright: browser → context → page created by hand, with cleanup |
| `04_tta.spec.ts` | A real login flow on the TTA practice app (codegen-style output) |
| `05_BCP.spec.ts` | The BCP lifecycle verbosely — every level logged, cleanup in reverse order |
| `06_TA.spec.ts` | The same thing **with fixtures**: `{ page }` and `{ browser }` given to you |
| `07_Test_Options.spec.ts` | `browser.newContext({ ... })` — viewport, locale, timezone, geolocation, mobile emulation |

The story of the folder: **`05_BCP` (by hand) → `06_TA` (by fixtures) → `07_Test_Options` (customised)**.

---

## 2. `.ts` vs `.spec.ts` — why the extension matters

```ts
// .ts  - just a TypeScript file, Playwright does NOT pick it up
// .spec.ts - Playwright recognises this pattern and treats it as a test file
```

`playwright.config.ts` says `testDir: './tests'`, and by default Playwright collects files matching `**/*.spec.ts` (and `*.test.ts`). Change the name to `01_example.ts` and `npx playwright test` silently finds **zero** tests — the most common "why is nothing running?" cause.

---

## 3. Anatomy of one test (`01_example.spec.ts`)

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // "to contain" a substring -> regex
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

Four pieces, always the same shape:

1. `import { test, expect }` — `test` creates test cases, `expect` is the assertion library.
2. `test('<title>', async ({ page }) => { ... })` — the **title** shows in the report, the **callback** is your scenario.
3. `async` + `await` — every Playwright action returns a Promise. `await` means "finish this before the next line". A missed `await` is the #1 source of flaky tests.
4. `expect(...)` — the assertion. Failure = red test with an actual-vs-expected diff.

### 3.1 `toHaveTitle()` — regex vs string

```ts
await expect(page).toHaveTitle(/Playwright/);   // substring match (regex)
await expect(page).toHaveTitle('Get started');  // EXACT full-title match
```

The third test in `01_example.spec.ts` (`'viewer'`) first used the **string** form and failed:

```ts
await expect(page.getByRole('link', { name: 'Get started' })).click();
await expect(page).toHaveTitle("Get started");   // FAILED
// Expected: "Get started"   Received: "Installation | Playwright"
```

Chain: home page → click *Get started* → lands on `/docs/intro` whose real title is `Installation | Playwright`. A plain string in `toHaveTitle()` demands the **entire** title to be `Get started`. Fixed form:

```ts
await expect(page).toHaveTitle(/Installation/);  // passes - substring match
```

Lesson: `toHaveTitle('x')` is equality, not "contains" — use a regex for a substring.

### 3.2 Auto-wait (why there are almost no `waitForTimeout`s)

```ts
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
```

`expect(...).toBeVisible()` retries until it passes or the timeout hits (default 5s for assertions). Same for `click()`, `fill()`, etc. — they wait for the element to be **attached, visible, stable, enabled and receive events**, then act. That is why clicking a link right after `goto()` works without a manual wait.

---

## 4. Browser → Context → Page (BCP)

```
Browser (the app itself: Chromium / Firefox / WebKit)   <-- heaviest, launch ONCE
 |
 +-- BrowserContext (an isolated profile: own cookies, localStorage, cache)
 |     |
 |     +-- Page (a tab)
 |     +-- Page (another tab -- SAME cookies as the page above)
 |
 +-- BrowserContext (fully separate session -- shares NOTHING with the first)
       |
       +-- Page
```

| Level | Real-life analogy | Cost | Isolation |
| --- | --- | --- | --- |
| **Browser** | the hotel building | very expensive, do it once | — |
| **Context** | a hotel room | cheap | complete: separate cookies/storage/session |
| **Page** | a window inside a room | cheapest | shares cookies with sibling pages in the same room |

Key lines from the official docs (quoted in `05_BCP.spec.ts`):

> Page provides methods to interact with a single tab in a Browser. One Browser instance might have multiple Page instances.

### 4.1 The two-user diagram (`02_multiple_context.spec.ts`)

```
chromium.launch()
   |
   +-- adminContext  -> adminPage  -> https://app.vwo.com/login   (admin's session)
   +-- viewerContext -> viewerPage -> https://app.vwo.com/login   (viewer's session)
```

Both pages open the same URL, but they are in **different contexts**, so logging in as admin in one never leaks into the other. That is how you test multi-role apps in a single test.

---

## 5. Raw Playwright — creating everything by hand

### 5.1 Minimal version (`03_normal_pw.spec.ts`)

```ts
import { test } from "@playwright/test";
import { chromium, Browser, BrowserContext, Page } from "playwright";

test("normal pw - manual browser, context and page", async () => {
    let browser: Browser = await chromium.launch({ headless: false });
    let context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();

    await page.goto("https://example.com");
    console.log("Title:", await page.title());

    // cleanup - reverse order
    await page.close();
    await context.close();
    await browser.close();
});
```

Important detail: `chromium` is imported from **`playwright`**, not from `@playwright/test`. `playwright` is the library (raw API); `@playwright/test` is the runner built on top of it. You can use `playwright` inside a spec, but then *you* own the lifecycle.

### 5.2 Verbose version (`05_BCP.spec.ts`)

```ts
// Level 1 : Launch browser - heaviest operation, do it once
let browser: Browser = await chromium.launch({ headless: false });
console.log("Browser Launched", browser);

// Level 2 : Create context - fresh session, isolated cookies
let context: BrowserContext = await browser.newContext();
console.log("Context Created", context);

// Level 3 : Open Page - a tab inside the context
let page: Page = await context.newPage();
console.log("Page Opened", page);

// Cleanup - reverse order
await page.close();
await context.close();
await browser.close();
```

**Cleanup in reverse order** — page first, browser last. Trying `browser.close()` before `page.close()` leaves dangling handles; in long runs that is leaked processes and stuck ports.

### 5.3 Execution pipeline of the raw version

```
test() body starts
  |
  +-> chromium.launch()        spawns a real browser process  (slow, 300-800ms)
  +-> browser.newContext()     creates an isolated profile     (fast)
  +-> context.newPage()        opens a tab                     (fast)
  +-> page.goto(...)           real navigation                 (network)
  +-> click / fill / expect    actions + assertions
  |
  +-> page.close()  ->  context.close()  ->  browser.close()   (reverse teardown)
```

If any line in the middle throws, **the cleanup never runs** and the browser stays open. That is exactly the pain fixtures solve.

### 5.4 A real login flow, codegen-style (`04_tta.spec.ts`)

```ts
test('Verify TTA multiple element filter page login', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('rahul@thetestingacademy.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByTestId('login-button').click();

  // The page does not navigate on login - success is signalled by #login-success in the URL.
  await expect(page).toHaveURL(/#login-success/);
  await expect(page.getByRole('heading', { name: 'Master multiple element' })).toBeVisible();
});
```

What it demonstrates:

- `getByRole('textbox', { name: '...' })` — accessible-name based locator (preferred).
- `getByTestId('login-button')` — pairs with `data-testid` in the app; the most stable locator of all.
- `fill()` to type into a field. The codegen original only did `click()` — a click proves the field is present and enabled, nothing more, and no email was ever typed.
- **How this page reports success**: it does not navigate. The URL becomes
  `.../multiple_element_filter?email=...&password=1234#login-success`, so `toHaveURL(/#login-success/)` is the real assertion.
- `expect(...).toBeVisible()` on the heading instead of `click()` on it. A heading is not interactive: clicking it proves nothing about the login, while `toBeVisible()` states the intent and prints actual-vs-expected on failure.
- Watch out: the page has a `#toast` element that always shows `"Forgotten Password clicked..."` — it is static demo text, not a login result. Do not assert on it.

---

## 6. Fixtures — let the runner do the BCP work (`06_TA.spec.ts`)

Comment at the top of that file:

> No need to create browser, context and pages again and again.

```ts
test("Navigating to the TTA website", async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/");
});
```

That single `{ page }` argument is a **fixture**. Before your callback runs, Playwright has already launched a browser, created a context, opened a page, and after the callback finishes it tears all of it down — even if the test failed.

#### Fixture — the full definition (say this in an interview)

> **In one sentence:** a fixture is a **prepared dependency** that Playwright creates before the test and destroys after it; you receive it by naming it in the test callback — you never create it, and you never clean it up.

That sentence contains three ideas, and each one is a follow-up question:

| Word | What it means in practice |
| --- | --- |
| **prepared** | the runner has already done browser → context → page before your first line runs |
| **before / after** | every fixture has a setup and a teardown; teardown runs even when the test fails or times out |
| **named, not created** | `async ({ page }) => ...` — no `new`, no `launch()`, no `close()`, no module-level globals |

**The problem fixtures solve** (the "why", not just the "what"):

```ts
// WITHOUT fixtures - the same boilerplate in every test, and no cleanup if it throws
test('a', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  // ... test body
  await browser.close();     // never runs if the line above throws
});

// WITH fixtures - the runner owns the whole lifecycle
test('a', async ({ page }) => {
  // browser, context and page already exist; the runner closes them afterwards
});
```

**How a fixture actually works — setup, `use`, teardown**

This is the mechanism worth memorising, because it is how the built-in `page` fixture is implemented internally (simplified):

```ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();   // setup
    const page = await context.newPage();         // setup

    await use(page);                              // <-- YOUR TEST BODY RUNS HERE

    await context.close();                        // teardown (always runs)
  },
});
```

`await use(value)` is the pivot line:

```text
fixture starts
   |
   +-- setup code (before use)
   |
   +-- await use(page)  =============>  your test() body executes
   |
   +-- teardown code (after use)  <== runs even if the test failed
   |
fixture ends
```

If a fixture never calls `use()`, the test never runs and Playwright errors out — that is how the framework guarantees every test gets its dependencies.

**Fixture vs `beforeEach` hook** — a very common follow-up question:

| | `beforeEach` hook | Fixture |
| --- | --- | --- |
| When it runs | for every test in the file/describe, used or not | **lazily** — only for tests that ask for it |
| How state is shared | outer `let` variables (implicit, easy to leak between tests) | returned/injected explicitly, defined in one place |
| Ordering | registration order | **dependency graph** — `browser` → `context` → `page`; teardown runs in reverse |
| Reuse | copy-paste between files | `test.extend()` once, import everywhere |
| On failure | a throwing hook fails every test in the block | a failing fixture setup fails only the tests that need it |

**Scope — the other half of a good answer**

| Scope | Who gets a fresh copy | Built-in examples |
| --- | --- | --- |
| `test` (default) | every single `test()` | `page`, `context` |
| `worker` | one per worker process, reused by all tests inside it | `browser` |

```ts
const test = base.extend({
  db: [async ({}, use) => { await use(db); }, { scope: 'worker' }],
});
```

That is exactly why your suite launches the browser once per worker but stays isolated per test: **`browser` is worker-scoped, `context` and `page` are test-scoped.**

**Built-in fixtures you can destructure**

```ts
test('...', async ({ page, context, browser, browserName, request, baseURL, playwright }) => {});
```

| Fixture | What you get |
| --- | --- |
| `page` | a fresh tab, inside a fresh context, per test — what most tests need |
| `context` | the isolated profile only, without a page |
| `browser` | the shared browser; you create contexts yourself |
| `browserName` | `'chromium'` \| `'firefox'` \| `'webkit'` — useful for conditional logic |
| `request` | API client bound to the same context (shares cookies with `page`) |
| `baseURL` | comes from config `use.baseURL`, so `page.goto('/login')` works |
| `playwright` | the raw `playwright` module object |

**Custom fixture — the answer to "have you written one?"**

```ts
import { test as base, expect, Page } from '@playwright/test';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rahul@thetestingacademy.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/#login-success/);

    await use(page);                 // the test receives an already-logged-in page
  },
});

test('Verify admin sees the dashboard', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByRole('heading', { name: 'Master multiple element' })).toBeVisible();
});
```

Why this counts as a strong answer: the login steps live in one place, every test that needs a session asks for `loggedInPage`, and the test body stays about the business scenario. No credentials copy-pasted into twenty specs.

**Two confusions to clear before an interview**

1. `test.use({ viewport })` sets **options** (how the fixture-built context is configured). It is not a fixture.
2. `browser.newContext()` gives you a context the runner does **not** own: you must close it, and it does not inherit config `use` options such as `trace` / `video` / `screenshot`.

```
Test Runner
  |
  +-> worker process starts
        |
        +-> fixture setup:  browser -> context -> page
        |
        +-> YOUR test body ({ page } is now ready)
        |
        +-> fixture teardown: page -> context -> browser   (always, pass or fail)
```

### 6.1 Fixture hierarchy you can ask for

```ts
test('...', async ({ page })     => {})  // browser + context + page, all fresh
test('...', async ({ context })  => {})  // browser + context, no page yet
test('...', async ({ browser })  => {})  // JUST the browser (shared per worker) - you make contexts
test('...', async ({ browserName, request, baseURL }) => {})  // other built-ins
```

That is what the "doubts" comment in `06_TA.spec.ts` is about: `page` is a **dependent** fixture (built on top of `context`, which is built on `browser`), while `browser` is the **root** fixture you can reach directly.

### 6.2 Test isolation by fixture

Each test gets a **new context** (and therefore a new page). Cache, cookies, localStorage — all reset between tests. Two tests can log in as different users without interfering. This is what the "Test Isolation (via Page)" bullet in the setup notes refers to.

Note the trade-off: a fresh browser per test is expensive, so Playwright reuses **one browser per worker** and only creates a new **context + page** per test. Launch is once, isolation is per test.

### 6.3 Three roles in one test, using the `browser` fixture

```ts
test("BCP - in app.vwo.com two roles", async ({ browser }) => {

    let adminContext = await browser.newContext();
    let userContext  = await browser.newContext();
    let guestContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.thetestingacademy.com/playwright/");

    let userPage = await userContext.newPage();
    await userPage.goto("https://sdet.live");

    let guestPage = await guestContext.newPage();
    await guestPage.goto("https://scrolltest.com");

    await adminPage.close();
    await userPage.close();
    await guestPage.close();

    await adminContext.close();
    await userContext.close();
    await guestContext.close();
});
```

```
browser  (from fixture, shared with the worker)
  +-- adminContext -> adminPage -> app.thetestingacademy.com
  +-- userContext  -> userPage  -> sdet.live
  +-- guestContext -> guestPage -> scrolltest.com
```

Why `browser.newContext()` and not `{ page }`? Because you need **three independent sessions at the same time**, and the `page` fixture gives you exactly one.

Why close the contexts too? Pages first, then contexts — same reverse-order rule as the raw examples. The runner would clean up at the end of the test anyway, but closing them explicitly releases the sessions (cookies, storage, network) the moment you are done with them, which keeps long suites and parallel workers healthy.

---

## 7. Test options — customising the context (`07_Test_Options.spec.ts`)

### 7.1 Desktop-ish context

```ts
test('context with options', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
        geolocation: { latitude: 48.8566, longitude: 2.3522 },
        permissions: ['geolocation'],
    });

    const page = await context.newPage();
    await page.goto("https://app.vwo.com/#login");
    await context.close();
});
```

| Option | Effect on the page |
| --- | --- |
| `viewport` | `window.innerWidth/Height` = 1920×1080; responsive layout switches to desktop |
| `locale: 'fr-FR'` | `navigator.language`, `Intl.*` formatting → French UI/date formats |
| `timezoneId` | `Date` rendered in Paris time, `getTimezoneOffset()` = Paris |
| `geolocation` | what `navigator.geolocation.getCurrentPosition()` returns |
| `permissions: ['geolocation']` | without this the geolocation call is **denied** — the pair always goes together |

Common gotchas:

- `geolocation` alone is useless — the browser prompts/denies without the permission grant.
- `locale` changes formatting but **not** the server's response; a server-rendered page may still come back in English.
- Anything you open in *this* context inherits these options; `{ page }`-based tests do not.

### 7.2 Mobile emulation

```ts
const iPhone = {
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone 0S 14_0 like Mac OS X',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
};

const context = await browser.newContext(iPhone);
```

| Option | Effect |
| --- | --- |
| `viewport` | small screen → mobile CSS breakpoints fire |
| `userAgent` | server sees an iPhone UA → may serve the m-web version |
| `deviceScaleFactor: 2` | retina pixel ratio |
| `isMobile: true` | mobile meta-viewport handling (pinch-zoom/viewport tag) |
| `hasTouch: true` | touch events available → `page.tap()` works |

Instead of hand-writing this, Playwright ships device descriptors:

```ts
import { devices } from '@playwright/test';
const context = await browser.newContext({ ...devices['iPhone 13'] });
```

`...devices['iPhone 13']` is exactly the five fields above (correct values) — use it unless you need to override one field.

### 7.3 The idiomatic version: put options in the config, not in each test

Everything above can be set globally in `playwright.config.ts` under `use`, and then `{ page }` just works:

```ts
export default defineConfig({
  use: {
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    headless: false,
    // baseURL: 'https://app.thetestingacademy.com',
    // viewport: { width: 1920, height: 1080 },
    // locale: 'fr-FR',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});
```

Rule of thumb:

- **Same settings for every test** → `use` in the config (screenshot/video/trace/headless live there today).
- **One test needs something special** (French locale, mobile, geolocation, a second logged-out user) → `browser.newContext({...})` inside that test, as in `07_Test_Options`.
- A repeatable device/locale matrix → a **project** per configuration, then `--project=chromium`.

---

## 8. Full pipeline — from command to report

```
npm run 01   (== playwright test tests/01_Basics)
        |
        v
Test Runner (main process)
   - loads playwright.config.ts
   - collects **/*.spec.ts under ./tests
   - builds the test list (test() calls)
   - splits tests across workers (fullyParallel: true)
        |
        v
Worker process (one per parallel slot)
   - launches ONE browser (chromium project, headed via use.headless=false)
   - for each test:
        context  = browser.newContext(+ options + project options)
        page     = context.newPage()
        fixtures injected into ({ page })
        run the test body
        screenshot / video / trace captured ('on' in config)
        teardown: page -> context   (browser stays for the next test)
        |
        v
Reporters: line + allure-playwright + ./utils/CustomReporter.ts
        |
        v
exit code 0 (all green) / 1 (any failure)  +  playwright-report, allure-results, test-results
```

That pipeline is the answer to "why does the browser open once but tests stay isolated?" — the **browser** is the expensive shared part, the **context** is the disposable per-test part.

---

## 9. Gotchas cheat-sheet (from these specs)

1. **Missing `await`** → the action is fired but the test moves on; failures appear on the *next* line. If a test "fails at line N while line N-1 looks fine", look for a missing `await`.
2. **`.ts` instead of `.spec.ts`** → the file is never collected.
3. **`chromium` imported from the wrong package** → `@playwright/test` does re-export `chromium`, but the raw examples import from `playwright`; either works, mixing the two in one file confuses the fixture types.
4. **Cleanup order** — page → context → browser. Never close the browser first.
5. **`toHaveTitle('x')` is exact**, not "contains" — use `/x/` for a substring. The `'viewer'` test failed on `"Get started"` because the real title is `Installation | Playwright`.
6. **`geolocation` without `permissions`** → the API is blocked.
7. **Manual `launch()` inside a spec with no `finally`** → a failing test leaks a browser process.
8. **Never assert by clicking a non-interactive element** — `04_tta.spec.ts` originally clicked a heading; `expect(...).toBeVisible()` is the real assertion, and a login that does not navigate is verified with `toHaveURL(/#login-success/)`.
9. **`headless: false` in the config** → every run opens a visible window; on CI set `headless: true` (or drop the override).
10. **Two "roles" need two contexts**, not two pages. Two pages in the same context share cookies — the "logged in as admin" page would already be logged in on the second page.

---

## 10. Commands used in this chapter

```bash
npm run 01                                  # playwright test tests/01_Basics
npx playwright test tests/01_Basics/05_BCP.spec.ts --reporter=list
npx playwright test --headed                # visible UI
npx playwright test --list                  # only list the tests, run nothing
npx playwright show-report
```

---

## 11. Mental model to take away

```
raw playwright        ->  you own browser/context/page + cleanup
@playwright/test      ->  fixtures own them for you (page, context, browser)
context options       ->  per-session knobs: viewport, locale, tz, geo, device
config `use` + projects ->  apply those knobs to every test / a whole matrix
```

---

## 12. Interview script — one answer per concept

Use this shape for every answer:

1. **Definition** in one sentence.
2. **Why it exists** (what problem it removes).
3. **How I used it in my project** (point at a real spec).

That third step is what separates "I read the docs" from "I have written it".

---

### Q1. What is Playwright?

**Answer:** A Node.js automation library plus a test runner for end-to-end web testing. It drives real Chromium, Firefox and WebKit browsers over a persistent WebSocket connection (CDP / BiDi), auto-waits for elements before acting, and isolates every test in its own browser context.

**If they push:** it is not the W3C WebDriver protocol like Selenium, which is why it is faster and can intercept network calls, but it is also why legacy browsers (IE11) are not supported.

---

### Q2. Difference between `playwright` and `@playwright/test`?

**Answer:** `playwright` is the library — the browser API (`chromium.launch()`, `newContext()`, `newPage()`, `page.click()`). `@playwright/test` is the test runner built on top of it — it adds `test()`, `expect()`, fixtures, config, workers, retries and reporters. In `05_BCP.spec.ts` I use the library directly and manage the lifecycle myself; in `06_TA.spec.ts` I use the runner, so `{ page }` arrives already created.

---

### Q3. Explain Browser, Context and Page.

**Answer:** Browser is the process (one per worker, expensive to start). Context is an isolated profile inside it — its own cookies, localStorage, cache and session, like an incognito window. Page is a tab inside a context; multiple pages in the same context share that session.

**If they push:** cost and isolation move in opposite directions:

```
Browser     expensive,  zero isolation between its contexts' contents
Context     cheap,      full isolation  <-- the isolation boundary
Page        cheapest,   shares cookies with its sibling pages
```

Cleanup order is the reverse: page → context → browser. Two users means two **contexts**, never two pages of the same context (see section 10, gotcha #10).

---

### Q4. What is a fixture?

**Answer:** A fixture is a prepared dependency that the runner creates before the test and destroys after it; you receive it by naming it in the callback (`async ({ page })`) instead of creating it yourself. Setup runs before `await use()`, teardown after it, so cleanup happens even when the test fails. `page` and `context` are test-scoped, `browser` is worker-scoped, and you can write your own with `test.extend()`.

Full mechanism, `use()`, scope table and a custom `loggedInPage` example: **section 6 above**.

---

### Q5. How does Playwright isolate tests?

**Answer:** Every test gets a brand-new `browser context` (and page) from the fixture, so cookies, localStorage and sessions cannot leak between tests. The browser binary is reused per worker for speed, but the isolation boundary — the context — is thrown away after each test.

**If they push:** isolation is *not* guaranteed if you create contexts by hand and reuse them, or if you pass a shared `storageState`; then you are opting into shared state deliberately (which is useful for "already logged in" tests).

---

### Q6. How do you test multiple users or roles in one test?

**Answer:** Create one context per user from the `browser` fixture — `adminContext`, `userContext`, `guestContext` — and a page in each. Each context has its own cookie jar, so logging in as admin does not touch the viewer session. I also assert the isolation, not just assume it: write `localStorage` in the admin page and expect `null` in the others (`02_multiple_context_fixture.spec.ts`).

**If they push:** for a login that many tests need, don't repeat the UI login — save it with `storageState` (cookies + localStorage snapshot) and pass that file to `newContext({ storageState })`, or wrap it in a custom fixture.

---

### Q7. What is auto-waiting, and why no `waitForTimeout`?

**Answer:** Before acting, Playwright waits for the element to pass its actionability checks — attached to the DOM, visible, stable (not animating), enabled, and receiving events. Assertions like `toBeVisible()` retry until they pass or the timeout expires. That removes almost every manual sleep.

**If they push:** hard sleeps are the main source of flakiness — too short fails, too long wastes time. When a test is flaky, reach for a web-first assertion or a proper `waitFor` on the real condition, not a bigger sleep.

---

### Q8. How do you control viewport, locale, timezone, geolocation and mobile?

**Answer:** Three levels: `browser.newContext({ ... })` for one test; `test.use({ ... })` for a file/describe block; `projects` in `playwright.config.ts` for a matrix of environments. Device presets come from `devices['iPhone 13']`.

```ts
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'fr-FR',
  timezoneId: 'Europe/Paris',
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ['geolocation'],     // geolocation alone is blocked
});
```

**If they push:** `locale` changes client-side formatting only — the server may still return English HTML. And contexts created by hand do not pick up config `use` options.

---

### Q9. Where do trace, video and screenshots come from?

**Answer:** From the runner-created context, controlled by `use: { trace: 'on', video: 'on', screenshot: 'on' }` in the config (`'on'` = always, `'on-first-retry'` / `'retain-on-failure'` = conditional). For CI the usual recipe is `trace: 'on-first-retry'`, `video: 'retain-on-failure'`.

**If they push:** if a test builds contexts manually with `browser.newContext()`, none of those options apply — you would have to call `context.tracing.start()` / `stop({ path })` yourself. That is a real reason to prefer the fixture-built context.

---

### Q10. How does parallelism work?

**Answer:** `npx playwright test` splits tests across **worker processes** (`workers` in config, or `--workers`), so tests run in separate OS processes; `fullyParallel: true` spreads tests from the same file too. Each worker gets its own browser via the worker-scoped `browser` fixture. For CI scale-out you add `--shard=1/3` across machines.

**If they push:** `retries: 2` marks failed tests as flaky rather than failed; more parallel workers means more CPU and memory, so the serial part (login, seeding) should be done once and shared via `storageState` or a worker fixture.

---

### Q11. What makes a Playwright test reliable?

**Answer:** four habits — always `await` actions; use web-first assertions (`expect(locator).toHaveText`) instead of reading values and comparing manually; never hard-sleep; keep tests independent so they can run in any order and in parallel.

**If they push:** when something is flaky, open the trace (`npx playwright show-trace`) and look at the call log; it shows the exact actionability check that was still failing.

---

### Q12. Walk me through what happens when you run `npx playwright test`.

**Answer:** It loads `playwright.config.ts`, discovers files matching `testDir` + the `*.spec.ts` pattern, expands `test()` calls into a test list, distributes them to worker processes, and in each worker launches one browser; per test, the runner creates a context + page through fixtures, runs the body, records trace/video/screenshot, tears down, and finally the reporters (line, Allure, custom) write the results.

Diagram: **section 8** above. If the answer is "nothing runs", check the file extension and `testDir` first (section 2).

---

### Q13. Why do you close contexts you created, if `browser` is a fixture?

**Answer:** the `browser` fixture only owns the browser, and its teardown closes everything at **worker** end, not at test end. Contexts I create with `newContext()` are untracked by the runner, so they stay alive while the worker runs the remaining tests — holding pages, network and memory. Closing a context also closes its pages, so `context.close()` is the one cleanup call that matters.

Rule: whatever I create (`launch` / `newContext` / `newPage`) I close, reverse order; whatever the fixture gave me, the runner closes.

---

## 13. One-page cheat sheet

```
Browser  -> process, one per worker          (worker-scoped, expensive)
Context  -> isolated profile, cookies/storage (test-scoped, isolation boundary)
Page     -> tab inside a context              (test-scoped, cheapest)

fixture  -> prepared dependency: setup -> use(test) -> teardown
page / context  = test scope      browser = worker scope
test.extend()   -> custom fixture
browser.newContext(opts) -> you own it, no config trace/video

library (`playwright`)        = browser API
runner  (`@playwright/test`)  = test(), expect(), fixtures, config, workers, reports
```

