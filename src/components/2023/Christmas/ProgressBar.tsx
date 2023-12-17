// import { AspectRatio } from "@radix-ui/themes";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Progress = {
  0: "/images/2023/Christmas/progress-0.svg",
  25: "/images/2023/Christmas/progress-25.svg",
  50: "/images/2023/Christmas/progress-50.svg",
  75: "/images/2023/Christmas/progress-75.svg",
  100: "/images/2023/Christmas/progress-100.svg",
} as const;

export type ProgressBarProps = {
  progress: keyof typeof Progress;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      <AspectRatio ratio={873 / 99}>
        <Image src={Progress[progress]} fill alt="Progress" />
      </AspectRatio>
    </ProgressBarContainer>
  );
}
