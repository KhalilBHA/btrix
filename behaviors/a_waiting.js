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
  async awaitPageLoad(ctx) {
    const { log } = ctx;
    log("Custom Behavior: Running awaitPageLoad...");

    // Colorize H2 elements directly
    // const headings = document.querySelectorAll('h2');
    // headings.forEach(h2 => {
    //   h2.style.setProperty('color', 'red', 'important');
    //   h2.style.setProperty('border', '2px solid red', 'important');
    // });

    // Handle the "Not Now" button
    const el = document.querySelector('svg[aria-label="Close"]');
    if (el) {
      const clickable = el.closest('[role="button"]');
      log("Custom Behavior: Clicked 'Not Now' button.");
      clickable.click();
      // clickable.style.backgroundColor = "red";
      // return `clicked: ${sel}`;
    }
    // const btn = Array.from(document.querySelectorAll('button')).find(el => 
    //   el.textContent.includes('Not Now') || el.textContent.includes('Close')
    // );
    // if (clicked) {
    //   btn.click();
    //   log("Custom Behavior: Clicked 'Not Now' button.");
    // }
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



    const removeModal = () => {
      // const selectors = ['div[role="presentation"]', 'div[role="dialog"]', '.x1n2onr6'];
      // selectors.forEach(selector => {
      //   document.querySelectorAll(selector).forEach(el => {
      //     if (el.textContent.includes("Log In") || el.textContent.includes("Sign Up")) {
      //       el.remove(); // DELETE the element entirely
      //     }
      //   });
      // });
      // // Re-enable scrolling which Instagram disables when modal is up
      // document.body.style.overflow = 'auto';
      // document.documentElement.style.overflow = 'auto';
      const el = document.querySelector('svg[aria-label="Close"]');
      if (el) {
        const clickable = el.closest('[role="button"]');
        log("Custom Behavior: Clicked 'Not Now' button.");
        clickable.click();
        // clickable.style.backgroundColor = "red";
        // return `clicked: ${sel}`;
      }
    };

    // Run it immediately
    removeModal();

    // 2. Set an interval to keep deleting it if it tries to come back
    const interval = setInterval(removeModal, 500);

    // 3. Color your H2s
    document.querySelectorAll('h2').forEach(h2 => h2.style.color = 'red');

    yield ctx.Lib.getState(ctx, "Modal purged and H2s colorized");

    await new Promise(r => setTimeout(r, 10000));
    clearInterval(interval);





    // const { log, Lib } = ctx;
    // log("Custom Behavior: run() loop started");

    // // Inject the red banner

    // const el = document.querySelector('svg[aria-label="Close"]');
    //   if (el) {
    //     const clickable = el.closest('[role="button"]');
    //     log("Custom Behavior: Clicked 'Not Now' button.");
    //     clickable.click();
    //     // clickable.style.backgroundColor = "red";
    //     // return `clicked: ${sel}`;
    //   }

    // // Perform scrolling to ensure content is captured
    // // yield* Lib.autoScroll(ctx);

    // // Final wait to ensure snapshot captures the red elements
    // await new Promise(r => setTimeout(r, 3000));




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