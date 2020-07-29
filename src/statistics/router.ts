import express from 'express';
import { doThing } from './middleware';

export const statisticsRouter = express.Router();

statisticsRouter.use('/', doThing(), (req, res) => res.send('Hello World!'));
