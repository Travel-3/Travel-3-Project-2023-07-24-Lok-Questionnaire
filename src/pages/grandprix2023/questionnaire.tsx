import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  AspectRatio,
  Image,
  Box,
} from "@chakra-ui/react";
import QuestionCard from "@/components/GrandPrix2023/QuestionCard";
import { useRouter } from "next/router";

const questionsData = [
  {
    question: "一天當中，哪一個時間段讓你覺得最舒服?",
    options: [
      { value: "q1a", label: "A. 早上", score: 2 },
      { value: "q1b", label: "B. 下午或黃昏", score: 4 },
      { value: "q1c", label: "C. 深夜", score: 6 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q1_logo.png",
    },
  },
  {
    question: "辦公室/休息時，你喜歡的坐姿是?",
    options: [
      { value: "q2a", label: "A. 兩腳交叉", score: 4 },
      { value: "q2b", label: "B. 膝蓋併攏", score: 6 },
      { value: "q2c", label: "C. 伸直雙腿", score: 2 },
      { value: "q2d", label: "D. 一腿蜷縮在身下", score: 1 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q2_logo.png",
    },
  },
  {
    question: "當你刷到很好笑的視頻時候，你會?",
    options: [
      { value: "q3a", label: "A. 開懷大笑", score: 6 },
      { value: "q3b", label: "B. 輕聲捂嘴笑", score: 3 },
      { value: "q3c", label: "C. 強忍不發出聲音笑", score: 4 },
      { value: "q3d", label: "D. 羞怯地微笑", score: 5 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q3_logo.png",
    },
  },
];

const MAX_QUESTIONS = questionsData.length;

const QuestionnairePage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const [totalScore, setTotalScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleGenerateClick = () => {
    // Reset validation states
    setIsValid(true);
    setErrorMessage("");

    if (!userName) {
      setIsValid(false);
      setErrorMessage("名字不能為空！");
      return;
    }

    if (userName.length > 10) {
      setIsValid(false);
      setErrorMessage("名字不能超過10個字符！");
      return;
    }

    router.push(`/grandprix2023/result?score=${totalScore}&name=${userName}`);
  };

  useEffect(() => {
    if (currentQuestion > MAX_QUESTIONS && totalScore === 0) {
      let score = 0;
      for (let i = 1; i <= MAX_QUESTIONS; i++) {
        const selectedValue = answers[i];
        const question = questionsData[i - 1];
        const selectedOption = question.options.find(
          (option) => option.value === selectedValue,
        );
        if (selectedOption) {
          score += selectedOption.score;
        }
      }

      setTotalScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const handleNextQuestion = (selectedOption: any) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [currentQuestion]: selectedOption,
    }));

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <Box position={"relative"} w={"100vw"} h={"100vh"}>
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
          src="/assets/grandprix2023/images/questionnaire_bg.png"
          alt="questionnaire_bg"
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={304 / 103}
        w={"35%"}
        top={"3%"}
        right={"5%"}
      >
        <Image
          w={"100%"}
          objectFit={"cover"}
          src="/assets/grandprix2023/images/gp2013_travel3_logo.png"
          alt="gp2013_travel3_logo"
        />
      </AspectRatio>
      <Flex
        position={"relative"}
        minH={"100vh"}
        minW={"100vw"}
        direction="column"
        align="center"
        justify={"center"}
        zIndex={10}
      >
        {currentQuestion <= questionsData.length ? (
          <Box position={"absolute"} top={"15%"} px={6}>
            <QuestionCard
              question={questionsData[currentQuestion - 1].question}
              options={questionsData[currentQuestion - 1].options}
              onNext={handleNextQuestion}
              currentQuestion={currentQuestion}
              questionLogo={
                questionsData[currentQuestion - 1].meta.question_logo
              }
            />
          </Box>
        ) : (
          <Stack
            position={"absolute"}
            top={"15%"}
            px={6}
            spacing="0"
            align="center"
          >
            <Text
              mb={4}
              fontSize="4xl"
              fontWeight={"extrabold"}
              color={"black"}
            >
              測驗完成
            </Text>
            <Text mb={4} fontSize={"lg"} fontWeight={"bold"} color={"black"}>
              輸入你的名字
            </Text>
            <Input
              backgroundColor={"rgba(233, 196, 66, 0.8)"}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              w={"full"}
              border={"3px"}
              borderColor={"black"}
              borderStyle={"solid"}
              fontSize={"xl"}
              fontWeight={"bold"}
              size={"lg"}
              color={"black"}
            />
            {!isValid && (
              <Text w={"full"} float={"left"} fontSize={"sm"} color="red">
                {errorMessage}
              </Text>
            )}
            <Button
              mt={4}
              w={"full"}
              backgroundColor={"rgba(233, 196, 66, 0.8)"}
              border={"3px"}
              borderColor={"black"}
              borderStyle={"solid"}
              borderRadius="md"
              color={"black"}
              fontWeight={"extrabold"}
              _active={{
                backgroundColor: "rgba(233, 196, 66, 0.8)",
              }}
              onClick={handleGenerateClick}
              size={"lg"}
            >
              生成你的貓貓
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default QuestionnairePage;
