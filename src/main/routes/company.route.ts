import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeAuthenticationCompanyController } from '../factories/application/controllers/authentication';
import {
  makeRegisterCompanyController,
} from '../factories/application/controllers/company';

export default (router: Router): void => {
  router.post('/register', adaptExpressRoute(makeRegisterCompanyController()));
  router.get('/access', adaptExpressRoute(makeAuthenticationCompanyController()));
};
