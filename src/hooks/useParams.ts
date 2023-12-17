import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type UseParamsArgs = Record<string, string | number | boolean>;

export default function useParams<TArgs extends UseParamsArgs>(args: TArgs) {
  const [params, setParams] = useState<UseParamsArgs>(args);
  const router = useRouter();

  useEffect(() => {
    const newParams = { ...params };
    Object.keys(args).forEach((key: string) => {
      if (!router.query[key]) return;

      switch (typeof args[key]) {
        case "string":
          newParams[key] = router.query[key] as string;
          break;
        case "number":
          newParams[key] = parseInt(router.query[key]?.toString() || "0");
          break;
        case "boolean":
          newParams[key] = router.query[key]?.toString() === "true";
          break;
      }
    });
    setParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return params as TArgs;
}
