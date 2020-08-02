import { Request as ExpressRequest } from 'express';
import { MiddlewareContext } from './middleware-context';

export interface Request extends ExpressRequest {
  context: MiddlewareContext;
}
