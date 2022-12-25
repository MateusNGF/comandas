import {
  RegistrationCompanyData,
} from '../../../../data/usecases/company';
import {
  iAccessCompany,
  iRegistrationCompany,
} from '../../../../domain/usecases/company';
import { MongoDB } from '../../../../infra/database/mongodb';
import { Company } from '../../../../domain/entities';
import { CompanyRepository } from '../../../../infra/database/mongodb/repositorys/company.repository';
import { makeUsecaseCreateAuthenticateForCompany as makeUsecaseCreateAuthenticateForCompany, makeUsecaseAuthenticatieAndReturnTokenCompany as makeUsecaseAuthenticatieAndReturnTokenCompany } from './authentication.factory';
import { AccessCompany } from '../../../../../src/data/usecases/company/AccessCompany.data';

export function makeCompanyRepository(): any {
  const collection = MongoDB.colletion<Company>(process.env.COLLECTIONS_NAMES_COMPANIES as  string);
  const repository = new CompanyRepository(collection);
  return repository;
}

export const makeUseCaseRegistrationCompany = (): iRegistrationCompany => {
  return new RegistrationCompanyData(
    makeCompanyRepository(),
    makeUsecaseCreateAuthenticateForCompany()
  );
};

export const makeUseCaseAccessCompany = () : iAccessCompany => {
  return new AccessCompany(
    makeUsecaseAuthenticatieAndReturnTokenCompany()
  )
}
