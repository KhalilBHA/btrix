class InstaDismiss {
    // required: an id for this behavior, will be displayed in the logs
    // when the behavior is run.
    static id = "instagram-dismiss";

    // required: a function that checks if a behavior should be run
    // for a given page.
    // This function can check the DOM / window.location to determine
    // what page it is on. The first behavior that returns 'true'
    // for a given page is used on that page.
    static isMatch() {
        return !!window.location.href.match(/https:\/\/(www\.)?instagram\.com\//);
    }

    // required: typically should be left as-is.
    // must return an object, with optional fields:
    //   state: passes fixed state to behavior context (ctx)
    //   opts: passes options to behavior context (ctx). this may be
    // useful when injecting behaviors directly into the browser, and
    // provides a basis for passing options to custom behaviors from
    // browsertrix and archiveweb.page in the future.
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
        // This ensures we don't try to click before the DOM is ready
        while (!document.body) {
            await new Promise(r => setTimeout(r, 100));
        }
    }

    // required: the main behavior async iterator, which should yield for
    // each 'step' in the behavior.
    // When the iterator finishes, the behavior is done.
    // (See below for more info)
    async* run(ctx) {
        ctx.log("hello world 1")
        // 1. Report starting status
        yield ctx.Lib.getState(ctx, "starting instagram login dismissal");

        const { page } = ctx;

        // 2. Small delay to let the modal pop up
        await new Promise(r => setTimeout(r, 3000));

        // 3. Define the "Not Now" or "Close" selectors
        const selectors = [
            'button:has-text("Not Now")',
            'div[role="dialog"] button:has(svg[aria-label="Close"])',
            'svg[aria-label="Close"]'
        ];

        let dismissed = false;

        for (const selector of selectors) {
            try {
                const element = await page.$(selector);
                if (element && await element.isVisible()) {
                    await element.click();
                    dismissed = true;
                    yield ctx.Lib.getState(ctx, `clicked dismiss button: ${selector}`);
                    break;
                }
            } catch (e) {
                // Selector not found on this attempt
            }
        }

        if (!dismissed) {
            yield ctx.Lib.getState(ctx, "login modal not found, moving to scroll");
        }

        // 4. Critical: Yield the autoscroll to actually capture the page content
        yield ctx.Lib.getState(ctx, "starting autoscroll");
        yield* ctx.autoScroll();

        yield ctx.Lib.getState(ctx, "behavior finished");
    }
}