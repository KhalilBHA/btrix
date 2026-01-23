// Developed for https://phd.aydeethegreat.com/a-timeline-of-campus-community-and-national-events-new/

class A_WaitingJS {
  static id = "A_WaitingJS";

  static runInIframe = true;

  static isMatch() {
    return true;
  }

  static init() {
    return {};
  }

  async* run(ctx) {
    // Keep it visible for 5 seconds for the crawler to "see" it
    await new Promise(r => setTimeout(r, 50000));
  }
}