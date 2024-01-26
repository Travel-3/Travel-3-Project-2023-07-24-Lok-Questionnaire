import { LazyMotion, domAnimation, m } from "framer-motion";
import GachaPoster from "./GachaPoster";
import styled from "styled-components";
import { useManshokuya } from "../Provider";
import ScreenshotProvider from "@/components/Screenshot/ScreenshotProvider";

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
  return (
    <LazyMotion features={domAnimation}>
      {isOpen && (
        <GachaRewardContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
        >
          <ScreenshotProvider isReady>
            <GachaPoster />
          </ScreenshotProvider>
        </GachaRewardContainer>
      )}
    </LazyMotion>
  );
}
