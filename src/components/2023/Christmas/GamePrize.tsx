import TrackLink from "@/components/Track/TrackLink";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import styled from "styled-components";

const GamePrizeContainer = styled.div`
  position: relative;
  /* margin: 0 24px; */
  margin-bottom: 32px;
`;

const GamePrizeTitle = styled.div`
  width: 37%;
  margin: 0 auto;
  transform: translateY(-35%);
`;

const GamePrizeTitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const DecorationContainer = styled.div`
  background-image: url("/images/2023/Christmas/decorator.svg");
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GamePrizeBoxContainer = styled.div`
  margin: 0 32px;
  position: relative;
  border: 1px solid #000;
  background-color: #fbc4bf;
  border-radius: 12px;
  overflow: hidden;
`;

const AboutSponsorContainer = styled.div`
  padding-top: 36px;
  padding-left: 24px;
  width: 44.7%; // percentage size of this box
`;

const ABigCloud = styled.div`
  width: 58%;
  position: absolute;
  right: -20%;
  top: 5%;
`;

const GamePrizeProductAContainer = styled.div`
  margin-left: -12%;
  width: 100%;
  position: relative;
  margin-top: 12px;
`;

const GamePrizeProductADescription = styled.div`
  width: 78%;
`;

const GamePrizeProductAPicture = styled.div`
  position: absolute;
  right: -12%;
  width: 48%;
  bottom: -25%;
`;
const GamePrizeProductBContainer = styled.div`
  transform: translateX(6%);
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  margin-top: 32px;
  z-index: 10;
`;

const GamePrizeProductBDescription = styled.div`
  width: 75%;
`;

const GamePrizeProductBPicture = styled.div`
  position: absolute;
  left: -6%;
  z-index: 10;
  width: 38.8%;
  bottom: -20%;
`;

const GamePrizeChristmasHat = styled.div`
  width: 62.8%;
  margin-left: -8%;
  margin-bottom: -5%;
  margin-top: 24px;
`;

const Calendars = styled.div`
  position: absolute;
  right: 2.5%;
  bottom: 8%;
  z-index: 0;
  /* z-index: 10; */
  width: 38.9%;
`;

export default function GamePrize() {
  return (
    <GamePrizeContainer>
      <GamePrizeTitleContainer>
        <DecorationContainer>
          <GamePrizeTitle>
            <AspectRatio ratio={397 / 102}>
              <Image
                src="/images/2023/Christmas/rewards-title.svg"
                alt="3 cats"
                fill
              />
            </AspectRatio>
          </GamePrizeTitle>
        </DecorationContainer>
      </GamePrizeTitleContainer>
      <GamePrizeBoxContainer>
        <AboutSponsorContainer>
          <TrackLink game="Demo" href="https://www.instagram.com/jessdessin/">
            <AspectRatio ratio={385 / 163}>
              <Image
                src="/images/2023/Christmas/mr-bubbles.png"
                alt="Mr Bubbles"
                fill
                quality={90}
              />
            </AspectRatio>
          </TrackLink>
        </AboutSponsorContainer>
        <ABigCloud>
          <AspectRatio ratio={506 / 227}>
            <Image
              src="/images/2023/Christmas/a-big-cloud.svg"
              alt="Mr Bubbles"
              fill
            />
          </AspectRatio>
        </ABigCloud>
        <GamePrizeProductAContainer>
          <GamePrizeProductADescription>
            <TrackLink
              game="Demo"
              href="https://www.xiaohongshu.com/goods-detail/64522ab9d171fa0001495560?xhsshare=CopyLink&appuid=5aedcb4f4eacab6fa3d03cc5&apptime=1702745269"
            >
              <AspectRatio ratio={672 / 312}>
                <Image
                  src="/images/2023/Christmas/prize-box-01.png"
                  alt="Mr Bubbles"
                  fill
                  quality={90}
                />
              </AspectRatio>
            </TrackLink>
          </GamePrizeProductADescription>
          <GamePrizeProductAPicture>
            <TrackLink
              game="Demo"
              href="https://www.xiaohongshu.com/goods-detail/64522ab9d171fa0001495560?xhsshare=CopyLink&appuid=5aedcb4f4eacab6fa3d03cc5&apptime=1702745269"
            >
              <AspectRatio ratio={414 / 459}>
                <Image
                  src="/images/2023/Christmas/prize-picture-01.png"
                  alt="Mr Bubbles"
                  fill
                  quality={90}
                />
              </AspectRatio>
            </TrackLink>
          </GamePrizeProductAPicture>
        </GamePrizeProductAContainer>

        <GamePrizeProductBContainer>
          <GamePrizeProductBPicture>
            <TrackLink
              game="Demo"
              href="https://www.xiaohongshu.com/goods-detail/65490f2714ec5d0001c792fe?xhsshare=CopyLink&appuid=5aedcb4f4eacab6fa3d03cc5&apptime=1702745226"
            >
              <AspectRatio ratio={334 / 405}>
                <Image
                  src="/images/2023/Christmas/prize-picture-02.png"
                  alt="Mr Bubbles"
                  fill
                  quality={90}
                />
              </AspectRatio>
            </TrackLink>
          </GamePrizeProductBPicture>
          <GamePrizeProductBDescription>
            <TrackLink
              game="Demo"
              href="https://www.xiaohongshu.com/goods-detail/65490f2714ec5d0001c792fe?xhsshare=CopyLink&appuid=5aedcb4f4eacab6fa3d03cc5&apptime=1702745226"
            >
              <AspectRatio ratio={645 / 318}>
                <Image
                  src="/images/2023/Christmas/prize-box-02.png"
                  alt="Mr Bubbles"
                  fill
                  quality={90}
                />
              </AspectRatio>
            </TrackLink>
          </GamePrizeProductBDescription>
        </GamePrizeProductBContainer>
        <GamePrizeChristmasHat>
          <AspectRatio ratio={540 / 282}>
            <Image
              src="/images/2023/Christmas/christmas-hat.png"
              alt="Mr Bubbles"
              fill
              quality={90}
            />
          </AspectRatio>
        </GamePrizeChristmasHat>
        <Calendars>
          <AspectRatio ratio={359 / 352}>
            <Image
              src="/images/2023/Christmas/calendars.png"
              alt="Mr Bubbles"
              fill
              quality={90}
            />
          </AspectRatio>
        </Calendars>
      </GamePrizeBoxContainer>
    </GamePrizeContainer>
  );
}
