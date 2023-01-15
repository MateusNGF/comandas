import { iController } from "../../../../../src/application/contracts";
import { InsertProductsController } from "../../../../../src/application/controllers/inventories";
import { makeUsecaseInsertProducts } from "../usecases/inventory.factory";


export const makeInsertProductsController = (): iController => {
    const usecaseInsertProducts = makeUsecaseInsertProducts();
    return new InsertProductsController(usecaseInsertProducts);
  };