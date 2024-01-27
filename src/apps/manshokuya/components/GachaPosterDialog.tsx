import { LazyMotion, domAnimation, m } from "framer-motion";
import GachaPoster from "./GachaPoster";
import styled from "styled-components";
import { useManshokuya } from "../Provider";
import ScreenshotProvider from "@/components/Screenshot/ScreenshotProvider";
import { useLockedBody } from "usehooks-ts";
import { useEffect } from "react";

export const GachaRewardContainer = styled(m.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default function GachaPosterDialog() {
  const { previewCoupon } = useManshokuya();
  const isOpen = !!previewCoupon;
  const [locked, setLocked] = useLockedBody(false, "root");

  useEffect(() => {
    if (isOpen && !locked) {
      setLocked(true);
    } else if (!isOpen && locked) {
      setLocked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, locked]);

  return (
    <LazyMotion features={domAnimation}>
      {isOpen && (
        <GachaRewardContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
        >
          <ScreenshotProvider
            isReady
            filename="玩扭蛋遊戲送您「萬食屋折扣優惠」和生可樂"
          >
            <GachaPoster />
          </ScreenshotProvider>
        </GachaRewardContainer>
      )}
    </LazyMotion>
  );
}
