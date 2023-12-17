import { PropsWithChildren } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div<ButtonLabelProps>`
  color: #fff;
  cursor: pointer;
  position: relative;
  border: 2px solid #000;
  background-color: ${(props) => props.color};
  border-radius: 12px;
`;

const ButtonShadow = styled.div`
  position: absolute;
  z-index: -1;
  top: 8px;
  left: 4px;
  background-color: #000000;
  border-radius: 12px;
  right: -4px;
  bottom: -8px;
`;

type ButtonLabelProps = {
  color: string;
};

const ButtonLabel = styled.div`
  padding: 6px;
  text-shadow:
    -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000;
  text-align: center;
  font-size: 21px;
  font-weight: 700;
`;

const ButtonZIndex = styled.div`
  z-index: 10;
`;

export type ButtonProps = {
  color: "red" | "blue" | "orange" | "white";
  onClick?: () => void;
} & PropsWithChildren;

const ThemeColor = {
  red: "#cb1515",
  blue: "#3FA6F2",
  orange: "#FF901E",
  white: "#eee",
};

export default function GameButton({
  children,
  onClick,
  color = "red",
}: ButtonProps) {
  return (
    <ButtonZIndex onClick={onClick}>
      <ButtonContainer color={ThemeColor[color]}>
        <ButtonShadow />
        <ButtonLabel>{children}</ButtonLabel>
      </ButtonContainer>
    </ButtonZIndex>
  );
}
