import { iController } from '../../../../application/contracts';
import { GetItemController, ListInventoryController, RegisterItemController } from '../../../../application/controllers';
import { iListInventoryUsecase, iRegisterItemUsecase } from '../../../../domain/usecases/inventory';
import { makeListInventoryUsecase, makeRegisterItemUsecase } from '../usecases/inventory.factory';

export const makeRegisterItemController = (): iController => {
  const registerItemUsecase: iRegisterItemUsecase = makeRegisterItemUsecase();

  return new RegisterItemController(registerItemUsecase);
};

export const makeListInventoryController = (): iController => {
  const listInventoryUsecase: iListInventoryUsecase = makeListInventoryUsecase();

  return new ListInventoryController(listInventoryUsecase);
};

export const makeItemInventoryController = (): iController => {
  const listInventoryUsecase: iListInventoryUsecase = makeListInventoryUsecase();

  return new GetItemController(listInventoryUsecase);
};
