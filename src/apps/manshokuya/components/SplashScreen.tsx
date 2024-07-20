import InView from "@/components/InView";
import useCounter from "@/hooks/useCounter";
import { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";

const LoadingPage = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: #facd00;
`;

const FadeOut = styled.div<{ isLoaded: boolean }>`
  opacity: ${(props) => (props.isLoaded ? 0 : 1)};
  transition: opacity 0.3s ease-out;
`;

const LoadingText = styled.div`
  font-weight: 900;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
`;

export type SplashScreenProps = {} & PropsWithChildren;

export default function SplashScreen({ children }: SplashScreenProps) {
  const [isEnd, setIsEnd] = useState(false);
  const counter = useCounter(0, 100, 300);

  useEffect(() => {
    if (counter >= 100)
      setTimeout(() => {
        setIsEnd(true);
      }, 500);
  }, [counter]);

  return (
    <>
      <FadeOut isLoaded={isEnd}>
        {!isEnd && (
          <LoadingPage className="flex items-center justify-center z-50">
            <LoadingText className="text-3xl text-white">
              Loading {counter}%
            </LoadingText>
          </LoadingPage>
        )}
      </FadeOut>

      <InView className="w-full h-full">{children}</InView>
    </>
  );
}
