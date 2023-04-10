import { Router } from 'express';
import { adaptExpressMiddleware } from '../adapters/express-middleware';
import { adaptExpressRoute } from '../adapters/express-route';
import {
  makeCreateOrderController,
  makeListOrdersController,
  makeProductsInOrder,
} from '../factories/application/controllers';
import { makeMiddlewareAuthentication } from '../factories/application/middlewares/authentication.middleware.factory';

export default (router: Router) => {
  router.post(
    '/',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeCreateOrderController())
  );

  router.post(
    '/in/:event_id',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeCreateOrderController())
  );

  router.get(
    '/',
    adaptExpressMiddleware(makeMiddlewareAuthentication()),
    adaptExpressRoute(makeListOrdersController())
  );


  router.patch(
    '/products/:action/:orderId', 
    adaptExpressMiddleware(makeMiddlewareAuthentication()), 
    adaptExpressRoute(makeProductsInOrder()));
};
