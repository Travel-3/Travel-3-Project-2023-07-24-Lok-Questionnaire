import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import styled from "styled-components";
import GameButton from "./GameButton";
import { useScreenshot } from "@/components/Screenshot/ScreenshotProvider";
import copy from "copy-to-clipboard";
import { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useDeviceID } from "@/hooks/useDeviceID";

const GreenBackground = styled.div`
  background-color: #009744;
  position: relative;
`;

const HowToShareTitleDecoration = styled.div`
  width: 100%;
`;

const HowToShareTitleContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const HowToShareTitle = styled.div`
  width: 34.7%;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  margin-top: -1.5%;
`;

const HowToShareFlowContainer = styled.div`
  border-top: 1px solid #000;
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const HowToShareButtonGroup = styled.div`
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
  padding-bottom: 16px;
`;

function HowToShare() {
  const [status, setStatus] = useState({
    isCopied: false,
    isShared: false,
    isTaken: false,
  });
  const { take } = useScreenshot();
  const id = useDeviceID();
  const shareUrl = `https://travel3exp.xyz?referral=${id}`;

  const updateStatus = useCallback((key: string, value: boolean) => {
    setStatus((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleTakeScreenshot = () => {
    take();
    updateStatus("isTaken", true);
  };

  const handleCopy = useCallback(() => {
    copy(shareUrl);
    updateStatus("isCopied", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareUrl]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        text: `「Travel3 X 粉啵啵送聖誕禮物」活動`,
        url: shareUrl,
      });
      updateStatus("isShared", true);
      alert("「Travel3 X 粉啵啵送聖誕禮物」活動分享成功!");
    } catch (error) {
      alert(
        "將您的專屬聖誕貓貓結果分享到您的Facebook和Instagram帳戶上，讓您的朋友們也參與其中。",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareUrl]);

  return (
    <HowToShareFlowContainer>
      <GreenBackground>
        <HowToShareTitleContainer>
          <HowToShareTitleDecoration>
            <AspectRatio ratio={1135 / 69}>
              <Image
                src={`/images/2023/Christmas/decorator.svg`}
                alt={`How to share`}
                fill
              />
            </AspectRatio>
          </HowToShareTitleDecoration>
          <HowToShareTitle>
            <AspectRatio ratio={375 / 76}>
              <Image
                src={`/images/2023/Christmas/how-to-share-title.svg`}
                alt={`How to share`}
                fill
              />
            </AspectRatio>
          </HowToShareTitle>
        </HowToShareTitleContainer>
        <HowToShareButtonGroup>
          <GameButton color="red" onClick={handleTakeScreenshot}>
            {status.isTaken ? (
              <>
                <TiTick />
                截圖
              </>
            ) : (
              "螢幕截圖"
            )}
          </GameButton>
          <GameButton color="orange" onClick={handleCopy}>
            {status.isCopied ? (
              <>
                <TiTick />
                複製
              </>
            ) : (
              "複製連結"
            )}
          </GameButton>
          <GameButton color="blue" onClick={handleShare}>
            {status.isShared ? (
              <>
                <TiTick />
                分享
              </>
            ) : (
              "前往分享"
            )}
          </GameButton>
        </HowToShareButtonGroup>
      </GreenBackground>
    </HowToShareFlowContainer>
  );
}

export default HowToShare;
