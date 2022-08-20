import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeAccessCompanyController, makeRegisterCompanyController } from '../factories/application/controllers/company';

export default (router: Router): void => {
  router.post('/register', adaptExpressRoute(makeRegisterCompanyController()));
  router.get('/access', adaptExpressRoute(makeAccessCompanyController()));
};
