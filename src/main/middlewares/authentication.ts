import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { makeMiddlewareAuthenticate } from '../factories/application/middlewares/authentication-middleware.factory';

export function requestAuthorization() {
  return adaptExpressMiddleware(makeMiddlewareAuthenticate());
}
