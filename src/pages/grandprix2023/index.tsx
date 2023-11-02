import Button from "@/components/GrandPrix2023/Button";
import SplashScreen from "@/components/SplashScreen";
import useImagesOnLoad from "@/hooks/useImagesOnLoad";
import { Link, Image, AspectRatio, Box, Stack } from "@chakra-ui/react";

export default function Home() {
  const isLoaded = useImagesOnLoad([
    "/assets/grandprix2023/images/Background.png",
    "/assets/grandprix2023/images/Button.png",
    "/assets/grandprix2023/images/event_detail_label.svg",
    "/assets/grandprix2023/images/event_prizes_label.svg",
  ]);

  console.log(isLoaded);
  return (
    <>
      <SplashScreen isLoaded={isLoaded}>
        <Box position={"relative"} w={"100vw"} h={"100vh"} bg="#e4d9c4">
          <AspectRatio
            position={"fixed"}
            zIndex={1}
            ratio={1080 / 2074}
            w={"100vw"}
          >
            <Image
              w={"100%"}
              h="100%"
              src="/assets/grandprix2023/images/Background.png"
              alt="background"
            />
          </AspectRatio>

          <Box position="fixed" top={"3%"} right={"-16px"} zIndex={999}>
            <Stack>
              <Button w="140px" h={`${140 * 0.28431372549019607}px`}>
                <Image
                  ml="-12px"
                  w="100px"
                  src="/assets/grandprix2023/images/event_detail_label.svg"
                  alt="活動詳情"
                />
              </Button>
              <Button w="140px" h={`${140 * 0.28431372549019607}px`}>
                <Image
                  ml="-12px"
                  w="100px"
                  src="/assets/grandprix2023/images/event_prizes_label.svg"
                  alt="活動獎品"
                />
              </Button>
            </Stack>
          </Box>
          <Link href="/grandprix2023/questionnaire">
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
              <Box
                w={"100%"}
                objectFit={"cover"}
                bgImage="/assets/grandprix2023/images/Start.png"
                bgPosition={"center"}
                bgRepeat={"no-repeat"}
                bgSize={"contain"}
                // _active={{
                //   bgColor: "transparent",
                //   bgImage: "/assets/grandprix2023/images/start_button.png",
                //   bgPosition: "center",
                //   bgRepeat: "no-repeat",
                //   bgSize: "contain",
                // }}
              />
            </AspectRatio>
          </Link>
        </Box>
      </SplashScreen>
    </>
  );
}
