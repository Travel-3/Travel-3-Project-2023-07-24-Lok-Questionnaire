import { useQuery } from "@tanstack/react-query";

export default function useUserScore(game: string, sessionId?: string) {
  return useQuery({
    queryKey: ["User", game, sessionId, "Score"],
    queryFn: () => {
      return fetch("/api/score?sessionId=" + sessionId + "&game=" + game).then(
        (res) => res.json(),
      );
    },
    enabled: !!sessionId,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 30_000,
  });
}
