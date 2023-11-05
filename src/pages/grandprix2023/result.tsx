// pages/result.js
import {
  Box,
  Button,
  Flex,
  Image as Img,
  // Link,
  Text,
  AspectRatio,
  Image,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
// import Loading from "@/components/GrandPrix2023/Loading";
import html2canvas from "html2canvas";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import QrCode from "qrcode.react";
import useLongPress from "@/hooks/useLongPress";
import { Global, css } from "@emotion/react";
import { useDeviceID } from "@/hooks/useDeviceID";
// import css from "styled-jsx/css";
import Link from "next/link";
import BottomSheet from "@/components/BottomSheet";

const Result = [
  {
    score_range: [0, 19],
    name: "新手級車手",
    avatar: "/assets/grandprix2023/images/Frame 9.png",
  },
  {
    score_range: [20, 29],
    name: "業餘級車手",
    avatar: "/assets/grandprix2023/images/Frame 7.png",
  },
  {
    score_range: [30, 39],
    name: "職業級車手",
    avatar: "/assets/grandprix2023/images/Frame 8.png",
  },
  {
    score_range: [40, 40],
    name: "世界級車手",
    avatar: "/assets/grandprix2023/images/Frame 6.png",
  },
];

const ResultPage = () => {
  const router = useRouter();
  const { score, name } = router.query;
  const [imageDataUrl, setImageDataUrl] = useState("");

  const isLoaded = useImagesOnLoad([
    "/assets/grandprix2023/images/questionnaire_background.webp",
    "/assets/grandprix2023/images/gp2023_travelbuddy_logo.png",
    "/assets/grandprix2023/images/Frame 9.png",
    "/assets/grandprix2023/images/Frame 7.png",
    "/assets/grandprix2023/images/Frame 8.png",
    "/assets/grandprix2023/images/Frame 6.png",
  ]);

  const result = Result.find((item) => {
    const [min, max] = item.score_range;
    return Number(score) >= min && Number(score) <= max;
  });

  const deviceID = useDeviceID();
  console.log("device", deviceID, result);

  const buildImage = () => {
    const node: any = document.getElementById("resultCard");
    html2canvas(node, {
      scale: 3,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      setImageDataUrl(canvas.toDataURL());
    });
  };

  const handleDownloadImage = async () => {
    // alert(imageDataUrl)
    if (!imageDataUrl) return alert("請刷新頁面後再試一次！");

    saveAs(imageDataUrl, "Travel3 x Grand Prix 2023");
  };

  const longPressEvent = useLongPress(handleDownloadImage, 700);

  useEffect(() => {
    if (isLoaded && router.query.name) {
      buildImage();
    }
  }, [isLoaded, router.query]);

  return (
    <>
      <Global
        styles={css`
          body,
          html {
            background-color: rgb(62, 102, 209);
          }
        `}
      />
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
              <AspectRatio ratio={417 / 417}>
                <Image
                  w={"100%"}
                  objectFit={"cover"}
                  borderRadius="50%"
                  src={result?.avatar}
                  alt="Avatar"
                  transform={"scale(1.25)"}
                />
              </AspectRatio>
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
              fontSize={"lg"}
              fontWeight={900}
              color={"black"}
              textAlign={"center"}
            >
              參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，再分享結果，最受歡迎的分享將可贏取獎品！
            </Text>
          </Box>
          <Center mt={3}>
            <QrCode
              bgColor="transparent"
              level="L"
              value={`https://travel3.app/gp2023/${deviceID}`}
            />
          </Center>
          <Text
            textAlign="center"
            mt={1}
            px={12}
            fontWeight={700}
            fontSize="sm"
          >
            https://travel3.app/gp2023/{deviceID}
          </Text>
        </Box>
      </Box>

      <Img
        src={imageDataUrl}
        alt="TRAVEL BUDDY"
        objectFit={"cover"}
        display="none"
      />

      <Box bottom={"4%"} position={"absolute"} w={"100vw"} h={8} zIndex={100}>
        <AspectRatio
          position={"absolute"}
          left={"4%"}
          ratio={320 / 123}
          w={"30%"}
        >
          <Button
            bgColor={"transparent"}
            w={"100%"}
            bgImage="/assets/grandprix2023/images/share_button.png"
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
            onClick={handleDownloadImage}
            _active={{
              bgImage: "/assets/grandprix2023/images/share_button.png",
              bgPosition: "center",
              bgRepeat: "no-repeat",
              bgSize: "cover",
              bgColor: "transparent",
            }}
          />
        </AspectRatio>

        <Link href="/grandprix2023">
          <AspectRatio
            position={"absolute"}
            right={"4%"}
            ratio={320 / 123}
            w={"30%"}
          >
            <Button
              bgColor={"transparent"}
              w={"100%"}
              bgImage="/assets/grandprix2023/images/replay_button.png"
              bgPosition={"center"}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              _active={{
                bgColor: "transparent",
                bgImage: "/assets/grandprix2023/images/replay_button.png",
                bgPosition: "center",
                bgRepeat: "no-repeat",
                bgSize: "cover",
              }}
            />
          </AspectRatio>
        </Link>
      </Box>
      <BottomSheet />
    </>
  );
};

export default ResultPage;
