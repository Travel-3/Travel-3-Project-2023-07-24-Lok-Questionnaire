import { useProvider } from "../Provider";

export default function ShareButton() {
  const { user } = useProvider();
  const shareUrl = `https://travel3exp.xyz/single-dog?referral=${user.id}`;
  const handlePlay = async () => {
    try {
      await navigator.share({
        text: `Travel3 X「Something Special」送您情人節禮物活動`,
        url: shareUrl,
      });
      alert("「Travel3 X「Something Special」送您情人節禮物活動分享成功!");
    } catch (error) {
      const copy = await import("copy-to-clipboard").then(
        (module) => module.default,
      );
      copy(shareUrl);
      alert(
        "將您的貓貓結果分享到您的Facebook和Instagram帳戶上，讓您的朋友們也參與其中。",
      );
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={handlePlay}>
      <div className="z-10 relative rounded-full border border-black bg-[#FFDC20] text-white text-center font-bold px-3 py-0.5">
        <span
          className="font-black font-m-plus text-2xl text-outlined flex justify-center items-center"
          style={{
            "--stroke-width": "1px",
            "--stroke-color": "#000",
          }}
        >
          立即邀請
        </span>
      </div>
      <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
    </div>
  );
}
