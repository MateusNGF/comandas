import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeInsertProductsController, makeListProductsController } from '../factories/application/controllers';
import { requestAuthorization } from '../middlewares';

export default (router: Router): void => {
  router.post(
    '/products',
    requestAuthorization(),
    adaptExpressRoute(makeInsertProductsController())
  );

  router.get(
    '/products/list',
    requestAuthorization(),
    adaptExpressRoute(makeListProductsController())
  );
};
