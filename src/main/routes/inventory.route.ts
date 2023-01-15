import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeInsertProductsController } from '../factories/application/controllers';
import { requestAuthorization } from '../middlewares';

export default (router: Router): void => {
  router.post(
    '/insert/products',
    requestAuthorization(),
    adaptExpressRoute(makeInsertProductsController())
  );
};
