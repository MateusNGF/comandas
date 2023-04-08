import { Router } from 'express';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import {
  makeArchivationEventController,
  makeCreationEventController,
  makeGetEventController,
  makeListEventsController,
} from '../factories/application/controllers/events.factory';
import { makeMiddlewareAuthentication } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router): void => {
  router.post(
    '/',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeCreationEventController())
  );

  router.put(
    '/:action/:eventId',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeArchivationEventController())
  );

  router.get(
    '/:eventId',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeGetEventController())
  );

  router.get(
    '/',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeListEventsController())
  );
};
