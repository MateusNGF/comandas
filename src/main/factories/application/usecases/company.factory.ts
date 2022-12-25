import {
  RegistrationCompanyData,
} from '../../../../data/usecases/company';
import {
  iRegistrationCompany,
} from '../../../../domain/usecases/company';
import { MongoDB } from '../../../../infra/database/mongodb';
import { Company } from '../../../../domain/entities';
import { CompanyRepository } from '../../../../infra/database/mongodb/repositorys/company.repository';
import { makeCreateAuthenticateForCompanyUsecase } from './authentication.factory';

export function makeCompanyRepository(): any {
  const collection = MongoDB.colletion<Company>(process.env.COLLECTIONS_NAMES_COMPANIES as  string);
  const repository = new CompanyRepository(collection);
  return repository;
}

export const makeUseCaseRegistrationCompany = (): iRegistrationCompany => {
  return new RegistrationCompanyData(
    makeCompanyRepository(),
    makeCreateAuthenticateForCompanyUsecase()
  );
};
