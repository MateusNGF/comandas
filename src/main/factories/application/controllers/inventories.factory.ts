import { ListProductsController } from '../../../../../src/application/controllers/inventories/products/ListProducts.controller';
import { iController } from '../../../../../src/application/contracts';
import { InsertProductsController } from '../../../../application/controllers/inventories/products';
import { makeUsecaseInsertProducts, makeUsecaseListProducts } from '../usecases/inventory.factory';

export const makeInsertProductsController = (): iController => {
  const usecaseInsertProducts = makeUsecaseInsertProducts();
  return new InsertProductsController(usecaseInsertProducts);
};

export const makeListProductsController = () : iController => {
  const usecaseListProducts = makeUsecaseListProducts()
  return new ListProductsController(usecaseListProducts)
}
