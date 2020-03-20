import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key
        // of item to be retrieved
        // - 'userId': Identity Pool identity id of authenticated user
        // -'noteId': path paramter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if(result.Item) {
            // Return retrieved item
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found :(" });
        }
    } catch (e) {
        return failure({ status: false });
    }

}