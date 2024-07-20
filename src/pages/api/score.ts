import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, writeItem } from "./utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionId, game } = req.query;

  try {
    const session = await getSessionItem(
      game as string,
      sessionId as string,
      "New User",
    );

    if (!session) {
      res.status(404).json({
        ok: false,
        error: "Session not found",
      });
      return;
    }

    const score = await getOrCreateScoreItem(
      game as string,
      sessionId as string,
      1,
    );

    res.status(200).json({
      ok: true,
      score: {
        ...score,
        phone: session.phone,
        // region: session.region,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
}

const getOrCreateScoreItem = async (
  game: string,
  sessionId: string,
  score: number,
) => {
  try {
    const id = `Score/${sessionId}`;
    const item = await getSessionItem(game, sessionId, "Score");

    if (!item) {
      await writeItem(game, {
        ID: id,
        sessionId,
        behaviour: "Score",
        score,
        createdAt: new Date().toISOString(),
      });

      return {
        sessionId,
        behaviour: "Score",
        score,
      };
    }

    return item;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
