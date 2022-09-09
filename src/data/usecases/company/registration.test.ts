import { Company } from '@/src/domain/entities';
import { UnauthorizedError } from '../../../../src/domain/errors';
import { iRegistrationCompany } from '@/src/domain/usecases/company';
import {
  iHashAdapter,
  iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iCompanyRepository } from '@/src/infra/database/contracts/repositorys';
import { mock, MockProxy } from 'jest-mock-extended';
import { RegistrationCompanyData } from './registration.data';

describe('Registration Company', () => {
  let sut: iRegistrationCompany;
  let repositorySpy: MockProxy<iCompanyRepository>;
  let tokenAdapterSpy: MockProxy<iTokenAdapter>;
  let hashAdapterSpy: MockProxy<iHashAdapter>;

  let fakeCompany: Company;
  let fakeNewCompany: iRegistrationCompany.input;

  beforeAll(() => {
    repositorySpy = mock();
    tokenAdapterSpy = mock();
    hashAdapterSpy = mock();
  });

  beforeEach(() => {
    sut = new RegistrationCompanyData(
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

    fakeNewCompany = {
      name_fantasy: 'any_name',
      cnpj: 'any_cnpj',
      email: 'any_email',
      password: 'any_password',
    };
  });

  it('Should return UnauthorizedError when Email has registraded.', async () => {
    repositorySpy.findByEmail.mockResolvedValue(fakeCompany);
    const response = sut.exec(fakeNewCompany);

    await expect(response).rejects.toThrow(
      new UnauthorizedError('Email or cnpj already registered.')
    );
  });

  it('Should return UnauthorizedError when CNPJ has registraded.', async () => {
    repositorySpy.findByCNPJ.mockResolvedValue(fakeCompany);
    const response = sut.exec(fakeNewCompany);

    await expect(response).rejects.toThrow(
      new UnauthorizedError('Email or cnpj already registered.')
    );
  });

  it('Should return undefined when database failed.', async () => {
    repositorySpy.findByCNPJ.mockResolvedValue(null);
    repositorySpy.findByEmail.mockResolvedValue(null);

    repositorySpy.register.mockResolvedValue(null);

    const response = await sut.exec(fakeNewCompany);

    expect(response).toBe(undefined);
  });
});
