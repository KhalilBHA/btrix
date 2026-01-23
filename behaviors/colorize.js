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
    const overlay = document.createElement('div');
  
  // Set the content
  overlay.innerHTML = '<strong>BEHAVIOR STATUS:</strong> Injection Successful! 🚀';

  // Apply styles to force it to the front
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff0055',
    color: 'white',
    padding: '20px 40px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    zIndex: '2147483647', // Maximum possible z-index
    pointerEvents: 'none', // Allows clicking through it if needed
    textAlign: 'center',
    fontFamily: 'sans-serif'
  });

  document.body.appendChild(overlay);
  console.log("Overlay injected successfully.");
  }
}