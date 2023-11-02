import Dialog from "@/components/GrandPrix2023/Dialog";
import Button from "@/components/GrandPrix2023/Button";
import SplashScreen from "@/components/SplashScreen";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import { Image, AspectRatio, Box, Stack, Text } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const isLoaded = useImagesOnLoad([
    "/assets/grandprix2023/images/Background.png",
    "/assets/grandprix2023/images/Racer.png",
    "/assets/grandprix2023/images/Button.png",
    "/assets/grandprix2023/images/EventTitle.png",
    "/assets/grandprix2023/images/A.png",
    "/assets/grandprix2023/images/B.png",
    "/assets/grandprix2023/images/C.png",
    "/assets/grandprix2023/images/D.png",
    "/assets/grandprix2023/images/q1.svg",
    "/assets/grandprix2023/images/q2.svg",
    "/assets/grandprix2023/images/q3.svg",
    "/assets/grandprix2023/images/DialogContent.png",
    "/assets/grandprix2023/images/DialogHeader.png",
    "/assets/grandprix2023/images/questionnaire_bg.png",
    "/assets/grandprix2023/images/gp2013_travel3_logo.png",
    "/assets/grandprix2023/images/event_detail_label.svg",
    "/assets/grandprix2023/images/event_prizes_label.svg",
    "/assets/grandprix2023/images/EventTitle.png",
    "/assets/grandprix2023/images/EventDetailTitle.png",
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Global
        styles={css`
          body,
          html {
            background-color: #e4d9c4;
          }
        `}
      />
      <SplashScreen isLoaded={isLoaded}>
        <Box position={"relative"} w={"100%"} h={"100vh"}>
          <Box position="absolute" top={0} left={0} bottom={0} right={0}>
            <Image
              h="100%"
              w="100%"
              objectFit={"cover"}
              src="/assets/grandprix2023/images/Background.png"
              alt="background"
            />
            <Box position={"absolute"} left={"0%"} bottom={0} right={0}>
              <AspectRatio ratio={1080 / 2073.8879} w="100%">
                <Image
                  alt="Racer"
                  position="absolute"
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src="/assets/grandprix2023/images/Racer.png"
                />
              </AspectRatio>
            </Box>
            <Box position={"absolute"} left={"-10%"} top={"5%"} right={"-5%"}>
              <AspectRatio ratio={1308.4758 / 1053.7383} w="110%">
                <Image
                  alt="EventTitle"
                  position="absolute"
                  w={"100%"}
                  // objectFit={"cover"}
                  src="/assets/grandprix2023/images/EventTitle.png"
                />
              </AspectRatio>
            </Box>
          </Box>
          <Box position="fixed" top={"3%"} right={"-16px"} zIndex={19}>
            <Stack>
              <Button
                w="120px"
                h={`${120 * 0.28431372549019607}px`}
                onClick={() => setIsOpen(true)}
              >
                <Image
                  ml="-12px"
                  w="90px"
                  src="/assets/grandprix2023/images/event_detail_label.svg"
                  alt="活動詳情"
                />
              </Button>
              <Button w="120px" h={`${120 * 0.28431372549019607}px`}>
                <Image
                  ml="-12px"
                  w="90px"
                  src="/assets/grandprix2023/images/event_prizes_label.svg"
                  alt="活動獎品"
                />
              </Button>
            </Stack>
          </Box>
          <Link href="/grandprix2023/questionnaire">
            <AspectRatio
              position={"absolute"}
              zIndex={10}
              ratio={378 / 147}
              bottom={"4%"}
              left={"30%"}
              w={"40%"}
              h={"auto"}
              mb={4}
            >
              <Box
                w={"100%"}
                objectFit={"cover"}
                bgImage="/assets/grandprix2023/images/Start.png"
                bgPosition={"center"}
                bgRepeat={"no-repeat"}
                bgSize={"contain"}
              />
            </AspectRatio>
          </Link>
        </Box>
      </SplashScreen>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Text fontWeight={700}>
          Travel Buddy 考下您賽車知識，
          <br />
          送您賽車門票和精美紀念品 !<br />
          <br />
          如何參加抽獎 ?<br />
          <br />
          ------------
          <br />
          ------------
          <br />
          -----------
          <br />
          <br />
          參加者只需參與「賽車Q&A送大禮」
          <br />
          活動，參與賽車Q&A，
          <br />
          即有機會參與抽獎！參加者只需參與
          <br />
          「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！
          <br />
          <br />
          ------------
          <br />
          ------------
          <br />
          ---------
          <br />
          <br />
          參加者只需參與「賽車Q&A送大禮」
          <br />
          活動，參與賽車Q&A，
          <br />
          即有機會參與抽獎！參加者只需參與
          <br />
          「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！
          <br />
        </Text>
      </Dialog>
    </>
  );
}
