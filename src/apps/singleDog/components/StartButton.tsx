import { useProvider } from "../Provider";

export default function StartButton() {
  const { play } = useProvider();

  const handlePlay = () => {
    play();
  };

  return (
    <div className="relative flex-1 mx-1 cursor-pointer" onClick={handlePlay}>
      <div className="z-10 relative rounded-full border-2 border-black bg-white text-center font-bold py-1">
        <div className="text-black font-bold text-3xl -mt-1">START</div>
      </div>
      <div className="absolute top-1 left-1 -right-1 rounded-full -bottom-1 border-2 border-black bg-[#ff9dd3] "></div>
    </div>
  );
}
