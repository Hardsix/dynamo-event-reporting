import express from 'express';
import { buildBarChart, retrieveEvents, parseRequestParams } from './middleware';

export const statisticsRouter = express.Router();

statisticsRouter.use('/', parseRequestParams(), retrieveEvents(), buildBarChart(), (req, res) =>
  res.send('Hello World!'),
);
