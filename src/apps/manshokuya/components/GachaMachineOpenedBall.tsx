import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import { useManshokuya } from "../Provider";
import styled from "styled-components";

export type GachaMachineOpenedBallProps = {
  coupon:
    | {
        id: number;
        name: string;
        poster: string;
        avatar: string;
        ball: string;
        description: string;
        ballOpened: string;
      }
    | undefined;
};

const ViewContentButton = styled.div`
  border-radius: 40px;
  background-color: #f0f0f0;
  border: 1px solid #603813;
  color: #603813;
  box-shadow: 0px 4px 0px #603813;
`;

export default function GachaMachineOpenedBall({
  coupon,
}: GachaMachineOpenedBallProps) {
  const { view } = useManshokuya();

  const handleView = () => {
    view(coupon);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <AspectRatio ratio={2048 / 2052}>
          <Image src="/images/manshokuya/Light.svg" fill alt="Gocha Texture" />
        </AspectRatio>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div
            className="relative"
            style={{
              width: "60%",
            }}
          >
            <div
              style={{
                marginLeft: "-10%",
                marginTop: "-5%",
              }}
            >
              <AspectRatio ratio={2048 / 1949}>
                <Image
                  src={coupon?.ballOpened ?? ""}
                  fill
                  alt="Gocha Texture"
                />
              </AspectRatio>
            </div>
            <div className="absolute w-full flex justify-center top-full">
              <div
                className="w-1/2"
                style={{
                  marginTop: "-8%",
                }}
              >
                <ViewContentButton
                  onClick={handleView}
                  className="text-center text-md py-1 px-2 font-bold"
                >
                  查看內容
                </ViewContentButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl -mt-3 text-center font-bold">{coupon?.name}</div>
      <div className="text-md text-center pb-4">{coupon?.description}</div>
    </div>
  );
}
