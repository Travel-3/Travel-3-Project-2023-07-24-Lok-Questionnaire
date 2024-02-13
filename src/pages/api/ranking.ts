import type { NextApiRequest, NextApiResponse } from "next";
import { document } from "@/utils/db";
import { getSessionItem } from "./utils";

const getRankItems = async (game: string, score: number) => {
  try {
    const { Items } = await document.scan({
      TableName: game,
      FilterExpression: "#score >= :score",
      ExpressionAttributeNames: {
        "#score": "score",
      },
      ExpressionAttributeValues: {
        ":score": score,
      },
    });

    return Items;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(404).json({});

  const { sessionId, game } = req.query;

  const id = `Score/${sessionId}`;

  const scoreItem = await getSessionItem(
    game as string,
    sessionId as string,
    "Score",
  );

  console.log(id, "id", scoreItem);
  if (!scoreItem) {
    res.status(404).json({
      ok: false,
      error: "Score not found",
    });
    return;
  }

  const score = scoreItem.score;

  const items = await getRankItems(game as string, Number(score));

  if (!items) {
    return res.status(200).json({ ok: true, rank: 999, score: 0 });
  }

  const allRankItemsSorted = items.sort((a, b) => b.score - a.score);
  const rank = allRankItemsSorted.findIndex(
    (item) => Number(item.score) === Number(score),
  );

  if (rank === -1) {
    return res.status(200).json({ ok: true, rank: 999, score: 0 });
  }

  return res.status(200).json({
    ok: true,
    rank: 1 + rank,
    score: Number(score),
  });
}
