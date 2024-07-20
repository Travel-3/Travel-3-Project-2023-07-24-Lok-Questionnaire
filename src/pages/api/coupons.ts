import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base("appNP4ctRAIBxohZu");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET")
    return res.status(404).json({
      ok: false,
    });

  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(404).json({
      ok: false,
    });
  }

  const table = base.table("Records");
  try {
    const records = await table
      .select({
        filterByFormula: `{User ID} = "${sessionId}"`,
      })
      .all();

    return res.status(200).json({
      ok: true,
      data: records.map((record) => ({
        code: record.fields["Coupon Code"],
        discount: record.fields["Coupon Discount"],
        couponId: record.fields["Coupon ID"],
        status: record.fields["Status"],
      })),
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
    });
  }
}
