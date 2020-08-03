import express from 'express';
import { buildBarChartReport, retrieveEvents, parseRequestParams } from './middleware';

export const statisticsRouter = express.Router();

statisticsRouter.use('/', parseRequestParams(), retrieveEvents(), buildBarChartReport(), (req, res) =>
  res.send('Hello World!'),
);
