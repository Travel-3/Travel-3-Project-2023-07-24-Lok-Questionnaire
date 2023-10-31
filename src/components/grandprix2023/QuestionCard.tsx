// components/QuestionCard.tsx
import React from "react";
import {
  Text,
  Stack,
  Button,
  useRadioGroup,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
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
  questionLogo?: string;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, options, onNext, currentQuestion, questionLogo } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value: string) => onNext(value),
  });

  return (
    <Stack justifyContent={"center"} textAlign={"center"} w={"100%"}>
      <AspectRatio ratio={158 / 121} w={"20%"} mb={6}>
        <Image
          objectFit={"cover"}
          w={"100%"}
          src={questionLogo}
          alt="questionLogo"
        />
      </AspectRatio>
      <Text
        mb="2"
        fontWeight={"extrabold"}
        fontSize={"2xl"}
        color={"black"}
        textAlign={"left"}
      >
        {question}
      </Text>
      <Stack spacing={3} w={"100%"}>
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
