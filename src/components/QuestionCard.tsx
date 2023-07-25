// components/QuestionCard.tsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Button,
} from "@chakra-ui/react";

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

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    onNext(selectedOption!);
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="md">
      <Heading as="h3" size="lg" mb="4">
        {question}
      </Heading>
      <RadioGroup onChange={handleOptionChange} value={selectedOption}>
        <Stack spacing="2">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
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
    </Box>
  );
};

export default QuestionCard;
