// Developed for https://phd.aydeethegreat.com/a-timeline-of-campus-community-and-national-events-new/

class Timeline
{
  static id = "TimelineJS";

  static runInIframe = true;

  static isMatch() {
    return window.location.href.startsWith("https://www.instagram.com");
  }

  static init() {
    return {};
  }

  async* run(ctx) {
    // 1. Log to the browser console (accessible in DevTools)
    console.log("BEHAVIOR STARTING: Changing background color...");

    // 2. Direct DOM manipulation
    // We use page.evaluate to run code directly in the browser context
    await ctx.page.evaluate(() => {
      document.body.style.backgroundColor = "red";
      document.body.style.border = "10px solid blue";
      
      // Create a floating element so we can see it even if the background is covered
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '100%';
      div.style.height = '100px';
      div.style.zIndex = '99999';
      div.style.backgroundColor = 'yellow';
      div.style.color = 'black';
      div.style.fontSize = '30px';
      div.style.textAlign = 'center';
      div.style.paddingTop = '20px';
      div.innerText = "CUSTOM BEHAVIOR ACTIVE";
      document.body.appendChild(div);
    });

    // 3. Wait for 5 seconds so the screenshot captures the change
    await new Promise(r => setTimeout(r, 5000));

    // 4. Yield control back to the crawler
    yield* ctx.autoScroll();
  }
}