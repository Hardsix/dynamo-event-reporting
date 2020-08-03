import _ from 'lodash';
import { Request, Response } from '../../common';
import { asyncMiddleware } from '../../common/async-middleware';

function isPosInteger(param) {
  return _.isString(param) && parseInt(param) && parseInt(param) > 0;
}

function parseIntegerParam(param) {
  if (!_.isString(param)) {
    throw new Error(`Expected string param but got ${param}`);
  }

  return parseInt(param);
}

export function parseRequestParams() {
  return asyncMiddleware(async (req: Request, res: Response) => {
    const from = req.query.from;
    const to = req.query.to;
    const interval = req.query.interval;

    if (!from || !to || !isPosInteger(from) || !isPosInteger(to)) {
      res.send({
        message: `'from' and 'to' must be defined and positive integers`,
      });
      res.status(400);
      return;
    }

    if (interval && !isPosInteger(interval)) {
      res.send({
        message: `'interval' must be a positive integer`,
      });
      res.status(400);
      return;
    }

    _.set(req, 'context.filter', {
      from: parseIntegerParam(from),
      to: parseIntegerParam(to),
      interval: parseIntegerParam(interval || '60'),
    });
  });
}
