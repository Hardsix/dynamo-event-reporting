import express from 'express';

export const statisticsRouter = express.Router();

statisticsRouter.use('/', (req, res) => res.send('Hello World!'));
