import { InsertProductsData } from '../../../../data/usecases/inventories/products/InsertProducts.data';
import { CreateInventoryData } from '../../../../data/usecases/inventories';
import { iCreateInventory } from '../../../../domain/usecases/inventories/iCreateInventory.usecase';
import { iInsertProducts } from '../../../../domain/usecases/inventories/products/iInsertProducts.usecase';
import { iListProducts } from '../../../../../src/domain/usecases/inventories/products/iListProducts.usecase';
import { ListProducts } from '../../../../../src/data/usecases/inventories/products/ListProducts.data';
import { makeCompanyRepository, makeInventoryRepository } from '../../infra/database/mongo.factory';



export const makeUsecaseCreateInventory = (): iCreateInventory => {
  return new CreateInventoryData(
    makeInventoryRepository(),
    makeCompanyRepository()
  );
};

export const makeUsecaseInsertProducts = (): iInsertProducts => {
  return new InsertProductsData(makeInventoryRepository());
};

export const makeUsecaseListProducts = () : iListProducts => {
  return new ListProducts(makeInventoryRepository())
}
