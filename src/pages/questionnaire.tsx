// pages/questionnaire.js
import { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import QuestionCard from "../components/QuestionCard";
import ProgressIndicator from "../components/ProgressIndicator";
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

  const handleNextQuestion = (selectedOption: any) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [currentQuestion]: selectedOption,
    }));

    // Move to the next question or calculate the result if all questions are answered
    if (currentQuestion < MAX_QUESTIONS) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Calculate the result
      let totalScore = 0;
      for (let i = 1; i <= MAX_QUESTIONS; i++) {
        const selectedValue = answers[i];
        const question = questionsData[i - 1];
        const selectedOption = question.options.find(
          (option) => option.value === selectedValue,
        );
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
      }

      // Display the result (you can redirect the user to the result page or show it here)
      console.log("Total Score:", totalScore);

      router.push(`/result?score=${totalScore}`);
    }
  };

  return (
    <Flex direction="column" align="center" mt="8">
      <Heading mb="4">Psychological Test Questionnaire</Heading>
      {currentQuestion <= questionsData.length ? (
        <>
          <ProgressIndicator
            currentQuestion={currentQuestion}
            totalQuestions={questionsData.length}
          />
          <QuestionCard
            question={questionsData[currentQuestion - 1].question}
            options={questionsData[currentQuestion - 1].options}
            onNext={handleNextQuestion}
          />
        </>
      ) : (
        <Heading>Your questionnaire is complete!</Heading>
      )}
    </Flex>
  );
};

export default QuestionnairePage;
