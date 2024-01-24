import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import GachaBall, { BaseGachaBall } from "./GachaBall";
import GachaMachineStartButton from "./GachaMachineStartButton";
import { useManshokuya } from "../Provider";
import { useSpring } from "framer-motion";

export const GachaMachinePanelContainer = styled.div`
  position: absolute;
  top: 23.15%;
  left: 10.3%;
  right: 9.7%;
  bottom: 28.44%;
`;

export function GachaMachinePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.clientWidth);
    }
  }, []);

  const balls = useMemo(() => {
    return [5, 5, 3].map((size, index) => {
      const y = Math.floor(Math.random() * 5) + 10 * index;
      const rotate = Math.floor(Math.random() * 360);

      return (
        <>
          {Array.from({ length: size }).map((_, rowIndex) => {
            const ballType = Math.floor(Math.random() * 4) + 1;

            return (
              <GachaBall
                key={`${index}_${rowIndex}`}
                y={y}
                type={ballType as 1 | 2 | 3 | 4}
                x={
                  Math.floor((Math.random() * 100) / size) +
                  (rowIndex * 100) / size
                }
                rotation={rotate}
                width={containerWidth / 4}
              />
            );
          })}
        </>
      );
    });
  }, [containerWidth]);

  return (
    <GachaMachinePanelContainer ref={ref}>{balls}</GachaMachinePanelContainer>
  );
}

export default function GachaMachine() {
  const { numOfOpportunitie, reward } = useManshokuya();
  // const y = useMotionValue(-100)
  const y = useSpring(-100);
  const handleNavigateReward = () => {
    window.scrollBy({
      top: document.querySelector("#balls")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "web.dev",
          text: "Check out web.dev.",
          url: "https://web.dev/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  useEffect(() => {
    if (reward.id) {
      y.set(0);
    }

    setTimeout(() => {
      y.jump(-100);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward]);

  return (
    <div className="relative">
      <AspectRatio ratio={2048 / 2654}>
        <Image src="/images/manshokuya/Machine.png" fill alt="Gocha Machine" />
      </AspectRatio>
      <GachaMachinePanel />
      <div
        className="absolute"
        style={{
          left: "10%",
          right: "10%",
          bottom: "5%",
          top: "75%",
        }}
      >
        <div className="flex h-full">
          <div
            className="relative"
            style={{
              width: "40%",
            }}
          >
            <AspectRatio ratio={2048 / 1792}>
              <Image
                src="/images/manshokuya/Out-Box.png"
                fill
                alt="Gocha Texture"
              />
            </AspectRatio>
            <div className="absolute top-0 left-0 bottom-0 right-0 p-0">
              <div className="overflow-hidden w-full h-full flex justify-center items-center">
                <BaseGachaBall type={1} width={"60%"} y={y} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="flex flex-col flex-1">
              <div className="flex">
                <div
                  style={{
                    width: "45.5%",
                  }}
                  onClick={handleShare}
                >
                  <AspectRatio ratio={2048 / 604}>
                    <Image
                      src="/images/manshokuya/Gain-Chance.png"
                      fill
                      alt="Gocha Texture"
                    />
                  </AspectRatio>
                </div>
                <div
                  className="relative bg-gray-200 border-2 text-sm"
                  style={{
                    width: "54.5%",
                  }}
                >
                  剩餘<span>{numOfOpportunitie}</span>次機會
                  {/* <AspectRatio ratio={2048 / 556}>
                    <Image
                      src="/images/manshokuya/Chance-Label.png"
                      fill
                      alt="Gocha Texture"
                    />
                  </AspectRatio>
                  <div
                    className="absolute top-0 bototm-0 flex items-center font-bold h-full"
                    style={{ left: "38%" }}
                  >
                    <span>{numOfOpportunitie}</span>
                  </div> */}
                </div>
              </div>
              <div className="relative">
                <AspectRatio ratio={2048 / 1218}>
                  <Image
                    src="/images/manshokuya/Coin-Machine.png"
                    fill
                    alt="Gocha Texture"
                  />
                </AspectRatio>
                <div
                  className="absolute top-0 right-0 bottom-0"
                  style={{
                    width: "50%",
                  }}
                >
                  <GachaMachineStartButton />
                </div>
              </div>
            </div>
            <div
              style={{
                width: "17.5%",
              }}
              onClick={handleNavigateReward}
            >
              <AspectRatio ratio={2048 / 7009}>
                <Image
                  src="/images/manshokuya/My-Ball-Btn.png"
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
