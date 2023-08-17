// File Path:src/utils/utils.ts

/**
 * Get the platform type based on the user agent.
 * @returns {string} The platform type: "iOS", "Android", "Desktop", or "unknown".
 */
function getPlatform() {
  // Check if we're running on the server or client
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "iOS";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/Windows|Macintosh|Linux|Ubuntu/.test(userAgent)) {
    return "Desktop";
  }

  return "unknown";
}

export { getPlatform };
