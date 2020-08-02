import _ from 'lodash';
import { Request, Response } from '../../common';
import { asyncMiddleware } from '../../common/async-middleware';
import { eventsRepository } from '../../db';

export function retrieveEvents() {
  return asyncMiddleware(async (req: Request, res: Response) => {
    const filter = req?.context?.filter;
    if (!filter || !_.isDate(filter?.from) || !_.isDate(filter?.to) || !_.isNumber(filter?.interval)) {
      throw new Error(`'from', 'to' and 'interval' must be defined`);
    }

    const { from, to, interval } = filter;
    const events = eventsRepository.findGroups(from, to, interval);
    _.set(req, 'context.eventGroups', events);
  });
}
