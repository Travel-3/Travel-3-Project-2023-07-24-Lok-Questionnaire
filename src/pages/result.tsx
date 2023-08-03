// pages/result.js
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ResultPage = () => {
  const router = useRouter();
  const { score, name } = router.query;
  const resultText = `${name}, your total score is: ${score}`;

  return (
    <Flex direction="column" align="center" mt="8">
      <Heading mb="4">Result</Heading>
      <Text fontSize="xl">{resultText}</Text>
    </Flex>
  );
};

export default ResultPage;
