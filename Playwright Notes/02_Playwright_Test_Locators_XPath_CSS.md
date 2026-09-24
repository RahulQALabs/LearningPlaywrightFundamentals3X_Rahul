# Playwright Test Annotations, Locators, page.goto, HTML, XPath, CSS & XPath Functions/Axes

> Extracted from the supplied 3x Playwright + AI Mastery notes. Content is organized by topic; the original wording/examples are retained.

# PW Test Annotation and Locator Strategy.

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_06h_TBt31IOAFfMEgKIDW.png?ixlib=js-3.8.0)

## Test Annonations

    test('title', async () => {});   // the base
    test.skip
    test.only
    test.fail
    test.fixme
    test.slow

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_0Yt6wMgNa1e6n6xtpx4ZG.png?ixlib=js-3.8.0)

---

# Locator Strategy and Command

locator strategy is the most important topic for your interview to

**find the locators of the web elements so that we can interact with them**

In Playwright, we have two types of locator strategy:

1. **Common** → we are using the XPath, CSS selector, and normal locators
2. **Playwright Locators** → they have also given you some kind of inbuilt commands which you can directly use to find any type of locators ( **getByX**)

**so what is a locator and why do we even use it?**

1. Locator strategy that everyone has to learn, because it's one of the first interview portions.
2. It is actually important if you want to create any kind of automation. Right, locators are the most important things or web elements you need to find.
3. **The smallest and the best or the stable locator that you are able to find, the automation will be also smooth.**

---

## page.goto()

- you need to OPEN a page. `page.goto(url)` is how every Playwright test begins.
- await - return the promise.
- **waitUntil**
  - The `waitUntil` option tells Playwright at which stage it should consider the page "loaded" and move to the next line of your test.
  - **There are 4 options, from fastest to slowest:**
  - `commit` — the server has responded. HTML may not even be parsed yet. Use this for testing redirects or checking HTTP status codes.
  - `domcontentloaded` — the HTML is fully parsed and the DOM tree is built. CSS, images, and fonts may still be loading. Use when you need elements in the DOM but don't care about visuals.
  - `load` — everything is loaded including images, CSS, fonts, and scripts. This is the DEFAULT. Use for most tests.
  - `networkidle` — no network requests for 500ms. The page is completely quiet. Use for SPAs (React, Angular, Vue) that fetch data via API calls AFTER the initial HTML loads.

---

**commit** = "the server said yes, move on". Fastest. Use when you only need the URL or status, not the content.

**domcontentloaded** = "HTML is ready". Use for fast tests where you interact with text and buttons, not images.

**load** = "everything on the page finished". The default, safe.

**networkidle** = "the page stopped talking to the network". Slowest and flaky.

---

### Referer Concept

The HTTP `Referer` header tells the server which page the user came FROM. When you click a link on Google that takes you to a website, the browser sends `Referer: https://google.com` in the request. The server knows the user came from Google.

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_6zN2HnY7Jfj51pN343_je.png?ixlib=js-3.8.0)

    test("navigate with custom referer", async ({ page }) => {
        // Tell the server "user came from Google"
        await page.goto("https://app.com/landing", {
            referer: "https://google.com/search?q=testing+academy"
        });

        console.log("Page loaded with Google as referer");
        console.log("URL:", page.url());
    });

---

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_6RVIHjVtpSFQSebVIDOIi.png?ixlib=js-3.8.0)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_268fETAkbr8z47KBJBfX6.png?ixlib=js-3.8.0)

# Locators

1. Default Locator - ID, Class, Tag
2. CSS Engine
3. Xpath
4. Playwright Own Locators getByX

> Our task is to find the best stable locator, which is the shortest and does not break

## FINDING ELEMENTS ON A PAGE

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_ty9gPmtx5PA3FCn7hvZyx.png?ixlib=js-3.8.0)

# HTML Elements

- HTML is the standard markup language for Web pages.
- \<tagname>Content goes here...\</tagname>

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_PO5qsz0nMES8yjvrj-igc.png?ixlib=js-3.8.0)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_sD1yKgROjOGVzHBMD0fu2.png?ixlib=js-3.8.0)

WebElement - **Key and Value - Attribute and Value.**

    <input

    type="email"
    class="text-input W(100%)"
    name="username"
    vwo-html-translate-attr="placeholder"
    vwo-html-translate-placeholder="login:enterEmailID"
    id="login-username"
    data-qa="hocewoqisi"
    placeholder="Enter email ID"

    >

**PS. - every locator can be tracked by its tag, HTML tag, and its unique attributes**

