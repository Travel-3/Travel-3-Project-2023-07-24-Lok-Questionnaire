import { useQuery } from "@tanstack/react-query";
import { useDeviceID } from "./useDeviceID";

export default function useNewUser(game: string) {
  const sessionId = useDeviceID();
  return useQuery({
    queryKey: ["User", game, sessionId],
    queryFn: () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get("referral");

      const queryParams = new URLSearchParams();
      queryParams.append("sessionId", sessionId);
      queryParams.append("game", game);
      queryParams.append("referral", referral || "");

      return fetch("/api/new_users?" + queryParams.toString()).then((res) => {
        return res.json();
      });
    },
    enabled: !!sessionId,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
}
