// Developed for https://phd.aydeethegreat.com/a-timeline-of-campus-community-and-national-events-new/

class Colorize {
  static id = "ColorizeJS";

  static runInIframe = true;

  static isMatch() {
    return window.location.href.startsWith("https://www.instagram.com");
  }

  static init() {
    return {};
  }

  async* run(ctx) {
    const { page } = ctx;

    await page.evaluate(() => {
      const div = document.createElement('div');
      div.id = 'browsertrix-debug-overlay';
      div.innerHTML = '<h1>CRAWL ACTIVE: Custom Script Running</h1>';
      
      // High-visibility styling
      Object.assign(div.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'yellow',
        color: 'black',
        textAlign: 'center',
        zIndex: '9999999',
        borderBottom: '5px solid black',
        padding: '10px'
      });

      document.body.appendChild(div);
    });

    // Keep it visible for 5 seconds for the crawler to "see" it
    await new Promise(r => setTimeout(r, 50000));

    yield* ctx.autoScroll();
  }
}