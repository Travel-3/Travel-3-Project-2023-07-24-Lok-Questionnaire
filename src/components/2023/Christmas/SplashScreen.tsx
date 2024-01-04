import { useState, type PropsWithChildren, useLayoutEffect } from "react";
import InView from "../../InView";
import useCounter from "@/hooks/useCounter";
import styled from "styled-components";
import colors from "@/tokens/2023/Christmas/colors";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";

type SplashScreenContainerProps = {
  isLoaded?: boolean;
};

const SplashScreenContainer = styled.div<SplashScreenContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s ease-out;
  user-select: ${(props) => (props.isLoaded ? "none" : "auto")};
  z-index: 99;
  background-color: ${colors.red};
  opacity: ${(props) => (props.isLoaded ? 0 : 1)};
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 900;

  text-shadow:
    -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const FadeOut = styled.div<SplashScreenContainerProps>`
  width: 100%;
  /* transition: opacity 0.3s ease-out; */
  height: 100%;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
`;

const SnowMan = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function SplashScreen({
  // title,
  isLoaded,
  children,
}: { isLoaded?: boolean; title?: string } & PropsWithChildren) {
  const [isEnded, setIsEnded] = useState(false);
  const counter = useCounter(0, 100, 300);

  useLayoutEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsEnded(true);
      }, 300);
    }
  }, [isLoaded]);
  return (
    <>
      {!isEnded && (
        <SplashScreenContainer isLoaded={isLoaded}>
          <LoadingText>Loading {counter}%</LoadingText>
          <SnowMan>
            <AspectRatio ratio={1167 / 414}>
              <Image
                src="/images/2023/Christmas/snow-man.svg"
                alt="Snow man"
                fill
                loading="eager"
              />
            </AspectRatio>
          </SnowMan>
        </SplashScreenContainer>
      )}
      <InView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <FadeOut isLoaded={isLoaded}>{children}</FadeOut>
      </InView>
    </>
  );
}
