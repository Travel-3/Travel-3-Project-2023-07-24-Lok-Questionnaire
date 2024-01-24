import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// const Debug = dynamic(() => import("./Debug/Debug"), {ssr: false});

const cache = new QueryClient();

export type WithGameProps = PropsWithChildren;

export default function WithGame({ children }: WithGameProps) {
  return (
    <>
      {/* <GoogleReCaptchaProvider
        reCaptchaKey={
          process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string
        }
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      > */}
      <QueryClientProvider client={cache}>
        {/* <Debug>{children}</Debug> */}

        {children}
      </QueryClientProvider>
      {/* </GoogleReCaptchaProvider> */}
    </>
  );
}
