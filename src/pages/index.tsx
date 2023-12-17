import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import colors from "@/tokens/2023/Christmas/colors";
import styled from "styled-components";
import Image from "next/image";
import App from "@/components/App";
import Link from "next/link";
import { AspectRatio } from "@/components/ui";
import GamePrize from "@/components/2023/Christmas/GamePrize";
import SplashScreen from "@/components/2023/Christmas/SplashScreen";
import { useQuery } from "@tanstack/react-query";
import { useDeviceID } from "@/hooks/useDeviceID";
import axios from "axios";
import useParams from "@/hooks/useParams";
import { useEffect } from "react";
import Track from "@/utils/track";
import { useRouter } from "next/router";
import Head from "next/head";

const RedBackground = styled.div`
  width: 100%;
  background-color: ${colors.red};
`;

const GreenBackground = styled.div`
  width: 100%;
  background-color: ${colors.green};
`;

const DecorationContainer = styled.div`
  background-image: url("/images/2023/Christmas/decorator.svg");
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    transform: translateY(-30%);
  }
`;

const ThreeCatsContainer = styled.div`
  position: relative;
  margin: 0 24px;
  margin-top: -5%;
`;

const ThreeCatsPosition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -13%;
`;

const MySteryBoxContainer = styled.div`
  position: relative;
  margin: 0 24px;
`;
const MySteryBoxPosition = styled.div`
  transform: translateY(-7%);
`;

const BoardA = styled.div`
  background: #ff5d03;
  border-radius: 10px;
  padding: 6px;
  border: 1px solid black;
  position: relative;
  z-index: 10;
`;

const BoardB = styled.div`
  background: #ffc300;
  border-radius: 10px;
  padding: 6px;
  border: 1px solid black;
  position: relative;
  z-index: 10;
`;

const BoardC = styled.div`
  background: #f4e5bc;
  border-radius: 10px;
  padding: 8px;
  padding-top: 24px;
  padding-bottom: 24px;
  border: 1px solid black;
  position: relative;
  z-index: 10;
`;

const BoardShadow = styled.div`
  background: #000;
  border-radius: 10px;
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
`;

const BoradContainer = styled.div`
  padding: 0 32px;
  position: relative;
`;

const BoardWrapper = styled.div`
  position: relative;
`;

const BoardDescription = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

const BoardTitleContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 12;
`;

const BoardTitle = styled.div`
  width: 37%;
`;

const RankContainer = styled.div`
  position: relative;
  margin: 0 24px;
  margin-bottom: 32px;
`;

const RankTitlePosition = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 37%;
  margin: 0 auto;
`;

const RankButtonPosition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 10;
  cursor: pointer;
  width: 30%;
`;

const StartButtonContainer = styled.div`
  width: 30%;
`;

const SnowsRainOverlay = styled.div`
  background-image: url("/images/2023/Christmas/snows-rain.svg");
  background-repeat: repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  user-select: none;
  pointer-events: none;
`;

const ScoreContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25.3%;
  height: 68.2%;
  bottom: 0%;
  margin-left: 1.5px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const ScoreLabel = styled.div`
  width: 72.5%;
`;

const ScoreNumberLabel = styled.div`
  font-family: "Staatliches", sans-serif;
  color: #000;
  line-height: 64px;
  font-size: 64px;
  text-align: center;
`;

