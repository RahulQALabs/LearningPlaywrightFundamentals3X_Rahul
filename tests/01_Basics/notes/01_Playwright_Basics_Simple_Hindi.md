# Playwright Basics — आसान हिंदी में समझें

इस नोट्स में हम Playwright के 4 मुख्य concepts समझेंगे:

1. **Browser → Context → Page (BCP)**
2. **Test और Assertion**
3. **Fixtures — Playwright खुद browser कैसे manage करता है**
4. **Test Options — browser को अपनी जरूरत के हिसाब से configure करना**

हम इसे एकदम basic level से समझेंगे, ताकि आप अपने Playwright TypeScript automation framework में आसानी से इस्तेमाल कर सकें।

## 1. सबसे पहले एक उदाहरण समझिए

मान लीजिए आपको किसी वेबसाइट पर login test करना है। इसके लिए आपको browser खोलना होगा, वेबसाइट पर जाना होगा, username-password डालना होगा और verify करना होगा कि login सफल हुआ या नहीं।

Playwright में इसके लिए तीन चीजें समझना जरूरी हैं।

### 1. Browser — पूरी बिल्डिंग

यह Chrome, Firefox या WebKit जैसा browser है। सबसे पहले browser launch होता है।

### 2. Context — अलग-अलग होटल के कमरे

हर context का अपना cookies, local storage और login session होता है। एक context का login दूसरे context से अलग रहता है।

### 3. Page — कमरे के अंदर एक browser tab

जिस tab में आप वेबसाइट खोलते हैं, उसे Page कहते हैं। एक context में कई pages हो सकते हैं।

इसे इस diagram से याद रखें:

```text
Browser
  |
  v
Browser Context
(अलग session, cookies और storage)
  |
  v
Page
(वेबसाइट का एक tab)
```

याद रखने का तरीका: **Browser → Context → Page**, यानी पहले browser, फिर उसका session, फिर उस session के अंदर tab।

## 2. Playwright में एक Test कैसे लिखा जाता है?

आपकी फाइल `01_example.spec.ts` में इस तरह का code है:

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
});
```

आइए इसे एक-एक करके समझें।

| Code | आसान मतलब |
|---|---|
| `import { test, expect }` | Test बनाने और result verify करने के tools लाना |
| `test('has title', ...)` | एक test case बनाना |
| `async` | ऐसे कामों को संभालना जिनमें समय लग सकता है |
| `{ page }` | Playwright से तैयार Page प्राप्त करना |
| `await page.goto(...)` | वेबसाइट खुलने का इंतजार करना |
| `expect(...)` | Check करना कि expected result मिला या नहीं |
| `toHaveTitle(...)` | Website का title verify करना |

### `async` और `await` क्यों जरूरी हैं?

मान लीजिए आपको पहले वेबसाइट खोलनी है और उसके बाद login button पर click करना है।

```ts
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Login' }).click();
```

पहली line पूरी होने के बाद ही अगली line पर आगे बढ़ने का इरादा है। `await` asynchronous काम के पूरा होने का इंतजार करता है।

अगर जरूरी `await` छूट जाए, तो अगला step पहले चल सकता है और test में समस्या आ सकती है।

### `expect()` क्या करता है?

यह test का result verify करता है।

```ts
await expect(page).toHaveTitle(/Playwright/);
```

इसका मतलब है: page के title में `Playwright` शब्द होना चाहिए।

दो तरीके याद रखें:

```ts
// Title में Playwright शब्द कहीं भी हो सकता है
await expect(page).toHaveTitle(/Playwright/);

// पूरा title बिल्कुल यही होना चाहिए
await expect(page).toHaveTitle('Installation | Playwright');
```

Regex `/Playwright/` title के अंदर शब्द खोजता है, जबकि string वाला तरीका पूरे title का मिलान करता है।

अगर assertion सफल होता है तो test pass होगा; नहीं तो fail होगा।

### Playwright Test Runner क्या है?

अब तक हमने `test()` और `expect()` इस्तेमाल किए। ये दोनों कहाँ से आते हैं? ये **Playwright Test Runner** से आते हैं।

Playwright में असल में दो अलग packages हैं:

| | `playwright` (library) | `@playwright/test` (Test Runner) |
|---|---|---|
| क्या देता है | सिर्फ browser को control करने का API — `chromium.launch()`, `newContext()`, `newPage()`, `page.click()` | उसके ऊपर पूरा test framework — `test()`, `expect()`, fixtures, config, workers, retries, reporters |
| आपको क्या करना पड़ता है | Browser, Context और Page खुद बनाना और बंद करना | सिर्फ `async ({ page }) => { ... }` लिखना, बाकी runner खुद करता है |
| आपके project में कहाँ दिखता है | `05_BCP.spec.ts` (manual `chromium.launch()`) | `06_TA.spec.ts` (`{ page }` fixture) |
| Command | — | `npx playwright test` |

यानी library सिर्फ "browser चलाने की machine" है, और Test Runner उस machine के ऊपर बना हुआ "test चलाने का system" है।

जब आप `npx playwright test` चलाते हैं, तो runner अंदर से यह करता है:

```text
npx playwright test
    |
    v
