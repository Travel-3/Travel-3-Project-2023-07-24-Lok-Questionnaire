import { Flex, Image, Stack, Text } from "@chakra-ui/react";
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
        <Text mb={2} textAlign={"center"}>
          Powered by Travel3
        </Text>
      </Stack>
    </>
  );
};

export default Footer;
