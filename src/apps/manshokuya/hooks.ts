import { useLocalStorage } from "usehooks-ts";

export function useUser() {
  const [user, setUser] = useLocalStorage<{
    ID: string;
    score: number;
    phone: string;
    region: string;
  } | null>("User/Manshokuya", null);

  return {
    user,
    userId: user?.ID ?? null,
    userScore: user?.score ?? 0,
    userPhone: user?.phone ?? "",
    userRegion: user?.region ?? "",
    setUser,
  };
}
