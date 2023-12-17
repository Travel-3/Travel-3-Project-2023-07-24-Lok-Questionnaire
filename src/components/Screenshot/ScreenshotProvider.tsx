import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  // useEffect,
  // useLayoutEffect,
  useState,
} from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export type ScreenshotContextState = {
  screenshot: string | null;
  take: () => void;
};

export const ScreenshotContext = createContext<ScreenshotContextState>({
  screenshot: null,
  // setScreenshot: () => {},
  take: () => {},
});

export type ScreenshotProviderProps = {
  isReady: boolean;
} & PropsWithChildren;

export default function ScreenshotProvider({
  isReady = false,
  children,
}: ScreenshotProviderProps) {
  const [base64, setBase64] = useState<string | null>(null);

  const build = async () => {
    const node: HTMLElement | null = document.getElementById("canvas");

    if (node === null) return alert("請刷新頁面後再試一次！");

    try {
      const canvas = await html2canvas(node, {
        scale: 3,
        allowTaint: true,
        useCORS: true,
      });
      // alert("請稍候，正在準備圖片中...");
      setBase64(canvas.toDataURL());
      // .then((canvas) => {
      //   alert("請稍候，正在準備圖片中...");
      //   setBase64(canvas.toDataURL());
      // })
      // .catch(() => {
      //   alert("請刷新頁面後再試一次！");
      // });
    } catch (error) {
      alert("請刷新頁面後再試一次！");
    }
  };

  useEffect(() => {
    if (isReady && base64 === null) {
      build();
    }
  }, [isReady]);

  const take = useCallback(() => {
    if (base64 === null) return alert("請刷新頁面後再試一次！");

    return saveAs(base64, `「Travel3 X 粉啵啵送聖誕禮物」活動`);
  }, [base64]);

  return (
    <ScreenshotContext.Provider value={{ screenshot: base64, take }}>
      {children}
    </ScreenshotContext.Provider>
  );
}

export const useScreenshot = () => {
  const { screenshot, take } = useContext(ScreenshotContext);
  return { screenshot, take };
};
