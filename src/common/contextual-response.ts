import { Response as ExpressResponse } from 'express';
import { MiddlewareContext } from './middleware-context';

export interface Response extends ExpressResponse {
  context: MiddlewareContext;
}
