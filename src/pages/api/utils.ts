import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { client, document } from "@/utils/db";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

export const writeItem = async (
  tableName: string,
  item: Record<string, unknown>,
) => {
  try {
    return document.put({
      TableName: tableName,
      Item: item,
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getSessionItem = async (
  tableName: string,
  sessionId: string,
  behaviour: string,
) => {
  try {
    const { Items } = await document.send(
      new ScanCommand({
        TableName: tableName,
        FilterExpression:
          "sessionId = :sessionId_val And behaviour = :behaviour_val",
        // ExpressionAttributeNames: {
        //   "#sessionId": "sessionId",
        //   "#behaviour": "behaviour",
        // },
        ExpressionAttributeValues: {
          ":sessionId_val": sessionId,
          ":behaviour_val": behaviour,
        },
      }),
    );

    if (Items && Items.length) {
      return Items[0] as {
        ID: string;
        sessionId: string;
        behaviour: string;
        score: number;
        phone: string | undefined;
      };
    }

    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const decreaseItem = async (
  tableName: string,
  id: string,
  key: string,
) => {
  try {
    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: { ID: { S: id } },
      UpdateExpression: "SET #key = #key - :value",
      ExpressionAttributeValues: {
        ":value": { N: "1" },
      },
      ExpressionAttributeNames: {
        "#key": key,
      },
      ReturnValues: "ALL_NEW",
    };

    const command = new UpdateItemCommand(params);
    return client.send(command);
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const increaseItem = async (
  tableName: string,
  id: string,
  key: string,
) => {
  try {
    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: { ID: { S: id } },
      UpdateExpression: "SET #key = #key + :value",
      ExpressionAttributeValues: {
        ":value": { N: "1" },
      },
      ExpressionAttributeNames: {
        "#key": key,
      },
      ReturnValues: "ALL_NEW",
    };

    const command = new UpdateItemCommand(params);
    return client.send(command);
  } catch (error) {
    return null;
  }
};
