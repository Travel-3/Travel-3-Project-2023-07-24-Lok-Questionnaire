import {
  Text,
  Stack,
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
  // currentQuestion: number;
  questionLogo?: string;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { question, options, onNext, questionLogo } = props;

  const { getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value: string) => onNext(value),
  });

  return (
    <Stack justifyContent={"center"} textAlign={"center"} w={"100%"}>
      <AspectRatio ratio={157 / 120} w={"20%"} mb={6}>
        <Image
          objectFit={"cover"}
          w={"100%"}
          src={questionLogo}
          alt="questionLogo"
        />
      </AspectRatio>
      <Text
        mb={4}
        fontWeight={700}
        fontSize={"xl"}
        fontFamily={"Noto Sans TC"}
        color={"black"}
        textAlign={"left"}
      >
        {question}
      </Text>
      <Stack spacing={3} w={"100%"} px={4}>
        {options.map((option, index) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <RadioCard w={"100%"} key={option.value} {...radio} id={index}>
              {option.label}
            </RadioCard>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default QuestionCard;
