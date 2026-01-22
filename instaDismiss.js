module.exports = async ({ page }) => {
  try {
    console.log("Instagram behavior loaded");

    // Give page time to load
    await page.waitForTimeout(10000);

    const selectors = [
      'button:has-text("Not Now")',
      'button:has-text("Not now")',
      'button:has-text("Cancel")',
      'button[aria-label="Close"]',
      'svg[aria-label="Close"]'
    ];

    for (let i = 0; i < 5; i++) {
      for (const sel of selectors) {
        const el = await page.$(sel);
        if (el) {
          await el.click();
          console.log("Closed popup using:", sel);
          return;
        }
      }
      await page.waitForTimeout(2000);
    }

    console.log("No popup detected");
  } catch (e) {
    console.log("Behavior error:", e.message);
  }
};
