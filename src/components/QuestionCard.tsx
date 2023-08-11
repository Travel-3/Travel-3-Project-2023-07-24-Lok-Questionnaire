// components/QuestionCard.tsx
import React from "react";
import { Text, Stack, Button, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "./RadioCard";

interface Option {
  value: string;
  label: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  onNext: (selectedOption: string) => void;
  currentQuestion: number;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, options, onNext, currentQuestion } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value: string) => onNext(value),
  });

  return (
    <Stack justifyContent={"center"} textAlign={"center"} w={"100%"}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        Q{currentQuestion}
      </Text>
      <Text size="lg" mb="4">
        {question}
      </Text>
      <Stack spacing="4" w={"100%"}>
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <RadioCard w={"100%"} key={option.value} {...radio}>
              {option.label}
            </RadioCard>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default QuestionCard;
