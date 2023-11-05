import SplashScreen from "@/components/SplashScreen";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) router.replace(`/grandprix2023?ref=${router.query.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <SplashScreen />;
}
