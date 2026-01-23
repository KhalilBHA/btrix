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
    console.log("--- Starting Behavior Test ---");

    // 1. Visual Feedback: Change background color to verify execution
    const headings = document.querySelectorAll('h2');

    if (headings.length === 0) {
      console.warn("No h2 elements found on this page!");
      return;
    }

    headings.forEach(h2 => {
      h2.style.color = 'red';
      h2.style.border = '2px solid red'; // Making it extra visible
      h2.innerText += " (Colorized!)";
    });

    console.log(`Success: Colorized ${headings.length} headings.`);
  }
}