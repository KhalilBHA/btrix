const subpostNextOnlyChevron =
  "//article[@role='presentation']//div[@role='presentation']/following-sibling::button";

const Q = {
  rootPath: "//main//div/div[2]/div/div/div/div",
  childMatchSelect: "string(.//a[starts-with(@href, '/')]/@href)",
  childMatch: "child::div[.//a[@href='$1']]",
  firstPostInRow: "div[1]//a",
  postCloseButton: "//div[last() - 2]//div[@role='button']",
  nextPost: "//button[.//*[local-name() = 'svg' and @aria-label='Next']]",
  postLoading: "//*[@aria-label='Loading...']",
  subpostNextOnlyChevron,
  subpostPrevNextChevron: subpostNextOnlyChevron + "[2]",
  commentRoot:
    "//article[@role='presentation']/div[1]/div[2]//ul/div[last()]/div/div",
  viewReplies: "ul/li//button[span[not(count(*)) and contains(text(), '(')]]",
  loadMore: "//button[span[@aria-label]]",
  pageLoadWaitUntil: "//main",
};

// Use the exact ID 'Instagram' to attempt to override the built-in one
export class InstagramPostsBehavior {
  static id = "Instagram";

  static isMatch() {
    return !!window.location.href.match(/https:\/\/(www\.)?instagram\.com\//);
  }

  static init() {
    return {
      // Priority flag is respected by some behavior loaders to resolve conflicts
      priority: 1000,
      state: {
        posts: 0,
        slides: 0,
        rows: 0,
        comments: 0,
      },
    };
  }

  constructor() {
    this.maxCommentsTime = 10000;
    this.postOnlyWindow = null;
  }

  async applyCustomStyles(ctx) {
    await ctx.page.evaluate(() => {
      // Turn all H2 headers red and add a thick border to the page
      document.querySelectorAll('h2').forEach(el => el.style.color = 'red');
      document.body.style.border = "10px solid red";

      // Add a status banner to the top
      const banner = document.createElement('div');
      banner.style = "position:fixed;top:0;width:100%;background:red;color:white;text-align:center;z-index:9999;padding:5px;font-weight:bold;";
      banner.innerText = "CUSTOM BEHAVIOR ACTIVE: CLICKING DISMISS...";
      document.body.appendChild(banner);
    });
  }

  async dismissLoginPopup(ctx) {
    await ctx.page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(el =>
        el.textContent.includes('Not Now') || el.textContent.includes('Close')
      );
      if (btn) btn.click();
    });
  }

  // ... (Keep your existing helper methods: waitForNext, iterRow, etc.)

  async *run(ctx) {
    // 1. Initial visual feedback and popup dismissal
    yield ctx.Lib.getState(ctx, "Injecting custom styles and dismissing popups");
    await this.applyCustomStyles(ctx);
    await this.dismissLoginPopup(ctx);

    // 2. Handle single post view
    if (window.location.pathname.startsWith("/p/")) {
      yield* this.handleSinglePost(ctx);
      return;
    }

    // 3. Main Row Iteration Logic
    const { getState, scrollIntoView, sleep, waitUnit, xpathNode } = ctx.Lib;

    for await (const row of this.iterRow(ctx)) {
      scrollIntoView(row);
      await sleep(waitUnit * 2.5);

      // Update color of the current row to show progress
      await ctx.page.evaluate((r) => {
        r.style.backgroundColor = 'red';
      }, row);

      yield getState(ctx, "Loading Row", "rows");
      const first = xpathNode(Q.firstPostInRow, row);
      yield* this.iterPosts(ctx, first);

      const close = xpathNode(Q.postCloseButton);
      if (close) close.click();
      await sleep(waitUnit * 5);
    }
  }

  // (Include the rest of your class methods here...)
}