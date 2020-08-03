import _ from 'lodash';
import { Request } from '../../common';
import { asyncMiddleware } from '../../common/async-middleware';
import { eventsRepository } from '../../events';

export function retrieveEvents() {
  return asyncMiddleware(async (req: Request) => {
    const filter = req?.context?.filter;
    if (!filter || !_.isNumber(filter?.from) || !_.isNumber(filter?.to) || !_.isNumber(filter?.interval)) {
      throw new Error(`'from', 'to' and 'interval' must be defined`);
    }

    const { from, to, interval } = filter;
    const events = await eventsRepository.findGroups(from, to, interval);

    _.set(req, 'context.eventGroups', events);
  });
}
