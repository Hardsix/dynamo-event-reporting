import express from 'express';
import { statisticsRouter } from './statistics';

const router = express.Router();
router.use('/statistics', statisticsRouter);

export { router };
