import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeArchivationEventController, makeCreationEventController } from '../factories/application/controllers/event';
import { requestAuthorization } from '../middlewares';

export default (router: Router): void => {
  router.post(
    '/create',
    requestAuthorization(),
    adaptExpressRoute(makeCreationEventController())
  );

  router.put(
    '/:action/:eventId',
    requestAuthorization(),
    adaptExpressRoute(makeArchivationEventController())
  );
};
