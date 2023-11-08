import { Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const windowSize = useWindowSize();
  return (
    <Container
      overflowX="hidden"
      overflowY="scroll"
      px={0}
      w="100vw"
      h="100vh"
      position={"relative"}
      sx={{
        maxHeight: "-webkit-fill-available",
        "msOverflowStyle?": "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {children}
    </Container>
  );
}
