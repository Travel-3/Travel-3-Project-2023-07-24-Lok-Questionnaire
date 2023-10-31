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
  HStack,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
import ReactCurvedText from "react-curved-text";

export default function Home() {
  return (
    <Box position={"relative"} w={"100vw"} h={"100vh"}>
      <AspectRatio
        position={"absolute"}
        zIndex={1}
        ratio={1080 / 2074}
        w={"100vw"}
        h={"100vh"}
      >
        <Image
          w={"100%"}
          objectFit={"cover"}
          src="/assets/grandprix2023/images/gp2023_bg.png"
          alt="background"
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={308 / 88}
        top={"4%"}
        right={"-3%"}
        w={"30%"}
      >
        <Button
          as={Link}
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/event_details.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          href="/grandprix2023/questionnaire"
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={308 / 88}
        top={"9%"}
        right={"-3%"}
        w={"30%"}
      >
        <Button
          as={Link}
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/event_prize.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          href="/grandprix2023/questionnaire"
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={378 / 147}
        bottom={"4%"}
        left={"30%"}
        w={"40%"}
        h={"auto"}
        mb={4}
      >
        <Button
          as={Link}
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/start_button.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          href="/grandprix2023/questionnaire"
          _active={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/start_button.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
        />
      </AspectRatio>
    </Box>
  );
}
