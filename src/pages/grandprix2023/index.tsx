import {
  Flex,
  Button,
  Container,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  Image,
  HStack,
  AspectRatio,
  Center,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Box,
  ModalFooter,
} from "@chakra-ui/react";

export default function Home() {
  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();
  const {
    isOpen: isOpenPrizeModal,
    onOpen: onOpenPrizeModal,
    onClose: onClosePrizeModal,
  } = useDisclosure();
  return (
    <Box position={"relative"} w={"100vw"} h={"100vh"}>
      <AspectRatio
        position={"absolute"}
        zIndex={1}
        ratio={1080 / 2074}
        w={"100vw"}
        h={"100vh"}
      >
        <Image
          w={"100%"}
          objectFit={"cover"}
          src="/assets/grandprix2023/images/gp2023_bg.png"
          alt="background"
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={308 / 88}
        top={"4%"}
        right={"-3%"}
        w={"30%"}
      >
        <Button
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/event_details.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          _active={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/event_details.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
          _focus={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/event_details.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
          onClick={onOpenDetailModal}
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={308 / 88}
        top={"9%"}
        right={"-3%"}
        w={"30%"}
      >
        <Button
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/event_prize.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          _active={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/event_prize.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
          _focus={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/event_prize.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
          onClick={onOpenPrizeModal}
        />
      </AspectRatio>
      <AspectRatio
        position={"absolute"}
        zIndex={10}
        ratio={378 / 147}
        bottom={"4%"}
        left={"30%"}
        w={"40%"}
        h={"auto"}
        mb={4}
      >
        <Button
          as={Link}
          bgColor={"transparent"}
          w={"100%"}
          objectFit={"cover"}
          bgImage="/assets/grandprix2023/images/start_button.png"
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          href="/grandprix2023/questionnaire"
          _active={{
            bgColor: "transparent",
            bgImage: "/assets/grandprix2023/images/start_button.png",
            bgPosition: "center",
            bgRepeat: "no-repeat",
            bgSize: "contain",
          }}
        />
      </AspectRatio>
      <Modal
        isCentered
        onClose={onCloseDetailModal}
        isOpen={isOpenDetailModal}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
        trapFocus={false}
      >
        <ModalOverlay height="100vh" />
        <ModalContent
          h={"55vh"}
          position="fixed"
          bottom="0px"
          mb="0"
          borderRadius="1.75rem 1.75rem 0px 0px"
          maxW="lg"
        >
          <AspectRatio
            position={"absolute"}
            ratio={1082 / 1270}
            w={"100%"}
            height={"100%"}
            objectFit={"cover"}
          >
            <Image
              w={"100%"}
              objectFit={"cover"}
              h={"100%"}
              src="/assets/grandprix2023/images/event_detail_bg.png"
              alt="event_detail_bg"
            />
          </AspectRatio>
          <ModalHeader
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            textAlign="center"
            fontSize="3xl"
            w={"full"}
            mx={"auto"}
          >
            <AspectRatio
              position={"absolute"}
              top={"-80%"}
              ratio={463 / 124}
              w={"40%"}
              mx={"auto"}
            >
              <Image
                w={"100%"}
                src="/assets/grandprix2023/images/event_detail_text.png"
                alt="event_detail_text"
              />
            </AspectRatio>
          </ModalHeader>
          <ModalCloseButton
            size={"sm"}
            position={"absolute"}
            fontSize={"2xs"}
            fontWeight={"bold"}
            top={"-8%"}
            color={"white"}
            border={"2px"}
            borderRadius={"full"}
            outline="none"
            _focus={{ outline: "none" }}
          />
          <ModalBody>
            <Center
              flexDir="column"
              mt="4"
              mb="4"
              overflow={"scroll"}
              h={"60%"}
            >
              <Text
                px={4}
                zIndex={20}
                fontSize={"xl"}
                fontWeight={"bold"}
                color={"black"}
                overflow={"scroll"}
              >
                Travel
                Buddy考下您賽車知識，送您賽車門票和精美紀念品！如何參加抽獎 ?
                <br />
                <br />
                ------------
                <br />
                ------------
                <br />
                ------------
                <br />
                <br />
                參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！
                <br />
                <br />
                ------------
                <br />
                ------------
                <br />
                ------------
                <br />
                <br />
                參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！參加者只需參與「賽車Q&A送大禮」活動，參與賽車Q&A，即有機會參與抽獎！
              </Text>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onClosePrizeModal} isOpen={isOpenPrizeModal} isCentered>
        <ModalOverlay height="100vh" />
        <ModalContent
          position={"relative"}
          h={"60vh"}
          mx={4}
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          // bgImage={'/assets/grandprix2023/images/event_prize_bg.png'}
        >
          {/* <AspectRatio
            position={'absolute'}
            top={0}
            ratio={1080 / 2074}
            w={'100%'}
            maxH={'60vh'}
            objectFit={'cover'}
          >
            <Image
              // w={'100%'}
              h={'100%'}
              objectFit={'cover'}
              src="/assets/grandprix2023/images/event_prize_bg.png"
              alt="event_prize_bg"
              zIndex={10}
            />
          </AspectRatio> */}
          <ModalHeader
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            textAlign="center"
            fontSize="3xl"
            w={"full"}
            mx={"auto"}
          >
            <AspectRatio
              position={"absolute"}
              top={"-80%"}
              ratio={459 / 124}
              w={"40%"}
              mx={"auto"}
            >
              <Image
                w={"100%"}
                src="/assets/grandprix2023/images/event_prize_text.png"
                alt="event_prize_text"
              />
            </AspectRatio>
          </ModalHeader>
          <ModalCloseButton
            size={"sm"}
            position={"absolute"}
            fontSize={"2xs"}
            fontWeight={"bold"}
            top={"-7%"}
            color={"white"}
            border={"2px"}
            borderRadius={"full"}
            outline="none"
            _focus={{ outline: "none" }}
          />
          <ModalBody></ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            {/* <Button onClick={onClosePrizeModal}>Close</Button> */}
            <AspectRatio
              position={"absolute"}
              bottom={"-5%"}
              ratio={318 / 123}
              w={"40%"}
              mx={"auto"}
              zIndex={20}
            >
              <Image
                w={"100%"}
                src="/assets/grandprix2023/images/invite_friends_button.png"
                alt="invite_friends_button"
              />
            </AspectRatio>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
