import Track from "@/utils/track";
import {
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
  useCallback,
} from "react";

export type TrackLinkProps = {
  game: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
} & PropsWithChildren;

export default function TrackLink({
  game,
  href,
  target,
  children,
}: TrackLinkProps) {
  const handleNavigate = useCallback(() => {
    Track.trackLink(game, href);
    window.open(href, target);
  }, [game, href, target]);

  return <div onClick={handleNavigate}>{children}</div>;
}
