import { iAuthenticationCompany } from '@/src/domain/usecases/company';
import {
  iHashAdapter,
  iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iCompanyRepository } from '@/src/infra/database/contracts/repositorys';
import { AuthenticationCompanyData } from './authentication.data';

import { mock, MockProxy } from 'jest-mock-extended';
import { Company } from '@/src/domain/entities';
import {
  BadRequestError,
  UnauthorizedError,
} from '../../../../src/domain/errors';

describe('Authenticate Company', () => {
  let sut: iAuthenticationCompany;
  let repositorySpy: MockProxy<iCompanyRepository>;
  let tokenAdapterSpy: MockProxy<iTokenAdapter>;
  let hashAdapterSpy: MockProxy<iHashAdapter>;

  let fakeCompany: Company;
  let fakeInputCredentials: iAuthenticationCompany.inputCredentials;

  beforeAll(() => {
    repositorySpy = mock();
    tokenAdapterSpy = mock();
    hashAdapterSpy = mock();
  });

  beforeEach(() => {
    sut = new AuthenticationCompanyData(
      repositorySpy,
      tokenAdapterSpy,
      hashAdapterSpy
    );

    fakeCompany = {
      name_fantasy: 'any_name',
      cnpj: 'any_cnpj',
      email: 'any_email',
      password: 'any_password',
    };

    fakeInputCredentials = {
      password: 'any_password',
      cnpj: 'any_cnpj',
      email: 'any_email',
    };
  });

  it('Should return BadRequet when email not was find.', async () => {
    repositorySpy.findByEmail.mockResolvedValue(undefined);
    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return BadRequest when CNPJ not was find.', async () => {
    repositorySpy.findByCNPJ.mockResolvedValue(undefined);
    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return UnauhtorizedError when password incorret.', async () => {
    repositorySpy.findByEmail.mockResolvedValue(fakeCompany);
    fakeInputCredentials.password = 'incorret_password';

    hashAdapterSpy.compare.mockResolvedValue(
      fakeCompany.password === fakeInputCredentials.password
    );

    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(new UnauthorizedError());
  });

  it('Should return valid token when access is valid.', async () => {
    repositorySpy.findByEmail.mockResolvedValue(fakeCompany);

    hashAdapterSpy.compare.mockResolvedValue(true);

    tokenAdapterSpy.createAccessToken.mockResolvedValue('any_token');

    const response = await sut.exec(fakeInputCredentials);

    expect(response).toEqual({ token: 'any_token' });
  });
});
