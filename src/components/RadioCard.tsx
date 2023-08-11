import { Box, useRadio } from "@chakra-ui/react";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w={"100%"}>
      <input {...input} />
      <Box
        w={"100%"}
        {...checkbox}
        cursor="pointer"
        bgColor={"black"}
        borderRadius="md"
        color={"white"}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
