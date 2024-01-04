import Answer from "@/entities/Answer";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type AnswerContextState = {
  answers: Answer[];
  index: number;
  addAnswer: (answer: Answer) => void;
  getScore: () => number;
};

export const AnswerContext = createContext<AnswerContextState>({
  answers: [],
  index: 0,
  addAnswer: () => {},
  getScore: () => 0,
});

export type AnswerProviderProps = PropsWithChildren & {
  totalQuestions: number;
};

export function AnswerProvider({
  children,
  totalQuestions,
}: AnswerProviderProps) {
  const [answers, setAnswers] = useState<Answer[]>(
    // Array.from({ length: totalQuestions })
    [],
  );
  const [index, setIndex] = useState<number>(0);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      if (index >= totalQuestions) {
        return;
      }

      setAnswers((_answers) => {
        const newAnswers = [..._answers];
        newAnswers[index] = answer;
        return newAnswers;
      });
      setIndex((_index) => {
        return _index + 1;
      });
    },
    [index],
  );

  const getScore = useCallback(() => {
    return answers.reduce((acc, answer) => {
      return acc + answer.score;
    }, 0);
  }, [answers]);

  return (
    <AnswerContext.Provider
      value={{
        answers,
        index,
        addAnswer: handleAnswer,
        getScore,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export const useAnswers = () => {
  const { answers, index, addAnswer, getScore } = useContext(AnswerContext);
  return { answers, index, addAnswer, getScore };
};
