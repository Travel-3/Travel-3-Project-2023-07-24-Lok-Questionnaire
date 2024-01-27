import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { useUser } from "../hooks";
import { fireEvent } from "@/services/pixel";

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  /* padding: 12px; */
  border: 1px solid #000;
  margin-right: 8px;
  font-size: 24px;
  border-radius: 12px;
  outline: none;
  background-color: #fff;
`;

const Input = styled.input`
  /* background-color: #fff; */
  padding: 10px;
  width: 100% !important;
  margin: 0;
  border: 1px solid #000;
  border-radius: 12px;
  outline: none;
`;

const ConfirmButton = styled.div<{ loading: boolean }>`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  background-color: #fa482a;
  color: #fff;
  border-radius: 8px;
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const Hint = styled.div`
  /* font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji; */
`;

export type SignUpFormProps = {
  onDone: () => void;
};

export default function SignUpForm({ onDone }: SignUpFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { userId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    region: "853",
    phone: "",
  });

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (form.phone.length < 8) return alert("請輸入正確的電話號碼");
    if (!userId) return alert("請先登入");

    setIsLoading(true);

    try {
      fireEvent("Register", {
        userId,
        ...form,
      });
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          sessionId: userId,
          game: "Manshokuya",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            alert("報名成功");
            onDone();
          } else {
            alert("報名失敗");
          }
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <InputContainer className="pb-3">
        <div>
          <Select
            className="bg-gray-100"
            onChange={(e) => updateForm("region", e.target.value)}
          >
            <option value="853">853</option>
            <option value="852">852</option>
            <option value="86">86</option>
          </Select>
        </div>
        <Input
          ref={ref}
          className="bg-gray-50"
          type="text"
          onChange={(e) => updateForm("phone", e.target.value)}
          placeholder="輸入電話號碼"
        />
      </InputContainer>
      <Hint className="mb-3">
        您提供的電話號碼將被妥善保密僅用於活動聯絡之用。
        <br />
        若您未填寫手機號碼，你將無法收取獲獎信息。
      </Hint>
      <ConfirmButton
        className="text-center py-1.5 text-lg font-bold"
        onClick={handleSubmit}
        loading={isLoading}
      >
        立即參加 - 獲得抽獎機會
      </ConfirmButton>
    </>
  );
}