const RankNumberLabel = styled.div`
  font-family: "Staatliches", sans-serif;
  color: #000;
  line-height: 48px;
  font-size: 48px;
  text-align: center;
`;
const RankDescriptionLabel = styled.div`
  font-weight: 700;
  line-height: 16px;
`;
const RankInfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Images = [
  "/images/2023/Christmas/tree.png",
  "/images/2023/Christmas/3cats.png",
  "/images/2023/Christmas/mystery-box.png",
  "/images/2023/Christmas/start-button.svg",
  "/images/2023/Christmas/rank-title.svg",
  "/images/2023/Christmas/rank-board.svg",
  "/images/2023/Christmas/rank-button.svg",
  "/images/2023/Christmas/rule-title.svg",
  "/images/2023/Christmas/snow-man.svg",
  "/images/2023/Christmas/snows-rain.svg",
  "/images/2023/Christmas/decorator.svg",
  "/images/2023/Christmas/prize-picture-01.png",
  "/images/2023/Christmas/prize-picture-02.png",
  "/images/2023/Christmas/progress-0.svg",
  "/images/2023/Christmas/progress-25.svg",
  "/images/2023/Christmas/progress-50.svg",
  "/images/2023/Christmas/progress-75.svg",
  "/images/2023/Christmas/progress-100.svg",
  "/images/2023/Christmas/q1.svg",
  "/images/2023/Christmas/q2.svg",
  "/images/2023/Christmas/q3.svg",
  "/images/2023/Christmas/q4.svg",
  "/images/2023/Christmas/q5.svg",
  "/images/2023/Christmas/tree.svg",
  "/images/2023/Christmas/red-hat-cat.png",
  "/images/2023/Christmas/snow-man-with-tree.png",
  "/images/2023/Christmas/small-snows-overlay.svg",
  "/images/2023/Christmas/big-snow-man-on-snow.svg",
  "/images/2023/Christmas/merry-christmas.svg",
  "/images/2023/Christmas/how-to-share-title.svg",
];

