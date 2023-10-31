// pages/result.js
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image as Img,
  Link,
  Spacer,
  Stack,
  Text,
  Alert,
  AlertDescription,
  CloseButton,
  useDisclosure,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { useState, useEffect, useCallback } from "react";
import Loading from "@/components/grandprix2023/Loading";
import html2canvas from "html2canvas";
import { Routes } from "@/constants/routes";

const resultData = {
  results: [
    {
      score_range: "16-30",
      mask: "孤獨完美主義者<b>浪頭</b>",
      hidden_mask: "#小丑面具",
      personality_hidden: "37%",
      description:
        "你擁有近乎強迫症般的追求完美，行事謹慎小心，外表堅強，內心有時缺乏自信，做事情挑剔，不容許自己犯一點點的錯誤。人前搞笑開心果，人後習慣獨自舔傷口。社交場上歡脫熱略，繁華散盡，徒留清醒。表要熱衷於身處喧嘩，實際上內心冷淡抽離。",
      keywords: ["#外熱內冷", "#追求完美", "#孤獨患者"],
      recommended_route: "#設計愛好者路線",
      recommendation: "追求完美的你一定對身邊的一切美好設計充滿期待",
      image: "assets/images/wave.png",
    },
    {
      score_range: "31-40",
      mask: "高冷莫測的<b>毛山</b>",
      hidden_mask: "#冷漠面具",
      personality_hidden: "59%",
      description:
        "你的內心有著很強的控制欲望，對於周圍的環境相當敏感。你不太輕易和別人成為朋友，但一旦成為朋友則非常忠誠，而且更渴望對方也能夠同樣的態度來重視你。",
      keywords: ["#高冷莫測", "#直覺敏銳", "#敏感纖細"],
      recommended_route: "#設計專業路線",
      recommendation: "保持敏銳，汲取靈感；享受孤獨，傾聽內心",
      image: "assets/images/joshua.png",
    },
    {
      score_range: "41-50",
      mask: "陽光率性的<b>阿布</b>",
      hidden_mask: "#沒有面具",
      personality_hidden: "0%",
      description:
        "為人謙遜，但同時有自己的主見，能夠理解他人，懂得照顧他人的感受，不容許別人的侵犯。有著很強的自我控制力，下決心做的事情一定會成功。喜歡交朋友，人際關係處理的不錯，常常是朋友圈裡最值得信賴的人物。",
      keywords: ["#平易近人", "#陽光率性", "#值得信賴"],
      recommended_route: "#設計與商業路線",
      recommendation: "獨具慧眼的你定能從設計關鍵詞中發掘商機",
      image: "assets/images/brad.png",
    },
    {
      score_range: "51",
      mask: "不按套路的變臉人<b>布魯斯</b>",
      hidden_mask: "#千人千面",
      personality_hidden: "101%",
      description:
        "你的性格屬於愛冒險的人，通常大腦的思維非常活躍，是天生的領袖！喜歡嘗試新鮮的事情，常常不按套路出牌，語不驚人誓不罷休；決策果敢而堅決，不易受他人影響。",
      keywords: ["#千人千面", "#敢於冒險", "#人間清醒"],
      recommended_route: "#設計週全路線",
      recommendation: "敢於冒險的你，注定要嘗試一切嶄新的事物",
      image: "assets/images/bruce.png",
    },
  ],
};

