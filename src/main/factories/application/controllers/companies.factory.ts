import { iAccessCompany } from '@/src/domain/usecases/companies';
import { iController } from '../../../../application/contracts';
import {
  AccessCompanyController,
  RegisterCompanyController,
} from '../../../../application/controllers/companies';
import {
  makeUseCaseAccessCompany,
  makeUseCaseRegistrationCompany as makeUseCaseRegisterCompany,
} from '../usecases/companies.factory';

export const makeRegisterCompanyController = (): iController => {
  const usecaseRegisterCompany = makeUseCaseRegisterCompany();
  return new RegisterCompanyController(usecaseRegisterCompany);
};

export const makeAccessCompanyController = () : iController => {
  const usecaseAccessCompany = makeUseCaseAccessCompany();
  return new AccessCompanyController(usecaseAccessCompany)
}
