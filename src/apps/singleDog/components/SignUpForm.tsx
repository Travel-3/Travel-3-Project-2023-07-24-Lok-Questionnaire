import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fireEvent } from "@/services/pixel";
import { useProvider } from "../Provider";
import clsx from "clsx";
import { z } from "zod";

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

export type SignUpFormProps = {
  onDone: (form: { region: string; phone: string }) => void;
  game: string;
  defaultRegion?: string;
};

export default function SignUpForm({
  onDone,
  game,
  defaultRegion = "852",
}: SignUpFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { user } = useProvider();
  const [isEmail, setIsEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    region: defaultRegion,
    phone: "",
    email: "",
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

  const handleSwitchEmail = () => {
    setIsEmail((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (isEmail) {
      if (!form.email.length) return alert("請輸入正確的電子郵件");

      const { success } = z.string().email().safeParse(form.email);
      if (!success) return alert("請輸入正確的電子郵件");
    } else {
      if (!form.phone.length) return alert("請輸入正確的電話號碼");
    }

    if (!user.id) return alert("請先登入");

    setIsLoading(true);

    try {
      fireEvent("Register", {
        userId: user.id,
        ...(isEmail
          ? { email: form.email }
          : { phone: form.phone, region: form.region }),
      });
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(isEmail
            ? { email: form.email }
            : { phone: form.phone, region: form.region }),
          sessionId: user.id,
          game,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            alert("活動報名成功");
            onDone(form);
          } else {
            if (isEmail) alert("活動報名失敗！電子郵件已使用！");
            else alert("活動報名失敗！電話號碼已使用！");
          }
        });
    } catch {
      alert("活動報名失敗！未知錯誤，請聯絡活動聯絡人。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isEmail ? (
        <InputContainer className="pb-3">
          <div>
            <Select
              className="bg-gray-100"
              defaultValue={defaultRegion}
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
      ) : (
        <InputContainer className="pb-3">
          <Input
            ref={ref}
            className="bg-gray-50"
            type="email"
            onChange={(e) => updateForm("email", e.target.value)}
            placeholder="輸入電子郵件"
          />
        </InputContainer>
      )}
      <div className="mb-3">
        您提供的電話號碼將被妥善保密僅用於活動聯絡之用。
        <br />
        若您未填寫手機號碼，你將無法收取獲獎信息。
      </div>
      <div
        className={clsx("relative cursor-pointer", isLoading && "opacity-50")}
        onClick={handleSwitchEmail}
      >
        <div
          className={clsx(
            "z-10 relative rounded-full border border-black bg-gray-100 text-[#FFDC20] text-center font-bold px-3 py-0.5 mb-3",
          )}
        >
          <span
            className="font-m-plus text-2xl text-outlined flex justify-center items-center"
            style={{
              "--stroke-width": "1px",
              "--stroke-color": "#000",
            }}
          >
            {isEmail ? "使用手機號碼登記" : "使用電子郵件登記"}
          </span>
        </div>
        <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
      </div>

      <div
        className={clsx("relative cursor-pointer", isLoading && "opacity-50")}
        onClick={handleSubmit}
      >
        <div
          className={clsx(
            "z-10 relative rounded-full border border-black bg-[#FFDC20] text-white text-center font-bold px-3 py-0.5",
          )}
        >
          <span
            className="font-black font-m-plus text-2xl text-outlined flex justify-center items-center"
            style={{
              "--stroke-width": "1px",
              "--stroke-color": "#000",
            }}
          >
            立即登記
          </span>
        </div>
        <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
      </div>
    </>
  );
}
