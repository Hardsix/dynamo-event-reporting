import dynamoClient from 'aws-sdk/clients/dynamodb';

export type BoundingBox = {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type Event = {
  timestamp: Date;
  source: string;
  box: BoundingBox;
};

export type EventGroups = {
  [x: string]: Event[];
};

export function findGroups(from: Date, to: Date, interval: number) {
  const eventGroups: EventGroups = {
    [new Date(2020, 7, 31, 5, 0).toString()]: [
      {
        timestamp: new Date(2020, 7, 31, 5, 0),
        source: 'garage',
        box: {
          id: '1',
          x: 3,
          y: 15,
          height: 14,
          width: 3,
        },
      },
      {
        timestamp: new Date(2020, 7, 31, 5, 0),
        source: 'outside',
        box: {
          id: '3',
          x: 3,
          y: 15,
          height: 14,
          width: 3,
        },
      },
    ],
    [new Date(2020, 7, 31, 5, 31).toString()]: [
      {
        timestamp: new Date(2020, 7, 31, 5, 31),
        source: 'garage',
        box: {
          id: '2',
          x: 3,
          y: 15,
          height: 14,
          width: 3,
        },
      },

      {
        timestamp: new Date(2020, 7, 31, 5, 31),
        source: 'outside',
        box: {
          id: '4',
          x: 3,
          y: 15,
          height: 14,
          width: 3,
        },
      },
    ],
  };

  return eventGroups;
}
