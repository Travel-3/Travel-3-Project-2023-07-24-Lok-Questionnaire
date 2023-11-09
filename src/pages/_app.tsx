// pages/_app.js
import { theme } from "@/theme";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Script from "next/script";
import RootLayout from "./layout";
import CSR from "@/components/CSR";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CSR>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </CSR>
        </QueryClientProvider>
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
          })(window, document, "clarity", "script", "jnowxtagcv");
        `,
          }}
        />
      )}
    </>
  );
}

export default MyApp;
