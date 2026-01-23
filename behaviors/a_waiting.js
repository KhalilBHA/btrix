// Developed for https://phd.aydeethegreat.com/a-timeline-of-campus-community-and-national-events-new/

class Instagram {
  static id = "Instagram";

  static runInIframe = true;

  static isMatch() {
    return true;
  }

  static init() {
    return {
      // High priority values (usually > 100) tell the engine 
      // to prefer this over default behaviors.
      priority: 1000, 
      state: "initializing",
      opts: { override: true }
    }
  }

  async* run(ctx) {
    // Keep it visible for 5 seconds for the crawler to "see" it
    console.log("Using custom behavior");
    await new Promise(r => setTimeout(r, 50000));
  }
}