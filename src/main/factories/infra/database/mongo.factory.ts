import {
  iAuthenticationRepository,
  iCompanyRepository,
  iEventRepository,
  iInventoryRepository,
} from '../../../../../src/infra/database/contracts/repositorys';
import {
  AuthenticateEntity,
  CompanyEntity,
  EventEntity,
  ItemEntity,
} from '../../../../../src/domain/entities';
import { MongoDB } from '../../../../../src/infra/database/mongodb';
import {
  AuthenticationsRepository,
  CompaniesRepository,
  EventsRepository,
  InventoryRepository,
} from '../../../../../src/infra/database/mongodb/repositorys';
import { makeHashAdapter } from '../cryptography';

export function makeSessionInMongo() {
  return MongoDB.makeSession();
}

export function makeAuthenticationRepository(): iAuthenticationRepository {
  const collection = MongoDB.colletion<AuthenticateEntity>(
    process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string
  );
  const hashAdapter = makeHashAdapter();
  const repository = new AuthenticationsRepository(collection, hashAdapter);
  return repository;
}

export function makeEventRepository(): iEventRepository {
  const collection = MongoDB.colletion<EventEntity>(
    process.env.COLLECTIONS_NAMES_EVENTS as string
  );
  const repository = new EventsRepository(collection);
  return repository;
}

export function makeCompanyRepository(): iCompanyRepository {
  const collection = MongoDB.colletion<CompanyEntity>(
    process.env.COLLECTIONS_NAMES_COMPANIES as string
  );
  const repository = new CompaniesRepository(collection);
  return repository;
}

export function makeInventoryRepository(): iInventoryRepository {
  const collection = MongoDB.colletion<ItemEntity>(
    process.env.COLLECTIONS_NAMES_INVENTORY as string
  );
  const repository = new InventoryRepository(collection);
  return repository;
}
