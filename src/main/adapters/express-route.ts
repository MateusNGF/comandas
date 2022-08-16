import { RequestHandler } from 'express';
import { Controller } from '../../application/contracts';

type Adapter = (controller: Controller) => RequestHandler;

export const adaptExpressRoute: Adapter =
  (controller: Controller) => async (req, res) => {
    const { data, status } = await controller.exec({ ...req.body });
    const json = [200, 204].includes(status) ? data : { error: data.message };
    res.status(status).json(json);
  };
