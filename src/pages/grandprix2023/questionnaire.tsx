import { useEffect, useState } from "react";
import {
  Flex,
  // Heading,
  // Input,
  // Button,
  Stack,
  Text,
  AspectRatio,
  Image,
  Box,
} from "@chakra-ui/react";
import QuestionCard from "@/components/GrandPrix2023/QuestionCard";
import { useRouter } from "next/router";
import Input from "@/components/GrandPrix2023/Input";
import Button from "@/components/GrandPrix2023/Button";
import { Global, css } from "@emotion/react";

const questionsData = [
  {
    question: "今年是第 （ ）屆的澳門格蘭披治大賽車？",
    options: [
      { value: "q1a", label: "70", score: 10 },
      { value: "q1b", label: "60", score: 1 },
      { value: "q1c", label: "80", score: 3 },
      { value: "q1d", label: "99", score: 3 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q1.svg",
    },
  },
  {
    question: "賽車旗號題，賽事完結會以哪個旗號表示？",
    options: [
      { value: "q2a", label: "藍旗", score: 1 },
      { value: "q2b", label: "黑旗", score: 2 },
      { value: "q2c", label: "黃旗", score: 3 },
      { value: "q2d", label: "黑白格旗", score: 10 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q2.svg",
    },
  },
  {
    question: "澳門格蘭披治三級方程式大賽圈速記錄 保持者為？",
    options: [
      { value: "q3a", label: "維比斯", score: 10 },
      { value: "q3b", label: "菲比斯", score: 3 },
      { value: "q3c", label: "美斯", score: 2 },
      { value: "q3d", label: "雲迪素", score: 1 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q3.svg",
    },
  },
  {
    question: "澳門澳門GT盃圈速記錄圈速記錄 保持者為？",
    options: [
      { value: "q4a", label: "班博", score: 10 },
      { value: "q4b", label: "阿木", score: 1 },
      { value: "q4c", label: "拓海", score: 3 },
      { value: "q4d", label: "拓也", score: 2 },
    ],
    meta: {
      question_logo: "/assets/grandprix2023/images/q4.svg",
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
    <>
      <Global
        styles={css`
          body,
          html {
            background-color: #e4d9c4;
          }
        `}
      />
      <Box position={"relative"} w={"100%"} h={"100vh"}>
        <AspectRatio
          position={"absolute"}
          zIndex={1}
          ratio={1080 / 2074}
          w={"100%"}
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
          direction="column"
          align="center"
          justify={"center"}
          zIndex={10}
          height="100%"
        >
          {currentQuestion <= questionsData.length ? (
            <Box position={"absolute"} top={"15%"} px={4}>
              <QuestionCard
                question={questionsData[currentQuestion - 1].question}
                options={questionsData[currentQuestion - 1].options}
                onNext={handleNextQuestion}
                // currentQuestion={currentQuestion}
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
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              {!isValid && (
                <Text w={"full"} float={"left"} fontSize={"sm"} color="red">
                  {errorMessage}
                </Text>
              )}
              <Button
                mt={4}
                w="160px"
                h={`${160 * 0.28431372549019607}px`}
                onClick={handleGenerateClick}
              >
                <Text fontWeight={700}>生成你的車手貓貓</Text>
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default QuestionnairePage;
