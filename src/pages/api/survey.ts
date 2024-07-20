import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, increaseItem, writeItem } from "./utils";
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

  const submitItem = await getSessionItem(
    game as string,
    sessionId as string,
    "Submit",
  );

  console.log("submitItem", submitItem);
  if (submitItem) {
    res.status(200).json({
      ok: false,
      error: "Already submitted",
    });
  }

  try {
    const referralItem = await getSessionItem(
      game,
      sessionId as string,
      "Referral By",
    );
    if (referralItem) {
      await increaseItem(
        game as string,
        `Score/${referralItem.data}`,
        "score",
        5,
      );
      // console.log("referralItem", referralItem);
    }

    const params: UpdateItemCommandInput = {
      TableName: game as string,
      Key: { ID: { S: item.ID } },
      UpdateExpression: "SET #name = :name",
      ExpressionAttributeValues: {
        ":name": { S: name?.toString() ?? "" },
      },
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ReturnValues: "ALL_NEW",
    };

    const command = new UpdateItemCommand(params);
    await client.send(command);

    await writeItem(game as string, {
      ID: `Submit/${sessionId}`,
      score: score,
      name: name,
      sessionId,
      behaviour: "Submit",
      createdAt: new Date().toISOString(),
    });

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
