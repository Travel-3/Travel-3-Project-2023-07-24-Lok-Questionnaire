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
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bgColor={"lightgrey"}
        borderRadius="md"
        _checked={{
          bg: "gray.600",
          borderColor: "gray.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
