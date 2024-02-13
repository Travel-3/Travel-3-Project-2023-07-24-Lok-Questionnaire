import { AspectRatio } from "@/components/ui";
import Image from "next/image";

export type ProgressBarProps = {
  value: number | `${number}` | undefined;
};

export default function ProgressBar({ value = 0 }: ProgressBarProps) {
  const widthPercentage = `${value}%`;
  return (
    <div className="relative h-6">
      <div className="relative z-10 rounded-full h-full bg-white border-2 border-black"></div>
      <div
        className="rounded-full h-full border-2 border-black absolute bottom-0 left-0 top-0 right-0 mt-1"
        style={{
          background: "#FF96D5",
        }}
      ></div>
      <div className="h-full absolute bottom-0 left-0 top-0 right-0 z-10">
        <div
          className="relative h-full transition"
          style={{
            width: widthPercentage,
          }}
        >
          <div
            className="rounded-full h-full border-2 border-black transition"
            style={{
              background: "#F0515F",
            }}
          ></div>
          <div className="absolute top-0 right-0 bottom-0 flex items-center">
            <div className="w-12 translate-x-1/2">
              <AspectRatio ratio={104 / 81}>
                <Image src="/single-dog/svg/small-heart.svg" alt="Heart" fill />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>

      <div className="translate-x-1/3 w-12 absolute flex top-0 right-0 bottom-0 items-center z-10">
        <AspectRatio ratio={111 / 84}>
          <Image src="/single-dog/svg/letter.svg" alt="letter" fill />
        </AspectRatio>
      </div>
    </div>
  );
}
