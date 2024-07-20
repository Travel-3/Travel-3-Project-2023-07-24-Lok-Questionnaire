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

const PolicyLink = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  text-decoration: underline;
`;

export default function SignUpForm() {
  const [region, setRegion] = useState("853"); // ["853", "852", "86"
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [isMore, setIsMore] = useState(false);

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

    // const referral = localStorage.getItem("referral") || "";
    Track.track("Demo", "FINISH", {
      // ref: referral ?? undefined,
      score,
      name,
      phone,
      region,
    });
    localStorage.setItem("done", "true");
    alert("參與成功");
    setIsOpen(false);
  }, [name, phone, region, score]);

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
        <PolicyLink onClick={() => setIsMore(!isMore)}>
          活動規則與條例
        </PolicyLink>
        {isMore && (
          <Hint>
            1.閣下可按照自己的意願，在本公司的遊戲（「本網站」）提供閣下的電郵地址及其他個人資料（「個人資料」）。
            <br />
            2.我們將只會為履行收集閣下的個人資料之目的所需，而保存閣下的個人資料。
            <br />
            3.本公司會依從客戶的要求，不會將其個人資料作為直銷推廣之用。
            <br />
            若閣下同意，本公司擬使用閣下的個人資料【包括：名字、電話號碼、地址及電郵等有關資料】作以下用途
            (無論通過郵件、電郵、電話、傳真、短訊或類似形式)：
            <br />
            * 宣傳及推廣產品及服務；
            <br />
            * 派發產品試用裝及樣本；
            <br />
            * 安排推廣計劃或活動及提供有關資料；及
            <br />
            * 提供推廣資料。
            <br />
            請注意，除非取得閣下的同意，否則本公司不能如上述般使用閣下的個人資料。
            <br />
            4.
            閣下可以不時致函電郵地址info@travel3.app，以要求核實及更正閣下在本公司紀錄中的個人資料。本公司在成功核實閣下的身分後，將於合理的時間之內回應閣下的要求。
            <br />
            5.
            閣下可隨時發送電郵至info@travel3.app，要求本公司從本公司通訊名單中移除閣下的資料。
            <br />
            6. 若閣下不同意上述任何條款及條件，閣下不應向本公司提供個人資料。
          </Hint>
        )}
        <GameButton color="blue" onClick={handleSubmit}>
          參與
        </GameButton>
      </SignUpFormContainer>
    </BottomSheet>
  );
}
