import { Box, Button, Container, Link, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Container maxW={"container.xl"}>
        <Text>Hello, Start the test now!</Text>
        <Link colorScheme="teal" variant="outline" href="/questionnaire">
          Test
        </Link>
      </Container>
    </>
  );
}
