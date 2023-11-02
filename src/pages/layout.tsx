import { Box, Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      overflow="hidden"
      px={0}
      w="100vw"
      position={"relative"}
      sx={{
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
