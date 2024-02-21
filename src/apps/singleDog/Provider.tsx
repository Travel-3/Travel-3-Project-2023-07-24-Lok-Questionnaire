import useNewUser from "@/hooks/useNewUser";
import useUserScore from "@/hooks/useUserScore";
import { fireEvent } from "@/services/pixel";
import Track from "@/utils/track";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { QUESTIONS } from "./constant";

export type User = {
  id: string;
  score: number;
  email: string;
  phone: string;
  region: string;
  name: string;
};

export type TContext = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>> | null;
  score: number;
  user: User;
  setUser: Dispatch<SetStateAction<User>> | null;
  gameScore: number;
  setGameScore: Dispatch<SetStateAction<number>> | null;
  rank: number;
};

const Context = createContext<TContext>({
  index: 0,
  setIndex: null,
  score: 0,
  user: {
    id: "",
    score: 0,
    phone: "",
    region: "",
    email: "",
    name: "",
  },
  setUser: null,
  gameScore: 0,
  setGameScore: null,
  rank: 999,
});

export const GAME = "Single-Dog-Dev";
export const MAX = 5;

export function Provider({ children }: PropsWithChildren) {
  const [index, setIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [user, setUser] = useLocalStorage<{
    id: string;
    score: number;
    phone: string;
    email: string;
    region: string;
    name: string;
  }>(`User/${GAME}`, {
    id: "",
    score: 0,
    phone: "",
    email: "",
    region: "",
    name: "",
  });
  const { data } = useNewUser(GAME, !user.id);
  const { data: scoreData } = useUserScore(GAME, user.id);

  const { data: rankData } = useQuery({
    queryKey: [GAME, "Ranking", user.id],
    queryFn: async () => {
      const res = await fetch(
        `/api/ranking?sessionId=${user?.id}&game=${GAME}`,
        {},
      );
      return res.json();
    },
    enabled: !!user.id,
  });

  useEffect(() => {
    if (data?.ok) {
      setUser({
        id: data?.data.sessionId,
        score: 0,
        phone: "",
        region: "",
        email: "",
        name: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Context.Provider
      value={{
        index,
        setIndex,
        score: scoreData?.score?.score ?? 0,
        user,
        rank: rankData?.rank ?? 999,
        setUser,
        gameScore,
        setGameScore,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useProvider() {
  const {
    score,
    user,
    setIndex,
    index,
    gameScore,
    setGameScore,
    setUser,
    rank,
  } = useContext(Context);

  const answer = (option: { option: string; score: number }) => {
    Track.track(GAME, "ANSWER", {
      ref: user.id,
      answer: option.option,
      question: QUESTIONS[index - 1].question,
    });
    setIndex?.((_index) => _index + 1);
    setGameScore?.((_score) => _score + option.score);
  };

  const play = () => {
    Track.track(GAME, "PLAY", {
      ref: user.id,
    });
    fireEvent("Play", {
      sessionId: user.id,
    });
    setIndex?.(1);
  };

  const setName = (name: string) => {
    setUser?.((_user) => ({ ..._user, name }));
  };

  const register = (phone: string, region: string) => {
    setUser?.((_user) => ({ ..._user, phone, region }));
    fireEvent("Register", {
      sessionId: user.id,
      phone,
      region,
    });
  };

  const finish = () => {
    Track.track(GAME, "FINISH", {
      ref: user.id,
      score: gameScore,
      name: user.name,
    });
    fireEvent("Finish", {
      sessionId: user.id,
      score: gameScore,
      name: user.name,
    });
    setIndex?.(MAX + 2);
  };

  const reset = () => {
    setIndex?.(0);
    setGameScore?.(0);
  };

  return {
    score,
    index,
    play,
    answer,
    gameScore,
    user,
    setName,
    finish,
    reset,
    rank,
    register,
  };
}
