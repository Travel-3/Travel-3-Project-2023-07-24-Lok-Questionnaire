import { PropsWithChildren, useRef } from "react";
import { useUser } from "../hooks";
import { generateRandomString, useDeviceIDState } from "@/hooks/useDeviceID";

export default function Reset({ children }: PropsWithChildren) {
  const { setUser } = useUser();
  const { deviceID, setDeviceID } = useDeviceIDState();
  const counter = useRef(0);
  const startTime = useRef(0);

  const handleReset = () => {
    if (startTime.current === 0) {
      startTime.current = Date.now();
    } else if (startTime.current <= Date.now() - 1500) {
      startTime.current = Date.now();
      counter.current = 0;
    }

    counter.current++;
    console.log(counter.current);
    if (counter.current >= 3) {
      counter.current = 0;
      startTime.current = 0;
      setDeviceID(`${generateRandomString()}`);
      //   setUser({

      //   })
      //   localStorage.clear();
    }
  };

  return <div onClick={handleReset}>{children}</div>;
}
