import {
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

function BottomSheetModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center my="5">
        <Button onClick={onOpen}>Open Modal</Button>
      </Center>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
        // trapFocus={false}
      >
        <ModalOverlay height="100vh" />
        <ModalContent
          position="fixed"
          bottom="0px"
          mb="0"
          borderRadius="1.75rem 1.75rem 0px 0px"
          maxW="lg"
        >
          <ModalHeader textAlign="center" fontSize="3xl">
            Modal Title
          </ModalHeader>
          <ModalCloseButton outline="none" _focus={{ outline: "none" }} />
          <ModalBody>
            <Box fontSize="xl" textAlign="center" letterSpacing="1.25px">
              {/* <Lorem count={1} /> */}
            </Box>
            <Center flexDir="column" mt="6" mb="4">
              <Button
                colorScheme="blue"
                size="lg"
                w={"full"}
                onClick={onClose}
                borderRadius="3xl"
              >
                Join Waitlist
              </Button>
              <Button
                onClick={onClose}
                variant="link"
                size="lg"
                colorScheme="black"
                my="4"
              >
                Skip for now
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BottomSheetModal;
