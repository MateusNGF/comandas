import { Router } from "express";
import { adaptExpressRoute } from "../adapters/express-route";
import { makeCreationEventController } from "../factories/application/controllers/event";
import { requestAuthorization } from "../middlewares";

export default (router: Router): void => {
  router.post('/create', requestAuthorization(), adaptExpressRoute(makeCreationEventController()));
};