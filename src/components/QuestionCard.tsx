// components/QuestionCard.tsx
import React, { useState } from "react";
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
  onPrev: () => void;
  currentQuestion: number;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, options, onNext, onPrev, currentQuestion } = props;
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    onNext(selectedOption!);
  };

  return (
    <Stack justifyContent={"center"} textAlign={"center"}>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        Q{currentQuestion}
      </Text>
      <Text size="lg" mb="4">
        {question}
      </Text>
      <Stack spacing="4">
        {options.map((option) => {
          const radio = getRadioProps({ option });
          return (
            <RadioCard key={option.value} {...radio}>
              {option.label}
            </RadioCard>
          );
        })}
      </Stack>
      {/* <RadioGroup onChange={handleOptionChange} value={selectedOption}>
        <Stack spacing="2">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup> */}
      {currentQuestion > 1 && ( // <-- add this
        <Button mt="4" mr={4} colorScheme="teal" onClick={onPrev}>
          Prev
        </Button>
      )}
      <Button
        mt="4"
        colorScheme="teal"
        disabled={!selectedOption}
        onClick={handleNext}
      >
        Next
      </Button>
    </Stack>
  );
};

export default QuestionCard;
