import express from 'express';
import { statisticsRouter } from './statistics';

const router = express.Router();
router.use('/v1/statistics', statisticsRouter);

export { router };
