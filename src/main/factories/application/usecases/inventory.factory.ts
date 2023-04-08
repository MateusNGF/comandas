import {
  ListInvetoryData,
  InputProductData,
  OutputProductData,
} from '../../../../data/usecases/inventory';
import {
  iListInventoryUsecase,
  iInputProductUsecase,
  iOutputProductUsecase,
} from '../../../../domain/usecases/inventory';
import {
  makeInventoryRepository,
  makeSessionInMongo,
} from '../../infra/database/mongo.factory';

export function makeInputProductUsecase(): iInputProductUsecase {
  const inventoryRepository = makeInventoryRepository();
  const sessionDatabase = makeSessionInMongo();

  return new InputProductData(sessionDatabase, inventoryRepository);
}

export function makeOutputProductUsecase(): iOutputProductUsecase {
  const inventoryRepository = makeInventoryRepository();
  const sessionDatabase = makeSessionInMongo();

  return new OutputProductData(sessionDatabase, inventoryRepository);
}

export function makeListInventoryUsecase(): iListInventoryUsecase {
  const inventoryRepository = makeInventoryRepository();

  return new ListInvetoryData(inventoryRepository);
}
