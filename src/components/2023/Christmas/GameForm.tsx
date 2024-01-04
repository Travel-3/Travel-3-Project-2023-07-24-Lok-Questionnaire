import styled from "styled-components";
// import BlueButton from "./BlueButton";
import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
import GameButton from "./GameButton";
// import Track from "@/utils/track";
import { useRouter } from "next/router";
import { useAnswers } from "@/components/Answer/AnswerProvider";

const GameFormContainer = styled.div`
  position: relative;
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 12px;
`;

const Input = styled.input`
  background-color: #fff;
  padding: 12px;
  border: 3px solid #000;
  border-radius: 12px;
  width: -webkit-fill-available;
  outline: none;
`;

const ButtonWrapper = styled.div`
  width: 120px;
`;

export default function GameForm() {
  const ref = useRef<HTMLInputElement>(null);
  const { getScore } = useAnswers();
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleFinish = () => {
    if (name.length === 0) return alert("請輸入姓名");

    router.push({
      pathname: "/result",
      query: { name, score: getScore() },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <GameFormContainer>
      <InputContainer>
        <Input
          ref={ref}
          type="text"
          placeholder="你的角色姓名"
          required
          onChange={handleChange}
        />
      </InputContainer>
      <ButtonWrapper>
        <GameButton color="blue" onClick={handleFinish}>
          完成
        </GameButton>
      </ButtonWrapper>
    </GameFormContainer>
  );
}
