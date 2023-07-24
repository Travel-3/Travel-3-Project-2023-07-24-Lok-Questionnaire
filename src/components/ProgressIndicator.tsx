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
    <Box p="4" mb="4" borderWidth="1px" borderRadius="md">
      <Text>
        Question {currentQuestion} of {totalQuestions}
      </Text>
    </Box>
  );
};

export default ProgressIndicator;
