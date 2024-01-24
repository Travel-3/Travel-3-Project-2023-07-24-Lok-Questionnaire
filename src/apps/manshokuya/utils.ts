import { getDeviceID } from "@/hooks/useDeviceID";

export function generateFacebookComment() {
  const id = getDeviceID();

  return `參加xxxxx #${id}`;
}
