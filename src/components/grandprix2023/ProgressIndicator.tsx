// components/ProgressIndicator.js
import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { currentQuestion, totalQuestions } = props;
  return (
    <Box mb="4">
      <Text fontWeight={"bold"} fontSize={"4xl"}>
        Q {currentQuestion}
      </Text>
      {/* <Text>
        Question {currentQuestion} of {totalQuestions}
      </Text> */}
    </Box>
  );
};

export default ProgressIndicator;
