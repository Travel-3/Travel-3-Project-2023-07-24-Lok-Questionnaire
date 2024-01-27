import React, { PropsWithChildren, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import { useLockedBody } from "usehooks-ts";

const BottomSheetContainer = styled(m.div)`
  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100; */
  z-index: 100;
`;

const BottomSheetWrapper = styled.div`
  position: relative;
  /* padding: 12px;
  padding-top: 24px; */
  border-radius: 12px 12px 0px 0px;
  /* background-color: #fff; */
  /* border-top: 1px solid #000; */
  white-space: pre-wrap;
  overflow-y: scroll;
  max-height: 88dvh;
`;

const BottomSheetHeader = styled.div`
  /* position: absolute; */
  /* top: -12px; */
  /* z-index: 10; */
  /* left: 0;
  right: 0; */
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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  /* background-color: #fff; */
  justify-content: center;
  /* border-radius: 8px; */
`;

export const Overlay = styled(m.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${(props) => (props.isOpen ? 99 : 0)};
  user-select: none;
`;

export type BaseBottomSheetProps = {
  title: string;
  isOpen: boolean;
  overlay?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

export default function BaseBottomSheet({
  isOpen,
  onClose,
  overlay = true,
  title,
  children,
}: BaseBottomSheetProps) {
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
      {isOpen && overlay && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          isOpen={isOpen}
          onClick={onClose}
        />
      )}

      <BottomSheetContainer
        className="fixed bottom-0 left-0 right-0 box-shadow-2xl"
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: isOpen ? "0%" : "100%", opacity: isOpen ? 1 : 0.5 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.2 }}
      >
        <BottomSheetWrapper className="p-3 bg-white border-t">
          <BottomSheetHeader className="flex justify-between py-1 pb-2">
            <BottomSheetTitle>{title}</BottomSheetTitle>
            <BottomSheetCloseButton
              onClick={onClose}
              className="cursor-pointer bg-gray-100 rounded-full text-black"
            >
              <IoCloseSharp size={20} />
            </BottomSheetCloseButton>
          </BottomSheetHeader>
          {children}
        </BottomSheetWrapper>
      </BottomSheetContainer>
    </LazyMotion>
  );
}
