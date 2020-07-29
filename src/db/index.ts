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

export function getEvents(from, to, interval) {
  const events: Event[] = [
    {
      timestamp: new Date(),
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
      timestamp: new Date(),
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
      timestamp: new Date(),
      source: 'outside',
      box: {
        id: '3',
        x: 3,
        y: 15,
        height: 14,
        width: 3,
      },
    },
    {
      timestamp: new Date(),
      source: 'outside',
      box: {
        id: '4',
        x: 3,
        y: 15,
        height: 14,
        width: 3,
      },
    },
  ];
}
