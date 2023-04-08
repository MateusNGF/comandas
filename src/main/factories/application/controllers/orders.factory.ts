import { iController } from '../../../../application/contracts';
import {
  CreateOrderController,
  ListOrderController,
} from '../../../../application/controllers';
import {
  makeCreateOrderUsecase,
  makeListOrdersUsecase,
} from '../usecases/orders.factory';

export const makeCreateOrderController = (): iController => {
  const usecase = makeCreateOrderUsecase();

  return new CreateOrderController(usecase);
};

export const makeListOrdersController = (): iController => {
  const usecase = makeListOrdersUsecase();

  return new ListOrderController(usecase);
};
