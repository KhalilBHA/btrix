class InstagramDismiss {
  static id = "instagram-dismiss-login";

  // Only run this behavior on Instagram pages
  static isMatch() {
    return window.location.hostname.includes("instagram.com");
  }

  async *run(ctx) {
    const { page } = ctx;
    
    // Wait for the modal to potentially appear
    await new Promise(r => setTimeout(r, 3000));

    const selectors = [
      'div[role="dialog"] button:has-text("Not Now")',
      'div[role="presentation"] button:has-text("Not Now")',
      'svg[aria-label="Close"]',
      'button:has-text("Close")'
    ];

    for (const selector of selectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          console.log(`Clicked dismiss button: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector if not found
      }
    }
    
    // Always finish with an autoscroll to ensure content loads
    yield* ctx.autoScroll();
  }
}

module.exports = InstagramDismiss;
