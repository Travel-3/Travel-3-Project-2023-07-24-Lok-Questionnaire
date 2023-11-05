import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useRecordGame() {
  return useMutation({
    mutationFn: async (data: {
      ref: string;
      deviceId: string;
      type: "ACCESS" | "FINISH";
      region?: string;
      phone?: string;
    }) => {
      return axios.post("/api/games", data);
    },
  });
}
