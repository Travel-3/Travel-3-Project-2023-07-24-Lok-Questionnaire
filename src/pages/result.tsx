import GameButton from "@/components/2023/Christmas/GameButton";
import HowToShow from "@/components/2023/Christmas/HowToShow";
import SignUpForm from "@/components/2023/Christmas/SignUpForm";
import SplashScreen from "@/components/2023/Christmas/SplashScreen";
import SuggestPartner from "@/components/2023/Christmas/SuggestPartner";
import App from "@/components/App";
import ScreenshotProvider from "@/components/Screenshot/ScreenshotProvider";
import TrackLink from "@/components/Track/TrackLink";
import { AspectRatio } from "@/components/ui";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import useParams from "@/hooks/useParams";
import colors from "@/tokens/2023/Christmas/colors";
import { blue, green, red, white } from "@/tokens/2023/Christmas/results";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { useDeviceID } from "@/hooks/useDeviceID";

const RedBackground = styled.div`
  width: 100%;
  background-color: ${colors.red};
  user-select: none;
  position: relative;
`;

const MerryChristmas = styled.div`
  width: 55.2%;
  margin-left: 5%;
`;

const SnowManWithTreeContainer = styled.div`
  padding-top: 4%;
`;

const SnowManWithTreePosition = styled.div`
  position: relative;
  left: 0;
  right: 0;
`;
const SmallSnowOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 99;
  top: 0;
  user-select: none;
  pointer-events: none;
`;

const CharacterContainer = styled.div`
  position: relative;
`;

const InfoContainer = styled.div`
  /* padding-bottom: 37%; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px;
`;
const UserNameLabel = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0px;
`;
const UserCharacterLabel = styled.div`
  font-size: 27px;
  margin-bottom: 8px;
  font-weight: 900;
  color: #fff;
  text-shadow:
    -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    4px 6px 0px black;
`;
const UserCharacter = styled.div`
  position: absolute;
  width: 75%;
  z-index: 10;
  bottom: -11%;
  right: 5%;
`;

const UserCharacterDescription = styled.div`
  color: black;
  font-size: 14px;
  flex: 1;
  font-weight: 700;
  padding-right: 8px;
`;

const WhiteBackground = styled.div`
  position: relative;
  padding: 10px 16px 0px 16px;
  /* padding: 10px 24px 24px 10px; */
  background-color: #fff;
  margin-top: -3px;
  z-index: 10;
  display: flex;
  align-items: center;
`;

const UserPeronalityLabel = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const CopyRight = styled.div`
  color: #000;
  text-align: center;
  font-size: 14px;
  padding: 24px;
`;

const Result = {
  10: red,
  20: green,
  30: white,
  40: blue,
} as const;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Page() {
  const router = useRouter();
  const { name, score } = useParams({
    name: "",
    score: 10,
  });

  const result = Result[Number(score) as keyof typeof Result];

  const isLoaded = useImagesOnLoad(
    [
      result.main,
      result.partner,
      "/images/2023/Christmas/merry-christmas.png",
      "/images/2023/Christmas/snow-man-with-tree.png",
      "/images/2023/Christmas/small-snows-overlay.png",
    ],
    {
      enabled: router.isReady,
      preload: false,
    },
  );

  const id = useDeviceID();
  const shareUrl = `https://travel3exp.xyz?referral=${id}`;

  return (
    <>
      <Head>
        <title>Travel3 X 粉啵啵送聖誕禮物</title>
        <meta name="theme-color" content={colors.red} />
      </Head>
      <SplashScreen isLoaded={isLoaded}>
        <App>
          <ScreenshotProvider isReady={isLoaded}>
            <div id="canvas">
              <RedBackground>
                <CharacterContainer>
                  <InfoContainer>
                    <MerryChristmas>
                      <AspectRatio ratio={597 / 188}>
                        <Image
                          src={`/images/2023/Christmas/merry-christmas.png`}
                          alt={`Merry Christmas`}
                          loading={"eager"}
                          // fill
                          // unoptimized
                        />
                      </AspectRatio>
                    </MerryChristmas>
                    <UserNameLabel>{name}</UserNameLabel>
                    <UserCharacterLabel>{result?.name}</UserCharacterLabel>
                    <UserPeronalityLabel>
                      {result?.tags.join("|")}
                    </UserPeronalityLabel>
                    <UserCharacter>
                      {router.isReady && (
                        <AspectRatio ratio={810 / 810}>
                          <Image
                            src={result.main}
                            alt={`Cat`}
                            loading={"eager"}
                            // fill
                            // unoptimized
                          />
                        </AspectRatio>
                      )}
                    </UserCharacter>
                  </InfoContainer>
                  <SnowManWithTreeContainer>
                    <SnowManWithTreePosition>
                      <AspectRatio ratio={2048 / 1636}>
                        <Image
                          src={`/images/2023/Christmas/snow-man-with-tree.png`}
                          alt={`Snow Man With Tree`}
                          loading={"eager"}
                          // fill
                          // unoptimized
                        />
                      </AspectRatio>
                    </SnowManWithTreePosition>
                  </SnowManWithTreeContainer>
                </CharacterContainer>

                <WhiteBackground>
                  <UserCharacterDescription>
                    {result?.aboutMain}
                  </UserCharacterDescription>
                  <QRCodeSVG width={80} level="L" value={shareUrl} />
                </WhiteBackground>
                <SmallSnowOverlay>
                  <AspectRatio ratio={1084 / 746}>
                    <Image
                      src={`/images/2023/Christmas/small-snows-overlay.png`}
                      alt={`Snow Man With Tree`}
                      loading={"eager"}
                      // fill
                      // unoptimized
                    />
                  </AspectRatio>
                </SmallSnowOverlay>
              </RedBackground>
              <SuggestPartner
                src={result?.partner}
                description={result?.aboutPartner}
              />
            </div>
            <div style={{ paddingBottom: "25vh", minHeight: 100 }}>
              <TrackLink href="https://travel3.app" game="2023Christmas">
                <CopyRight>Powered by Travel3.app</CopyRight>
              </TrackLink>
              <div style={{ width: 120, margin: "0 auto" }}>
                <Link href="/">
                  <GameButton color="blue">返回主頁</GameButton>
                </Link>
              </div>
            </div>
            <HowToShow />
          </ScreenshotProvider>
          <SignUpForm />
        </App>
      </SplashScreen>
    </>
  );
}