const ResultPage = () => {
  const router = useRouter();
  const { score, name } = router.query;
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const numericalScore = Number(score);
  const scale = 3;

  const result = resultData.results.find(({ score_range }) => {
    const [min, max] = score_range.split("-");
    return numericalScore >= Number(min) && numericalScore <= Number(max || 64);
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

  const buildImage = () => {
    const node: any = document.getElementById("resultCard");
    let dataUrl = "";

    setTimeout(() => {
      html2canvas(node, {
        scale: scale,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        dataUrl = canvas.toDataURL();
        setImageDataUrl(dataUrl);
      });
    }, 1000);

    return dataUrl;
  };

  const handleDownloadImage = async () => {
    setIsGeneratingImage(true);
    saveAs(imageDataUrl, "result.png");
    setIsGeneratingImage(false);
  };

  useEffect(() => {
    if (router.query.score && router.query.name) {
      buildImage();
    }
  }, [router]);

  const longPressEvent = useLongPress(handleDownloadImage, 700);

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <>
      {imageDataUrl === "" ? (
        <Flex
          zIndex={100}
          position={"fixed"}
          top={0}
          left={0}
          w={"100vw"}
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          bgColor={"black"}
        >
          <Loading />
        </Flex>
      ) : null}
      {imageDataUrl === "" ? (
        <Box
          position={"relative"}
          id="resultCard"
          w={"100vw"}
          h={"100vh"}
          {...longPressEvent}
        >
          <Stack position={"relative"} w={"100vw"} h={"100vh"} align="center">
            <AspectRatio
              position={"absolute"}
              zIndex={1}
              ratio={1080 / 2074}
              w={"100vw"}
              h={"100vh"}
            >
              <Image
                w={"100%"}
                objectFit={"cover"}
                src="/assets/grandprix2023/images/result_bg.png"
                alt="background"
              />
            </AspectRatio>
            <AspectRatio
              position={"absolute"}
              zIndex={10}
              ratio={417 / 421}
              top={"35%"}
              left={"4%"}
              w={"40%"}
            >
              <Image
                w={"100%"}
                objectFit={"cover"}
                src="/assets/grandprix2023/images/gp2023_travelbuddy_logo.png"
                alt="gp2023_travelbuddy_logo"
              />
            </AspectRatio>
            <Stack
              top={"38%"}
              right={"13%"}
              position={"absolute"}
              zIndex={10}
              width={"auto"}
              spacing={0}
            >
              <Text
                ml={1}
                mt={-2}
                mb={1}
                fontSize={"2xl"}
                fontWeight={"bold"}
                color={"black"}
              >
                {name}
              </Text>
              <Text
                mt={-2}
                fontSize={"3xl"}
                fontWeight={"bold"}
                color={"black"}
              >
                {/* {result?.personality_hidden} */}
                世界級車手
              </Text>
            </Stack>
            <Stack
              top={"55%"}
              position={"absolute"}
              zIndex={10}
              width={"100vw"}
              px={"10%"}
              spacing={0}
            >
              <Text
                ml={1}
                mt={-2}
                mb={1}
                fontSize={"xl"}
                fontWeight={"bold"}
                color={"black"}
                textAlign={"center"}
              >
                參加者只需參與「賽車Q&A送大禮」
                活動，參與賽車Q&A，即有機會參與抽獎！參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！
              </Text>
            </Stack>
            <AspectRatio
              position={"absolute"}
              zIndex={10}
              ratio={1015 / 1015}
              top={"75%"}
              left={"38%"}
              w={"25%"}
            >
              <Image
                w={"100%"}
                objectFit={"cover"}
                src="/assets/grandprix2023/images/gp2023_qrcode.png"
                alt="gp2023_qrcode"
              />
            </AspectRatio>
            {/* <Stack
              id="resultDetailsCard"
              spacing={0}
              position={'relative'}
              overflow={'hidden'}
              bgImage={'/assets/images/background.png'}
              bgSize={'cover'}
            >
              <Stack
                p={'10px'}
                pb={0}
                align="center"
                spacing={1}
                bgImage={'/assets/images/bgGradient.png'}
                bgPosition={'bottom'}
                bgSize={'contain'}
                bgRepeat={'no-repeat'}
                zIndex={10}
              >
                <HStack
                  zIndex={10}
                  width={'full'}
                  spacing={2}
                  justifyContent={'center'}
                  alignItems={'start'}
                  mb={4}
                >
                  <Box width={'45%'}>
                    <Img
                      id="resultImage"
                      width={'auto'}
                      height={'auto'}
                      src={result?.image}
                      objectFit={'cover'}
                      alt={name?.toString()}
                    />
                  </Box>
                  <Stack width={'55%'} spacing={0}>
                    <Text mt={-4} mb={2} fontSize={'30px'}>
                      {name}
                    </Text>
                    <Spacer />
                    <Text mb={-4}>人格隱藏度</Text>
                    <Text mt={-2} py={0} fontSize={'48px'}>
                      {result?.personality_hidden}
                    </Text>
                  </Stack>
                </HStack>
                <HStack justifyContent={'center'} alignItems={'center'}>
                  {result?.keywords.map((keyword) => (
                    <Flex
                      key={keyword}
                      bgColor={'black'}
                      borderRadius={'md'}
                      color={'white'}
                      py={1}
                      px={4}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Text
                        py={2}
                        mt={-4}
                        textAlign={'center'}
                        fontSize={'14px'}
                        color={'white'}
                        bgColor={'transparent'}
                      >
                        {keyword}
                      </Text>
                    </Flex>
                  ))}
                </HStack>
                <Text zIndex={10} fontSize={'sm'} mb={4} color={'black'}>
                  {result?.description}
                </Text>
                <Text
                  h={'34px'}
                  fontSize={'14px'}
                  px={4}
                  boxSizing="border-box"
                  textAlign={'center'}
                  color={'white'}
                  bgColor={'black'}
                  zIndex={10}
                  mb={2}
                >
                  建議你的設計週路線
                </Text>
                <Text
                  w={'full'}
                  fontSize={'24px'}
                  fontWeight={'bold'}
                  px={4}
                  textAlign={'center'}
                  zIndex={10}
                  mt={-4}
                >
                  {result?.recommended_route}
                </Text>
                <Text
                  w={'full'}
                  textAlign={'center'}
                  fontSize={'sm'}
                  zIndex={10}
                  mb={4}
                >
                  {result?.recommendation}
                </Text>
                <Img
                  boxSize={28}
                  objectFit={'contain'}
                  src="assets/images/2023logo.png"
                  alt="logo"
                  mb={4}
                  zIndex={10}
                />
              </Stack>
              <Text
                textAlign={'center'}
                bgColor={'white'}
                color={'black'}
                zIndex={10}
                fontSize={'md'}
                p={1}
              >
                <Img src={'/assets/images/event_date.png'} alt="event_date" />
              </Text>
            </Stack> */}
          </Stack>
          {/* <Stack justifyContent={'center'} alignItems={'center'}>
            <Text mt={-4} py={1} textAlign={'center'} color={'white'}>
              Character designed by Early Cloud Design
            </Text>
            <HStack justifyContent={'center'} alignItems={'center'} my={4}>
              <Text color={'white'} fontSize={'xl'} textAlign={'center'}>
                掃描
                <ChevronRightIcon ml={-1} mt={1} boxSize={14} />
              </Text>
              <Box>
                <Img
                  boxSize={32}
                  p={3}
                  bgColor={'white'}
                  borderRadius={'2xl'}
                  src="/assets/images/qr_code.png"
                  alt="qrcode"
                />
              </Box>
              <Text color={'white'} fontSize={'xl'} textAlign={'center'}>
                <ChevronLeftIcon mr={-1} mt={1} boxSize={14} />
                參加
              </Text>
            </HStack>
          </Stack> */}
        </Box>
      ) : (
        <Img src={imageDataUrl} alt="result" objectFit={"contain"} />
      )}
      <Box bottom={"4%"} position={"absolute"} w={"100vw"} h={8} zIndex={10}>
        <AspectRatio
          position={"absolute"}
          left={"4%"}
          ratio={320 / 123}
          w={"30%"}
        >
          <Button
            bgColor={"transparent"}
            as={Link}
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
        <AspectRatio
          position={"absolute"}
          right={"4%"}
          ratio={320 / 123}
          w={"30%"}
        >
          <Button
            bgColor={"transparent"}
            as={Link}
            w={"100%"}
            bgImage="/assets/grandprix2023/images/replay_button.png"
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
            href="/grandprix2023"
            _active={{
              bgColor: "transparent",
              bgImage: "/assets/grandprix2023/images/replay_button.png",
              bgPosition: "center",
              bgRepeat: "no-repeat",
              bgSize: "cover",
            }}
          />
        </AspectRatio>
      </Box>
      {/* <Stack p={8} spacing={4}>
        <Button
          bgColor={'black'}
          color={'white'}
          as="a"
          href={Routes[result?.recommended_route as string]}
          target="_blank"
          _hover={{
            bg: 'black',
            color: 'white',
          }}
        >
          獲取你的設計週路線
        </Button>
        <HStack spacing={4} w={'full'} mb={8}>
          <Button
            flex={1}
            onClick={handleDownloadImage}
            bgColor={'white'}
            color={'black'}
            border={'1px solid red'}
            borderRadius={'md'}
            isLoading={isGeneratingImage}
          >
            分享結果
          </Button>
          <Button
            flex={1}
            bgColor={'white'}
            color={'black'}
            border={'1px solid red'}
            borderRadius={'md'}
            onClick={() => {
              router.push('/')
            }}
          >
            再測試一次
          </Button>
        </HStack>
        <HStack
          spacing={0}
          justifyContent={'center'}
          alignItems={'center'}
          fontSize={'2xl'}
        >
          <Text fontSize={'lg'}>官方社交平台：</Text>
          <Link
            href="https://www.facebook.com/macaodesignweek"
            mr={2}
            target="_blank"
          >
            <Icon fontSize={'3xl'} fontWeight={'bold'} as={FaFacebookF}></Icon>
          </Link>
          <Link href="https://www.instagram.com/macao.da/" target="_blank">
            <Icon fontSize={'3xl'} fontWeight={'bold'} as={FaInstagram}></Icon>
          </Link>
        </HStack>
      </Stack> */}
      {/* {isVisible ? (
        <Alert
          zIndex={20}
          bgColor={'white'}
          bgImage={'/assets/images/background.png'}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="auto"
          position={'fixed'}
          bottom={0}
          left={0}
        >
          <CloseButton
            alignSelf="flex-end"
            position="absolute"
            right={2}
            top={2}
            onClick={onClose}
          />
          <Box>
            <AlertDescription maxWidth="sm">
              <Stack p={4} spacing={4}>
                <Button
                  bgColor={'black'}
                  color={'white'}
                  as="a"
                  href={Routes[result?.recommended_route as string]}
                  target="_blank"
                  _hover={{
                    bg: 'black',
                    color: 'white',
                  }}
                >
                  獲取你的設計週路線
                </Button>
                <HStack spacing={4} w={'full'}>
                  <Button
                    flex={1}
                    onClick={handleDownloadImage}
                    bgColor={'white'}
                    color={'black'}
                    border={'1px solid red'}
                    borderRadius={'md'}
                    isLoading={isGeneratingImage}
                  >
                    分享結果
                  </Button>
                  <Button
                    flex={1}
                    bgColor={'white'}
                    color={'black'}
                    border={'1px solid red'}
                    borderRadius={'md'}
                    onClick={() => {
                      router.push('/')
                    }}
                  >
                    再測試一次
                  </Button>
                </HStack>
              </Stack>
            </AlertDescription>
          </Box>
        </Alert>
      ) : null} */}
    </>
  );
};

export default ResultPage;
