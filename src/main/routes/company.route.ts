import { Router } from 'express';

export default (router: Router): void => {
  router.post('/register', (req, res) => {
    res.json({ ok: 1 });
  });
  router.get('/access', (req, res) => {
    res.json({ ok: 1 });
  });
};
