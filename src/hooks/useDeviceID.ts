import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
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

export const useDeviceID = () => {
  const { deviceID, setDeviceID } = useDeviceIDState();

  useEffect(() => {
    if (!deviceID) {
      const newDeviceID = nanoid();
      setDeviceID(newDeviceID);
      // return newDeviceID;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return deviceID;
};
