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
    document.body.style.border = "10px solid deepskyblue";

    // 2. The Logic: Try to find and click the 'Not Now' button
    // We use a variety of common Instagram selectors
    const selectors = [
      'button:has-text("Not Now")',
      'div[role="dialog"] button:has(svg[aria-label="Close"])',
      'svg[aria-label="Close"]',
      'button._a9--._ap36._a9_1' // Common internal class name
    ];

    let found = false;

    // Search for the buttons
    for (const selector of selectors) {
      try {
        // Find elements by text or CSS
        let element;
        if (selector.includes(':has-text')) {
          const text = selector.match(/"(.*?)"/)[1];
          element = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes(text));
        } else {
          element = document.querySelector(selector);
        }

        if (element) {
          console.log(`Target found: ${selector}. Clicking...`);
          element.click();
          found = true;

          // 3. Visual Feedback: Change text color to Pink if successful
          document.querySelectorAll('*').forEach(el => el.style.color = 'deeppink');
          break;
        }
      } catch (e) {
        console.error("Error checking selector: " + selector, e);
      }
    }

    if (!found) {
      console.warn("No login modal buttons were found with the current selectors.");
      // Force background red so you know the script ran but failed to find the target
      document.body.style.backgroundColor = "red";
    }

    console.log("--- Test Complete ---");
  }
}