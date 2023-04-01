import { iController } from '../../../../application/contracts';
import { ListInventoryController, RegisterItemController } from '../../../../application/controllers';
import { iListInventoryUsecase, iInputItemUsecase } from '../../../../domain/usecases/inventory';
import { makeListInventoryUsecase, makeInputItemUsecase } from '../usecases/inventory.factory';

export const makeInputItemController = (): iController => {
  const registerItemUsecase: iInputItemUsecase = makeInputItemUsecase();

  return new RegisterItemController(registerItemUsecase);
};

export const makeListInventoryController = (): iController => {
  const listInventoryUsecase: iListInventoryUsecase = makeListInventoryUsecase();

  return new ListInventoryController(listInventoryUsecase);
};
