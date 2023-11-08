import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const TABLE_NAME = process.env.TABLE_NAME || "GrandPrix2023";

const client = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);
  // if (req.method === "PUT") {
  //   const Item = {
  //     id: { S: uuid.v4() },
  //     content: { S: req.body.content },
  //   };
  //   await client.send(
  //     new PutItemCommand({
  //       TableName: process.env.TABLE_NAME,
  //       Item,
  //     })
  //   );

  //   return res.status(201).json(Item);
  // }

  //   if (req.method === "GET") {
  //     const { Item } = await client.send(
  //       new GetItemCommand({
  //         TableName: process.env.TABLE_NAME,
  //         Key: {
  //           id: { S: req.query.id },
  //         },
  //       })
  //     );

  //     return res.status(200).json(Item);
  //   }

  if (req.method === "POST") {
    const { ref, deviceId, type, region, phone, name, score } = req.body;
    const { Attributes } = await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id: `${deviceId}-${type.toLowerCase()}`,
          ref,
          deviceId,
          createdAt: new Date().toISOString(),
          type,
          region,
          phone,
          name,
          score,
        },
      }),
    );

    return res.status(200).json(Attributes);
  }
}
