import { Auth, Company, Event } from "../../../../../src/domain/entities";
import { Inventory } from "../../../../../src/domain/entities/inventory.entity";
import { iCompanyRepository, iEventRepository } from "../../../../../src/infra/database/contracts/repositorys";
import { iInventoryRepository } from "../../../../../src/infra/database/contracts/repositorys/iInventoryRepository";
import { MongoDB } from "../../../../../src/infra/database/mongodb";
import { AuthenticationsRepository, CompaniesRepository, EventsRepository, InventoryRepository } from "../../../../../src/infra/database/mongodb/repositorys";
import { makeHashAdapter } from "../cryptography";

export function makeInventoryRepository(): iInventoryRepository {
    const collection = MongoDB.colletion<Inventory>(
        process.env.COLLECTIONS_NAMES_INVENTORY as string
    );
    const repository = new InventoryRepository(collection);
    return repository;
}


export function makeEventRepository(): iEventRepository {
    const collection = MongoDB.colletion<Event>(
        process.env.COLLECTIONS_NAMES_EVENTS as string
    );
    const repository = new EventsRepository(collection);
    return repository;
}


export function makeCompanyRepository(): iCompanyRepository {
    const collection = MongoDB.colletion<Company>(
        process.env.COLLECTIONS_NAMES_COMPANIES as string
    );
    const repository = new CompaniesRepository(collection);
    return repository;
}


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>(
        process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string
    );
    const hashAdapter = makeHashAdapter();
    const repository = new AuthenticationsRepository(collection, hashAdapter);
    return repository;
}