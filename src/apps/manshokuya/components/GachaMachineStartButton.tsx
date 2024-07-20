import { AspectRatio } from "@/components/ui";
import { LazyMotion, domAnimation, m, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useManshokuya } from "../Provider";
import { fireEvent } from "@/services/pixel";
import { useUser } from "../hooks";

export default function GachaMachineStartButton() {
  const { numOfOpportunitie, isAnimating, draw } = useManshokuya();
  const rotate = useMotionValue(0);
  const { userId } = useUser();

  const handlePress = () => {
    if (isAnimating) {
      return;
    }

    if (numOfOpportunitie <= 0) {
      alert("您的抽獎機會已用完，你可以分享此活動獲得更多抽獎機會。");
      return;
    }

    rotate.set(rotate.get() + 720);

    fireEvent("Draw", {
      userId,
      numOfOpportunitie,
    });
    draw();
  };

  return (
    <LazyMotion features={domAnimation}>
      <div onClick={handlePress} className="relative">
        <m.div
          style={{
            transition: "all 1s ease-in-out",
            rotate,
          }}
        >
          <AspectRatio ratio={2048 / 2048}>
            <Image
              src="/images/manshokuya/Start.png"
              fill
              alt="Gocha Texture"
            />
          </AspectRatio>
        </m.div>
        <div className="py-[10%] flex flex-col absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
          <div className="mb-1.5 md:mb-6 md:text-xl font-medium">開</div>
          <div className="mt-1.5 md:mt-6 md:text-xl font-medium">始</div>
          {/* <div className="h-[80%] font-m-plus flex flex-col absolute top-0 left-0 right-0 bottom-0 justify-center items-center text-xs font-bold">
          <div className="mb-1.5 md:mb-2 md:text-xl">開</div>
          <div className="mt-1.5 md:mt-2 md:text-xl">始</div>
        </div> */}
        </div>
      </div>
    </LazyMotion>
  );
}
