import _ from 'lodash';
import { docClient } from '../db';

export type BoundingBox = {
  id: number;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type Event = {
  timestamp: number;
  source: string;
  boxes: BoundingBox[];
};

export type EventGroups = {
  [x: string]: Event[];
};

function convertToEvent(entry): Event {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxes: any[] = _.map(entry.t, (item) => item.M);

  return {
    source: entry.src,
    timestamp: entry.ts,
    boxes: _.map(boxes, (box) => {
      return {
        id: parseInt(box.id.N),
        x: parseInt(box.x.N),
        y: parseInt(box.y.N),
        height: parseInt(box.h.N),
        width: parseInt(box.w.N),
      };
    }),
  };
}

export function find(from: number, to: number): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    docClient.query(
      {
        TableName: 'Events',
        KeyConditionExpression: `src = :src and ts between :from and :to`,
        ExpressionAttributeValues: {
          ':from': from,
          ':to': to,
          ':src': 'EquipmentShare003',
        },
      },
      (err, data) => {
        if (err) reject(err);

        resolve(_.map(data.Items, (item) => convertToEvent(item)));
      },
    );
  });
}

export function getAll(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    docClient.scan(
      {
        TableName: 'Events',
      },
      (err, data) => {
        if (err) reject(err);

        resolve(_.map(data.Items, (item) => convertToEvent(item)));
      },
    );
  });
}

export async function findGroups(from: number, to: number, interval: number) {
  const allItems = await find(from, to);
  const intervalMilis = interval * 60 * 1000;

  const groups = _.groupBy(allItems, (item) => {
    const groupBase = Math.floor(item.timestamp / intervalMilis);

    return `${new Date(from + groupBase * intervalMilis)}-${new Date(
      from + groupBase * intervalMilis + intervalMilis,
    )}`;
  });

  return groups;
}
