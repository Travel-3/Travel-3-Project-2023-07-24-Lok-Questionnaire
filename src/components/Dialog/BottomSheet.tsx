import React, { PropsWithChildren } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

const BottomSheetContainer = styled(m.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
`;

const BottomSheetWrapper = styled.div`
  position: relative;
  padding: 12px;
  padding-top: 24px;
  border-top: 1px solid #000;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  top: -12px;
  z-index: 10;
  left: 0;
  right: 0;
`;

const BottomSheetTitle = styled.div`
  font-size: 27px;
  font-weight: 900;
  color: #fff;
  display: flex;
  justify-content: center;
  text-shadow:
    -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    0px 2px 0px black;
`;

const BottomSheetCloseButton = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  right: 12px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  background-color: #fff;
  justify-content: center;
  border-radius: 8px;
`;

const Overlay = styled(m.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => (props.isOpen ? 99 : -1)};
  user-select: none;
`;

export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        isOpen={isOpen}
        onClick={onClose}
      />

      <BottomSheetContainer
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: isOpen ? "0%" : "100%", opacity: isOpen ? 1 : 0 }}
        exit={{ y: "100%" }}
      >
        <BottomSheetWrapper>
          <BottomSheetHeader>
            <BottomSheetTitle>參與活動</BottomSheetTitle>
            <BottomSheetCloseButton onClick={onClose}>
              <IoCloseSharp />
            </BottomSheetCloseButton>
          </BottomSheetHeader>
          {children}
        </BottomSheetWrapper>
      </BottomSheetContainer>
    </LazyMotion>
  );
}
