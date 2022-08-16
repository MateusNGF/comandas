import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route';
import { makeAccessCompanyController } from '../factories/application/controllers/company';

export default (router: Router): void => {
  router.post('/register', (req, res) => {
    res.json({ ok: 1 });
  });
  router.get('/access', adaptExpressRoute(makeAccessCompanyController()));
};
