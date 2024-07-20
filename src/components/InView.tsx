import { useInView } from "react-intersection-observer";
import "intersection-observer";
import { PropsWithChildren } from "react";

export interface InViewProps extends PropsWithChildren {
  loading?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function InView({
  children,
  className,
  loading,
  style,
}: InViewProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} style={style} className={className}>
      {!inView && loading}
      {inView && children}
    </div>
  );
}
