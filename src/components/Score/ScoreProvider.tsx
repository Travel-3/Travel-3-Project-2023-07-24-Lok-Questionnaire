import { createContext, useCallback, useContext, useState } from "react";

export const ScoreContext = createContext({
  score: 0,
  setScore: (score: number) => {},
  incrementScore: (score: number) => {},
  decrementScore: (score: number) => {},
  resetScore: () => {},
});

export function ScoreProvider() {
  const [score, setScore] = useState(0);
  const handleIncreament = (score: number) => {
    setScore((_score) => score + _score);
  };

  const handleDecrement = (score: number) => {
    setScore((_score) => _score - score);
  };
  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        incrementScore: useCallback(handleIncreament, []),
        decrementScore: useCallback(handleDecrement, []),
        resetScore: () => {
          setScore(0);
        },
      }}
    >
      <div></div>
    </ScoreContext.Provider>
  );
}

export const useScore = () => {
  const { score, setScore, incrementScore, decrementScore, resetScore } =
    useContext(ScoreContext);
  return { score, setScore, incrementScore, decrementScore, resetScore };
};

export default ScoreProvider;
