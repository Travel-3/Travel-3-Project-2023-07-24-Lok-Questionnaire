import { useInView } from "react-intersection-observer";
import "intersection-observer";
import { PropsWithChildren } from "react";

export interface InViewProps extends PropsWithChildren {
  loading?: React.ReactNode;
}

export default function InView({ children, loading }: InViewProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {!inView && loading}
      {inView && children}
    </div>
  );
}
