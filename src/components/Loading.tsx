import { Box, HStack, Image, Img, Spacer, Stack, Text } from "@chakra-ui/react";
import Footer from "./Footer";

function Loading() {
  return (
    <Box
      bgImage={"/assets/images/background.png"}
      bgSize={"cover"}
      bgRepeat={"repeat-y"}
      w={"100vw"}
      h={"100vh"}
    >
      <Stack
        w={"100vw"}
        h={"100vh"}
        bgGradient={
          "linear(transparent 0%, transparent calc(100% - 100px), rgba(255,0,0,0.3) calc(100% - 50px), rgba(255,0,0,0.6) calc(100% - 25px), rgba(255,0,0,0.8) calc(100% - 12.5px), rgba(255,0,0,1) 100%)"
        }
        spacing={0}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack p={6} width={"100%"} mb={24}>
          <Img
            boxSize={12}
            objectFit={"contain"}
            src="/assets/images/small_logo_1.png"
            alt="logo"
          />
          <Spacer />
          <Img
            boxSize={12}
            objectFit={"contain"}
            src="/assets/images/small_logo_2.png"
            alt="logo"
          />
        </HStack>
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
          fontSize={"lg"}
          color={"black"}
        >
          loading...
        </Text>
        <Spacer />
        <Footer />
      </Stack>
    </Box>
  );
}

export default Loading;
