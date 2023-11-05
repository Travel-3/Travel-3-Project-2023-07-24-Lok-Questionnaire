import { useDeviceID } from "@/hooks/useDeviceID";
import useRecordGame from "@/hooks/useRecordGame";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Input,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import * as zod from "zod";
import InView from "./InView";
import { useRouter } from "next/router";
// import toast from 'react-hot-toast';

const schema = zod.object({
  phone: zod
    .string()
    .min(1, { message: "手機號碼不能為空！" })
    .max(10, { message: "手機號碼不能超過10個字符！" }),
  region: zod.enum(["853", "852", "86"]),
});

export default function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const recordGameMutation = useRecordGame();
  const [isJoined, setIsJoined] = useLocalStorage("Joined", false);
  const deviceId = useDeviceID();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      region: "853",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = handleSubmit(async ({ region, phone }) => {
    console.log("region", region, phone);
    setIsLoading(true);
    try {
      await recordGameMutation.mutateAsync({
        deviceId,
        ref: router.query.ref as string,
        type: "FINISH",
        region: region,
        phone: phone,
      });
      alert("參與活動成功!");
      setIsJoined(true);
      setIsOpen(false);
    } catch (error) {
      alert("參與活動失敗!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (!isJoined && isOpen === false) setIsOpen(true);
  }, [isJoined, isOpen]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => setIsOpen(true)}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius="12px 12px 0px 0px">
          <DrawerCloseButton />
          <DrawerBody>
            <InView>
              <Text mb={3} py={1} fontSize="md" fontWeight={700}>
                參與「賽車Q&A送大禮」活動
              </Text>
              {errors.region && (
                <>
                  <Text color="red" fontSize="sm">
                    {errors.region.message}
                  </Text>
                </>
              )}
              {errors.phone && (
                <>
                  <Text color="red" fontSize="sm">
                    {errors.phone.message}
                  </Text>
                </>
              )}

              <Flex mb={3}>
                <Select w={24} mr={1} {...register("region")}>
                  <option value="853">+853</option>
                  <option value="852">+852</option>
                  <option value="86">+86</option>
                </Select>
                <Input
                  flex={1}
                  placeholder="輸入電話號碼"
                  type="number"
                  {...register("phone")}
                />
              </Flex>

              <Button
                isLoading={isLoading}
                onClick={handleOnSubmit}
                width="full"
                size="lg"
                borderWidth="3px 3px 6px 3px"
                borderColor="#000"
              >
                參與
              </Button>
            </InView>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
