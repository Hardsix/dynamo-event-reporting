import { EventGroups } from '../db/events';

export class MiddlewareContext {
  filter?: {
    from?: number;
    to?: number;
    interval?: number;
  };
  eventGroups?: EventGroups;
}
