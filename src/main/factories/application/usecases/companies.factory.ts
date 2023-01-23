import {
  iAccessCompany,
  iRegisterCompany,
} from '../../../../domain/usecases/companies';
import { MongoDB } from '../../../../infra/database/mongodb';
import { Company } from '../../../../domain/entities';
import { CompaniesRepository } from '../../../../infra/database/mongodb/repositorys/companies.repository';
import {
  makeUsecaseCreateAuthenticateForCompany,
  makeUsecaseCreateTokenForCompany,
  makeUsecaseHasAuthenticationRecordCompany,
} from './authentications.factory';
import {
  AccessCompanyData,
  RegisterCompanyData,
} from '../../../../../src/data/usecases/companies';
import { makeUsecaseCreateInventory } from './inventory.factory';
import { makeCompanyRepository } from '../../infra/database';


export const makeUseCaseRegisterCompany = (): iRegisterCompany => {
  return new RegisterCompanyData(
    makeCompanyRepository(),
    makeUsecaseCreateAuthenticateForCompany(),
    makeUsecaseCreateTokenForCompany(),
    makeUsecaseCreateInventory()
  );
};

export const makeUseCaseAccessCompany = (): iAccessCompany => {
  return new AccessCompanyData(makeUsecaseHasAuthenticationRecordCompany());
};
