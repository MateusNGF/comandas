import { iController } from '../../../../application/contracts';
import {
  CreateOrderController,
  ListOrderController,
  ProductInOder,
} from '../../../../application/controllers';
import {
  makeCreateOrderUsecase,
  makeInputProductInOrder,
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


export const makeProductsInOrder = () : iController => {
  return new ProductInOder(
    makeInputProductInOrder()
  )
}
