import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import { PRODUCTS } from "../constant";
import TrackLink from "@/components/Track/TrackLink";

export type RewardBoxItemProps = {
  title: string;
  href: string;
  image: string;
};

function RewardBoxItem({ title, href, image }: RewardBoxItemProps) {
  return (
    <div className="w-full bg-white border-2 border-black rounded-full text-center">
      <div className="relative ">
        <AspectRatio ratio={1} className="-ml-1 relative z-10 -mt-1">
          <div
            className="relative border-2 border-black rounded-full w-full h-full"
            style={{
              background: "#8fadf5",
            }}
          ></div>
          <div className="absolute top-0 left-0 right-1 bottom-0 mb-1 mt-1 ml-1 z-10">
            <AspectRatio ratio={1}>
              <Image
                src={image}
                alt={title}
                fill
                className="rounded-full overflow-hidden"
              />
            </AspectRatio>
          </div>
        </AspectRatio>
        <div
          className="absolute top-1 left-1 right-0 bottom-0 border-2 border-black rounded-full w-full h-full"
          style={{
            background: "#FFDC20",
          }}
        ></div>
      </div>
      <div className="py-3">
        <p
          className="font-black text-[#FFDC20] text-outlined text-xl font-m-plus"
          style={{
            "--stroke-width": "1px",
            "--stroke-color": "black",
          }}
        >
          {title}
        </p>
        <p className="text-xs font-bold">限量00份</p>
        <div className="flex justify-center">
          <TrackLink
            game="SingleDog"
            href={"https://somethingspecialgiftbox.com/"}
          >
            <div
              className="my-3 rounded-full font-bold px-1"
              style={{
                background: "#97DAFC",
              }}
            >
              了解更多
            </div>
          </TrackLink>
        </div>
      </div>
    </div>
  );
}

export default function RewardBox() {
  return (
    <div
      className="w-full border-2 relative border-black rounded-lg"
      style={{
        background: "#F9E2C5",
      }}
    >
      <div className="w-full mx-auto -mt-[7%] top-0 px-2">
        <AspectRatio ratio={882 / 140}>
          <Image src="/single-dog/images/reward-title.png" fill alt="Reward" />
        </AspectRatio>
      </div>
      <div className="p-3 grid grid-cols-3 gap-3">
        {PRODUCTS.map((product) => (
          <RewardBoxItem
            key={product.title}
            title={product.title}
            href={product.href}
            image={product.image}
          />
        ))}

        {/* <RewardBoxItem />
        <RewardBoxItem /> */}
      </div>
    </div>
  );
}
