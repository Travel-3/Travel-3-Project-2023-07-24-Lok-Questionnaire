import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren, BoxProps {}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <Box
      {...rest}
      backgroundImage={"/assets/grandprix2023/images/Button.png"}
      backgroundSize={"cover"}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      {children}
    </Box>
  );
}