export default function Page() {
  const params = useParams({
    referral: "",
  });
  const router = useRouter();
  const isLoaded = useImagesOnLoad(Images);
  const sessionId = useDeviceID();

  const { data, isLoading } = useQuery({
    queryKey: ["2023/Christmas", "Score"],
    queryFn: async () => {
      const response = await axios.get("/api/events", {
        params: {
          sessionId,
          behaviour: "START",
          game: "Demo",
        },
      });

      return response.data;
    },
    enabled: !!sessionId,
  });

  const { data: rankingData } = useQuery({
    queryKey: ["2023/Christmas", "Ranking"],
    queryFn: async () => {
      // if (!data?.score) return;
      const response = await axios.get("/api/ranking", {
        params: {
          sessionId,
          score: data?.score,
          game: "Demo",
        },
      });

      return response.data;
    },
    enabled: Boolean(data && data.score >= 0),
  });

  useEffect(() => {
    if (params.referral?.length) {
      Track.track("Demo", "REFERRAL", {
        ref: params.referral,
      });
      localStorage.setItem("referral", params.referral);
      router.replace("/", undefined, { shallow: true });
    }
  }, [params.referral]);

  const handleInvite = () => {
    alert(
      `參與「Travel3 X 粉啵啵送聖誕禮物」活動，只需完成以下步驟即有機會贏取豐富獎品：\n
      1. 參與有趣的Q&A遊戲。\n
      2. 生成專屬聖誕貓貓。\n
      3. 分享結果在Facebook和Instagram上。\n
      4. 贏取豐富獎品。`,
    );
  };

  return (
    <>
      <Head>
        <title>「聖誕送大禮」活動 - Travel3</title>
        <meta name="theme-color" content={colors.red} />
      </Head>
      <SplashScreen isLoaded={isLoaded}>
        <App>
          <div style={{ position: "relative" }}>
            <RedBackground>
              <ThreeCatsContainer>
                <AspectRatio ratio={2048 / 2197}>
                  <Image
                    src="/images/2023/Christmas/tree.png"
                    alt="3 cats"
                    quality={90}
                    fill
                    loading="eager"
                    priority
                  />
                </AspectRatio>
                <ThreeCatsPosition>
                  <AspectRatio ratio={2048 / 1398}>
                    <Image
                      src="/images/2023/Christmas/3cats.png"
                      alt="3 cats"
                      fill
                      quality={90}
                      loading="eager"
                      priority
                    />
                  </AspectRatio>
                </ThreeCatsPosition>
              </ThreeCatsContainer>
            </RedBackground>
            <GreenBackground>
              <MySteryBoxContainer>
                <MySteryBoxPosition>
                  <AspectRatio ratio={2048 / 1154}>
                    <Image
                      src="/images/2023/Christmas/mystery-box.png"
                      alt="3 cats"
                      fill
                      priority
                      loading="eager"
                      quality={90}
                    />
                  </AspectRatio>
                  <ScoreContainer>
                    <ScoreLabel>
                      <AspectRatio ratio={174 / 146}>
                        <Image
                          src="/images/2023/Christmas/score.svg"
                          alt="3 cats"
                          fill
                          quality={90}
                        />
                      </AspectRatio>
                    </ScoreLabel>

                    <ScoreNumberLabel>{data?.score}</ScoreNumberLabel>
                  </ScoreContainer>
                </MySteryBoxPosition>
              </MySteryBoxContainer>
              <DecorationContainer>
                <StartButtonContainer>
                  <Link href="/survey">
                    <AspectRatio ratio={354 / 155}>
                      <Image
                        src="/images/2023/Christmas/start-button.svg"
                        alt="3 cats"
                        quality={90}
                        fill
                      />
                    </AspectRatio>
                  </Link>
                </StartButtonContainer>
              </DecorationContainer>
              <RankContainer>
                <RankTitlePosition>
                  <AspectRatio ratio={400 / 103}>
                    <Image
                      src="/images/2023/Christmas/rank-title.svg"
                      alt="Rank Title"
                      quality={90}
                      fill
                    />
                  </AspectRatio>
                </RankTitlePosition>
                <AspectRatio ratio={940 / 426}>
                  <Image
                    src="/images/2023/Christmas/rank-board.svg"
                    alt="3 cats"
                    quality={90}
                    fill
                  />
                </AspectRatio>
                <RankButtonPosition>
                  <div onClick={handleInvite}>
                    <AspectRatio ratio={272 / 98}>
                      <Image
                        src="/images/2023/Christmas/rank-button.svg"
                        alt="3 cats"
                        quality={90}
                        fill
                      />
                    </AspectRatio>
                  </div>
                </RankButtonPosition>
                <RankInfoContainer>
                  <RankNumberLabel># {rankingData?.rank}</RankNumberLabel>
                  <RankDescriptionLabel>通過邀請提升排名</RankDescriptionLabel>
                </RankInfoContainer>
              </RankContainer>

              <GamePrize />

              <BoradContainer>
                <BoardTitleContainer>
                  <DecorationContainer>
                    <BoardTitle>
                      <AspectRatio ratio={399 / 102}>
                        <Image
                          src="/images/2023/Christmas/rule-title.svg"
                          alt="3 cats"
                          quality={90}
                          fill
                        />
                      </AspectRatio>
                    </BoardTitle>
                  </DecorationContainer>
                </BoardTitleContainer>
                <BoardWrapper>
                  <BoardShadow />
                  <BoardA>
                    <BoardB>
                      <BoardC>
                        <BoardDescription>
                          Travel Buddy 同 「粉啵啵」提早送您聖誕禮物！
                          <br />
                          玩問卷遊戲送您「粉啵啵」禮品和精美紀念品 !<br />
                          <br />
                          如何參加抽獎 ?<br />
                          <br />
                          ------------
                          <br />
                          ------------
                          <br />
                          ------------
                          <br />
                          <br />
                          1. 參與有趣的Q&A遊戲。
                          <br />
                          2. 成功完成遊戲後，您將獲得一個專屬的聖誕貓貓形象。
                          <br />
                          3.
                          將您的專屬聖誕貓貓結果分享到您的Facebook和Instagram帳戶上，讓您的朋友們也參與其中。
                          <br />
                          4.
                          參與活動的參與者將有機會獲得豐富的獎品，讓您的聖誕節更加精彩。
                          <br />
                        </BoardDescription>
                      </BoardC>
                    </BoardB>
                  </BoardA>
                </BoardWrapper>
              </BoradContainer>
              <AspectRatio ratio={1167 / 414}>
                <Image
                  src="/images/2023/Christmas/snow-man.svg"
                  alt="Snow man"
                  quality={90}
                  fill
                />
              </AspectRatio>
            </GreenBackground>
            <SnowsRainOverlay />
          </div>
        </App>
      </SplashScreen>
    </>
  );
}
