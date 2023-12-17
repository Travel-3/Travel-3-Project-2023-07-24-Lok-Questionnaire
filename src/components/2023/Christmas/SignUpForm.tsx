import BottomSheet from "@/components/Dialog/BottomSheet";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import GameButton from "./GameButton";
import useParams from "@/hooks/useParams";
import Track from "@/utils/track";

const SignUpFormContainer = styled.div`
  /* padding: 16px; */
  /* padding-top: 24px; */
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 6px;
  display: flex;

  /* width: ; */
  align-items: center;
`;

const Select = styled.select`
  /* padding: 12px; */
  border: 2px solid #000;
  margin-right: 8px;
  font-size: 24px;
  border-radius: 12px;
  outline: none;
  background-color: #fff;
`;

const Input = styled.input`
  background-color: #fff;
  padding: 10px;
  width: 100% !important;
  margin: 0;
  border: 2px solid #000;
  border-radius: 12px;
  outline: none;
`;

const Hint = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

export default function SignUpForm() {
  const [region, setRegion] = useState("853"); // ["853", "852", "86"
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const { name, score } = useParams({
    name: "",
    score: 0,
  });

  useLayoutEffect(() => {
    const done = localStorage.getItem("done");
    if (!done) {
      setIsOpen(true);
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (phone.length === 0) return alert("請輸入電話號碼");

    const referral = localStorage.getItem("referral") || "";
    Track.track("Demo", "FINISH", {
      ref: referral ?? undefined,
      score,
      name,
      phone,
      region,
    });
    localStorage.setItem("done", "true");
    alert("參與成功");
    setIsOpen(false);
  }, [phone, region]);

  return (
    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <SignUpFormContainer>
        <InputContainer>
          <Select onChange={(e) => setRegion(e.target.value)}>
            <option value="853">853</option>
            <option value="852">852</option>
            <option value="86">86</option>
          </Select>
          <Input
            ref={ref}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="輸入電話號碼"
          />
        </InputContainer>
        <Hint>
          您提供的電話號碼將被妥善保密僅用於活動聯絡之用。
          <br />
          若您未填寫手機號碼，將視為不參與該活動。
        </Hint>
        <GameButton color="blue" onClick={handleSubmit}>
          參與
        </GameButton>
      </SignUpFormContainer>
    </BottomSheet>
  );
}
