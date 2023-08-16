// pages/_app.js
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Box,
  ChakraProvider,
  Spacer,
  Stack,
  extendTheme,
} from "@chakra-ui/react";
import { AppProps } from "next/app";

const theme = extendTheme({
  fonts: {
    body: '"Work Sans", "Noto Sans TC", sans-serif',
    heading: '"Work Sans", "Noto Sans TC", sans-serif',
  },
  textStyles: {
    chinese: {
      fontFamily: '"Work Sans", sans-serif',
    },
    english: {
      fontFamily: '"Noto Sans TC", sans-serif',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box
        bgImage={"/assets/images/background.png"}
        bgSize={"cover"}
        bgRepeat={"repeat-y"}
        minH={"100vh"}
      >
        <Stack
          minH={"100vh"}
          bgGradient={
            "linear(transparent 0%, transparent calc(100% - 100px), rgba(255,0,0,0.3) calc(100% - 50px), rgba(255,0,0,0.6) calc(100% - 25px), rgba(255,0,0,0.8) calc(100% - 12.5px), rgba(255,0,0,1) 100%)"
          }
          spacing={0}
        >
          <Header />
          <Component {...pageProps} />
          <Spacer />
          <Footer />
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
