import { AspectRatio } from "@/components/ui";
import NextImage from "next/image";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { useManshokuya } from "../Provider";
import { useScreenshot } from "@/components/Screenshot/ScreenshotProvider";
import useLongPress from "@/hooks/useLongPress";
import { useMemo, useState } from "react";
import TrackLink from "@/components/Track/TrackLink";
import { useUser } from "../hooks";
import { FacebookButton, InstagramButton } from "./Buttons";

const PosterContainer = styled.div`
  background: #fbcb01;
`;

const PosterContent = styled.div`
  border: 4px solid #241716;
  background-color: #eedfb6;
  background-image: url("/images/manshokuya/Background.png");
  background-size: cover;
  background-repeat: repeat;
  color: #241716;
  position: relative;
  width: 100%;
  height: auto;
  /* border-radius: 24px; */
  /* overflow: hidden; */
`;

const ReturnButton = styled.div`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  color: #241716;
  border-radius: 8px;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function GachaPoster() {
  const { setPreviewCoupon, previewCoupon, onAsk4PhoneOpen } = useManshokuya();
  const { take } = useScreenshot();
  const [codeVisible, setCodeVisible] = useState(false);
  const { userId, userPhone } = useUser();

  const events = useLongPress(() => {
    take();
  }, 1000);

  const handleNavigateCode = () => {
    if (previewCoupon?.auth && !userPhone) {
      onAsk4PhoneOpen();
      console.log("ask for phone");
      return;
    }
    setCodeVisible(true);
    const element = document.getElementById("code");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const shareURL = useMemo(() => {
    return `https://travel3exp.xyz/manshokuya?referral=${userId}`;
  }, [userId]);

  return (
    <>
      <PosterContainer className="p-4 flex flex-col w-full min-h-screen">
        <PosterContent className="pb-4 select-none " {...events} id="canvas">
          <div
            className="mt-2"
            style={{
              width: "108%",
              marginLeft: "-4%",
            }}
          >
            <AspectRatio ratio={2048 / 500}>
              <Image
                src="/images/manshokuya/Window.png"
                loading={"eager"}
                alt="Gocha Texture"
              />
            </AspectRatio>
          </div>
          <div className="mt-2 flex-1">
            <AspectRatio ratio={998 / 1217}>
              <Image
                src={previewCoupon?.poster}
                alt="Poster"
                loading={"eager"}
              />
            </AspectRatio>
          </div>
        </PosterContent>
        <div className="flex">
          <div className="px-2 mr-4 mt-4 flex-1">
            <div onClick={handleNavigateCode}>
              <AspectRatio ratio={2048 / 417}>
                <NextImage
                  src="/images/manshokuya/Use-Coupon-Btn.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
            <div className="mt-3" onClick={take}>
              <AspectRatio ratio={2048 / 417}>
                <NextImage
                  src="/images/manshokuya/Share-Poster-Btn.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
            {/* <p className="mt-3 text-center">- 長按保存圖片 -</p> */}
            <div className="w-2/3 mx-auto mt-2">
              <AspectRatio ratio={326 / 33}>
                <NextImage
                  src="/images/manshokuya/Long-Press.svg"
                  fill
                  alt="Long Press"
                />
              </AspectRatio>
            </div>
          </div>
          <div style={{ width: "37%" }} className="-mt-1 relative">
            <AspectRatio ratio={2048 / 2256}>
              <NextImage
                src="/images/manshokuya/Poster-Qrcode.svg"
                fill
                alt="Gocha Texture"
              />
            </AspectRatio>

            <div className="absolute top-0 bottom-0 left-0 right-0">
              <div
                className="w-full h-full"
                style={{
                  padding: "15%",
                  marginTop: "-5%",
                }}
              >
                <QRCodeSVG
                  width={"100%"}
                  height={"100%"}
                  level="M"
                  value={shareURL}
                  bgColor={`#00000000`}
                />
                <p className="mt-2 text-sm text-center">邀請碼</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6" id="code">
          {codeVisible && (
            <PosterContent className="py-3 font-m-plus">
              <p className="text-inherit text-center mb-2 font-bold">
                優惠券代碼
              </p>
              <p className="text-4xl text-center text-inherit font-bold">
                {previewCoupon.code}
              </p>
            </PosterContent>
          )}
        </div>
        <PosterContent className="my-4 ">
          <p className="p-4 ">{previewCoupon.description}</p>
        </PosterContent>
        <div className="mt-1">
          <TrackLink
            game="Manshokuya"
            href="https://www.facebook.com/manshokuya"
          >
            <FacebookButton className="text-center py-1 text-lg font-bold text-outlined">
              萬食屋 Facebook 專頁
            </FacebookButton>
          </TrackLink>
          <TrackLink
            game="Manshokuya"
            href="https://www.instagram.com/manshokuya"
          >
            <InstagramButton className="text-center mt-3 py-1 text-lg font-bold text-outlined">
              萬食屋 Instagram 專頁
            </InstagramButton>
          </TrackLink>
          <a
            target="_blank"
            href="https://www.google.com/maps/dir/?api=1&destination=22.195461562482%2C113.5454338789&fbclid=IwAR0lWw_naHfc5zoSRFfRWjabGszz5dZdk2KZq1dc2zguu-lbVWGBYyArjjw"
          >
            <ReturnButton className="text-center py-1 text-lg font-bold mt-3 bg-white">
              萬食屋地址
            </ReturnButton>
          </a>
          <ReturnButton
            onClick={() => setPreviewCoupon(null)}
            className="text-center py-1 text-lg font-bold mt-3 bg-white"
          >
            返回
          </ReturnButton>
        </div>
      </PosterContainer>
    </>
  );
}
