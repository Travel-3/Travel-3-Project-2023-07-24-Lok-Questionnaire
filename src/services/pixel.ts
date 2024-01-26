export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const PageView = () => {
  (window as any).fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const fireEvent = (name: string, options = {}) => {
  (window as any).fbq("track", name, options);
};
