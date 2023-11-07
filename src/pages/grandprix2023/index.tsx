import Dialog from "@/components/GrandPrix2023/Dialog";
import Button from "@/components/GrandPrix2023/Button";
import SplashScreen from "@/components/SplashScreen";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import { Image, AspectRatio, Box, Stack, Text, Flex } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/GrandPrix2023/Modal";
import { useRouter } from "next/router";
import { useDeviceID } from "@/hooks/useDeviceID";
import useRecordGame from "@/hooks/useRecordGame";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";

const IMAGES = [
  "/assets/grandprix2023/images/Background.webp",
  "/assets/grandprix2023/images/Racer.webp",
  "/assets/grandprix2023/images/Button.png",

  "/assets/grandprix2023/images/EventPrizeTitle.png",

  "/assets/grandprix2023/images/questionnaire_background.webp",

  "/assets/grandprix2023/images/A.webp",
  "/assets/grandprix2023/images/B.webp",
  "/assets/grandprix2023/images/C.webp",
  "/assets/grandprix2023/images/D.webp",
  "/assets/grandprix2023/images/Q1.svg",
  "/assets/grandprix2023/images/Q2.svg",
  "/assets/grandprix2023/images/Q3.svg",
  "/assets/grandprix2023/images/Q4.svg",
  "/assets/grandprix2023/images/DialogContent.webp",
  "/assets/grandprix2023/images/DialogHeader.png",

  // "/assets/grandprix2023/images/questionnaire_background.png",

  "/assets/grandprix2023/images/gp2013_travel3_logo.png",
  "/assets/grandprix2023/images/event_detail_label.svg",
  "/assets/grandprix2023/images/event_prizes_label.svg",

  "/assets/grandprix2023/images/EventDetailTitle.png",
  "/assets/grandprix2023/images/Result.webp",

  // Prize
  "/assets/grandprix2023/images/Prize/Background.png",
  "/assets/grandprix2023/images/Prize/Footer.png",
  "/assets/grandprix2023/images/Prize/Header.png",
  "/assets/grandprix2023/images/Prize/Prize01.png",
  "/assets/grandprix2023/images/Prize/Prize02.png",
  "/assets/grandprix2023/images/Prize/Prize03.png",
  "/assets/grandprix2023/images/Prize/Shape.png",
  "/assets/grandprix2023/images/Prize/Text01.svg",
  "/assets/grandprix2023/images/Prize/Text02.svg",
  "/assets/grandprix2023/images/Prize/Text03.svg",
  //
  "/assets/grandprix2023/images/questionnaire_background.webp",
  "/assets/grandprix2023/images/Frame 9.webp",
  "/assets/grandprix2023/images/Frame 7.webp",
  "/assets/grandprix2023/images/Frame 8.webp",
  "/assets/grandprix2023/images/Frame 6.webp",
];

