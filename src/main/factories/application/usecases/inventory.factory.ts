import { InsertProductsData } from '../../../../../src/data/usecases/inventories/InsertProducts.data';
import { CreateInventoryData } from '../../../../data/usecases/inventories';
import { Inventory } from '../../../../../src/domain/entities/inventory.entity';
import { iCreateInventory } from '../../../../../src/domain/usecases/inventory/iCreateInventory.usecase';
import { MongoDB } from '../../../../../src/infra/database/mongodb';
import { InventoryRepository } from '../../../../../src/infra/database/mongodb/repositorys';
import { makeCompanyRepository } from './companies.factory';
import { iInsertProducts } from '../../../../../src/domain/usecases/inventory/iInsertProducts.usecase';

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
