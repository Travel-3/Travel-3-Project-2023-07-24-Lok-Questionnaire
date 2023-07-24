// pages/result.js
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ResultPage = () => {
  const router = useRouter();
  const { score } = router.query; // Get the score from the query parameter

  // Convert the score to a meaningful result or display additional information
  const resultText = `Your total score is: ${score}`;

  return (
    <Flex direction="column" align="center" mt="8">
      <Heading mb="4">Result</Heading>
      <Text fontSize="xl">{resultText}</Text>
      {/* You can add more elements to display additional information */}
    </Flex>
  );
};

export default ResultPage;
