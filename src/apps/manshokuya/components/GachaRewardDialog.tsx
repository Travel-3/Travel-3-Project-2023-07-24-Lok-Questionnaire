import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Overlay } from "@/components/Dialog/BaseBottomSheet";
import { IoCloseSharp } from "react-icons/io5";
import GachaMachineOpenedBall from "./GachaMachineOpenedBall";
import { useManshokuya } from "../Provider";
import { useMemo } from "react";
import { Coupons } from "../constant";

export const GachaRewardContainer = styled(m.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
`;

export const GachaRewardHeader = styled.div`
  width: 100%;
  z-index: 10;
  bottom: 91%;
  /* transform: translateY(-50%); */
  position: absolute;
  /* top: -12px; */
`;

export const GachaRewardWrapper = styled(m.div)`
  background: #eedfb6;
  border-radius: 40px;
  border: 4px solid #241716;
  box-shadow: 8px 8px 0px #241716;
  position: relative;
  background-image: url("/images/manshokuya/Background.png");
  background-size: cover;
  background-repeat: repeat;
  min-height: 50vh;
`;

const GachaRewardCloseButton = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  right: 12px;
  position: absolute;
  border-radius: 100%;
  top: 0px;
  bottom: 0px;
  /* background-color: #fff; */
  justify-content: center;
`;

export const GachaRewardDialogWrapper = styled.div``;

export type GachaRewardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GachaRewardDialog({
  isOpen,
  onClose,
}: GachaRewardDialogProps) {
  const { reward } = useManshokuya();

  const coupon = useMemo(() => {
    return reward && Coupons.find((coupon) => coupon.id === reward.id);
  }, [reward]);

  return (
    <LazyMotion features={domAnimation}>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          isOpen={isOpen}
          onClick={onClose}
        />
      )}

      {isOpen && (
        <GachaRewardContainer className="flex flex-col justify-center items-center">
          <div className="relative w-full max-w-lg mx-auto">
            <GachaRewardHeader>
              <AspectRatio ratio={2048 / 857}>
                <Image
                  src="/images/manshokuya/Cat-Header.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
              <GachaRewardCloseButton
                onClick={onClose}
                className="cursor-pointer"
              >
                <IoCloseSharp size={20} color="#fff" />
              </GachaRewardCloseButton>
            </GachaRewardHeader>
            <GachaRewardWrapper
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: isOpen ? 1 : 0.5, opacity: isOpen ? 1 : 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className=" overflow-hidden mx-4"
            >
              <div className="p-6">
                <div className="-mb-12 relative z-10 mt-3">
                  <AspectRatio ratio={2048 / 341}>
                    <Image
                      src="/images/manshokuya/Congrats-Title.png"
                      fill
                      alt="Gocha Texture"
                    />
                  </AspectRatio>
                </div>

                <GachaMachineOpenedBall
                  coupon={{
                    ...coupon,
                    code: reward.code,
                  }}
                />
              </div>
            </GachaRewardWrapper>
            <div className="absolute bottom-0 flex justify-center w-full">
              <div style={{ width: "50%", transform: "translateY(50%)" }}>
                <div className="w-full" onClick={onClose}>
                  <AspectRatio ratio={2048 / 669}>
                    <Image
                      src="/images/manshokuya/Confirm-Btn.png"
                      fill
                      alt="Gocha Texture"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </GachaRewardContainer>
      )}
    </LazyMotion>
  );
}
