import {
  Flex,
  Button,
  Container,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Container maxW={"container.xl"}>
        <Stack p={8} minH={"100vh"}>
          <Stack justifyContent={"center"} textAlign={"center"}>
            <Icon mb={2} fontSize={"6xl"} w={"full"} />
            <Text fontWeight={"bold"} fontSize={"4xl"}>
              澳門設計週2023
            </Text>
            <Text fontWeight={"semibold"}>#城市的關鍵字</Text>
          </Stack>
          <Spacer />
          <Stack mb={24} justifyContent={"center"} textAlign={"center"}>
            <Text fontSize={"5xl"}>#測出你的</Text>
            <Text fontSize={"5xl"}>特種兵貓貓</Text>
          </Stack>
          <Spacer />
          <Stack justifyContent={"center"} textAlign={"center"}>
            <Button
              as={Link}
              border={"none"}
              variant="outline"
              href="/questionnaire"
              bgColor={"lightgrey"}
              size="lg"
              w="80%"
              mx={"auto"}
              fontSize={"3xl"}
              fontWeight={"normal"}
              mb={4}
            >
              START
            </Button>
            <Text fontWeight={"semibold"}>Technical support by Travel 3</Text>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
