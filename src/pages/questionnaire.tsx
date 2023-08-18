import { useEffect, useState } from "react";
import { Flex, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import QuestionCard from "../components/QuestionCard";
import { useRouter } from "next/router";

const questionsData = [
  {
    question: "一天當中，哪一個時間段讓你覺得最舒服?",
    options: [
      { value: "q1a", label: "A. 早上", score: 2 },
      { value: "q1b", label: "B. 下午或黃昏", score: 4 },
      { value: "q1c", label: "C. 深夜", score: 6 },
    ],
  },
  {
    question: "辦公室/休息時，你喜歡的坐姿是?",
    options: [
      { value: "q2a", label: "A. 兩腳交叉", score: 4 },
      { value: "q2b", label: "B. 膝蓋併攏", score: 6 },
      { value: "q2c", label: "C. 伸直雙腿", score: 2 },
      { value: "q2d", label: "D. 一腿蜷縮在身下", score: 1 },
    ],
  },
  {
    question: "當你刷到很好笑的視頻時候，你會?",
    options: [
      { value: "q3a", label: "A. 開懷大笑", score: 6 },
      { value: "q3b", label: "B. 輕聲捂嘴笑", score: 3 },
      { value: "q3c", label: "C. 強忍不發出聲音笑", score: 4 },
      { value: "q3d", label: "D. 羞怯地微笑", score: 5 },
    ],
  },
  {
    question: "在你專注工作/學習時，突然有人打斷你",
    options: [
      { value: "q4a", label: "A. 生氣，並給臉色對方看", score: 2 },
      { value: "q4b", label: "B. 詢問對方什麼事情，歡迎對方", score: 6 },
      { value: "q4c", label: "C. 在上述兩端之間", score: 4 },
    ],
  },
  {
    question: "你喜歡的睡覺姿勢?",
    options: [
      { value: "q5a", label: "A. 把頭枕在手臂上", score: 2 },
      { value: "q5b", label: "B. 平躺", score: 7 },
      { value: "q5c", label: "C. 側躺", score: 4 },
      { value: "q5d", label: "D. 俯躺", score: 6 },
      { value: "q5e", label: "E. 被子蓋過頭", score: 1 },
    ],
  },
  {
    question: "你的夢境中經常出現以下哪一種?",
    options: [
      { value: "q6a", label: "A. 身體突然墜落", score: 4 },
      { value: "q6b", label: "B. 打架/掙扎", score: 2 },
      { value: "q6c", label: "C. 找東西/人", score: 3 },
      { value: "q6d", label: "D. 飛", score: 5 },
      { value: "q6e", label: "E. 不太會做夢", score: 6 },
      { value: "q6f", label: "F. 讓你感到開心的夢", score: 1 },
    ],
  },
  {
    question: "當你去參加派對或聚會時，你會?",
    options: [
      { value: "q7a", label: "A. 找認識的人", score: 4 },
      { value: "q7b", label: "B. 靜靜地坐在一旁", score: 2 },
      { value: "q7c", label: "C. 周圍結識新朋友", score: 6 },
    ],
  },
  {
    question: "與人聊天時，你習慣?",
    options: [
      { value: "q8a", label: "A. 手臂交叉", score: 4 },
      { value: "q8b", label: "B. 兩手緊握", score: 2 },
      { value: "q8c", label: "C. 手放在臀部", score: 5 },
      { value: "q8d", label: "D. 觸碰著對方", score: 7 },
      { value: "q8e", label: "E. 用手整理頭髮/摸下巴或耳朵", score: 6 },
    ],
  },
  {
    question: "你的走路方式?",
    options: [
      { value: "q9a", label: "A. 慢慢地", score: 1 },
      { value: "q9b", label: "B. 低著頭", score: 2 },
      { value: "q9c", label: "C. 仰著頭", score: 7 },
      { value: "q9d", label: "D. 大步快步走", score: 6 },
      { value: "q9e", label: "E. 小步快步走", score: 4 },
    ],
  },
  {
    question: "選擇你喜歡的顏色?",
    options: [
      { value: "q10a", label: "A. 紅/橘色", score: 6 },
      { value: "q10b", label: "B. 黑色", score: 7 },
      { value: "q10c", label: "C. 黃色/淺藍色", score: 5 },
      { value: "q10d", label: "D. 綠色", score: 4 },
      { value: "q10e", label: "E. 深藍色/紫色", score: 3 },
      { value: "q10f", label: "F. 白色", score: 2 },
      { value: "q10g", label: "G. 棕/灰色", score: 1 },
    ],
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

    router.push(`/result?score=${totalScore}&name=${userName}`);
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
    <Flex direction="column" align="center" p="8" justify={"center"}>
      {currentQuestion <= questionsData.length ? (
        <>
          <QuestionCard
            question={questionsData[currentQuestion - 1].question}
            options={questionsData[currentQuestion - 1].options}
            onNext={handleNextQuestion}
            currentQuestion={currentQuestion}
          />
        </>
      ) : (
        <Stack spacing="2" align="center">
          <Text mb={8} fontSize="4xl">
            測驗完成
          </Text>
          <Text mb={8} fontSize={"lg"}>
            輸入你的名字
          </Text>
          <Input
            bgColor={"white"}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            w={"full"}
            border={"1px"}
            borderColor={"black"}
            fontSize={"xl"}
            size={"lg"}
          />
          {!isValid && (
            <Text w={"full"} float={"left"} fontSize={"sm"} color="red">
              {errorMessage}
            </Text>
          )}
          <Button
            mt={4}
            w={"full"}
            bgColor={"black"}
            borderRadius="md"
            color={"white"}
            _active={{
              bg: "black",
              borderColor: "black",
            }}
            onClick={handleGenerateClick}
            size={"lg"}
          >
            生成你的貓貓
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default QuestionnairePage;
