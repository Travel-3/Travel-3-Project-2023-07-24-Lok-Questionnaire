// File Path:src/utils/utils.ts

function getPlatform() {
  // Check if we're running on the server or client
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  // Android detection from: http://stackoverflow.com/a/13808003/177710
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Desktop detection
  if (/Windows|Macintosh|Linux|Ubuntu/.test(userAgent)) {
    return "Desktop";
  }

  return "unknown";
}

export { getPlatform };
