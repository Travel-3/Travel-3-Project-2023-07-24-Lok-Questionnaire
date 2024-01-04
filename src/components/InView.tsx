import { useInView } from "react-intersection-observer";
import "intersection-observer";
import { PropsWithChildren } from "react";

export interface InViewProps extends PropsWithChildren {
  loading?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function InView({ children, loading, style }: InViewProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} style={style}>
      {!inView && loading}
      {inView && children}
    </div>
  );
}
