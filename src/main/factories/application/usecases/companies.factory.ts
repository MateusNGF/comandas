
import {
  iAccessCompany,
  iRegisterCompany,
} from '../../../../domain/usecases/companies';
import { MongoDB } from '../../../../infra/database/mongodb';
import { Company } from '../../../../domain/entities';
import { CompaniesRepository } from '../../../../infra/database/mongodb/repositorys/companies.repository';
import { makeUsecaseCreateAuthenticateForCompany, makeUsecaseCreateTokenForCompany, makeUsecaseHasAuthenticationRecordCompany } from './authentications.factory';
import { AccessCompanyData, RegisterCompanyData } from '../../../../../src/data/usecases/companies';
import { makeUsecaseCreateInventory } from './inventory.factory';

export function makeCompanyRepository(): any {
  const collection = MongoDB.colletion<Company>(process.env.COLLECTIONS_NAMES_COMPANIES as string);
  const repository = new CompaniesRepository(collection);
  return repository;
}

export const makeUseCaseRegisterCompany = (): iRegisterCompany => {
  return new RegisterCompanyData(
    makeCompanyRepository(),
    makeUsecaseCreateAuthenticateForCompany(),
    makeUsecaseCreateTokenForCompany(),
    makeUsecaseCreateInventory()
  );
};

export const makeUseCaseAccessCompany = (): iAccessCompany => {
  return new AccessCompanyData(
    makeUsecaseHasAuthenticationRecordCompany()
  )
}
