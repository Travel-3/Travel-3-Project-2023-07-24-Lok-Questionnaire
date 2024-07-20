import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect } from "react";

type State = {
  deviceID: string;
  setDeviceID: (deviceID: string) => void;
};

export const useDeviceIDState = create(
  persist<State>(
    (set) => ({
      deviceID: "",
      setDeviceID: (deviceID) => set({ deviceID }),
    }),
    {
      name: "deviceID",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function generateRandomString() {
  const randomCharA = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomCharB = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return randomCharA + randomCharB + randomNumber;
}

export const getDeviceID = () => {
  return useDeviceIDState.getState().deviceID;
};

export const useDeviceID = (defaultId?: string) => {
  const { deviceID, setDeviceID } = useDeviceIDState();

  useEffect(() => {
    // console.log("defaultId", defaultId)
    if (defaultId) {
      setDeviceID(defaultId);
    } else if (!deviceID) {
      const newDeviceID = `${generateRandomString()}`;
      setDeviceID(newDeviceID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultId]);

  // console.log("deviceID", deviceID, defaultId)
  return deviceID;
};
