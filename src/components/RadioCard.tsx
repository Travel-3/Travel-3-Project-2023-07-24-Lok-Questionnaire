import { Box, RadioProps, useRadio } from "@chakra-ui/react";

// interface RadioCardProps extends RadioProps {
//   getInputProps: any
//   getRadioProps: any
// }

function RadioCard(props) {
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
