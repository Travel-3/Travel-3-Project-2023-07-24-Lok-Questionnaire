import { AspectRatio } from "@/components/ui";
import NextImage from "next/image";
import styled from "styled-components";
import ShareToolBar from "../components/ShareToolBar";
import { useProvider } from "../Provider";
import { useMemo } from "react";
import { CHARACTERS } from "../constant";
import ScreenshotProvider from "@/components/Screenshot/ScreenshotProvider";
import Link from "next/link";

const Background = styled.div`
  background: linear-gradient(
    180deg,
    #ff9dd3 0%,
    #ff9dd3 50%,
    #8fadf5 50%,
    #8fadf5 100%
  );
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StarForeground = styled.div`
  background-image: url("/single-dog/svg/stars-2.svg");
  background-repeat: repeat-y;
`;

export default function Page() {
  const { gameScore, reset } = useProvider();

  const character = useMemo(() => {
    return CHARACTERS.find(
      (c) => c.score[0] <= gameScore && c.score[1] >= gameScore,
    );
  }, [gameScore]);
  const handleBack = () => {
    reset();
  };

  return (
    <ScreenshotProvider filename="123" isReady>
      <div className="h-screen relative">
        <Background className="h-full relative" id="canvas">
          <div className="absolute -top-4 -left-4 -right-4">
            <AspectRatio ratio={1169 / 313}>
              <Image
                src="/single-dog/images/top-cloud.png"
                alt="Cloud"
                loading={"eager"}
              />
            </AspectRatio>
          </div>
          <div className="absolute top-6 left-0 right-0">
            <div className="w-1/4 mx-auto">
              <AspectRatio ratio={252 / 96}>
                <Image
                  src="/single-dog/images/travel3.png"
                  alt="Travel3"
                  loading={"eager"}
                />
              </AspectRatio>
            </div>
          </div>
          <div className="h-[10%]"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-center -mt-4">
                <div className="w-2/3">
                  <AspectRatio ratio={621 / 222}>
                    <Image
                      loading={"eager"}
                      src={
                        character?.title || "/single-dog/images/dog-a-title.png"
                      }
                      alt="Travel3"
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="w-[83vw]">
                <AspectRatio ratio={897 / 1004}>
                  <Image
                    src="/single-dog/images/big-dog-house.png"
                    loading={"eager"}
                    alt="Travel3"
                  />
                </AspectRatio>
              </div>
              <div className="flex justify-center absolute left-0 right-0 -bottom-[8%]">
                <div className="w-[72vw]">
                  <AspectRatio ratio={1}>
                    <Image
                      src={character?.image || "/single-dog/images/dog-a.png"}
                      alt="Dog"
                      loading={"eager"}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
            <div className="w-[80vw] py-3">
              <AspectRatio ratio={865 / 258}>
                <Image
                  src={
                    character?.result || "/single-dog/images/dog-result-a.png"
                  }
                  alt="Travel3"
                  loading={"eager"}
                />
              </AspectRatio>
            </div>
            <div className="w-[80vw]">
              <AspectRatio ratio={868 / 152}>
                <Image
                  src={
                    character?.comment || "/single-dog/images/dog-comment-a.png"
                  }
                  alt="Travel3"
                  loading={"eager"}
                />
              </AspectRatio>
            </div>
            <div
              className="relative mx-1 mt-2 cursor-pointer"
              onClick={handleBack}
            >
              <div className="z-10 relative rounded-full py-2 px-3 border-2 border-black bg-white text-center font-bold">
                <span className="text-black font-bold text-lg">回到首頁</span>
              </div>
              <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
            </div>
          </div>

          <StarForeground className="absolute top-0 left-0 bottom-0 right-0 select-none z-0" />
        </Background>
        <div className="absolute -bottom-4 -left-4 -right-4 z-10">
          <AspectRatio ratio={1169 / 497}>
            <NextImage src="/single-dog/svg/big-cloud.svg" alt="Travel3" fill />
          </AspectRatio>
          <div className="absolute top-1/2 -mt-8 left-0 right-0">
            <div className="w-[48vw] mx-auto">
              <AspectRatio ratio={520 / 121}>
                <NextImage
                  src="/single-dog/images/share-title.png"
                  alt=""
                  fill
                />
              </AspectRatio>
            </div>
          </div>
          <div className="absolute left-4 right-4 z-10 bottom-6 justify-between gap-3 flex">
            <ShareToolBar />
          </div>
        </div>
      </div>
    </ScreenshotProvider>
  );
}
