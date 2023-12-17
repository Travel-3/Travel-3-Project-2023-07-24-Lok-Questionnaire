import { PropsWithChildren } from "react";
import styled from "styled-components";

const AnswerBoxContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid black;
  background-color: #e9b177;
  padding: 6px;
  border-radius: 8px;
  margin-left: -8px;
`;

const AnswerBoxContent = styled.div`
  border-radius: 8px;
  border: 1px dashed #fff;
  padding: 8px;
  font-size: 16px;
  font-weight: 700;
  word-break: break-all;
  white-space: break-spaces;
`;

const AnswerBoxShadow = styled.div`
  background-color: #000000;
  position: absolute;
  z-index: -1;
  top: 8px;
  left: 8px;
  border-radius: 8px;
  right: -8px;
  bottom: -8px;
`;

export type AnswerBoxProps = PropsWithChildren & {};

export default function AnswerBox({ children }: AnswerBoxProps) {
  return (
    <AnswerBoxContainer>
      <AnswerBoxContent>{children}</AnswerBoxContent>
      <AnswerBoxShadow />
    </AnswerBoxContainer>
  );
}
