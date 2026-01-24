class Instagram {
  static id = "Instagram";

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

    console.log("WARCTest: awaitPageLoad started");

    // Inject an image into the page, which will force the crawler to request it
    const img = document.createElement("img");
    img.src = "https://www.sbsinformatique.com/c/4-category_default/gaming-pc.jpg";
    img.alt = "WARC Test Image";

    // Add it to the DOM
    document.body.appendChild(img);

    console.log("WARCTest: image added -> should appear in WARC");

    // Wait a few seconds so the request has time to fire
    await new Promise(r => setTimeout(r, 5000));
    // const start = Date.now();
    // const timeout = 20000;

    // while (Date.now() - start < timeout) {

    //   await this.evaluate(() => {
    //     if (!document.getElementById("__custom_banner")) {
    //       const banner = document.createElement("div");
    //       banner.id = "__custom_banner";
    //       banner.textContent = "CUSTOM BEHAVIOR ACTIVE";
    //       banner.style.position = "fixed";
    //       banner.style.top = "0";
    //       banner.style.left = "0";
    //       banner.style.zIndex = "999999";
    //       banner.style.background = "red";
    //       banner.style.color = "white";
    //       banner.style.padding = "10px";
    //       document.body.appendChild(banner);
    //     }
    //   });

    //   // Exit early so Browsertrix doesn't timeout
    //   return;
    // }
  }

  async* run(ctx) {
    // Keep it visible for 5 seconds for the crawler to "see" it
    console.log("Using custom behavior");
    // await new Promise(r => setTimeout(r, 5000));

    console.log("Instagram custom behavior loaded");
    // const el = document.querySelector('svg[aria-label="Close"]');
    // if (el) {
    //   const clickable = el.closest('[role="button"]');
    //   clickable.style.backgroundColor = "red";
    //   await new Promise(r => setTimeout(r, 5000));
    //   // clickable.click();
    // }
    // const banner = document.createElement("div");
    // banner.textContent = "CUSTOM BEHAVIOR ACTIVE";
    // banner.style.position = "fixed";
    // banner.style.top = "0";
    // banner.style.left = "0";
    // banner.style.zIndex = "999999";
    // banner.style.background = "red";
    // banner.style.color = "white";
    // banner.style.padding = "10px";
    // document.body.appendChild(banner);

    // try {
    //   const selectors = [
    //     'button:has-text("Not Now")',
    //     'button:has-text("Not now")',
    //     'button:has-text("Cancel")',
    //     'button[aria-label="Close"]',
    //     'svg[aria-label="Close"]',
    //     'div[role="dialog"] button'
    //   ];

    //   const el = document.querySelector('svg[aria-label="Close"]');
    //   if (el) {
    //     const clickable = el.closest('[role="button"]');
    //     // clickable.click();
    //     clickable.style.backgroundColor = "red";
    //     // return `clicked: ${sel}`;
    //   }
    //   // for (const sel of selectors) {
    //   //   const el = document.querySelector(sel);
    //   //   if (el) {
    //   //     const clickable = el.closest('[role="button"]');
    //   //     // clickable.click();
    //   //     clickable.style.backgroundColor = "red";
    //   //     return `clicked: ${sel}`;
    //   //   }
    //   // }

    //   // Wait 1s between retries
    //   await new Promise(r => setTimeout(r, 1000));
    // } catch (e) {
    //   console.log("Behavior error:", e.message);
    // }

    // Allow crawler to continue
    await new Promise(r => setTimeout(r, 2000));
  }
}