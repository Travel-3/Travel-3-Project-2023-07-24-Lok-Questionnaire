import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, increaseItem } from "./utils";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { client } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(500).json({
      ok: false,
    });

  const { game, sessionId, score, name } = req.body;
  const item = await getSessionItem(
    game as string,
    sessionId as string,
    "New User",
  );

  if (!item) {
    res.status(404).json({
      ok: false,
      error: "Session not found",
    });
    return;
  }

  try {
    const referralItem = await getSessionItem(
      game,
      sessionId as string,
      "Referral By",
    );
    if (referralItem) {
      const scoreItem = await getSessionItem(game, referralItem?.ID, "Score");
      if (scoreItem) increaseItem(game as string, scoreItem.ID, "score", 5);
    }

    const params: UpdateItemCommandInput = {
      TableName: game as string,
      Key: { ID: { S: item.ID } },
      UpdateExpression: "SET #score = :score, #name = :name",
      ExpressionAttributeValues: {
        ":score": { S: score?.toString() ?? "" },
        ":name": { S: name?.toString() ?? "" },
      },
      ExpressionAttributeNames: {
        "#score": "score",
        "#name": "name",
      },
      ReturnValues: "ALL_NEW",
    };

    const command = new UpdateItemCommand(params);
    await client.send(command);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
}
