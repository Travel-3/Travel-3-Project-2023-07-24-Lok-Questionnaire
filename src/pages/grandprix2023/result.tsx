// pages/result.js
import {
  Box,
  Flex,
  Image as Img,
  Text,
  AspectRatio,
  Image,
  Center,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import QrCode from "qrcode.react";
import useLongPress from "@/hooks/useLongPress";
import { Global, css } from "@emotion/react";
import { useDeviceID } from "@/hooks/useDeviceID";
import { RiFacebookCircleLine, RiInstagramLine } from "react-icons/ri";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
// import InView from "@/components/InView";
// import BottomSheet from "@/components/BottomSheet";

const BottomSheet = dynamic(() => import("@/components/BottomSheet"), {
  ssr: false,
});

const Result = [
  {
    score_range: [0, 19],
    name: "新手級車手",
    avatar: "/assets/grandprix2023/images/Frame 9.webp",
  },
  {
    score_range: [20, 29],
    name: "業餘級車手",
    avatar: "/assets/grandprix2023/images/Frame 7.webp",
  },
  {
    score_range: [30, 39],
    name: "職業級車手",
    avatar: "/assets/grandprix2023/images/Frame 8.webp",
  },
  {
    score_range: [40, 40],
    name: "世界級車手",
    avatar: "/assets/grandprix2023/images/Frame 6.webp",
  },
];

async function dataUrlToFile(dataUrl: string, filename: string) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, {
    type: "image/png",
    lastModified: new Date().getTime(),
  });
}

