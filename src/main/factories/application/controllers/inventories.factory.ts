import { iController } from '../../../../application/contracts';
import { ListInventoryController, RegisterItemController } from '../../../../application/controllers';
import { iListInventoryUsecase, iInputProductUsecase } from '../../../../domain/usecases/inventory';
import { makeListInventoryUsecase, makeInputProductUsecase } from '../usecases/inventory.factory';

export const makeInputItemController = (): iController => {
  const registerItemUsecase: iInputProductUsecase = makeInputProductUsecase();

  return new RegisterItemController(registerItemUsecase);
};

export const makeListInventoryController = (): iController => {
  const listInventoryUsecase: iListInventoryUsecase = makeListInventoryUsecase();

  return new ListInventoryController(listInventoryUsecase);
};
