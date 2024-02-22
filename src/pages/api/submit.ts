import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, increaseItem } from "./utils";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { client, document } from "@/utils/db";
// import SMS from "@/services/sms";
// import { SMS_MESSAGE } from "@/apps/manshokuya/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { game, sessionId, phone, region, email } = req.body;
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

  if (item.phone) {
    res.status(400).json({
      ok: false,
      error: "Phone already set",
    });
    return;
  }

  if (item.email) {
    res.status(400).json({
      ok: false,
      error: "Email already set",
    });
    return;
  }

  let Items: Record<string, any>[] | undefined = [];

  if (phone && phone.length) {
    const { Items: items } = await document.scan({
      TableName: game as string,
      FilterExpression: "#phone = :phone And #region = :region",
      ExpressionAttributeValues: {
        ":phone": phone?.toString() ?? "",
        ":region": region?.toString() ?? "",
      },
      ExpressionAttributeNames: {
        "#phone": "phone",
        "#region": "region",
      },
    });
    Items = items;

    if (Items && Items.length) {
      res.status(400).json({
        ok: false,
        error: "Phone and region already used.",
      });
      return;
    }
  } else {
    const { Items: items } = await document.scan({
      TableName: game as string,
      FilterExpression: "#email = :email",
      ExpressionAttributeValues: {
        ":email": email?.toString() ?? "",
      },
      ExpressionAttributeNames: {
        "#email": "email",
      },
    });
    Items = items;

    console.log(123, items, email);

    if (Items && Items.length) {
      res.status(400).json({
        ok: false,
        error: "Email already used.",
      });
      return;
    }
  }

  const params: UpdateItemCommandInput = {
    TableName: game as string,
    Key: { ID: { S: item.ID } },
    UpdateExpression: "SET #phone = :phone, #region = :region, #email = :email",
    ExpressionAttributeValues: {
      ":phone": { S: phone?.toString() ?? "" },
      ":region": { S: region?.toString() ?? "" },
      ":email": { S: email?.toString() ?? "" },
    },
    ExpressionAttributeNames: {
      "#phone": "phone",
      "#region": "region",
      "#email": "email",
    },
    ReturnValues: "ALL_NEW",
  };

  const command = new UpdateItemCommand(params);
  try {
    await client.send(command);

    const scoreItem = await getSessionItem(game, sessionId, "Score");
    if (scoreItem) increaseItem(game as string, scoreItem.ID, "score");

    res.status(200).json({
      ok: true,
      data: {
        phone,
        region,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
}
