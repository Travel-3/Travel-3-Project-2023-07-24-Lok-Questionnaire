import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { decreaseItem, getSessionItem } from "./utils";
import { document } from "@/utils/db";

function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const numberPart = Math.floor(Math.random() * 90000) + 10000; // This ensures the number is always 5 digits
  return letterPart + numberPart;
}

const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base("appNP4ctRAIBxohZu");

function luckyDraw(coupons: { quantity: number; ID: string; name: string }[]) {
  const totalQuantity = coupons.reduce(
    (total, coupon) => total + coupon.quantity,
    0,
  );
  const items = coupons
    .map((coupon) => ({
      id: coupon.ID,
      weight: coupon.quantity / totalQuantity,
      name: coupon.name,
    }))
    .sort((a, b) => a.weight - b.weight);

  const totalWeight = items.reduce((total, item) => total + item.weight, 0);
  let randomNum = Math.random() * totalWeight;

  let cursor = 0;
  for (let i = 0; i < items.length; i++) {
    cursor += items[i].weight;
    if (cursor >= randomNum) {
      return items[i];
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET")
    return res.status(500).json({
      ok: false,
    });

  const { sessionId, game } = req.query;

  if (!sessionId) {
    return res.status(404).json({
      ok: false,
      error: "Session not found",
    });
  }

  const item = await getSessionItem(
    game as string,
    sessionId as string,
    "Score",
  );

  if (!item) {
    return res.status(404).json({
      ok: false,
      error: "User not found",
    });
  }

  const score = item.score;

  if (score < 1) {
    return res.status(422).json({
      ok: false,
      error: "Not enough score",
    });
  }

  const { Items: coupons } = await document.scan({
    TableName: "Manshokuya_Drawing",
  });

  const table = base.table("Records");
  const luckyDrawResult = luckyDraw(coupons as any[]);
  const createdRecord = await table.create([
    {
      fields: {
        "Coupon Code": generateCode(),
        "Coupon Discount": luckyDrawResult?.name,
        "Coupon ID": Number(luckyDrawResult?.id),
        "User ID": sessionId,
      },
    },
  ]);

  if (luckyDrawResult?.id)
    await decreaseItem("Manshokuya_Drawing", luckyDrawResult.id, "quantity");

  await decreaseItem(game as string, item.ID, "score");

  if (createdRecord.length === 0) {
    return res.status(404).json({
      ok: false,
    });
  }

  return res.status(200).json({
    ok: true,
    data: createdRecord[0].fields,
  });
}
