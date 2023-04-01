import { ListInvetoryData, InputItemData } from '../../../../data/usecases/inventory';
import { iListInventoryUsecase, iInputItemUsecase } from '../../../../domain/usecases/inventory';
import {
  makeCompanyRepository,
  makeInventoryRepository,
  makeSessionInMongo,
} from '../../infra/database/mongo.factory';

export function makeInputItemUsecase(): iInputItemUsecase {
  const inventoryRepository = makeInventoryRepository();
  const companyRepository = makeCompanyRepository();
  const sessionDatabase = makeSessionInMongo();

  return new InputItemData(
    sessionDatabase,
    inventoryRepository,
    companyRepository
  );
}

export function makeListInventoryUsecase(): iListInventoryUsecase {
  const inventoryRepository = makeInventoryRepository();

  return new ListInvetoryData(
    inventoryRepository
  );
}