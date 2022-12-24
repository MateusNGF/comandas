import { Auth } from '@/src/domain/entities';
import { iAuthenticationCompany } from '@/src/domain/usecases/authentication';
import {
  iHashAdapter,
  iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '@/src/infra/database/contracts/repositorys';

import { mock, MockProxy } from 'jest-mock-extended';
import {
  BadRequestError, UnauthorizedError,
} from '../../../domain/errors';
import { AuthenticateAndReturnTokenCompanyData } from './AuthenticateAndReturnToken-company.data';

describe('Authenticate Company', () => {
  let sut: iAuthenticationCompany;
  let AuthenticationRepositorySpy: MockProxy<iAuthenticationRepository>;
  let tokenAdapterSpy: MockProxy<iTokenAdapter>;
  let hashAdapterSpy: MockProxy<iHashAdapter>;

  let fakeValidDataAuth: Auth;
  let fakeInputCredentials: iAuthenticationCompany.input;

  beforeAll(() => {
    AuthenticationRepositorySpy = mock();
    tokenAdapterSpy = mock();
    hashAdapterSpy = mock();
  });

  beforeEach(() => {
    sut = new AuthenticateAndReturnTokenCompanyData(
      AuthenticationRepositorySpy,
      tokenAdapterSpy,
      hashAdapterSpy
    );

    fakeValidDataAuth = {
      _id : "01",
      email : "any_email@gmail.com",
      cnpj : "any_cnpj",
      password : "any_passowrd",
      associeteded_id : "12"
    };

    fakeInputCredentials = {
      password: 'any_passowrdd',
      cnpj: 'any_cnpj',
      email: 'any_email@gmail.com',
    };
  });

  it('Should return BadRequestError when email not was find.', async () => {
    delete fakeInputCredentials.cnpj
    AuthenticationRepositorySpy.getAuth.mockResolvedValue(undefined);
    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return BadRequestError when CNPJ not was find.', async () => {
    delete fakeInputCredentials.email
    AuthenticationRepositorySpy.getAuth.mockResolvedValue(undefined);
    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return UnauhtorizedError when password incorret.', async () => {
    AuthenticationRepositorySpy.getAuth.mockResolvedValue(fakeValidDataAuth);
    
    fakeInputCredentials.password = 'incorret_password';
    hashAdapterSpy.compare.mockResolvedValue(
      fakeValidDataAuth.password === fakeInputCredentials.password // always false
    );

    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(new UnauthorizedError());
  });

  it('Should return valid token when access is valid.', async () => {
    AuthenticationRepositorySpy.getAuth.mockResolvedValue(fakeValidDataAuth);

    hashAdapterSpy.compare.mockResolvedValue(true);
    tokenAdapterSpy.createAccessToken.mockResolvedValue('any_token');

    const response = await sut.exec(fakeInputCredentials);

    expect(response).toEqual({ token: 'any_token' });
  });
});
