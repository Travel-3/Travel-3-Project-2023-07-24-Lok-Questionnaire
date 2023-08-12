// pages/result.js
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Img,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import { toJpeg } from "html-to-image";
import { saveAs } from "file-saver";
import { useState, useEffect, useCallback } from "react";

const resultData = {
  results: [
    {
      score_range: "21-30",
      mask: "孤獨完美主義者浪頭",
      hidden_mask: "#小丑面具",
      personality_hidden: "37%",
      description:
        "你擁有近乎強迫症般的追求完美，行事謹慎小心，外表堅強，內心有時缺乏自信，做事情挑剔，不容許自己犯一點點的錯誤。人前搞笑開心果，人後習慣獨自舔傷口。社交場上歡脫熱略，繁華散盡，徒留清醒。表要熱衷於身處喧嘩，實際上內心冷淡抽離。",
      keywords: ["#外熱內冷", "#追求完美", "#孤獨患者"],
      recommended_route: "設計愛好者路線",
      recommendation: "追求完美的你一定對身邊的一切美好設計充滿期待",
      image: "assets/images/wave.png",
    },
    {
      score_range: "31-40",
      mask: "高冷莫測的毛山",
      hidden_mask: "#冷漠面具",
      personality_hidden: "59%",
      description:
        "你的內心有著很強的控制欲望，對於周圍的環境相 當敏感。你不太輕易和別人成為朋友，但一旦成為朋友則非常忠誠，而且更渴望對方也能夠同樣的態度來重視你。",
      keywords: ["#高冷莫測", "#直覺敏銳", "#敏感纖細"],
      recommended_route: "設計專業路線",
      recommendation: "保持敏銳，汲取靈感;享受孤獨，傾聽內心深處需求",
      image: "assets/images/joshua.png",
    },
    {
      score_range: "41-50",
      mask: "陽光率性的阿布",
      hidden_mask: "#沒有面具",
      personality_hidden: "0%",
      description:
        "為人謙遜，但同時有自己的主見，能夠理解他人，懂得照顧他人的感受，不容許別人的侵犯。有著很強的自我控制力，下決心做的事情一定會成功。喜歡交朋友，人際關係處理的不錯，常常是朋友圈裡最值得信賴的人物。",
      keywords: ["#平易近人", "#陽光率性", "#值得信賴"],
      recommended_route: "經營者路線",
      recommendation: "獨具慧眼的你定能從設計關鍵字中發掘商機",
      image: "assets/images/brad.png",
    },
    {
      score_range: "51",
      mask: "不按套路的變臉人布魯斯",
      hidden_mask: "#千人千面",
      personality_hidden: "101%",
      description:
        "你的性格屬於愛冒險的人，通常大腦的思維非常活躍，是天生的領袖!喜歡嘗試新鮮的事情，常常不按套路出牌，語不驚人誓不罷休;決策果敢而堅決，不易受他人影響。",
      keywords: ["#千人千面", "#敢於冒險", "#人間清醒"],
      recommended_route: "設計週全路線",
      recommendation: "敢於冒險的你，注定要嘗試一切嶄新的事物",
      image: "assets/images/bruce.png",
    },
  ],
};

