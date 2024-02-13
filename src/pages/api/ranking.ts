// Plan to fixed
import type { NextApiRequest, NextApiResponse } from "next";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { docClient, document } from "@/utils/db";
import { getSessionItem } from "./utils";

// const getOrCreateRankItem = async (
//   game: string,
//   sessionId: string,
//   score: number,
// ) => {
//   try {
//     let id = null;
//     const { Items } = await document.scan({
//       TableName: "Ranking",
//       FilterExpression: "#ref = :ref_val And game = :game_value",
//       ExpressionAttributeNames: {
//         "#ref": "sessionId",
//       },
//       ExpressionAttributeValues: {
//         ":ref_val": sessionId,
//         ":game_value": game,
//       },
//     });

//     if (Items?.length === 0) {
//       id = uuid();
//       await docClient.send(
//         new PutCommand({
//           TableName: "Ranking",
//           Item: {
//             id,
//             sessionId,
//             game,
//             score,
//           },
//         }),
//       );
//     } else {
//       id = Items?.[0]?.id;
//     }

//     await updateItemById("Ranking", id, {
//       score,
//       sessionId,
//       game,
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// async function updateItemById(
//   tableName: string,
//   id: string,
//   newValue: Record<string, unknown>,
// ) {
//   try {
//     // const params = {
//     //   TableName: tableName,
//     //   Key: {
//     //     id: id,
//     //   },
//     //   UpdateExpression: updateExpression,
//     //   ExpressionAttributeValues: expressionAttributeValues,
//     //   ReturnValues: "UPDATED_NEW",
//     // };

//     await docClient.send(
//       new PutCommand({
//         TableName: tableName,
//         Item: {
//           id,
//           ...newValue,
//         },
//       }),
//     );

//     // const response = await client.send(new UpdateItemCommand(params));
//     // return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

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

  const scoreItem = await getSessionItem(
    game as string,
    sessionId as string,
    "Score",
  );

  if (!scoreItem) {
    res.status(404).json({
      ok: false,
      error: "Session not found",
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

  // await getOrCreateRankItem(game as string, sessionId as string, Number(score));
  // const allRankItems = await getAllRankItems(game as string);

  // if (allRankItems) {
  //   const allRankItemsSorted = items.sort((a, b) => b.score - a.score);
  //   const rank = allRankItemsSorted.findIndex(
  //     (item) => item.sessionId === sessionId
  //   );
  //   return res.status(200).json({
  //     ok: true,
  //     rank: 1 + rank,
  //     score: Number(score),
  //   });
  // }
  // return res.status(200).json({ ok: true, rank: 99, score: 0 });
}
