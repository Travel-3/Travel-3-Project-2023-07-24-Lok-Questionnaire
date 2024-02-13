import { useMutation } from "@tanstack/react-query";
import { useProvider } from "../Provider";
import Spinner from "@/components/Spinner";

export default function SubmitButton() {
  const { user, gameScore, finish } = useProvider();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      game,
      sessionId,
      score,
      name,
    }: {
      game: string;
      sessionId: string;
      score: number;
      name: string;
    }) => {
      return fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: gameScore,
          name,
          sessionId,
          game,
        }),
      });
    },
  });

  const handlePlay = async () => {
    if (isPending) return;
    console.log("play");
    if (!user.name) alert("請填寫你的角色用户名");

    try {
      await mutateAsync({
        game: "SingleDog",
        sessionId: user.id,
        score: user.score,
        name: user.name,
      });
      finish();
    } catch (error) {
      alert("提交失敗!");
    }
  };

  return (
    <div className="relative flex-1 mx-1 cursor-pointer" onClick={handlePlay}>
      <div className="z-10 relative rounded-full border-2 border-black bg-[#FFDC20] text-white text-center font-bold py-2">
        <span
          className="font-black text-3xl text-outlined flex justify-center items-center"
          style={{
            "--stroke-width": "2px",
            "--stroke-color": "#000",
          }}
        >
          {isPending ? <Spinner /> : "完成"}
        </span>
      </div>
      <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
    </div>
  );
}
