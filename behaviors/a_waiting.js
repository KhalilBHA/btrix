class Instagram {
  static id = "Instagram";

  static runInIframe = true;

  static isMatch() {
    return true;
  }

  static init() {
    return {};
  }

  // optional: if true, will also check isMatch() and possibly run
  // this behavior in each iframe.
  // if false, or not defined, this behavior will be skipped for iframes.
  static runInIframe = false;

  // optional: if defined, provides a way to define a custom way to determine
  // when a page has finished loading beyond the standard 'load' event.
  //
  // if defined, the crawler will await 'awaitPageLoad()' before moving on to
  // post-crawl processing operations, including link extraction, screenshots,
  // and running main behavior
  async awaitPageLoad() {

  }

  async* run(ctx) {
    // Keep it visible for 5 seconds for the crawler to "see" it
    console.log("Using custom behavior");
    await new Promise(r => setTimeout(r, 5000));
    const page = ctx.page;

    console.log("Instagram custom behavior loaded");

    const selectors = [
      'button:has-text("Not Now")',
      'button:has-text("Not now")',
      'button:has-text("Cancel")',
      'button[aria-label="Close"]',
      'svg[aria-label="Close"]'
    ];

    try {
      for (let i = 0; i < 5; i++) {
        for (const sel of selectors) {
          const el = await page.$(sel);
          if (el) {
            await el.click();
            console.log("Closed popup using:", sel);
            return;
          }
        }

        await page.waitForTimeout(1000);
      }

      console.log("No popup detected");
    } catch (e) {
      console.log("Behavior error:", e.message);
    }

    // Allow crawler to continue
    await page.waitForTimeout(2000);
  }
}