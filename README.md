# Learning Playwright Fundamentals 3X - Rahul

A hands-on Playwright + TypeScript project for learning end-to-end test automation fundamentals. This repository contains example specs and practice tests against the Testing Academy practice application.

## Tech Stack

- [Playwright Test](https://playwright.dev/) `^1.63.0`
- [TypeScript](https://www.typescriptlang.org/) with Node.js types
- HTML reporter for test results

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher — verify with `node -v`
- npm (bundled with Node.js) — verify with `npm -v`
- Git

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/RahulQALabs/LearningPlaywrightFundamentals3X_Rahul.git
   cd LearningPlaywrightFundamentals3X_Rahul
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install the Playwright browsers**

   Playwright needs the browser binaries (Chromium, Firefox, WebKit) to run tests:

   ```bash
   npx playwright install
   ```

   On Linux/CI you may also need the OS-level dependencies:

   ```bash
   npx playwright install --with-deps
   ```

That's it — you're ready to run tests.

### Optional: Start a fresh Playwright project from scratch

If you want to scaffold a brand-new Playwright project (this repo was created that way):

```bash
npm init playwright@latest
```

During setup choose:

- **TypeScript** (or JavaScript) for the language
- Test folder name (`tests` by default)
- **Yes** to add a GitHub Actions workflow
- **Yes** to install Playwright browsers

## Project Structure

```
LearningPlaywrightFundamentals3X_Rahul/
├── tests/
│   ├── example.spec.ts     # Basic Playwright example tests
│   └── tta.spec.ts         # Testing Academy practice test (codegen-generated)
├── playwright.config.ts    # Playwright configuration (testDir, reporter, browsers)
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and metadata
└── README.md
```

## Configuration

Key settings in `playwright.config.ts`:

- `testDir: './tests'` — where spec files live
- `fullyParallel: true` — run tests in parallel
- `reporter: 'html'` — generates an HTML report
- `trace: 'on-first-retry'` — captures a trace when a test is retried
- `headless: false` — opens a visible browser window (useful for learning/debugging)
- One project configured: **chromium** (Desktop Chrome)

## Running Tests

Run the full suite (headless configured in config):

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/tta.spec.ts
```

Run in headed mode (watch the browser):

```bash
npx playwright test --headed
```

Run a single project/browser:

```bash
npx playwright test --project=chromium
```

Run in debug mode (Playwright Inspector opens):

```bash
npx playwright test --debug
```

Run in UI mode (interactive watch/explore mode):

```bash
npx playwright test --ui
```

## Viewing Reports

After a run, open the HTML report:

```bash
npx playwright show-report
```

Traces for failed/retried tests can be opened from the report, or with:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Codegen (Recording Tests)

Codegen generates test code by recording your interactions in a real browser — the fastest way to bootstrap a new test.

1. **Record a new test** — opens a browser and the Playwright Inspector:

   ```bash
   npx playwright codegen
   ```

2. **Record against a specific URL**:

   ```bash
   npx playwright codegen https://app.thetestingacademy.com/playwright/multiple_element_filter
   ```

3. **Record with a device/emulation preset** (e.g. mobile viewport):

   ```bash
   npx playwright codegen --device="iPhone 13"
   ```

4. **Record using a saved authentication state** (skip login steps):

   ```bash
   npx playwright codegen --load-storage=auth.json https://example.com
   ```

5. **Save the generated code** — click the **copy** icon in the Inspector and paste it into a new `tests/<name>.spec.ts` file. You can also write the recording straight to a file:

   ```bash
   npx playwright codegen -o tests/my-new-test.spec.ts https://example.com
   ```

6. **Useful codegen options**:

   ```bash
   npx playwright codegen --help
   ```

   - `--target=typescript` — language for the generated test (default: `typescript`)
   - `--browser=chromium|firefox|webkit` — browser to record in
   - `--viewport-size=1280,720` — set the viewport size
   - `--save-storage=auth.json` — save the auth/cookies after recording
   - `--timezone`, `--geolocation`, `--lang`, `--color-scheme` — emulate environment

### Example: generating the test in this repo

`tests/tta.spec.ts` was created with codegen, e.g.:

```bash
npx playwright codegen https://app.thetestingacademy.com/playwright/multiple_element_filter
```

Then the recorded steps were saved into `tests/tta.spec.ts`.

## Troubleshooting

- **Browsers not found** — run `npx playwright install`.
- **Missing system libraries on Linux** — run `npx playwright install --with-deps`.
- **Tests hang** — check `headless: false` in the config and run `--headed` to observe, or use `--debug`.
- **Version mismatch warnings** — run `npm install` to sync `@playwright/test` with the installed browsers.

## Useful Commands Cheat Sheet

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies |
| `npx playwright install` | Download browser binaries |
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run tests with visible browser |
| `npx playwright test --ui` | Interactive UI mode |
| `npx playwright test --debug` | Debug with Playwright Inspector |
| `npx playwright codegen <url>` | Record a new test |
| `npx playwright show-report` | Open the HTML report |

## Resources

- Playwright Docs — https://playwright.dev/docs/intro
- Playwright Codegen Guide — https://playwright.dev/docs/codegen
- Testing Academy — https://app.thetestingacademy.com/
