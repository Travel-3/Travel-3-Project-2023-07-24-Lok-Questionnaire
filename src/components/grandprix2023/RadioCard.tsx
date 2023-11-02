import { Box, Image, Text, useRadio } from "@chakra-ui/react";

const IDs = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

function RadioCard(
  props: any & {
    id: number;
  },
) {
  const { id, ...rest } = props;
  const { getInputProps, getRadioProps } = useRadio(rest);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box position="relative">
        <Image
          {...radio}
          src={`/assets/grandprix2023/images/${IDs[id as 0 | 1 | 2 | 3]}.png`}
          alt={""}
        />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left="15%"
          right={0}
          display="flex"
          alignItems="center"
          p={4}
          mb={1}
        >
          <Text fontWeight={700} fontSize="lg">
            {props.children}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default RadioCard;
