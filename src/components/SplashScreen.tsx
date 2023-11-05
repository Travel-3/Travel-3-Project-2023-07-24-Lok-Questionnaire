import { Box, Flex, Text } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import InView from "./InView";

export default function SplashScreen({
  title,
  isLoaded,
  children,
}: { isLoaded?: boolean; title?: string } & PropsWithChildren) {
  return (
    <>
      <Box
        zIndex={isLoaded ? 0 : 99}
        bg="#e4d9c4"
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        right={0}
        opacity={isLoaded ? 0 : 1}
        userSelect={isLoaded ? "none" : "auto"}
        transition="opacity 0.3s ease-out"
      >
        <Flex
          w="full"
          h="100%"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {title && <Text>{title}</Text>}

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
      <InView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          w="full"
          h="full"
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.3s ease-out"
        >
          {children}
        </Box>
      </InView>
    </>
  );
}
