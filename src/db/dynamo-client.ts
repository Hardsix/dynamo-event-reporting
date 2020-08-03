import AWS from 'aws-sdk';
import { dynamoConfig } from './dynamo-config';

AWS.config.update({
  region: dynamoConfig.region,
});

export const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', endpoint: dynamoConfig.endpoint });

export const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', endpoint: dynamoConfig.endpoint });