A locator is a way of identifying an element on a web page so that it can be interacted with.

There are several different types of locators that can be used, including:

- **ID:** This locator type uses the unique ID attribute of an element to locate it on the page.
- **Name:** This locator type uses the name attribute of an element to locate it on the page.
- **Class name:** This locator type uses the class attribute of an element to locate it on the page.
- **Tag name:** This locator type uses the HTML tag name of an element to locate it on the page.
- **Custom Attribute** - data-qa, data-testid, data-id, `data-testid="to-testID-origin"`
- **CSS selector**: This locator type uses a CSS selector to locate an element on the page.
- **XPath:** This locator type uses an XPath expression to locate an element on the page.
- When writing test scripts with Selenium, you can use a combination of these locator types to accurately and reliably locate elements on the page.

**Preference rule**

ID → NAME → CLASS → TAG NAME → CSS → XPATH

**Playwright**

getByX → ID → NAME → CLASS → TAG NAME → CSS → XPATH

    <a
    id="btn-make-appointment"
    href="./profile.php#login"
    class="btn btn-dark btn-lg">
    Make Appointment
    </a>

---

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_thmsXvYnuXE6NI0dcUREu.png?ixlib=js-3.8.0)

**What is the reason why people create a Custom attribute for QA ?**

there are many times when developers do not write the id, name, and any unique thing in a locator. Then how will we be able to locate that element? ***QAs actually have to locate the element, interact with it so that they can write an automation***. That's why it is important that people also add a custom attribute to help the qa perform the automation.

**Custom Attribute** - data-qa, data-testid, data-id, `data-testid="to-testID-origin"`

    data-testid="to-testID-origin"

    ```
    data-testid="to-testID-origin"
    ```

    ```
    data-qa="hocewoqisi"
    ```

    data-qa-test

    ```
    data-cy="flightSW"
    ```

### HTML Forms

What is an HTML Form?

A HTML form is a section of a web page that contains form elements, such as text fields, checkboxes, and buttons. Forms allow users to enter data and interact with a website.

Forms are created using the \<form> HTML tag. This tag defines the start and end of a form, and it can have several attributes that determine how the form behaves.

For example, the action attribute specifies the URL of the server-side script that will process the form data, and the method attribute specifies whether the form data will be sent to the server using the GET or POST method.

    <form action="http://www.example.com/form-handler.php" method="POST">
     <label for="username">Username:</label>
     <input type="text" id="username" name="username">
     <br>
     <label for="password">Password:</label>
     <input type="password" id="password" name="password">
     <br>
     <input type="submit" value="Log In">
    </form>

## Locator Strategy

Three important things about locators:

**Lazy** → When you create a locator, Playwright does NOT search for the element immediately. It only searches when you actually DO something with it → click, fill, read text. This means you can create locators at the top of your test and use them later, even if the element doesn't exist yet.

**Strict** → If a locator matches MORE than one element, Playwright throws an error. This prevents you from accidentally clicking the wrong button. If you need to work with multiple elements, use `nth()`, `first()`, or `last()`.

**Auto-Wait** → When you call `locator.click()`, **Playwright automatically waits for the element to be visible, enabled, and stable before clicking**. No need for manual `sleep()` or `waitFor()` in most cases.

100% Advance Playwright Framework

- Playwright → 80% ( getbYRole. getByid)
- Default - 20 %- XPath/ Css Selector page.locator()

[katalon-demo-cura.herokuapp.com/](https://katalon-demo-cura.herokuapp.com/)

---

> 17th Sept 2026

# Mastering XPATH and CSS Selector (CSS engine)

## What is XPATH?

- XPath is a query language for **selecting nodes** from an **XML/HTML document.**
- XPath was defined by the **World Wide Web Consortium.**
- XPath is supported by all **modern browsers.**

Core Logic - **//tagName[@attribute ='value']**

// - In this document (HTML)

**TAG** - h1, p, input, a, form, img, video, audio,button, table, ul, li, tr, div, select, span, → Html Tags

**Attribute** - id, class, name, alt, href, src, data-qa, ....srcset ..

There are two types of XPath which are very popular.

- Absolute XPath
- **Relative XPath**

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_E7dOkYmuBGytqZwr2Wzij.png?ixlib=js-3.8.0)

**Absolute XPath -** xPath is an expression which basically contains details from **the root element**

**the problem with the absolute** XPath is if any element changes, the XPath basically breaks. So generally people don't use it

**PS. : We generally do not use absolute.**

/html/body/header/div/a

##### Relative Xpath

You can simply start by referencing the element you want and go from there

