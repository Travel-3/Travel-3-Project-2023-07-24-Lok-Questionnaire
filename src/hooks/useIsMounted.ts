import { useEffect, useRef, useState } from "react";

const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
