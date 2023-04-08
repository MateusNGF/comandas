import {
  CreateOrderData,
  ListOrderData,
} from '../../../../data/usecases/orders';
import {
  iCreateOrderUsecase,
  iListOrderUsecase,
} from '../../../../domain/usecases/orders';
import {
  makeCompanyRepository,
  makeEventRepository,
  makeOrderRepository,
  makeSessionInMongo,
} from '../../infra/database/mongo.factory';
import { makeOutputProductUsecase } from './inventory.factory';

export function makeCreateOrderUsecase(): iCreateOrderUsecase {
  return new CreateOrderData(
    makeSessionInMongo(),
    makeOrderRepository(),
    makeCompanyRepository(),
    makeEventRepository(),
    makeOutputProductUsecase()
  );
}

export function makeListOrdersUsecase(): iListOrderUsecase {
  const orderRepository = makeOrderRepository();

  return new ListOrderData(orderRepository);
}
