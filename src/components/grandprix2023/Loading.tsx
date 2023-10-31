import { Box, HStack, Image, Img, Spacer, Stack, Text } from "@chakra-ui/react";
import Footer from "./Footer";

function Loading() {
  return (
    <Box
      bgImage={"/assets/grandprix2023/images/questionnaire_bg.png"}
      bgSize={"cover"}
      bgRepeat={"repeat-y"}
      w={"100vw"}
      h={"100vh"}
    >
      <Stack
        w={"100vw"}
        h={"70vh"}
        spacing={0}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src={"/assets/images/travel_buddies.gif"}
          boxSize={"24"}
          objectFit={"cover"}
          alt="Loading"
          mb={4}
        />
        <Text
          width={"fill"}
          textAlign={"center"}
          fontSize={"4xl"}
          fontWeight={"extrabold"}
          color={"black"}
        >
          Loading...
        </Text>
      </Stack>
    </Box>
  );
}

export default Loading;
