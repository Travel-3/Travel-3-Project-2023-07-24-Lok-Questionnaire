import { Flex, Image, Img, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

// components/Footer.tsx
const Footer = () => {
  const router = useRouter();
  return (
    <>
      <Stack p={2} w={"100vw"} justifyContent={"center"} alignItems={"center"}>
        {router.pathname == "/result" || router.pathname == "/" ? null : (
          <Image
            boxSize={48}
            objectFit={"contain"}
            src="/assets/images/2023logo.png"
            alt="logo"
          />
        )}
        <Text zIndex={10} mb={2} textAlign={"center"}>
          Powered by Travel3
        </Text>
      </Stack>
      {/* <Img zIndex={1} position={'absolute'} bottom={0} left={0} height={'100px'} objectFit={"cover"} src="/assets/images/bgGradient.png" alt="bgGradient" /> */}
    </>
  );
};

export default Footer;