export default function Home() {
  const isLoaded = useImagesOnLoad(IMAGES);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deviceId = useDeviceID();
  const recordGameMutation = useRecordGame();

  useEffect(() => {
    const { ref } = router.query;
    if (router.isReady && ref && deviceId) {
      recordGameMutation.mutate({
        ref: ref as string,
        deviceId,
        type: "ACCESS",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, deviceId]);

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
      <SplashScreen isLoaded={isLoaded} title="進入遊戲中">
        <Box position={"relative"} w={"100%"} h={"100%"} overflowX="hidden">
          <Box position="fixed" top={"3%"} right={"-16px"} zIndex={99}>
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
              <Button
                w="120px"
                h={`${120 * 0.28431372549019607}px`}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  ml="-12px"
                  w="90px"
                  src="/assets/grandprix2023/images/event_prizes_label.svg"
                  alt="活動獎品"
                />
              </Button>
            </Stack>
          </Box>
          <Image
            h="100%"
            w="100%"
            objectFit={"cover"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            position={"absolute"}
            src="/assets/grandprix2023/images/Background.webp"
            alt="background"
          />
          {/*  */}
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            flexDirection={"column"}
            justifyContent={"flex-end"}
          >
            <AspectRatio ratio={1080 / 1107} w="100%">
              <Image
                alt="Racer"
                position="absolute"
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src="/assets/grandprix2023/images/Racer.webp"
              />
            </AspectRatio>
          </Flex>
          {/*  */}
          <Box position={"absolute"} left={"-10%"} top={"2.5%"} right={"-5%"}>
            <AspectRatio ratio={1308.4758 / 1053.7383} w="110%">
              <Image
                alt="EventTitle"
                position="absolute"
                w={"100%"}
                // objectFit={"cover"}
                src="/assets/grandprix2023/images/Event Title.webp"
              />
            </AspectRatio>
          </Box>
        </Box>

        <Link
          href={`/grandprix2023/questionnaire?ref=${router.query.ref || ""}`}
        >
          <AspectRatio
            position={"fixed"}
            zIndex={10}
            ratio={378 / 147}
            bottom={"0%"}
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
      </SplashScreen>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Stack py={2}>
          <Link
            href={"https://www.macauec.com/projects/123-version-artist"}
            target="_blank"
          >
            <Flex w="100%" alignItems={"center"} px={2}>
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Text01.svg"
                  alt="Text"
                  objectFit="cover"
                />
              </Box>
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Prize01.png"
                  alt="Prize"
                  objectFit="cover"
                />
              </Box>
            </Flex>
          </Link>
          <Link
            href={"https://www.macauec.com/projects/123-version-artist"}
            target="_blank"
          >
            <Flex
              pb={2}
              w="100%"
              alignItems={"center"}
              px={2}
              backgroundSize="cover"
              backgroundImage="/assets/grandprix2023/images/Prize/Shape.png"
            >
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Prize02.png"
                  alt="Prize"
                  objectFit="cover"
                />
              </Box>
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Text02.svg"
                  alt="Text"
                  objectFit="cover"
                />
              </Box>
            </Flex>
          </Link>
          <Link
            href={"https://www.instagram.com/jump_off_backpack/"}
            target="_blank"
          >
            <Flex w="100%" alignItems={"center"} px={2}>
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Text03.svg"
                  alt="Text"
                  objectFit="cover"
                />
              </Box>
              <Box flex={1}>
                <Image
                  w="100%"
                  src="/assets/grandprix2023/images/Prize/Prize03.png"
                  alt="Prize"
                  objectFit="cover"
                />
              </Box>
            </Flex>
          </Link>
        </Stack>
      </Modal>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Text fontWeight={700}>
          Travel Buddy 考下您賽車知識，送您精美賽車紀念品 !
          <br />
          ------------
          <br />
          活動日期：2023年11月7日至11月17日
          <br />
          ------------
          <br />
          如何參加抽獎 ?
          <br />
          參加我們的「賽車Q&A送大禮」活動，只需參與賽車Q&A，再分享結果，就有機會贏取豐厚獎品！參與者只需回答精心設計的賽車問題並分享他們的結果。最高分的參與者將獲得獎品。
          <br />
          ------------
          <br />
          計分方式：每邀請一位朋友參與遊戲，您將獲得一分；而當您邀請的朋友成功完成遊戲時，您將獲得5分。
          <br />
          ------------
          <br />
          獎品名單如下，跟據最受歡迎的分享排名取得以下的獎品：
          <br />
          1.第70屆澳門格蘭披治大賽車藝術紀念畫冊—數碼藝術中的速度與激情（共5份，零售價MOP
          700）
          <br />
          2. 賽車版設計2合1機能斜挎包 （三種顏色各3份，共9份，零售價MOP 350）
          <br />
          3. 木製方程式F3賽車DIY模型（共5份，零售價 MOP 168）
          <br />
          <br />
          我們將於活動完結後通過電話通知得獎者，溝通領獎流程。
        </Text>
      </Dialog>
    </>
  );
}
