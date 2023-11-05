import { Box, Flex, Image } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import InView from "../InView";

export interface ModalProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DialogOverlay = () => {
  return (
    <Box
      position="fixed"
      zIndex={99}
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,.5)"
    />
  );
};

export const DialogWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box position="fixed" zIndex={100} left={0} right={0} bottom={0} top={0}>
      <Flex
        alignItems="center"
        justifyContent={"center"}
        flexDirection={"column"}
        h="100%"
        mx={4}
      >
        <Box position="relative">{children}</Box>
      </Flex>
    </Box>
  );
};

export const DialogCloseButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Box
      onClick={onClick}
      position="absolute"
      top={"calc(-10% + -12px)"}
      right={0}
      p={4}
      zIndex={101}
    >
      <Image
        src="/assets/grandprix2023/images/CloseButton.svg"
        alt="close"
        w={6}
        h={6}
      />
    </Box>
  );
};

// export const DialogHeader = () => {
//   return (
//     <Box width="100%" position={"relative"}>
//       <Image
//         src="/assets/grandprix2023/images/DialogHeader.png"
//         w="100%"
//         alt="header"
//         objectFit={"cover"}
//       />
//       <Image
//         src="/assets/grandprix2023/images/EventPrizeTitle.png"
//         w="45%"
//         alt="EventDetailTitle"
//         left={0}
//         right={0}
//         mx="auto"
//         position={"absolute"}
//         bottom={"50%"}
//       />
//     </Box>
//   );
// };

export const DialogContent = ({ children }: PropsWithChildren) => {
  return (
    <Box
      backgroundImage={"url(/assets/grandprix2023/images/Prize/Background.png)"}
      backgroundSize="cover"
      w="90vw"
      h="calc(90vw * 1.356)"
      borderRadius="calc(90vw * 0.08)"
      overflow="hidden"
    >
      <Image
        src="/assets/grandprix2023/images/EventPrizeTitle.png"
        w="45%"
        alt="EventDetailTitle"
        left={0}
        right={0}
        mx="auto"
        position={"absolute"}
        bottom={"98%"}
      />
      <Flex flexDirection={"column"} h="100%">
        <Image
          w="100%"
          src="/assets/grandprix2023/images/Prize/Header.png"
          alt="Header"
          objectFit="cover"
        />
        <Box flex={1} overflowY="scroll">
          {children}
        </Box>
        <Image
          w="100%"
          mb={2}
          src="/assets/grandprix2023/images/Prize/Footer.png"
          alt="Footer"
          objectFit="cover"
        />
      </Flex>
    </Box>
  );
};

export default function Modal({
  isOpen = false,
  children,
  onClose,
}: ModalProps) {
  return (
    <>
      <InView>
        <Box as="dialog" open={isOpen}>
          {isOpen && <DialogOverlay />}
          <DialogWrapper>
            <DialogCloseButton onClick={onClose} />
            <DialogContent>{children}</DialogContent>
          </DialogWrapper>
        </Box>
      </InView>
    </>
  );
}
