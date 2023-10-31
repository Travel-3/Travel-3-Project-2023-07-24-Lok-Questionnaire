import { HStack, Image, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

// components/Header.tsx
const Header = () => {
  const router = useRouter();
  return (
    <>
      {router.pathname != "/result" ? (
        <HStack p={6}>
          <Image
            boxSize={12}
            objectFit={"contain"}
            src="/assets/images/small_logo_1.png"
            alt="logo"
          />
          <Spacer />
          <Image
            boxSize={12}
            objectFit={"contain"}
            src="/assets/images/small_logo_2.png"
            alt="logo"
          />
        </HStack>
      ) : null}
    </>
  );
};

export default Header;
