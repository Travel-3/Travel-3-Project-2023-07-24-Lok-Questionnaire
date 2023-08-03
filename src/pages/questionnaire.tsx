import { useEffect, useState } from "react";
import { Flex, Heading, Input, Button, Stack, Text } from "@chakra-ui/react";
import QuestionCard from "../components/QuestionCard";
import { useRouter } from "next/router";

const questionsData = [
  {
    question: "Question 1: How often do you feel stressed?",
    options: [
      { value: "rarely", label: "Rarely", score: 1 },
      { value: "sometimes", label: "Sometimes", score: 2 },
      { value: "often", label: "Often", score: 3 },
    ],
  },
  {
    question: "Question 2: How do you handle stress?",
    options: [
      { value: "ignore", label: "Ignore it", score: 1 },
      { value: "seek-support", label: "Seek support from others", score: 2 },
      { value: "exercise", label: "Engage in physical exercise", score: 3 },
    ],
  },
];

const MAX_QUESTIONS = questionsData.length;

const QuestionnairePage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const [totalScore, setTotalScore] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (currentQuestion > MAX_QUESTIONS && totalScore === null) {
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
          <Text fontSize="4xl" fontWeight="bold">
            測驗完成
          </Text>
          <Text>輸入你的名字</Text>
          <Input
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Your name"
            mb="4"
            w={"full"}
          />
          <Button
            w={"full"}
            bgColor={"lightgrey"}
            borderRadius="md"
            color={"black"}
            _active={{
              bg: "gray.600",
              borderColor: "gray.600",
            }}
            onClick={() => {
              if (userName) {
                router.push(`/result?score=${totalScore}&name=${userName}`);
              }
            }}
          >
            生成貓貓
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default QuestionnairePage;
