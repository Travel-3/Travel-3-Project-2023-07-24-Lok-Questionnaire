import { PropsWithChildren } from "react";
import { useProvider } from "../Provider";
import { useScreenshot } from "@/components/Screenshot/ScreenshotProvider";

export type StepButtonProps = PropsWithChildren & {
  onClick?: () => void;
};
const StepButton = ({ children, onClick }: StepButtonProps) => (
<div className="relative flex-1" onClick={onClick}>
    <div className="font-m-plus z-10 relative rounded-full border border-black bg-[#8fadf5] text-white p-1  text-center font-black text-2xl">
        <span
            className="text-outlined"
            style={{
                "--stroke-width": "1px",
                "--stroke-color": "black",
            }}
        >
            {children}
        </span>
    </div>
    <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border border-black bg-[#ff9dd3] "></div>
</div>
);

export default function ShareToolBar() {
  const { take } = useScreenshot();
  const { user } = useProvider();
  const shareUrl = `https://travel3exp.xyz/single-dog?referral=${user.id}`;
  const handleCopy = async () => {
    const copy = await import("copy-to-clipboard").then(
      (module) => module.default,
    );
    copy(shareUrl);
  };
  const handleShare = async () => {
    try {
      await navigator.share({
        text: `Travel3 X「Something Special」送您情人節禮物活動`,
        url: shareUrl,
      });
      //   updateStatus("isShared", true);
      alert("Travel3 X「Something Special」送您情人節禮物活動分享成功!");
    } catch (error) {
      const copy = await import("copy-to-clipboard").then(
        (module) => module.default,
      );
      copy(shareUrl);
      alert(
        "將您的專屬聖誕貓貓結果分享到您的Facebook和Instagram帳戶上，讓您的朋友們也參與其中。",
      );
    }
  };

  return (
    <div className="flex w-full gap-3 mx-3">
      <StepButton onClick={take}>螢幕截圖</StepButton>
      <StepButton onClick={handleCopy}>複製連結</StepButton>
      <StepButton onClick={handleShare}>前往分享</StepButton>
    </div>
  );
}