const ResultPage = () => {
  const router = useRouter();
  const { score, name } = router.query;
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const numericalScore = Number(score);

  const result = resultData.results.find(({ score_range }) => {
    const [min, max] = score_range.split("-");
    return (
      numericalScore >= Number(min) && numericalScore <= Number(max || min)
    );
  });

  function useLongPress(callback = () => {}, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
      let timerId: any;
      if (startLongPress) {
        timerId = setTimeout(callback, ms);
      } else {
        clearTimeout(timerId);
      }

      return () => {
        clearTimeout(timerId);
      };
    }, [callback, ms, startLongPress]);

    const start = useCallback(() => {
      setStartLongPress(true);
    }, []);
    const stop = useCallback(() => {
      setStartLongPress(false);
    }, []);

    return {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    };
  }

  const downloadImage = async () => {
    setIsGeneratingImage(true);
    const buildImage = async () => {
      const node: any = document.getElementById("resultCard");
      const url = await toJpeg(node, { quality: 1 })
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          return dataUrl;
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
      return url;
    };
    await buildImage();
    await buildImage();
    await buildImage();
    await buildImage();
    await buildImage();

    const result: any = await buildImage();

    saveAs(result, "result");
    setIsGeneratingImage(false);
  };

  const longPressEvent = useLongPress(downloadImage, 1000);

  return (
    <>
      <Box
        p={2}
        bgColor={"black"}
        minHeight={"100vh"}
        id="resultCard"
        mb={0}
        {...longPressEvent}
      >
        <Stack px={2} py={4} align="center" spacing={2}>
          <Text color={"white"} fontSize={"lg"}>
            發掘你不為人知的貓貓性格
          </Text>
          <Text fontSize={"3xl"} color={"#DB4F33"}>
            {result?.mask}
          </Text>
          <HStack mb={4}>
            {result?.keywords.map((keyword) => (
              <Text
                key={keyword}
                fontSize={"sm"}
                color={"white"}
                bgColor={"transparent"}
                border={"1px"}
                borderColor={"white"}
                borderRadius={"md"}
                py={1}
                px={4}
              >
                {keyword}
              </Text>
            ))}
          </HStack>
          <Stack
            spacing={0}
            // bgImage={"/assets/images/background.png"}
            // bgSize={"cover"}
            position={"relative"}
            overflow={"hidden"}
          >
            <Stack
              p={4}
              pb={0}
              align="center"
              spacing={1}
              bgColor={"transparent"}
              bgGradient={
                "linear(transparent 0%, transparent 80%, rgba(219,79,51,0.5) 90%, rgba(219,79,51,0.7) 95%, rgba(219,79,51,0.9) 100%, rgba(219,79,51,1) 100%)"
              }
            >
              <HStack
                zIndex={10}
                width={"full"}
                spacing={2}
                justifyContent={"center"}
                alignItems={"start"}
              >
                <Box width={"45%"}>
                  <Img
                    width={"auto"}
                    height={"auto"}
                    src={result?.image}
                    objectFit={"cover"}
                    alt={name?.toString()}
                  />
                </Box>
                <Stack width={"55%"} spacing={0}>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    名字
                  </Text>
                  <Text>{name}</Text>
                  <Spacer />
                  <Text fontWeight={"bold"}>人格隱藏度</Text>
                  <Text fontSize={"5xl"} top={-2}>
                    {result?.personality_hidden}
                  </Text>
                </Stack>
              </HStack>
              <Text zIndex={10} mb={2} fontSize={"md"} color={"black"}>
                {result?.description}
              </Text>
              <Text
                zIndex={10}
                fontSize={"md"}
                px={4}
                textAlign={"center"}
                color={"white"}
                bgColor={"black"}
              >
                你的隱藏面具
              </Text>
              <Text
                zIndex={10}
                fontSize={"2xl"}
                fontWeight={"bold"}
                px={4}
                textAlign={"center"}
              >
                {result?.hidden_mask}
              </Text>
              <Text
                fontSize={"md"}
                px={4}
                textAlign={"center"}
                color={"white"}
                bgColor={"black"}
                zIndex={10}
              >
                建議你的設計週路線
              </Text>
              <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                px={4}
                textAlign={"center"}
                zIndex={10}
              >
                {result?.recommended_route}
              </Text>
              <Text fontSize={"md"} zIndex={10}>
                {result?.recommendation}
              </Text>
              <Img
                boxSize={32}
                objectFit={"contain"}
                src="assets/images/2023logo.png"
                alt="logo"
                mb={2}
                zIndex={10}
              />
            </Stack>
            <Text
              textAlign={"center"}
              bgColor={"transparent"}
              color={"black"}
              zIndex={10}
            >
              09.11→09.22澳門設計週2023奥你相約！
            </Text>
            <Img
              position={"absolute"}
              zIndex={0}
              width={"100%"}
              height={"100%"}
              src={"/assets/images/background.png"}
              objectFit={"cover"}
              alt="background"
            />
          </Stack>
        </Stack>
        <Text textAlign={"center"} color={"white"}>
          Character designed by Early Cloud Design
        </Text>
      </Box>
      <Flex
        h={8}
        bgColor={"#DB4F33"}
        color={"white"}
        justify={"center"}
        align={"center"}
      >
        <Text
          sx={{
            position: "relative",
            _before: {
              top: 2,
              left: -8,
              position: "absolute",
              content: '" "',
              transform: "rotate(225deg)",
              transformOrigin: "center",
              color: "transparent",
              width: 3,
              height: 3,
              borderBottom: "1px solid white",
              borderRight: "1px solid white",
            },
            _after: {
              top: 2,
              right: -8,
              position: "absolute",
              content: '" "',
              transform: "rotate(225deg)",
              transformOrigin: "center",
              color: "transparent",
              width: 3,
              height: 3,
              borderBottom: "1px solid white",
              borderRight: "1px solid white",
            },
          }}
        >
          長按上方圖片存儲並分享
        </Text>
      </Flex>
      <Stack p={8} spacing={4}>
        <Button
          bgColor={"black"}
          color={"white"}
          _hover={{
            bg: "black",
            color: "white",
          }}
        >
          參與你的設計週路線
        </Button>
        <HStack spacing={4} w={"full"} mb={8}>
          <Button
            flex={1}
            onClick={downloadImage}
            bgColor={"black"}
            color={"white"}
            _hover={{
              bg: "black",
              color: "white",
            }}
            isLoading={isGeneratingImage}
          >
            存儲結果
          </Button>
          <Button
            flex={1}
            bgColor={"black"}
            color={"white"}
            _hover={{
              bg: "black",
              color: "white",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            再測試一次
          </Button>
        </HStack>
        <HStack
          spacing={0}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"2xl"}
        >
          <Text fontSize={"lg"}>官方社交平合：</Text>
          <Link href="https://www.facebook.com/macaodesignweek" mr={2}>
            <Icon fontSize={"3xl"} fontWeight={"bold"} as={FaFacebookF}></Icon>
          </Link>
          <Link href="https://www.instagram.com/macao.da/">
            <Icon fontSize={"3xl"} fontWeight={"bold"} as={FaInstagram}></Icon>
          </Link>
        </HStack>
      </Stack>
    </>
  );
};

export default ResultPage;
