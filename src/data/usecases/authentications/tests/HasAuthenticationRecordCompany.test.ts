import { Auth } from '../../../../../src/domain/entities';
import {
  BadRequestError,
  UnauthorizedError,
} from '../../../../../src/domain/errors';
import {
  iCreateTokenForCompany,
  iHasAuthenticationRecordCompany,
} from '../../../../../src/domain/usecases/authentications';
import { iAuthenticationRepository } from '../../../../../src/infra/database/contracts/repositorys';
import { mock, MockProxy } from 'jest-mock-extended';
import { HasAuthenticationRecordCompanyData } from '../HasAuthenticationRecordCompany.data';
import { iHashAdapter } from '../../../../../src/infra/cryptography/contracts';

describe('Has Authentication record for company', () => {
  let sut: iHasAuthenticationRecordCompany;
  let AuthenticationRepositorySpy: MockProxy<iAuthenticationRepository>;
  let createTokenForCompany: MockProxy<iCreateTokenForCompany>;
  let hashAdapter: MockProxy<iHashAdapter>;

  let fakeValidDataAuth: Auth;
  let fakeInputCredentials: iHasAuthenticationRecordCompany.input;

  beforeAll(() => {
    AuthenticationRepositorySpy = mock();
    createTokenForCompany = mock();
    hashAdapter = mock();
  });

  beforeEach(() => {
    sut = new HasAuthenticationRecordCompanyData(
      AuthenticationRepositorySpy,
      createTokenForCompany,
      hashAdapter
    );

    fakeValidDataAuth = {
      id: '01',
      email: 'any_email@gmail.com',
      cnpj: 'any_cnpj',
      password: 'any_passowrd',
      associeteded_id: '12',
    };

    fakeInputCredentials = {
      email: 'fake_email',
      cnpj: 'fake_cnpj',
    };
  });

  it('Should return void when email donst is record', async () => {
    delete fakeInputCredentials.cnpj;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      undefined
    );

    const response = await sut.exec(fakeInputCredentials);
    expect(response).toBe(undefined);
  });

  it('Should return void when cnpj donst is record', async () => {
    delete fakeInputCredentials.email;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      undefined
    );

    const response = await sut.exec(fakeInputCredentials);
    expect(response).toBe(undefined);
  });

  it('Should return UnauthorizedError when email is record', async () => {
    delete fakeInputCredentials.cnpj;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      fakeValidDataAuth
    );

    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new UnauthorizedError(
        'This CNPJ or Email has record, try change your passwoord.'
      )
    );
  });

  it('Should return UnauthorizedError when cnpj is record', async () => {
    delete fakeInputCredentials.email;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      fakeValidDataAuth
    );

    const response = sut.exec(fakeInputCredentials);

    await expect(response).rejects.toThrow(
      new UnauthorizedError(
        'This CNPJ or Email has record, try change your passwoord.'
      )
    );
  });

  it('Should return BadRequestError when has auth found.', async () => {
    delete fakeInputCredentials.cnpj;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      undefined
    );

    const response = sut.exec({
      ...fakeInputCredentials,
      password: 'any_password',
    });

    await expect(response).rejects.toThrow(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return UnauthorizedError when has auth found but password not is equals.', async () => {
    delete fakeInputCredentials.cnpj;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      fakeValidDataAuth
    );
    hashAdapter.compare.mockResolvedValue(false);

    const response = sut.exec({
      ...fakeInputCredentials,
      password: 'any_password',
    });

    await expect(response).rejects.toThrow(new UnauthorizedError());
  });

  it('Should return valid token when has auth found and password is equals.', async () => {
    delete fakeInputCredentials.cnpj;
    AuthenticationRepositorySpy.getAuthByCredentials.mockResolvedValue(
      fakeValidDataAuth
    );
    hashAdapter.compare.mockResolvedValue(true);
    createTokenForCompany.exec.mockResolvedValue({
      token: 'this_is_valid_token',
    });

    const response = await sut.exec({
      ...fakeInputCredentials,
      password: 'any_password',
    });

    expect(response).toEqual(
      expect.objectContaining({ token: 'this_is_valid_token' })
    );
  });
});
