import { Box, Text, useRadio } from "@chakra-ui/react";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        w={"90%"}
        mx={"auto"}
        display="flex"
        alignItems="center"
        border="3px"
        borderColor={"black"}
        borderStyle={"solid"}
        borderBottom="6px"
        borderBottomColor={"black"}
        borderBottomStyle={"solid"}
        borderRadius="md"
        overflow="hidden"
        {...radio}
        cursor="pointer"
      >
        {/* Square with the letter 'A' */}
        <Box
          position="relative"
          borderRight="3px"
          borderRightColor={"black"}
          borderRightStyle={"solid"}
          width="50px"
          height="50px"
          backgroundColor={"rgba(232, 54, 36, 0.8)"}
          color="black"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={"3xl"}
          py={1}
        >
          <Text fontWeight={"bold"}>A</Text>
        </Box>
        {/* Yellow area with red dots/spots */}
        <Box
          flex="1"
          height="50px"
          backgroundColor={"rgba(233, 196, 66, 0.8)"}
          position="relative"
          fontSize={"xl"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
        >
          <Text fontWeight={"extrabold"}>{props.children}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default RadioCard;
