import { useState, useEffect } from "react";

const useCounter = (start = 0, end = 100, duration = 5000) => {
  const [count, setCount] = useState(start);
  const increment = (end - start) / (duration / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + increment < end) {
          return prevCount + increment;
        } else {
          clearInterval(interval);
          return end;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end, increment]);

  return count;
};

export default useCounter;
