import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
