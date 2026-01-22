class InstagramDismiss {
  static id = "instagram-dismiss-login";

  /**
   * Determines if this behavior should run on the given URL.
   * @param {string} url - The current page URL.
   * @param {Object} ctx - The crawl context.
   * @returns {boolean}
   */
  static isMatch(url, ctx) {
    return !!window.location.href.match(/https:\/\/(www\.)?instagram\.com\//);
  }

  /**
   * Called once when the behavior is loaded.
   * Use this for setup logic or global configuration.
   */
  static async init(ctx) {
    log("Instagram Login Dismiss behavior initialized.");
    ctx.log("Instagram Login Dismiss behavior initialized.");
  }

  /**
   * The main interaction logic. 
   * Must be an async generator (async *run).
   */
  async *run(ctx) {
    const { page } = ctx;
    
    // Wait for the page to load/modal to appear
    await page.waitForTimeout(3000);

    const selectors = [
      'button:has-text("Not Now")',
      'div[role="dialog"] button:has(svg[aria-label="Close"])',
      'svg[aria-label="Close"]'
    ];

    for (const selector of selectors) {
      try {
        const element = await page.$(selector);
        if (element && await element.isVisible()) {
          await element.click();
          log(`Successfully dismissed login modal using: ${selector}`);
          ctx.log(`Successfully dismissed login modal using: ${selector}`);
          break;
        }
      } catch (err) {
        // Silently continue to next selector
        log(`Failed: ${err}`);
      }
    }
    log(`Finished...`);

    // Pass control to the standard autoscroll behavior to capture the feed
    // yield* ctx.autoScroll();
  }
}