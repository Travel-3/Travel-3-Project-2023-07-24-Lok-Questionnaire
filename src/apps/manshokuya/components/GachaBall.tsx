// Ball-01.png

import { AspectRatio } from "@/components/ui";
import {
  LazyMotion,
  MotionValue,
  domAnimation,
  m,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { memo, useEffect, useRef } from "react";
import { useManshokuya } from "../Provider";

const Ball = {
  1: {
    ratio: 2048 / 1997,
    src: "/images/manshokuya/Ball-01.png",
  },
  2: {
    ratio: 2048 / 1831,
    src: "/images/manshokuya/Ball-02.png",
  },
  3: {
    ratio: 2048 / 1997,
    src: "/images/manshokuya/Ball-03.png",
  },
  4: {
    ratio: 2048 / 1997,
    src: "/images/manshokuya/Ball-04.png",
  },
};

export type GochaBallProps = {
  x: number;
  y: number;
  rotation?: number;
  width?: number | string;
  type: 1 | 2 | 3 | 4;
};

export function BaseGachaBall({
  type,
  width,
  x,
  y,
}: Pick<GochaBallProps, "type" | "width"> & {
  x?: MotionValue<any>;
  y?: MotionValue<any>;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        // transition={{ ease: "easeOut", duration: 0.2 }}
        style={{
          x,
          y,
          width,
        }}
      >
        <AspectRatio ratio={Ball[type].ratio}>
          <Image
            src={Ball[type].src}
            fill
            alt="Gocha Ball"
            quality={90}
            priority
          />
        </AspectRatio>
      </m.div>
    </LazyMotion>
  );
}

function GachaBall({ y, x, rotation, width = 100, type }: GochaBallProps) {
  const handler = useRef<NodeJS.Timer | null>(null);
  const animatedX = useSpring(0);
  const animatedY = useSpring(0);
  const { isAnimating } = useManshokuya();

  const reset = () => {
    if (handler.current) clearInterval(handler.current);
    handler.current = null;
  };

  useEffect(() => {
    if (!isAnimating) {
      reset();
      return;
    }

    animatedX.jump(Math.random() * 10 - 5);
    animatedY.jump(Math.random() * 10 - 5);
    handler.current = setInterval(() => {
      animatedX.jump(Math.random() * 10 - 5);
      animatedY.jump(Math.random() * 10 - 5);
    }, 150);

    // lifeHandler.current = setInterval(reset, 1000);

    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        // transition={{ ease: "easeOut", duration: 0.2 }}
        style={{
          position: "absolute",
          transition: "transform 0.2s ease-in-out",
          x: animatedX,
          y: animatedY,
          bottom: `${y}%`,
          transform: `rotate(${rotation}deg)`,
          width,
          ...(x < 50 ? { left: `${x}%` } : { right: `${100 - x}%` }),
        }}
      >
        <AspectRatio ratio={Ball[type].ratio}>
          <Image
            src={Ball[type].src}
            fill
            alt="Gocha Ball"
            quality={90}
            priority
          />
        </AspectRatio>
      </m.div>
    </LazyMotion>
  );
}

export default memo(GachaBall);