playwright.config.ts पढ़ता है
(testDir, use, projects, reporter)
    |
    v
**/*.spec.ts files collect करता है
(test() वाले cases की list बनाता है)
    |
    v
काम को workers में बाँट देता है (parallel)
    |
    v
हर test के लिए:
  Browser launch -> Context -> Page   (fixtures से)
  आपका test body चलता है
  fail होने पर retry / trace / screenshot
    |
    v
Reporters: line, allure, custom reporter -> HTML report
```

इसी वजह से:

- `{ page }` अपने-आप मिलता है — fixture runner ने तैयार किया।
- `expect()` fail होने पर report में actual vs expected दिखता है — यह runner का काम है।
- `playwright.config.ts` की settings सभी tests पर लागू होती हैं — config runner पढ़ता है।

और जब आप `import { chromium } from 'playwright'` करते हैं (जैसे `03_normal_pw.spec.ts` में), तब आप library सीधे इस्तेमाल कर रहे हैं — runner सिर्फ `test()` वाला हिस्सा दे रहा है, browser आप खुद manage कर रहे हैं।

## 3. Auto-waiting — बार-बार `waitForTimeout()` क्यों नहीं लगाना चाहिए?

मान लीजिए आप किसी link पर click करते हैं और उसके बाद अगला page खुलता है।

```ts
await page.getByRole('link', { name: 'Get started' }).click();

await expect(
    page.getByRole('heading', { name: 'Installation' })
).toBeVisible();
```

Playwright अपने-आप जरूरी condition का इंतजार करता है।

- `click()` element के click करने योग्य होने का इंतजार करता है।
- `fill()` input के इस्तेमाल योग्य होने का इंतजार करता है।
- `toBeVisible()` element के visible होने तक दोबारा check करता है, या timeout होने पर fail होता है।

इसलिए हर step के बाद बिना वजह `waitForTimeout(5000)` लगाने की जरूरत नहीं है। इससे tests धीमे और कम भरोसेमंद हो सकते हैं।

---

## 4. Browser, Context और Page को खुद बनाना

आपकी `03_normal_pw.spec.ts` फाइल में Playwright को manually चलाने का तरीका है।

```ts
import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('Open example website', async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://example.com');

    console.log(await page.title());

    await page.close();
    await context.close();
    await browser.close();
});
```

यहाँ आपको खुद तीनों चीजें बनानी और बंद करनी पड़ती हैं।

### 1. `chromium.launch()`

Browser चालू करता है। `headless: false` होने पर browser की window दिखाई देती है।

### 2. `browser.newContext()`

एक नया, अलग browser session बनाता है।

### 3. `context.newPage()`

उस session में एक नया tab बनाता है।

### 4. Cleanup

पहले Page बंद करें, फिर Context और अंत में Browser।

एक जरूरी बात: यदि test के बीच में error आ गया, तो साधारण code में cleanup वाली lines नहीं चल सकतीं। ऐसे मामलों में `try/finally` इस्तेमाल किया जा सकता है। Fixtures इस तरह की lifecycle management को आसान बनाते हैं।

## 5. दो users को एक साथ test करना हो तो?

मान लीजिए आपकी application में Admin और Viewer दो roles हैं।

आपको verify करना है कि Admin को admin वाला access मिलता है और Viewer को केवल viewer वाला access मिलता है।

इसके लिए दो अलग contexts बनाएं:

```ts
const adminContext = await browser.newContext();
const viewerContext = await browser.newContext();

const adminPage = await adminContext.newPage();
const viewerPage = await viewerContext.newPage();
```

अब दोनों pages अलग-अलग sessions में चलेंगे।

```text
                    एक Browser
                   /           \
                  v             v
          Admin Context     Viewer Context
          Admin cookies     Viewer cookies
                |                 |
                v                 v
            Admin Page         Viewer Page
```

**दो अलग contexts क्यों?** एक ही context में दो pages खोलने पर दोनों एक ही session के cookies और storage साझा कर सकते हैं। इससे एक user का login दूसरे user के test को प्रभावित कर सकता है।

ध्यान दें: अलग contexts session isolation देते हैं, लेकिन application में सही permissions लागू हैं या नहीं, यह आपको tests में अलग से verify करना होगा।

## 6. Fixtures — Playwright आपके लिए काम कैसे करता है?

अब सबसे महत्वपूर्ण concept समझिए।

ऊपर वाले manual code में आपने खुद:

- Browser launch किया।
- Context बनाया।
- Page बनाया।
- सभी को बंद किया।

लेकिन Playwright Test Runner में आप सीधे `{ page }` ले सकते हैं:

```ts
import { test, expect } from '@playwright/test';

test('Open website', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle(/Example Domain/);
});
```

यहाँ `page` को **Fixture** कहते हैं। Playwright Test Runner आपके लिए इसे तैयार करता है और test पूरा होने पर इसकी cleanup भी करता है।

```text
Test Runner
    |
    v
Browser → Context → Page तैयार
    |
    v
आपका Test Code
(Website खोलें, actions करें और assertions लगाएं)
    |
    v
Automatic Cleanup
(Test सफल हो या fail, fixture teardown चलता है)
```

### कौन-सा fixture कब इस्तेमाल करें?

| Code | क्या मिलेगा? |
|---|---|
| `async ({ page }) => {}` | तैयार Page, उसका Context और Browser |
| `async ({ context }) => {}` | तैयार Context; जरूरत पर अपना Page बनाएं |
| `async ({ browser }) => {}` | Browser; खुद एक या अधिक Context बनाएं |

Playwright सामान्यतः एक worker में Browser को reuse करता है, लेकिन हर test के लिए नया Context और Page बनाता है। इससे performance भी अच्छी रहती है और tests के बीच session isolation भी मिलता है।

### तीन अलग users के लिए `browser` fixture

```ts
test('Test multiple users', async ({ browser }) => {
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    const guestContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();
    const guestPage = await guestContext.newPage();

    await adminPage.goto('https://example.com');
    await userPage.goto('https://example.com');
    await guestPage.goto('https://example.com');

    await adminContext.close();
    await userContext.close();
    await guestContext.close();
});
```

यहाँ एक Browser के अंदर तीन independent sessions हैं। हर context को बंद करने पर उससे संबंधित pages भी बंद हो जाते हैं।

---

## 7. Test Options — browser को अपनी जरूरत के अनुसार बदलना

कभी-कभी आपको केवल normal browser test नहीं करना होता। आपको check करना होता है कि website अलग-अलग परिस्थितियों में कैसे काम करती है।

उदाहरण:

- Desktop पर layout सही है या नहीं।
- French language चुनने पर formatting बदलती है या नहीं।
- Paris की timezone में तारीख और समय सही है या नहीं।
- Location permission मिलने पर location-based feature चलता है या नहीं।
- Mobile screen पर website सही दिखती है या नहीं।

Playwright में आप `browser.newContext()` के अंदर options दे सकते हैं।

```ts
const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    geolocation: {
        latitude: 48.8566,
        longitude: 2.3522
    },
    permissions: ['geolocation']
});

const page = await context.newPage();

await page.goto('https://example.com');

await context.close();
```

इस code में:

| Option | आसान मतलब |
|---|---|
| `viewport` | Browser में दिखाई देने वाले page area का आकार |
| `locale` | Browser की language और locale-based formatting |
| `timezoneId` | Date और time किस timezone के अनुसार दिखेंगे |
| `geolocation` | Browser को कौन-से location coordinates देने हैं |
| `permissions` | Website को कौन-सी browser permission दी गई है |

**ध्यान दें:** केवल `geolocation` देने से location access की अनुमति अपने-आप नहीं मिलती। इसलिए इस उदाहरण में `permissions: ['geolocation']` भी दिया गया है। Locale बदलने से server की तरफ से आने वाली भाषा जरूरी नहीं कि बदल जाए।

### Mobile emulation

Mobile जैसा browser context बनाने के लिए:

```ts
const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
});
```

यह छोटी screen, mobile viewport behavior और touch interaction जैसी परिस्थितियों को simulate करता है। बेहतर device-specific testing के लिए Playwright के built-in device descriptors भी इस्तेमाल किए जा सकते हैं:

```ts
import { devices } from '@playwright/test';

const context = await browser.newContext({
    ...devices['iPhone 13']
});
```

यह mobile emulation है, असली iPhone या उसके hardware का पूर्ण विकल्प नहीं।

## 8. `playwright.config.ts` — settings एक जगह रखना

मान लीजिए आपके project में 100 test cases हैं और आप चाहते हैं कि सभी tests में screenshot, video और trace record हो।

हर test के अंदर ये settings लिखने के बजाय `playwright.config.ts` में रख सकते हैं।

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: false,
        screenshot: 'on',
        video: 'on',
        trace: 'on'
    }
});
```

इन settings का मतलब:

- `headless: false` — browser window दिखाई देगी।
- `screenshot: 'on'` — हर test के लिए screenshot capture करने की setting।
- `video: 'on'` — test execution की video record करने की setting।
- `trace: 'on'` — test की debugging information record करने की setting।

### Config या `newContext()` — किसका इस्तेमाल करें?

| परिस्थिति | सही तरीका |
|---|---|
| सभी tests में समान settings | `playwright.config.ts` का `use` |
| सिर्फ एक test को अलग locale देना है | उस test में `browser.newContext()` |
| कई devices या browsers पर tests चलाने हैं | `projects` configuration |

इससे आपका framework maintain करना आसान हो जाता है।

## 9. Test चलाने के जरूरी commands

| Command | काम |
|---|---|
| `npm run 01` | आपके `package.json` में परिभाषित `01` script चलाना |
| `npx playwright test tests/01_Basics/05_BCP.spec.ts --reporter=list` | किसी खास test file को चलाना |
| `npx playwright test --headed` | Browser को visible mode में चलाना |
| `npx playwright test --list` | Test cases की सूची देखना, उन्हें चलाए बिना |
| `npx playwright show-report` | उपलब्ध HTML report खोलना |

ध्यान दें: `npm run 01` तभी काम करेगा जब आपके `package.json` में `01` नाम की script मौजूद हो।

## 10. आपके लिए 7 जरूरी बातें

1. Test files के नाम सामान्यतः `.spec.ts` या `.test.ts` रखें, ताकि वे Playwright की test discovery configuration से match करें।
2. Asynchronous Playwright actions में `await` का इस्तेमाल करें।
3. `toHaveTitle('x')` पूरे title का मिलान करता है, जबकि `toHaveTitle(/x/)` matching pattern का इस्तेमाल करता है।
4. दो अलग users के independent sessions के लिए दो Context बनाएं।
5. Manual browser management में cleanup करें; Page, Context और Browser को उचित क्रम में बंद करें।
6. Fixtures इस्तेमाल करने पर सामान्यतः Browser, Context और Page को खुद create और cleanup करने की जरूरत नहीं होती।
7. सभी tests के लिए समान options config में रखें; विशेष जरूरतों के लिए अलग Context बनाएं।

एक और महत्वपूर्ण बात: `.ts` नाम वाली file अपने-आप test file के रूप में collect नहीं होती, यदि वह configured test pattern से match नहीं करती।

## 11. छोटा Quiz — अपनी समझ check करें

### प्रश्न 1

एक ही browser में Admin और Viewer के अलग-अलग login sessions चाहिए। क्या बनाएंगे?

- A. दो Page, एक ही Context में
- B. दो अलग BrowserContext
- C. दो अलग locators

### प्रश्न 2

`await expect(page).toHaveTitle(/Playwright/)` क्या check करता है?

- A. Title बिल्कुल Playwright होना चाहिए
- B. Title में Playwright match होना चाहिए
- C. Page पर Playwright नाम का button होना चाहिए

### प्रश्न 3

`async ({ page })` में `page` कौन उपलब्ध कराता है?

- A. Playwright Test Runner का fixture system
- B. आपको हर बार manually `chromium.launch()` करना होगा
- C. TypeScript compiler

### प्रश्न 4

सभी tests में screenshot setting लागू करनी है। इसे कहाँ रखना बेहतर है?

- A. हर test में अलग-अलग
- B. `playwright.config.ts` के `use` options में
- C. हर locator के अंदर

### उत्तर और कारण

1. **B — दो अलग BrowserContext।** इनके cookies और storage अलग होते हैं।
2. **B — Title में Playwright match होना चाहिए।** Regex पूरे title के बजाय matching text खोज सकता है।
3. **A — Playwright Test Runner का fixture system।** यह Page तैयार करता है और उसका lifecycle manage करता है।
4. **B — `playwright.config.ts` के `use` options।** Shared settings को config में रखने से duplication कम होता है।

---

## अंतिम बात

इस पूरे chapter का सबसे जरूरी concept है — **`Browser → Context → Page` और Fixtures।** जब आप इन दोनों को अच्छे से समझ लेते हैं, तो Playwright में test लिखना, अलग-अलग users के sessions manage करना और automation framework बनाना काफी आसान हो जाता है।
