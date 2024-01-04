import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { runMiddleware } from "@/utils/middleware";
import { v4 as uuid } from "uuid";
import { client, docClient, document } from "@/utils/db";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

const getOrCreateRankItem = async (
  game: string,
  sessionId: string,
  score: number,
) => {
  try {
    let id = null;
    const { Items } = await document.scan({
      TableName: "Ranking",
      FilterExpression: "#ref = :ref_val And game = :game_value",
      ExpressionAttributeNames: {
        "#ref": "sessionId",
      },
      ExpressionAttributeValues: {
        ":ref_val": sessionId,
        ":game_value": game,
      },
    });

    if (Items?.length === 0) {
      id = uuid();
      await docClient.send(
        new PutCommand({
          TableName: "Ranking",
          Item: {
            id,
            sessionId,
            game,
            score,
          },
        }),
      );
    } else {
      id = Items?.[0]?.id;
    }

    await updateItemById("Ranking", id, {
      score,
      sessionId,
      game,
    });
  } catch (error) {
    console.log("error", error);
  }
};

async function updateItemById(
  tableName: string,
  id: string,
  newValue: Record<string, unknown>,
) {
  try {
    // const params = {
    //   TableName: tableName,
    //   Key: {
    //     id: id,
    //   },
    //   UpdateExpression: updateExpression,
    //   ExpressionAttributeValues: expressionAttributeValues,
    //   ReturnValues: "UPDATED_NEW",
    // };

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id,
          ...newValue,
        },
      }),
    );

    // const response = await client.send(new UpdateItemCommand(params));
    // return response;
  } catch (error) {
    console.error(error);
  }
}

const getAllRankItems = async (game: string) => {
  try {
    const { Items } = await document.scan({
      TableName: "Ranking",
      FilterExpression: "game = :game_value",
      ExpressionAttributeValues: {
        ":game_value": game,
      },
    });

    return Items;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);
  if (req.method !== "GET") return res.status(404).json({});

  const { sessionId, game, score } = req.query;

  await getOrCreateRankItem(game as string, sessionId as string, Number(score));
  const allRankItems = await getAllRankItems(game as string);

  if (allRankItems) {
    const allRankItemsSorted = allRankItems.sort((a, b) => b.score - a.score);
    const rank = allRankItemsSorted.findIndex(
      (item) => item.sessionId === sessionId,
    );
    return res.status(200).json({
      ok: true,
      rank: 1 + rank,
      score: Number(score),
    });
  }
  return res.status(200).json({ ok: true, rank: 99, score: 0 });
}
