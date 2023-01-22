import { InsertProductsData } from '../../../../data/usecases/inventories/products/InsertProducts.data';
import { CreateInventoryData } from '../../../../data/usecases/inventories';
import { Inventory } from '../../../../../src/domain/entities/inventory.entity';
import { iCreateInventory } from '../../../../domain/usecases/inventories/iCreateInventory.usecase';
import { MongoDB } from '../../../../../src/infra/database/mongodb';
import { InventoryRepository } from '../../../../../src/infra/database/mongodb/repositorys';
import { makeCompanyRepository } from './companies.factory';
import { iInsertProducts } from '../../../../domain/usecases/inventories/products/iInsertProducts.usecase';
import { iListProducts } from '../../../../../src/domain/usecases/inventories/products/iListProducts.usecase';
import { ListProducts } from '../../../../../src/data/usecases/inventories/products/ListProducts.data';

export function makeInventoryRepository(): any {
  const collection = MongoDB.colletion<Inventory>(
    process.env.COLLECTIONS_NAMES_INVENTORY as string
  );
  const repository = new InventoryRepository(collection);
  return repository;
}

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
