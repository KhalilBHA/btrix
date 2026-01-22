class InstagramLoginFix {
  // 1. This ID will show up in your crawl logs
  static id = "insta-login-fix";

  // 2. This determines WHERE the script runs. 
  // Make sure this matches your target URL!
  static isMatch(url) {
    return url.includes("instagram.com");
  }

  // 3. The run function MUST be an async generator (async *run)
  async *run(ctx) {
    const { page } = ctx;
    
    ctx.log("Starting Instagram login fix...");

    try {
      // Wait for the modal
      await page.waitForTimeout(4000);

      // Try to click "Not Now"
      const button = await page.getByRole('button', { name: /Not Now/i });
      if (await button.isVisible()) {
        await button.click();
        ctx.log("Clicked 'Not Now' button successfully.");
      }
    } catch (e) {
      ctx.log("Could not find login modal, skipping...");
    }

    // Yield to the next behavior (like autoscroll)
    yield* ctx.autoScroll();
  }
}

// Very important: Export the class
module.exports = InstagramLoginFix;