import { chakra } from "@chakra-ui/react";

const Select = chakra("select", {
  baseStyle: {
    backgroundColor: "#ffc600",
    border: "3px",
    borderColor: "black",
    borderWidth: "4px 4px 6px 4px",
    borderStyle: "solid",
    fontWeight: "bold",
    fontSize: "xl",
    outline: "none",
    color: "black",
    borderRadius: "6px",
    padding: "0.5rem 0.5rem",
    height: "auto",
    lineHeight: "auto",
  },
});

export default Select;
