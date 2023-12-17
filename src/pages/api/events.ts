import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { runMiddleware } from "@/utils/middleware";
import { v4 as uuid } from "uuid";
import { docClient, document } from "@/utils/db";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

const getSessionItem = async (
  tableName: string,
  sessionId: string,
  behaviour: string,
) => {
  try {
    const { Items } = await document.send(
      new ScanCommand({
        TableName: tableName,
        FilterExpression:
          "#sessionId = :sessionId_val And #behaviour = :behaviour_val",
        ExpressionAttributeNames: {
          "#sessionId": "sessionId",
          "#behaviour": "behaviour",
        },
        ExpressionAttributeValues: {
          ":sessionId_val": sessionId,
          ":behaviour_val": behaviour,
        },
      }),
    );

    // console.log("ScanCommand", Items);
    return Items;
  } catch (error) {
    console.log("error", error);
  }
};

const getReferralItemsCount = async (tableName: string, sessionId: string) => {
  try {
    const { Count } = await document.scan({
      TableName: tableName,
      FilterExpression:
        "#ref = :user_status_val And #behaviour = :behaviour_val",
      ExpressionAttributeNames: {
        "#ref": "ref",
        "#behaviour": "behaviour",
      },
      ExpressionAttributeValues: {
        ":user_status_val": sessionId,
        ":behaviour_val": "REFERRAL",
      },
      Select: "COUNT",
    });

    // console.log("ScanCommand", Items);
    return Count ?? 0;
  } catch (error) {
    console.log("error", error);
    return 0
  }
};

const getFinishedItemsCount = async (tableName: string, sessionId: string) => {
  try {
    const { Count } = await document.scan({
      TableName: tableName,
      FilterExpression: "(#ref = :ref_val And behaviour = :behaviour_val) Or (sessionId = :ref_val and behaviour = :behaviour_val)",
      ExpressionAttributeNames: {
        "#ref": "ref",
      },
      // ProjectionExpression: "behaviour",
      ExpressionAttributeValues: {
        ":ref_val": sessionId,
        ":behaviour_val": "FINISH",
      },
      Select: "COUNT",
    });

    console.log("ScanCommand", Count)
    return Count ?? 0;
  } catch (error) {
    console.log("error", error);
    return 0
  }
};

const getAnsweredItems = async (
  tableName: string,
  sessionId: string,
  question: string,
) => {
  try {
    const { Items } = await document.scan({
      TableName: tableName,
      FilterExpression:
        "#ref = :ref_val And #behaviour = :behaviour_val And #question = :question_val",
      ExpressionAttributeNames: {
        "#ref": "sessionId",
        "#behaviour": "behaviour",
        "#question": "question",
      },
      ExpressionAttributeValues: {
        ":ref_val": sessionId,
        ":behaviour_val": "ANSWER",
        ":question_val": question,
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

  const { sessionId, behaviour, game, createdAt, userAgent } = req.query;

  switch (behaviour) {
    case "START": {
      const referralCount = await getReferralItemsCount(
        game as string,
        sessionId as string,
      );
      const finishedCount = await getFinishedItemsCount(
        game as string,
        sessionId as string,
      );
      const score = referralCount  + finishedCount  * 5;
      return res.status(200).json({
        ok: true,
        score,
      });
    }
    case "REDIRECT": {
      const { to, from } = req.query;

      await docClient.send(
        new PutCommand({
          TableName: game as string,
          Item: {
            id: uuid(),
            sessionId,
            createdAt,
            userAgent,
            behaviour,
            to,
            from,
          },
        }),
      );
      break;
    }
    case "ANSWER": {
      const { question, answer } = req.query;

      const answerItems = await getAnsweredItems(
        game as string,
        sessionId as string,
        (question as string).replaceAll("\n", ""),
      );

      if (answerItems && answerItems?.length)
        return res.status(200).json({ ok: true });

      await docClient.send(
        new PutCommand({
          TableName: game as string,
          Item: {
            id: uuid(),
            sessionId,
            createdAt,
            userAgent,
            behaviour,
            question: (question as string).replaceAll("\n", ""),
            answer,
          },
        }),
      );
      break;
    }
    case "REFERRAL": {
      const { ref } = req.query;
      const items = await getSessionItem(
        game as string,
        sessionId as string,
        "REFERRAL",
      );

      if (items && items?.length) return res.status(200).json({ ok: true });

      await docClient.send(
        new PutCommand({
          TableName: game as string,
          Item: {
            id: uuid(),
            sessionId,
            createdAt,
            userAgent,
            behaviour,
            ref,
          },
        }),
      );
      break;
    }
    case "FINISH": {
      const { score, phone, region, ref, name } = req.query;
      const items = await getSessionItem(
        game as string,
        sessionId as string,
        "FINISH",
      );

      if (items && items?.length) return res.status(200).json({ ok: true });

      await docClient.send(
        new PutCommand({
          TableName: game as string,
          Item: {
            id: uuid(),
            sessionId,
            createdAt,
            userAgent,
            behaviour,
            score,
            phone,
            region,
            name,
            ref,
          },
        }),
      );
      break;
    }
  }

  return res.status(200).json({ ok: true });
}
