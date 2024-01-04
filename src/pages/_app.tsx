// pages/_app.js
import { AppProps } from "next/app";
import Script from "next/script";
import "./global.css";
import "normalize.css";
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from "@tanstack/react-query";

const cache = new QueryClient();

function MyApp({ Component }: AppProps) {
  return (
    <>
      <QueryClientProvider client={cache}>
        <Component />
      </QueryClientProvider>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-C8GGC13NV6"
      />
      <Script
        id="GA"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-C8GGC13NV6');`,
        }}
      />
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
