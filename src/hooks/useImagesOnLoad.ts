import { useEffect, useState } from "react";

export function preloadImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export default function useImagesOnLoad(images: string[]) {
  const [loaded, setLoaded] = useState(false);
  //   const [count, setCount] = useState(0);
  //   const [total, setTotal] = useState(images.length);

  useEffect(() => {
    (async () => {
      Promise.all(images.map(preloadImage)).then(() => {
        setLoaded(true);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loaded;
}
