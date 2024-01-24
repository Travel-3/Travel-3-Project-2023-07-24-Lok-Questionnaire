import SMS from "@/services/sms";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionId, couponId } = req.query;
  const response = await SMS.build().send("+85368185610", "Hello World");

  response.ok ? res.status(200).json(response) : res.status(404).json(response);
}
