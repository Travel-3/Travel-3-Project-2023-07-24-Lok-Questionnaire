import { AspectRatio } from "@/components/ui";
import { LazyMotion, domAnimation, m, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useManshokuya } from "../Provider";

export default function GachaMachineStartButton() {
  const { numOfOpportunitie, isAnimating, draw } = useManshokuya();
  const rotate = useMotionValue(0);

  const handlePress = () => {
    if (isAnimating) {
      return;
    }

    if (numOfOpportunitie <= 0) {
      return;
    }

    rotate.set(rotate.get() + 720);
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
        <div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 justify-center items-center text-xs font-bold">
          <div className="mb-1">開</div>
          <div className="mt-1">始</div>
        </div>
      </div>
    </LazyMotion>
  );
}
