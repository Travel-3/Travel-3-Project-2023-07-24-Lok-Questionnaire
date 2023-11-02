import { Box, Image } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import InView from "../InView";

export interface DialogProps extends PropsWithChildren {
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
    <Box position="fixed" zIndex={100} left={0} right={0} bottom={0}>
      {children}
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

export const DialogHeader = () => {
  return (
    <Box width="100%" position={"relative"}>
      <Image
        src="/assets/grandprix2023/images/DialogHeader.png"
        w="100%"
        alt="header"
        objectFit={"cover"}
      />
      <Image
        src="/assets/grandprix2023/images/EventDetailTitle.png"
        w="45%"
        alt="EventDetailTitle"
        left={0}
        right={0}
        mx="auto"
        position={"absolute"}
        bottom={"50%"}
      />
    </Box>
  );
};

export const DialogContent = ({ children }: PropsWithChildren) => {
  return (
    <Box
      backgroundImage={"url(/assets/grandprix2023/images/DialogContent.png)"}
      backgroundSize="cover"
      p={4}
      sx={{
        "background-repeat-y": "repeat",
      }}
      maxH="60vh"
      overflowY="scroll"
    >
      {/* <Image src='/assets/grandprix2023/images/DialogContent.png' w='100%' alt='content' /> */}
      <Box>{children}</Box>
    </Box>
  );
};

export default function Dialog({
  isOpen = false,
  children,
  onClose,
}: DialogProps) {
  return (
    <>
      <InView>
        <Box as="dialog" open={isOpen}>
          {isOpen && <DialogOverlay />}
          <DialogWrapper>
            <DialogCloseButton onClick={onClose} />
            <DialogHeader />
            <DialogContent>{children}</DialogContent>
          </DialogWrapper>
        </Box>
      </InView>
    </>
  );
}
