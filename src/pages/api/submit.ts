import { NextApiRequest, NextApiResponse } from "next";
import { getSessionItem, increaseItem } from "./utils";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { client, document } from "@/utils/db";
import SMS from "@/services/sms";
import { SMS_MESSAGE } from "@/apps/manshokuya/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { game, sessionId, phone, region } = req.body;
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

  const { Items } = await document.scan({
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

  if (Items && Items.length) {
    res.status(400).json({
      ok: false,
      error: "Phone and region already used.",
    });
    return;
  }

  const params: UpdateItemCommandInput = {
    TableName: game as string,
    Key: { ID: { S: item.ID } },
    UpdateExpression: "SET #phone = :phone, #region = :region",
    ExpressionAttributeValues: {
      ":phone": { S: phone?.toString() ?? "" },
      ":region": { S: region?.toString() ?? "" },
    },
    ExpressionAttributeNames: {
      "#phone": "phone",
      "#region": "region",
    },
    ReturnValues: "ALL_NEW",
  };

  const command = new UpdateItemCommand(params);
  try {
    await client.send(command);

    const scoreItem = await getSessionItem(game, sessionId, "Score");
    if (scoreItem) increaseItem(game as string, scoreItem.ID, "score");

    // const to = `+${region.trim()}${phone.trim()}`;

    // const response = await SMS.build().send(to, SMS_MESSAGE);

    // response.ok
    //   ? res.status(200).json(response)
    //   : res.status(404).json(response);

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
