import { iUsecase } from '../../contracts';
import { Inventory } from '../../entities/inventory.entity';

export abstract class iCreateInventory implements iUsecase {
  abstract exec(
    input: iCreateInventory.input
  ): Promise<iCreateInventory.output>;
}

export namespace iCreateInventory {
  export type input = {
    companyId: string;
    inventory: Inventory;
  };
  export type output = {
    _id: string;
    createdAt: string;
  };
}
