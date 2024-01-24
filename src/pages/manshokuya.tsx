import App from "@/components/App";
import { useManshokuya, withProvider } from "@/apps/manshokuya/Provider";
import BaseBottomSheet from "@/components/Dialog/BaseBottomSheet";
import useDisclosure from "@/hooks/useDisclosure";
import TrackLink from "@/components/Track/TrackLink";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import GachaMachine from "@/apps/manshokuya/components/GachaMachine";
import MyGachaBallList from "@/apps/manshokuya/components/MyGachaBallList";
import GachaRewardDialog from "@/apps/manshokuya/components/GachaRewardDialog";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import GachaPosterDialog from "@/apps/manshokuya/components/GachaPosterDialog";
import SignUpForm from "@/apps/manshokuya/components/SignUpForm";
import { useUser } from "@/apps/manshokuya/hooks";

function Page() {
  const { userId, userPhone } = useUser();
  const {
    isOpen: isPrivacyOpen,
    onOpen: onPrivacyOpen,
    onClose: onPrivacyClose,
  } = useDisclosure();
  const {
    isOpen: isShareRuleOpen,
    onOpen: onShareRuleOpen,
    onClose: onShareRuleClose,
  } = useDisclosure();
  const {
    isOpen: isAsk4PhoneOpen,
    onOpen: onAsk4PhoneOpen,
    onClose: onAsk4PhoneClose,
  } = useDisclosure();
  const {
    isOpen: isRewardOpen,
    onOpen: onRewardOpen,
    onClose: onRewardClose,
  } = useDisclosure();

  const { reward } = useManshokuya();
  const { data: { data } = { data: [] } } = useQuery({
    queryKey: ["Coupons"],
    queryFn: () => {
      return fetch("/api/coupons?sessionId=" + userId).then((res) =>
        res.json(),
      );
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10_000,
    enabled: !!userId,
  });

  useEffect(() => {
    if (reward.id) {
      setTimeout(() => {
        onRewardOpen();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward, userPhone]);

  const handleRewardClose = () => {
    onRewardClose();
    if (!userPhone) {
      onAsk4PhoneOpen();
    }
  };

  const handleNavigateToShareRule = () => {
    window.scrollBy({
      top: document.querySelector("#shareRule")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  const handleNavigateToGameRule = () => {
    window.scrollBy({
      top: document.querySelector("#gameRule")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <App
        style={{
          background: "#FACD00",
        }}
      >
        <div className="border-b-4 border-black relative">
          <AspectRatio ratio={2160 / 2604}>
            <Image
              src="/images/manshokuya/Background.png"
              fill
              alt={"Background"}
            />
          </AspectRatio>
          <div className="absolute top-0 left-0 right-0 mx-2 mt-12">
            <GachaMachine />
          </div>
          {/* ===活動規則=== */}
          <div
            className="absolute right-0 top-6 w-24 -mr-1"
            onClick={onPrivacyOpen}
          >
            <AspectRatio ratio={2160 / 787}>
              <Image src="/images/manshokuya/T&C.png" fill alt={"Background"} />
            </AspectRatio>
          </div>
        </div>
        {/*  */}
        <div className="px-4 mt-20">
          <div className="relative">
            <AspectRatio ratio={2048 / 1065}>
              <Image
                src="/images/manshokuya/Share-Flags.png"
                fill
                alt={"Game Rule"}
              />
            </AspectRatio>
            <div
              className="absolute left-0 bottom-0 right-0"
              style={{
                paddingLeft: "9.86%",
                paddingRight: "9.86%",
              }}
            >
              <TrackLink
                game="Manshokuya"
                href="https://www.facebook.com/photo.php?fbid=875081747957871&amp;set=a.455841246548592&amp;type=3&amp;ref=embed_post"
              >
                <AspectRatio ratio={2048 / 276}>
                  <Image
                    src="/images/manshokuya/Facebook-Btn.png"
                    fill
                    alt={"Game Rule"}
                  />
                </AspectRatio>
              </TrackLink>
              <div
                className="flex w-full items-center"
                style={{
                  paddingTop: "3%",
                }}
              >
                <div
                  className="flex-1"
                  style={{ paddingRight: "2.465%" }}
                  onClick={handleNavigateToShareRule}
                >
                  <AspectRatio ratio={2048 / 575}>
                    <Image
                      src="/images/manshokuya/How-To-Use-Btn.png"
                      fill
                      alt={"Game Rule"}
                    />
                  </AspectRatio>
                </div>
                <div
                  className="flex-1"
                  style={{ paddingLeft: "2.465%" }}
                  onClick={handleNavigateToGameRule}
                >
                  <AspectRatio ratio={2048 / 575}>
                    <Image
                      src="/images/manshokuya/How-To-Play-Btn.png"
                      fill
                      alt={"Game Rule"}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center" id="gameRule">
            <div
              style={{
                width: "49.3%",
              }}
            >
              <AspectRatio ratio={2048 / 575}>
                <Image
                  src="/images/manshokuya/Game-Rule.png"
                  fill
                  alt={"Game Rule"}
                />
              </AspectRatio>
            </div>
            <div className="flex justify-center w-full relative my-6 -mx-1">
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/Invite-Fds.png"
                    fill
                    alt={"Invite Fds"}
                    objectFit="cover"
                  />
                </AspectRatio>
              </div>
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/On-Game.png"
                    fill
                    alt={"Invite Fds"}
                  />
                </AspectRatio>
              </div>
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/Reward.png"
                    fill
                    alt={"Invite Fds"}
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          <div className="text-center">
            參加盤菜活動 - Facebook參加盤菜活動 - Facebook參加盤菜活動 -
            Facebook參加盤菜活動 - Facebook參加盤菜活動 - Facebook參加盤菜活動 -
            Facebook
          </div>

          {/*  */}

          <MyGachaBallList data={data} />
          {/* New Line */}

          <div className="mt-8 flex flex-col items-center" id="shareRule">
            <div
              style={{
                width: "49.3%",
              }}
            >
              <AspectRatio ratio={2048 / 575}>
                <Image
                  src="/images/manshokuya/How-To-Use.png"
                  fill
                  alt={"Game Rule"}
                />
              </AspectRatio>
            </div>
            <div className="flex justify-center w-full relative my-6">
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/Receive-SMS.png"
                    fill
                    alt={"Invite Fds"}
                    objectFit="cover"
                  />
                </AspectRatio>
              </div>
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/Show-SMS.png"
                    fill
                    alt={"Invite Fds"}
                  />
                </AspectRatio>
              </div>
              <div className="flex-1 mx-1">
                <AspectRatio ratio={2048 / 2623}>
                  <Image
                    src="/images/manshokuya/Use-Coupon.png"
                    fill
                    alt={"Invite Fds"}
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          <div className="text-center">
            參加盤菜活動 - Facebook參加盤菜活動 - Facebook參加盤菜活動 -
            Facebook參加盤菜活動 - Facebook參加盤菜活動 - Facebook參加盤菜活動 -
            Facebook
          </div>
          <div className="text-center pb-12">By - Travel3.app</div>
        </div>
      </App>
      <BaseBottomSheet isOpen={isPrivacyOpen} title="" onClose={onPrivacyClose}>
        Privacy
      </BaseBottomSheet>
      <BaseBottomSheet
        isOpen={isAsk4PhoneOpen}
        title=""
        overlay
        onClose={onAsk4PhoneClose}
      >
        <SignUpForm onDone={onAsk4PhoneClose} />
      </BaseBottomSheet>
      <GachaRewardDialog isOpen={isRewardOpen} onClose={handleRewardClose} />
      <GachaPosterDialog />
    </>
  );
}

export default withProvider(Page);