Core Logic - **//tagName[@attribute ='value']**

    //a[@id="btn-make-appointment"]
    //*[@id="btn-make-appointment"] - slow

    app.wingify.com/#/login

  1. //input[@id="login-username"] - 1
  2. //*[@placeholder="Enter email ID"] - Slow( * is find all)
  3. //input[@data-qa="hocewoqisi"] - 1 4.//input[@name="username"] - not uniuqe 4/4 → get(0), first() 5.//input[@placeholder="Enter email ID"] - 4/4 → get(0) 6.//input[@type="email"] - not uniuqe 4/4 7.//input[@class="text-input W(100%)"] - Low

**XPATH to CSS selector**

    //input[@data-qa="hocewoqisi"] ->  remove the // and @ -> input[data-qa="hocewoqisi"]

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_xEGjknC91beyTkTOQtKC1.png?ixlib=js-3.8.0)

**page.locator("css=button").click()** **page.locator("xpath=//button").click()**

---

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_gGyPPFkGzWBP-Wrrn7S58.png?ixlib=js-3.8.0)

---

# XPATH Functions

- *XPath F(n) → they are majorly used for the dynamic elements*
- Function says that there are certain functions you can also use, which I am going to give you
  - **Contains()**//tag_name[**contains**( @attribute,'value_of_attribute')]
  - **Starts-with()**//tag_name[**starts-with**( @attribute,'Part_of_Attribute_value')]
  - **Text()**//tag_name[text()='Text of the element']

    import { test, expect} from '@playwright/test';
    test("Verfiy the error message in the wingify free trial", async({ page})=>{

        await page.goto("https://wingify.com/free-trial/");
        let inputBox = page.locator("//input[@id='free-trial-step1-email']");
        await inputBox.fill("abccd");
        await page.locator("#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox").click();
        await page.locator("[data-qa='free-trial-step1-gdpr-consent-checkboxgdpr-consent-checkbox']").click();
        let error_message = page.locator("//div[contains(@class,'invalid-reason')]").first();
        await page.locator("//button[@data-qa='page-su-submit']").first().click();

        let error_message_text = await error_message.textContent();
        expect(error_message_text).toContain("The email address you entered is incorrect.");
        await page.pause();

    });

**String functions**

**concat**(string, ...): XPath concat function concatenated number of arguments and return to a concatenated string.

**starts-with**(string, string): XPath start-with function return True/False. Return True if second argument string is start with first argument.

**contains**(string, string) - XPath contains function return True/False. Return True if second argument string is a contain of first argument.

string-length(string): XPath string-length function return the length of string.

**substring-after**(string, string): XPath substring-after function return the substring of the first argument string base on first occurrence of the second argument string after all character.

**substring-before**(string, string): XPath substring-before function return the substring of the first argument string base on first occurrence of the second argument string before all character.

**normalize-space**(string): XPath normalize-space function sequence of whitespace combine into single normalize space and removing leading and trailing whitespace.

    //a[contains(@id,"btn-make")] - Partial Match
    //a[text()="Make Appointment"]
    //a[contains(text(),"Make Appointment")]
    //a[text()="Make Appointment" or @id="btn-make-appointment"] - 100 Either True
    //a[starts-with(@id,"btn")]
    //a[ends-with(@id,"btn")]

[katalon-demo-cura.herokuapp.com/](https://katalon-demo-cura.herokuapp.com/)

CheatSheet - [devhints.io/xpath](https://devhints.io/xpath)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_2u3Y-PLBZb0VoL5V6_uFa.png?ixlib=js-3.8.0)

---

Dynamic Element

    <a id="btn-make-appointmentaldljasdhlashdlaldhhadhsi" href="./profile.php#login" class="btn btn-dark btn-lg"> Make Appointment </a>

//a[@id ='btn-make-appointment17092026']

# XPATH Axes

if we can find one element with another element by using the relation

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_-HELO5N5Y7Tzar7sDJBJM.png?ixlib=js-3.8.0)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_g3aWz6nwCL_NNpRXlvNRE.png?ixlib=js-3.8.0)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_sgwrQlwgRMLFBoCElSRvQ.png?ixlib=js-3.8.0)

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_m549A0chrJldbuPAa9tIo.png?ixlib=js-3.8.0)

CSS Selectors MasterSheet

[image.png](https://eraser.imgix.net/workspaces/9yp9hyBp2Yk4Z5TK4UFB/WWS31TdyovhjTB1TVo9v2jWpPei1/image_jJdkozfI-69kXBRKbsUAP.png?ixlib=js-3.8.0)

Intercom
