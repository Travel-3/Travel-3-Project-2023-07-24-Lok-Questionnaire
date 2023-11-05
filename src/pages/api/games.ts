import type { NextApiRequest, NextApiResponse } from "next";
import * as uuid from "uuid";
import Cors from "cors";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
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
    const { ref, deviceId, type, region, phone } = req.body;
    const { Attributes } = await docClient.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: `${deviceId}-${type.toLowerCase()}`,
          ref,
          deviceId,
          createdAt: new Date().toISOString(),
          type,
          region,
          phone,
        },
      }),
    );

    return res.status(200).json(Attributes);
  }
}
