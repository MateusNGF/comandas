import { CreateInventoryData } from "../../../../../src/data/usecases/inventory";
import { Inventory } from "../../../../../src/domain/entities/inventory.entity";
import { iCreateInventory } from "../../../../../src/domain/usecases/inventory/iCreateInventory.usecase";
import { MongoDB } from "../../../../../src/infra/database/mongodb";
import { InventoryRepository } from "../../../../../src/infra/database/mongodb/repositorys";
import { makeCompanyRepository } from "./companies.factory";



export function makeInventoryRepository(): any {
    const collection = MongoDB.colletion<Inventory>(process.env.COLLECTIONS_NAMES_INVENTORY as  string);
    const repository = new InventoryRepository(collection);
    return repository;
}


export const makeUsecaseCreateInventory = () : iCreateInventory => {
    return new CreateInventoryData(
        makeInventoryRepository(),
        makeCompanyRepository()
    )    
}