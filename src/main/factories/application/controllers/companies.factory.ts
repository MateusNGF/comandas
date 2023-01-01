import { ResetPasswordCompanyController } from '../../../../../src/application/controllers/companies/ResetPassword.controller';
import { iController } from '../../../../application/contracts';
import {
  AccessCompanyController,
  RegisterCompanyController,
} from '../../../../application/controllers/companies';
import { makeTokenAdapter } from '../../infra/cryptography';
import { 
  makeUsecaseSendEmailForResentPasswordAuthenticateForCompany, 
  makeUsecaseUpdateAuthenticate 
} from '../usecases/authentications.factory';
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

export const makeResetPasswordCompanyController = ()  : iController => {
  return new ResetPasswordCompanyController(
    makeTokenAdapter(),
    makeUsecaseUpdateAuthenticate(),
    makeUsecaseSendEmailForResentPasswordAuthenticateForCompany()
  )
}
