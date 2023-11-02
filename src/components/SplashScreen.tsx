import { Box, Flex, Text } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import InView from "./InView";

export default function SplashScreen({
  isLoaded,
  children,
}: { isLoaded: boolean } & PropsWithChildren) {
  return (
    <>
      {!isLoaded && (
        <Box
          zIndex={99}
          bg="#e4d9c4"
          position="fixed"
          top={0}
          left={0}
          bottom={0}
          right={0}
        >
          <Flex
            w="full"
            h="100%"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* <Image
                src={"/assets/images/travel_buddies.gif"}
                boxSize={"24"}
                objectFit={"cover"}
                alt="Loading"
                mb={4}
            /> */}
            <Text
              width={"fill"}
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"black"}
            >
              Loading 100%
            </Text>
          </Flex>
        </Box>
      )}
      <InView>{children}</InView>
    </>
  );
}
