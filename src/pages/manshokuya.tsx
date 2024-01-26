import App from "@/components/App";
import { useManshokuya, withProvider } from "@/apps/manshokuya/Provider";
import useDisclosure from "@/hooks/useDisclosure";
import TrackLink from "@/components/Track/TrackLink";
import { AspectRatio } from "@/components/ui";
import Image from "next/image";
import GachaMachine from "@/apps/manshokuya/components/GachaMachine";
import GachaRewardDialog from "@/apps/manshokuya/components/GachaRewardDialog";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/apps/manshokuya/hooks";
import Meta from "@/components/Meta";
import GachaCard from "@/apps/manshokuya/components/GachaCard";
import SplashScreen from "@/apps/manshokuya/components/SplashScreen";
import styled from "styled-components";
import { Business, TC } from "@/apps/manshokuya/constant";
import dynamic from "next/dynamic";

const BaseBottomSheet = dynamic(
  () => import("@/components/Dialog/BaseBottomSheet"),
  {
    ssr: false,
  },
);

const MyGachaBallList = dynamic(
  () => import("@/apps/manshokuya/components/MyGachaBallList"),
  {
    ssr: false,
  },
);

const GachaPosterDialog = dynamic(
  () => import("@/apps/manshokuya/components/GachaPosterDialog"),
  {
    ssr: false,
  },
);

const SignUpForm = dynamic(
  () => import("@/apps/manshokuya/components/SignUpForm"),
  {
    ssr: false,
  },
);

const FacebookButton = styled.div`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  color: #fff;
  background-color: #0972df;
  border-radius: 8px;
  --stroke-width: 1px;
  --stroke-color: #241716;
`;

const ShareButton = styled.div`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  background-color: #ec1827;
  color: #fff;
  border-radius: 8px;
  --stroke-width: 2px;
  --stroke-color: #241716;
`;

const StickyButton = styled.div`
  border: 2px solid #241716;
  box-shadow: 0px 4px 0px #241716;
  background-color: #facc00;
  color: #fff;
  border-radius: 8px 0 0 8px;
  --stroke-width: 1px;
  --stroke-color: #241716;
`;

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

  const shareURL = useMemo(() => {
    return `https://travel3exp.xyz/manshokuya?referral=${userId}`;
  }, [userId]);

  const handleShare = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: Business.title,
          text: Business.description,
          url: shareURL,
        })
        .then(() => console.log("成功分享!"));
    } else {
      const copy = (await import("copy-to-clipboard")).default;
      copy(shareURL);
      alert("複製鏈結成功！");
    }
  };

  return (
    <>
      <Meta
        slug="manshokuya"
        title="萬食屋扭蛋優惠活動"
        description="萬食屋扭蛋優惠活動"
        themeColor="#FACD00"
      />

      <SplashScreen>
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
                priority
                quality={90}
                alt={"Background"}
              />
            </AspectRatio>
            <div className="absolute top-0 left-0 right-0 mx-2 mt-16">
              <GachaMachine />
            </div>

            <div
              className="absolute right-0 top-6 w-24 -mr-1"
              onClick={onPrivacyOpen}
            >
              <StickyButton className="text-outlined text-center font-m-plus text-lg">
                活動規則
              </StickyButton>
              <div className="flex justify-end">
                <StickyButton className="inline-block px-3  mt-3 text-outlined text-center font-m-plus text-lg">
                  禮品
                </StickyButton>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="mx-6 mt-20 mb-0">
            <div className="pt-2">
              <ShareButton
                className="tracking-wider text-outlined py-1.5 text-center font-bold text-xl font-m-plus"
                onClick={handleShare}
              >
                立刻分享獲取機會
              </ShareButton>
            </div>
          </div>
          {/*  */}
          <div className="px-4 mt-6">
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
                    src="/images/manshokuya/How-To-Play-Btn.png"
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
            <GachaCard className="mb-12">
              <div className="text-center p-4 text-sm">
                首次參加活動時，您將獲得一次扭蛋機會。隨後您可以將活動圖片和鏈結分享到社交媒體上。
                <br />
                <br />
                每位新用戶參與活動後，您將獲得額外的一次扭蛋機會。
              </div>
            </GachaCard>

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
                    src="/images/manshokuya/How-To-Use-Btn.png"
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
            <GachaCard>
              <div className="text-center p-4 text-sm">
                當您獲得大獎時，您將透過簡訊收到獲獎通知。
                通知中會包含一個獨特的折扣代碼，您可以將代碼展示給參與活動的商家以享受折扣優惠。
                商家可能要求您在結帳時出示通知或提供折扣代碼以驗證您的資格，並將相應的折扣應用於您的購買。
                <br />
                <br />
                對於其他獎品，您可以在領獎頁面上找到折扣代碼。
                一旦您點擊並查看扭蛋，您將看到您所獲得獎品的詳細信息，包括折扣代碼和相關使用說明。
                您可以按照指示使用折扣代碼，在參與活動的商家享受相應的折扣優惠。
                <br />
                <br />
                請注意，每個折扣代碼通常只能在一次購買中使用，並且可能有特定的有效期限。
                因此，請確保在使用折扣之前閱讀並理解相關的使用條款和條件。
              </div>
            </GachaCard>
            <TrackLink game="Demo" href="https://www.facebook.com/manshokuya">
              <FacebookButton className="text-center mt-6 py-1 text-lg font-bold text-outlined">
                萬食屋 Facebook 專頁
              </FacebookButton>
            </TrackLink>
            <div className="text-center pb-12 mt-4">
              Powered By - Travel3
              <br />
              Email: info@travel3.app
              <br />
              <a href="https://travel3.app" target="_blank">
                https://travel3.app
              </a>
            </div>
          </div>
        </App>
        <BaseBottomSheet
          isOpen={isPrivacyOpen}
          title=""
          onClose={onPrivacyClose}
        >
          {TC}
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
      </SplashScreen>
    </>
  );
}

export default withProvider(Page);
