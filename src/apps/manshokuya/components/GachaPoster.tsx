import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { useManshokuya } from "../Provider";
import { useScreenshot } from "@/components/Screenshot/ScreenshotProvider";
import useLongPress from "@/hooks/useLongPress";

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
  /* overflow: hidden; */
`;

const ReturnButton = styled.div`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  background-color: #fff;
  color: #241716;
  border-radius: 8px;
`;
export default function GachaPoster() {
  const { setPreviewCoupon, previewCoupon } = useManshokuya();
  const { take } = useScreenshot();

  const events = useLongPress(() => {
    take();
  }, 1000);

  console.log("previewCoupon", previewCoupon);

  const handleNavigateCode = () => {
    const element = document.getElementById("code");
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
                src="/images/manshokuya/Window.svg"
                fill
                alt="Gocha Texture"
              />
            </AspectRatio>
          </div>
          <div className="mt-2 flex-1">
            <AspectRatio ratio={998 / 1217}>
              <Image src={previewCoupon?.poster} fill alt="Poster" />
            </AspectRatio>
          </div>
        </PosterContent>
        <div className="flex">
          <div className="px-2 mr-4 mt-4 flex-1">
            <div onClick={handleNavigateCode}>
              <AspectRatio ratio={2048 / 417}>
                <Image
                  src="/images/manshokuya/Use-Coupon-Btn.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
            <div className="mt-3" onClick={take}>
              <AspectRatio ratio={2048 / 417}>
                <Image
                  src="/images/manshokuya/Share-Poster-Btn.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
            {/* <p className="mt-3 text-center">- 長按保存圖片 -</p> */}
            <div className="w-2/3 mx-auto mt-2">
              <AspectRatio ratio={326 / 33}>
                <Image
                  src="/images/manshokuya/Long-Press.svg"
                  fill
                  alt="Long Press"
                />
              </AspectRatio>
            </div>
          </div>
          <div style={{ width: "37%" }} className="-mt-1 relative">
            <AspectRatio ratio={2048 / 2256}>
              <Image
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
                  level="H"
                  value={`1234567`}
                  bgColor={`#00000000`}
                />
                <p className="mt-2 text-sm text-center">邀請碼</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6" id="code">
          <PosterContent className="py-3">
            <p className="text-inherit text-center mb-2 font-bold">
              優惠券代碼
            </p>
            <p className="text-4xl text-center text-inherit font-bold">PV573</p>
          </PosterContent>
        </div>
        <div className="mt-4">
          <ReturnButton
            onClick={() => setPreviewCoupon(null)}
            className="text-center py-1 text-lg font-bold"
          >
            返回
          </ReturnButton>
        </div>
      </PosterContainer>
    </>
  );
}
