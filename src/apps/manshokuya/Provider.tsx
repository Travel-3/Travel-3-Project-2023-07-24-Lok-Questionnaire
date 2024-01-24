import { useDeviceID } from "@/hooks/useDeviceID";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./hooks";

export type ManshokuyaContextState = {
  numOfOpportunitie: number;
  isAnimating: boolean;
  reward: any;
  previewCoupon: any;
  setPreviewCoupon: Dispatch<SetStateAction<any>>;
  setReward: Dispatch<SetStateAction<any>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  setNumOfOpportunitie: Dispatch<SetStateAction<number>>;
};

export const ManshokuyaContext = createContext<ManshokuyaContextState>({
  numOfOpportunitie: 0,
  isAnimating: false,
  reward: null,
  previewCoupon: null,
  setPreviewCoupon: () => {},
  setReward: () => {},
  setIsAnimating: () => {},
  setNumOfOpportunitie: () => {},
});

export type ManshokuyaProviderProps = PropsWithChildren;

export const ManshokuyaProvider = ({ children }: ManshokuyaProviderProps) => {
  const { setUser, userId } = useUser();
  const [numOfOpportunitie, setNumOfOpportunitie] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previewCoupon, setPreviewCoupon] = useState<any>(null);
  const [reward, setReward] = useState<{
    id: string | null;
    code: string | null;
  }>({
    id: null,
    code: null,
  });

  const sessionId = useDeviceID();
  const {} = useQuery({
    queryKey: ["User", sessionId],
    queryFn: () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get("referral");

      const queryParams = new URLSearchParams();
      queryParams.append("sessionId", sessionId);
      queryParams.append("game", "Manshokuya");
      queryParams.append("referral", referral || "");

      return fetch("/api/new_users?" + queryParams.toString()).then((res) => {
        setUser({
          ID: sessionId,
          score: 0,
          phone: "",
          region: "",
        });
        return res.json();
      });
    },
    enabled: !!sessionId && !userId,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  const { data } = useQuery({
    queryKey: ["User", userId, "Score"],
    queryFn: () => {
      return fetch("/api/score?sessionId=" + userId + "&game=Manshokuya").then(
        (res) => res.json(),
      );
    },
    enabled: !!userId,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 30_000,
  });

  useEffect(() => {
    if (data) {
      // console.log('data', data.score.score)
      setNumOfOpportunitie(data.score.score);
      setUser((prev) => ({
        ID: prev?.ID ?? "",
        score: data.score.score,
        phone: data.score.phone,
        region: "",
      }));
    }
  }, [data]);

  return (
    <ManshokuyaContext.Provider
      value={{
        numOfOpportunitie,
        isAnimating,
        reward,
        previewCoupon,
        setPreviewCoupon,
        setReward,
        setIsAnimating,
        setNumOfOpportunitie,
      }}
    >
      {children}
    </ManshokuyaContext.Provider>
  );
};

export const useManshokuya = () => {
  const {
    numOfOpportunitie,
    setNumOfOpportunitie,
    isAnimating,
    setIsAnimating,
    setReward,
    reward,
    previewCoupon,
    setPreviewCoupon,
  } = useContext(ManshokuyaContext);

  const { userId } = useUser();

  const draw = async () => {
    if (numOfOpportunitie <= 0) {
      return;
    }

    setNumOfOpportunitie((prev) => prev - 1);
    setIsAnimating(true);

    try {
      const response = await fetch(
        "/api/draw?game=Manshokuya&sessionId=" + userId,
      );
      const data = await response.json();

      if (data.ok) {
        setReward({
          id: data.data["Coupon ID"],
          code: data.data["Coupon Code"],
        });
      }
      return data;
    } catch (error) {
      alert("Unknown Error, Please contract support info@travel3.app.");
    } finally {
      setIsAnimating(false);
    }
  };

  const view = (coupon: any) => {
    setPreviewCoupon(coupon);
  };

  return {
    numOfOpportunitie,
    isAnimating,
    reward,
    previewCoupon,
    view,
    setPreviewCoupon,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    draw: useCallback(draw, [numOfOpportunitie]),
  };
};

export function withProvider(WrappedComponent: React.ComponentType) {
  const Container = () => {
    return (
      <ManshokuyaProvider>
        <WrappedComponent />
      </ManshokuyaProvider>
    );
  };
  return Container;
}

export default ManshokuyaProvider;
