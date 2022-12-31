
import {
  iAccessCompany,
  iRegisterCompany,
} from '../../../../domain/usecases/companies';
import { MongoDB } from '../../../../infra/database/mongodb';
import { Company } from '../../../../domain/entities';
import { CompaniesRepository } from '../../../../infra/database/mongodb/repositorys/companies.repository';
import { makeUsecaseAuthenticatieAndReturnTokenCompany, makeUsecaseCreateAuthenticateForCompany, makeUsecaseCreateTokenForCompany } from './authentications.factory';
import { AccessCompanyData, RegisterCompanyData } from '../../../../../src/data/usecases/companies';

export function makeCompanyRepository(): any {
  const collection = MongoDB.colletion<Company>(process.env.COLLECTIONS_NAMES_COMPANIES as  string);
  const repository = new CompaniesRepository(collection);
  return repository;
}

export const makeUseCaseRegistrationCompany = (): iRegisterCompany => {
  return new RegisterCompanyData(
    makeCompanyRepository(),
    makeUsecaseCreateAuthenticateForCompany(),
    makeUsecaseCreateTokenForCompany()
  );
};

export const makeUseCaseAccessCompany = () : iAccessCompany => {
  return new AccessCompanyData(
    makeUsecaseAuthenticatieAndReturnTokenCompany()
  )
}
