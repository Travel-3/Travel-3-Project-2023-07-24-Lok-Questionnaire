import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, increaseItem, writeItem } from "./utils";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { game, sessionId, referral } = req.query;
  const sessionItem = await getSessionItem(
    game as string,
    sessionId as string,
    "New User",
  );

  if (sessionItem) {
    res.status(200).json({
      ok: true,
      data: sessionItem,
    });
  } else {
    await writeItem(game as string, {
      ID: uuid(),
      sessionId: sessionId as string,
      score: 0,
      behaviour: "New User",
      createdAt: new Date().toISOString(),
    });

    const item = await getSessionItem(
      game as string,
      referral as string,
      "Score",
    );

    if (item) {
      await writeItem(game as string, {
        ID: uuid(),
        sessionId: sessionId as string,
        data: referral,
        behaviour: "Referral By",
        createdAt: new Date().toISOString(),
      });
      await increaseItem(game as string, item.ID, "score");
    }
    res.status(200).json({
      ok: true,
      data: {
        score: 0,
        behaviour: "New User",
        sessionId: sessionId as string,
      },
    });
  }
}