const ResultPage = () => {
  const router = useRouter();
  const { score, name } = router.query;
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageBlob, setImageBlob] = useState<Blob | null>();

  const isLoaded = useImagesOnLoad([
    "/assets/grandprix2023/images/questionnaire_background.webp",
    "/assets/grandprix2023/images/Frame 9.webp",
    "/assets/grandprix2023/images/Frame 7.webp",
    "/assets/grandprix2023/images/Frame 8.webp",
    "/assets/grandprix2023/images/Frame 6.webp",
  ]);

  const result = Result.find((item) => {
    const [min, max] = item.score_range;
    return Number(score) >= min && Number(score) <= max;
  });

  const deviceID = useDeviceID();
  // console.log("device", deviceID, result);

  const buildImage = () => {
    const node: any = document.getElementById("resultCard");
    html2canvas(node, {
      scale: 3,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      setImageDataUrl(canvas.toDataURL());
      canvas.toBlob((blob) => setImageBlob(blob));
    });
  };

  const handleDownloadImage = async () => {
    if (!imageDataUrl || !imageBlob) return alert("請刷新頁面後再試一次！");

    if (!navigator.canShare)
      return saveAs(
        imageDataUrl,
        `${result?.name} - ${name} - Travel3「賽車Q&A送大禮」活動`,
      );

    // const file = await dataUrlToFile(imageDataUrl, `${result?.name} - ${name} - Travel3「賽車Q&A送大禮」活動`)
    try {
      await navigator.share({
        text: `${result?.name} - ${name} - Travel3「賽車Q&A送大禮」活動`,
        url: shareUrl,
      });
      alert("Travel3「賽車Q&A送大禮」活動分享成功!");
      saveAs(
        imageDataUrl,
        `${result?.name} - ${name} - Travel3「賽車Q&A送大禮」活動`,
      );
    } catch (error) {
      alert("Travel3「賽車Q&A送大禮」活動分享失敗!");
    }
  };

  const longPressEvent = useLongPress(handleDownloadImage, 700);

  useEffect(() => {
    if (isLoaded && router.query.name) {
      buildImage();
    }
  }, [isLoaded, router.query]);

  const shareUrl = `https://travel3exp.xyz/${deviceID}`;

  return (
    <>
      <Global
        styles={css`
          body,
          html {
            background-color: #316adf;
          }
        `}
      />
      <Head>
        <title>「賽車Q&A送大禮」活動 - Travel3</title>
      </Head>
      <Box
        position={"relative"}
        id="resultCard"
        userSelect={"none"}
        w={"100%"}
        h="auto"
        {...longPressEvent}
      >
        <AspectRatio w="100%" ratio={1080 / 2073} userSelect={"none"}>
          <Image
            w={"100%"}
            position="absolute"
            h="100%"
            objectFit={"cover"}
            src="/assets/grandprix2023/images/Result.webp"
            alt="Result"
          />
        </AspectRatio>
        <Box
          position="absolute"
          top={"33%"}
          left={"0%"}
          right={0}
          bottom={0}
          zIndex={10}
          userSelect={"none"}
        >
          <Flex alignItems={"flex-end"} px={4}>
            <Box
              border="solid #000"
              w={"45%"}
              bg={"rgb(63, 87, 160)"}
              borderWidth={"3px 5px 6px 3px"}
              borderRadius="50%"
            >
              <Box borderRadius={"0px 0px 50% 50%"} overflow="hidden">
                <Image
                  w={"100%"}
                  objectFit={"cover"}
                  src={result?.avatar}
                  alt="Avatar"
                  // translateY={"-50%"}
                  transform={"scale(1.) translateY(10%)"}
                />
              </Box>
            </Box>
            <Box ml={4} pb={12}>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"}>
                {name}
              </Text>
              <Text fontSize={"3xl"} fontWeight={"bold"} color={"black"}>
                {result?.name}
              </Text>
            </Box>
          </Flex>
          <Box mt={3} px={8}>
            <Text
              px={2}
              fontSize={"md"}
              fontWeight={700}
              color={"black"}
              textAlign={"center"}
            >
              參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，再分享結果，最受歡迎的分享將可贏取獎品！
            </Text>
          </Box>
          <Center mt={3}>
            <QrCode bgColor="transparent" level="L" value={shareUrl} />
          </Center>
          <Text
            textAlign="center"
            mt={2}
            px={12}
            fontWeight={700}
            fontSize="sm"
          >
            {shareUrl}
          </Text>
        </Box>
      </Box>

      <Img
        src={imageDataUrl}
        alt="TRAVEL BUDDY"
        objectFit={"cover"}
        display="none"
      />
      <Box mb={16}>
        <HStack spacing={0} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={"md"} fontWeight={700}>
            官方社交平台：
          </Text>
          <Link
            href="https://www.facebook.com/profile.php?id=100089729841964"
            target="_blank"
          >
            <Icon
              fontSize={"3xl"}
              fontWeight={"bold"}
              as={RiFacebookCircleLine}
            ></Icon>
          </Link>
          <Link
            href="https://www.instagram.com/travel3_official/"
            target="_blank"
          >
            <Icon
              fontSize={"3xl"}
              fontWeight={"bold"}
              as={RiInstagramLine}
            ></Icon>
          </Link>
        </HStack>
        <Text textAlign="center">Powered by Travel3</Text>
      </Box>
      <Box bottom={"4%"} position={"fixed"} w={"100vw"} h={8} zIndex={100}>
        <AspectRatio
          position={"absolute"}
          left={"3%"}
          ratio={320 / 123}
          w={"30%"}
        >
          <Box
            bgColor={"transparent"}
            w={"100%"}
            bgImage="/assets/grandprix2023/images/share_button.png"
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
            onClick={handleDownloadImage}
          />
        </AspectRatio>

        <Link href="/grandprix2023">
          <AspectRatio
            position={"absolute"}
            right={"3%"}
            ratio={320 / 123}
            w={"30%"}
          >
            <Box
              bgColor={"transparent"}
              w={"100%"}
              bgImage="/assets/grandprix2023/images/replay_button.png"
              bgPosition={"center"}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
            />
          </AspectRatio>
        </Link>
      </Box>
      <BottomSheet />
    </>
  );
};

export default ResultPage;
