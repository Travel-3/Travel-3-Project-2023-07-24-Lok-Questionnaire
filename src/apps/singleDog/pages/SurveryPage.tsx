import { AspectRatio } from "@/components/ui";
import ProgressBar from "../components/ProgressBar";
import Image from "next/image";
import styled from "styled-components";
import { MAX, useProvider } from "../Provider";
import { useMemo } from "react";
import { QUESTIONS } from "../constant";
import SubmitButton from "../components/SubmitButton";

const StarForeground = styled.div`
  background-image: url("/single-dog/svg/stars-2.svg");
  background-repeat: repeat-y;
`;

function QuestionBox({ title, index }: { title: string; index: number }) {
  return (
    <div className="relative">
      <div
        className="justify-center select-none relative min-h-36 flex items-center border-2 border-black text-xl rounded-xl p-6 py-8 z-10 font-black text-center"
        style={{
          background: "#F9E2C5",
        }}
      >
        {title}
      </div>
      <div className="absolute top-2 left-1 right-1 z-10">
        <AspectRatio ratio={836 / 19}>
          <Image src="/single-dog/images/question-decorator.png" alt="" fill />
        </AspectRatio>
      </div>
      <div className="absolute bottom-2 left-1 right-1 z-10">
        <AspectRatio ratio={836 / 19}>
          <Image src="/single-dog/images/question-decorator.png" alt="" fill />
        </AspectRatio>
      </div>
      <div className="absolute left-0 right-0 top-0 z-10">
        <div className="flex justify-center w-full -translate-y-1/2">
          <div className="w-1/5">
            {index < 6 && (
              <AspectRatio ratio={185 / 136}>
                <Image src={`/single-dog/svg/Q${index}.svg`} alt="Q1" fill />
              </AspectRatio>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute border-2 border-black rounded-xl top-1.5 left-1.5 -right-1.5 -bottom-1.5"
        style={{
          background: "#FF96D5",
        }}
      ></div>
      <div className="absolute left-0 top-0 w-1/6 z-10 -translate-x-1/3 -translate-y-1/4">
        <AspectRatio ratio={2048 / 6630}>
          <Image src={"/single-dog/svg/ballown.svg"} alt="ballown" fill />
        </AspectRatio>
      </div>
    </div>
  );
}

export type AnswerBoxProps = {
  onClick?: () => void;
  option: string;
};

function AnswerBox({ onClick, option }: AnswerBoxProps) {
  return (
    <div className="relative z-10 select-none" onClick={onClick}>
      <div
        className="relative border-2 border-black rounded-xl p-3 z-10 font-bold"
        style={{
          background: "#F9E2C5",
        }}
      >
        {option}
      </div>
      <div
        className="absolute border-2 border-black rounded-xl p-3 top-1 left-1 -right-1 -bottom-1"
        style={{
          background: "#FF96D5",
        }}
      ></div>
    </div>
  );
}

const Input = styled.input``;

const LETTER = ["A", "B", "C", "D", "E"];

export default function SurverPage() {
  const { index, answer, setName } = useProvider();

  const question = useMemo(() => {
    if (index < MAX + 1) {
      return index > 0 ? QUESTIONS[index - 1] : null;
    }

    return {
      question: "請輸入你的角色姓名",
      options: [],
    };
  }, [index]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="p-4">
        <ProgressBar value={((index - 1) / MAX) * 100} />
      </div>
      <div className="mx-3 mb-6 mt-12">
        <QuestionBox index={index} title={question?.question ?? ""} />
      </div>
      <div className="flex flex-col gap-3 mx-6 relative z-50">
        {index < MAX + 1 ? (
          question?.options.map((option, index) => (
            <AnswerBox
              key={option.option}
              onClick={() => answer(option)}
              option={`${LETTER[index]}) ${option.option}`}
            />
          ))
        ) : (
          <Input
            type="text"
            className="border-2 border-black text-lg rounded-lg py-3 px-2"
            maxLength={20}
            minLength={1}
            placeholder="你的角色姓名"
            onChange={handleNameChange}
          />
        )}
        {index >= MAX + 1 && <SubmitButton />}
      </div>
      <div
        className="absolute bottom-0 right-0 z-10"
        style={{
          left: "-5%",
        }}
      >
        <AspectRatio ratio={1197 / 597}>
          <Image src="/single-dog/images/dog-house.png" alt="Dog House" fill />
        </AspectRatio>
      </div>
      <StarForeground className="absolute top-0 left-0 bottom-0 right-0 select-none z-0" />
    </div>
  );
}
