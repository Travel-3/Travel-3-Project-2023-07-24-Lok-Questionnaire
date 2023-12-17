import AnswerBox from "@/components/2023/Christmas/AnswerBox";
import GameForm from "@/components/2023/Christmas/GameForm";
import ProgressBar from "@/components/2023/Christmas/ProgressBar";
import SnowOverlay from "@/components/2023/Christmas/SnowOverlay";
import { AnswerProvider, useAnswers } from "@/components/Answer/AnswerProvider";
import App from "@/components/App";
import { AspectRatio } from "@/components/ui";
import Answer from "@/entities/Answer";
import colors from "@/tokens/2023/Christmas/colors";
import questions from "@/tokens/2023/Christmas/questions";
import Track from "@/utils/track";
import Head from "next/head";
import Image from "next/image";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const RedBackground = styled.div`
  background-color: ${colors.red};
  height: 100vh;
  position: relative;
`;

const QuestionContainer = styled.div`
  position: relative;
  margin-top: 32px;
`;

const QuestionTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 16.7%;
  margin: 0 auto;
`;

const QuestionWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
  word-break: break-all;
  white-space: break-spaces;
`;

const AnswersContainer = styled.div`
  position: relative;
  margin: 0 32px;
  margin-top: 12px;
  z-index: 10;
`;

const AnswerItem = styled.div`
  position: relative;
  margin-bottom: 16px;
  cursor: pointer;
`;

const SnowFooterContainer = styled.div`
  position: fixed;
  z-index: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const TreePosition = styled.div`
  position: absolute;
  bottom: 30%;
  left: -12.5%;
  width: 56%;
  z-index: 10;
`;

const QuestionPageContainer = styled.div`
  padding: 32px;
`;

const getID = (index: number) => {
  return ["A", "B", "C", "D", "E"][index];
};

type AnswerButtonProps = PropsWithChildren & {
  answer: Answer;
};

const AnswerButton = ({ children, answer }: AnswerButtonProps) => {
  const { index, addAnswer } = useAnswers();

  const handleClick = () => {
    Track.track("Demo", "ANSWER", {
      question: questions[index]?.question,
      answer: answer.answer,
    });
    addAnswer(answer);
  };

  return (
    <AnswerItem onClick={handleClick}>
      <AnswerBox>{children}</AnswerBox>
    </AnswerItem>
  );
};

function Page() {
  const { index } = useAnswers();
  return (
    <>
      <Head>
        <title>「聖誕送大禮」活動 - Travel3</title>
        <meta name="theme-color" content={colors.red} />
      </Head>
      <App>
        <RedBackground>
          <QuestionPageContainer>
            <ProgressBar
              progress={
                index >= 5 ? 100 : ((index * 25) as 0 | 25 | 50 | 75 | 100)
              }
            />
            <QuestionContainer>
              {index < 5 && (
                <QuestionTitle>
                  <AspectRatio ratio={193 / 153}>
                    <Image
                      src={`/images/2023/Christmas/q${index + 1}.svg`}
                      alt={`Q${index + 1}`}
                      fill
                    />
                  </AspectRatio>
                </QuestionTitle>
              )}

              <AspectRatio ratio={940 / 426}>
                <Image
                  src="/images/2023/Christmas/rank-board.svg"
                  alt="3 cats"
                  fill
                />
              </AspectRatio>
              <QuestionWrapper>
                {index >= 5 ? "請輸入你的角色姓名" : questions[index]?.question}
              </QuestionWrapper>
            </QuestionContainer>

            {/* <GameForm /> */}
            {index < 5 ? (
              <AnswersContainer>
                {questions[index]?.answers.map((answer, i) => (
                  <AnswerButton key={i} answer={answer}>
                    {getID(i)}
                    {")"} {answer.answer}
                  </AnswerButton>
                ))}
              </AnswersContainer>
            ) : (
              <GameForm />
            )}
          </QuestionPageContainer>
          {/*  */}
          <SnowFooterContainer>
            <TreePosition>
              <AspectRatio ratio={674 / 842}>
                <Image src="/images/2023/Christmas/tree.svg" alt="Tree" fill />
              </AspectRatio>
            </TreePosition>
            <AspectRatio ratio={1167 / 509}>
              <Image
                src="/images/2023/Christmas/big-snow-man-on-snow.svg"
                alt="Snow man"
                fill
              />
            </AspectRatio>
          </SnowFooterContainer>
          <SnowOverlay />
        </RedBackground>
      </App>
    </>
  );
}

export default function Container() {
  return (
    <AnswerProvider totalQuestions={5}>
      <Page />
    </AnswerProvider>
  );
}
