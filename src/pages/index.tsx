import {
  Flex,
  Button,
  Container,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import ReactCurvedText from "react-curved-text";

export default function Home() {
  return (
    <>
      <Container maxW={"container.xl"}>
        <Stack p={8}>
          <Stack
            width={"100%"}
            justifyContent={"center"}
            textAlign={"center"}
            spacing={0}
            mb={16}
          >
            <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
              <ReactCurvedText
                width={300}
                height={40}
                cx={150}
                cy={50}
                rx={100}
                ry={30}
                startOffset={13}
                reversed={true}
                text="發掘你不為人知的"
                textProps={{ style: { fontSize: 24 } }}
              />
            </Flex>
            <Text mb={8} fontSize={"4xl"}>
              性格面具
            </Text>
            <Image
              w={"100%"}
              objectFit={"contain"}
              src="/assets/images/2023logo.png"
              alt="logo"
            />
          </Stack>
          <Spacer />
          <Stack justifyContent={"center"} textAlign={"center"} spacing={0}>
            <Text fontSize={"lg"}>一起來看看隱藏</Text>
            <Text fontSize={"lg"}>在你心中的貓貓性格吧！</Text>
          </Stack>
          <Spacer />
          <Stack justifyContent={"center"} textAlign={"center"}>
            <Button
              as={Link}
              color={"white"}
              border={"none"}
              variant="outline"
              href="/questionnaire"
              bgColor={"black"}
              size="lg"
              w="80%"
              mx={"auto"}
              fontSize={"3xl"}
              fontWeight={"normal"}
              mb={4}
            >
              START
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
