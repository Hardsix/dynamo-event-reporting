import _ from 'lodash';
import fs from 'fs';
import bluebird from 'bluebird';
import { ddb, docClient } from './dynamo-client';
import { DynamoDB } from 'aws-sdk';

const params: DynamoDB.CreateTableInput = {
  TableName: 'Events',
  KeySchema: [
    { AttributeName: 'src', KeyType: 'HASH' }, // Partition key
    { AttributeName: 'ts', KeyType: 'RANGE' }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'ts', AttributeType: 'N' },
    { AttributeName: 'src', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1000,
    WriteCapacityUnits: 1000,
  },
};

function isPopulationRequired() {
  return new Promise((resolve, reject) => {
    ddb.listTables({}, function (err, data) {
      if (err) reject(err);

      resolve(data.TableNames?.indexOf('Events') === -1);
    });
  });
}

function createTables(): Promise<void> {
  return new Promise((resolve, reject) => {
    ddb.createTable(params, function (err, data) {
      if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log('Created tables. Table description JSON:', JSON.stringify(data, null, 2));
        resolve();
      }
    });
  });
}

function insertEvent(entry) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Events',
      Item: {
        ts: parseInt(entry.ts.N),
        src: entry.src.S,
        t: entry.t.L,
      },
    };

    docClient.put(params, function (err, data) {
      if (err) {
        console.error('Unable to add entry', entry.title, '. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function insertChunk(chunk) {
  return Promise.all(_.map(chunk, (item) => insertEvent(item))).then((data) => {
    console.log('INSERTED CHUNK OF SEED DATA');
    return data;
  });
}

async function insertData() {
  console.log('POPULATING SEED DATA');

  const backupPath = process.env.BACKUP_PATH || './events-raw-dev-short.json';
  const popData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  const items = popData.Items;

  const chunks = _.chunk(items, 1000);
  await bluebird.each(chunks, (chunk) => insertChunk(chunk));

  console.log('FINISHED POPULATING SEED DATA');
}

export function execPopulateDb() {
  return createTables().then(() => insertData());
}

export function populateDb() {
  return isPopulationRequired().then((populationRequired) => {
    if (populationRequired) {
      return createTables().then(() => insertData());
    }

    console.log('Skipping DB population as it has already been executed');
    return Promise.resolve();
  });
}
