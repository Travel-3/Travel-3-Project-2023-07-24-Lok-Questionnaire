// pages/_app.js
import { theme } from "@/theme";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Script from "next/script";
import RootLayout from "./layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraBaseProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        {/* <Box
        bgImage={"/assets/images/background.png"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"repeat-y"}
        minH={"100vh"}
      >
        <Stack
          minH={"100vh"}
          bgGradient={"linear(transparent 0%, transparent calc(100% - 100px), rgba(255,0,0,0.3) calc(100% - 50px), rgba(255,0,0,0.6) calc(100% - 25px), rgba(255,0,0,0.8) calc(100% - 12.5px), rgba(255,0,0,1) 100%)"}
          spacing={0}
        >
          <Header />
        
          <Spacer />
          <Footer />
        </Stack>
      </Box> */}
      </ChakraBaseProvider>
      {process.env.NODE_ENV === "production" && (
        <Script
          id="Clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ikagrdea9m");
        `,
          }}
        />
      )}
    </>
  );
}

export default MyApp;
