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

/**
 * We export the class with the ID 'Instagram' to match the system's internal name.
 * This increases the chance of the loader preferring this custom version.
 */
class InstagramPostsBehavior {
  static id = "Instagram";

  static isMatch() {
    return !!window.location.href.match(/https:\/\/(www\.)?instagram\.com\//);
  }

  static init() {
    return {
      priority: 1000, // Explicitly set high priority
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

  // --- START OF ORIGINAL LOGIC HELPERS ---

  async waitForNext(ctx, child) {
    if (!child) return null;
    await ctx.Lib.sleep(ctx.Lib.waitUnit);
    if (!child.nextElementSibling) return null;
    return child.nextElementSibling;
  }

  async *iterRow(ctx) {
    const { RestoreState, sleep, waitUnit, xpathNode } = ctx.Lib;
    const root = xpathNode(Q.rootPath);
    if (!root) return;
    let child = root.firstElementChild;
    if (!child) return;
    while (child) {
      await sleep(waitUnit);
      const restorer = new RestoreState(Q.childMatchSelect, child);
      if (restorer.matchValue) {
        yield child;
        child = await restorer.restore(Q.rootPath, Q.childMatch);
      }
      child = await this.waitForNext(ctx, child);
    }
  }

  async *iterSubposts(ctx) {
    const { getState, sleep, waitUnit, xpathNode } = ctx.Lib;
    let next = xpathNode(Q.subpostNextOnlyChevron);
    let count = 1;
    while (next) {
      next.click();
      await sleep(waitUnit * 5);
      yield getState(ctx, `Loading Slide ${++count}`, "slides");
      next = xpathNode(Q.subpostPrevNextChevron);
    }
    await sleep(waitUnit * 5);
  }

  async iterComments(ctx) {
    const { scrollIntoView, sleep, waitUnit, waitUntil, xpathNode } = ctx.Lib;
    const root = xpathNode(Q.commentRoot);
    if (!root) return;
    let child = root.firstElementChild;
    let commentsLoaded = false;
    const getViewRepliesButton = (child) => xpathNode(Q.viewReplies, child);
    while (child) {
      scrollIntoView(child);
      commentsLoaded = true;
      let viewReplies = getViewRepliesButton(child);
      while (viewReplies) {
        const orig = viewReplies.textContent;
        viewReplies.click();
        ctx.state.comments++;
        await sleep(waitUnit * 2.5);
        await waitUntil(() => orig !== viewReplies.textContent, waitUnit);
        viewReplies = getViewRepliesButton(child);
      }
      child = child.nextElementSibling;
      await sleep(waitUnit * 2.5);
    }
    return commentsLoaded;
  }

  async *iterPosts(ctx, next) {
    const { getState, sleep, waitUnit, xpathNode } = ctx.Lib;
    while (next) {
      next.click();
      await sleep(waitUnit * 10);
      yield getState(ctx, "Loading Post", "posts");
      yield* this.handleSinglePost(ctx);
      next = xpathNode(Q.nextPost);
      while (!next && xpathNode(Q.postLoading)) {
        await sleep(waitUnit * 2.5);
      }
    }
  }

  async *handleSinglePost(ctx) {
    const { getState, sleep } = ctx.Lib;
    yield* this.iterSubposts(ctx);
    yield getState(ctx, "Loaded Comments", "comments");
    await Promise.race([this.iterComments(ctx), sleep(this.maxCommentsTime)]);
  }

  // --- MAIN RUN LOOP ---

  async *run(ctx) {
    // 1. Run the visual updates immediately
    yield ctx.Lib.getState(ctx, "Running modified behavior...");

    // 2. Original Logic: Handle single post URLs
    if (window.location.pathname.startsWith("/p/")) {
      yield* this.handleSinglePost(ctx);
      return;
    }

    const { getState, scrollIntoView, sleep, waitUnit, xpathNode } = ctx.Lib;

    // 3. Original Logic: Iterate through the grid
    for await (const row of this.iterRow(ctx)) {
      scrollIntoView(row);
      await sleep(waitUnit * 2.5);
      yield getState(ctx, "Loading Row", "rows");

      const first = xpathNode(Q.firstPostInRow, row);
      yield* this.iterPosts(ctx, first);

      const close = xpathNode(Q.postCloseButton);
      if (close) {
        close.click();
      }
      await sleep(waitUnit * 5);
    }
  }
}