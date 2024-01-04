import { useEffect, useState } from "react";

export function getNextImageURL(url: string) {
  if (url.includes(".svg")) return url;

  return `/_next/image?url=${encodeURIComponent(url)}&w=768&q=90`;
}

export function preloadImage(url: string, preload: boolean) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = preload ? getNextImageURL(url) : url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export default function useImagesOnLoad(
  images: string[],
  options: { enabled?: boolean; preload?: boolean } = {
    enabled: true,
    preload: true,
  },
) {
  const [loaded, setLoaded] = useState(false);
  const { enabled = true, preload = true } = options;

  useEffect(() => {
    if (!enabled || loaded) return;

    (async () => {
      Promise.all(images.map((image) => preloadImage(image, preload))).then(
        () => {
          setLoaded(true);
        },
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, preload]);

  return loaded;
}
