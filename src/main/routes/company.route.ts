
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/company/register', (req, res) => {res.json({ ok : 1})})
  router.get('/company/access', (req, res) => {res.json({ ok : 1})})
}
