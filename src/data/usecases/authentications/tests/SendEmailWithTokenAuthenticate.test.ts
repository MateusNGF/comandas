import { BadRequestError } from '../../../../../src/domain/errors';
import { iSendEmailWithTokenAuthenticate } from '../../../../../src/domain/usecases/authentications';
import { iTokenAdapter } from '../../../../../src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '../../../../../src/infra/database/contracts/repositorys';
import { iMailProvider } from '../../../../../src/infra/mail/contracts/iMailProvider';
import { mock, MockProxy } from 'jest-mock-extended';
import { SendEmailWithTokenAuthenticateData } from '../SendEmailWithTokenAuthenticate.data';
import { Auth } from '../../../../../src/domain/entities';

describe('SendEmailWithTokenAuthenticate', () => {
  let sut: iSendEmailWithTokenAuthenticate;

  let tokenAdapterMock: MockProxy<iTokenAdapter>;
  let mailProviderMock: MockProxy<iMailProvider>;
  let authenticateRepository: MockProxy<iAuthenticationRepository>;

  let fakeAuth: Auth;
  let fakeInput: iSendEmailWithTokenAuthenticate.input;
  let fakeOutput: iSendEmailWithTokenAuthenticate.output;

  beforeAll(() => {
    tokenAdapterMock = mock();
    mailProviderMock = mock();
    authenticateRepository = mock();
  });

  beforeEach(() => {
    sut = new SendEmailWithTokenAuthenticateData(
      tokenAdapterMock,
      mailProviderMock,
      authenticateRepository
    );

    fakeInput = {
      email: 'email_test',
    };

    fakeOutput = true;

    fakeAuth = {
      id: '01',
      associeteded_id: '011',
      email: 'any_email',
      cnpj: 'any_cnpj',
      password: 'any_password',
    };
  });

  it('Should return BadRequestError when auth not found.', async () => {
    authenticateRepository.getAuthByCredentials.mockResolvedValue(undefined);

    const result = sut.exec(fakeInput);
    await expect(result).rejects.toThrowError(
      new BadRequestError('Account not found.')
    );
  });

  it('Should return true when auth found and send.', async () => {
    authenticateRepository.getAuthByCredentials.mockResolvedValue(fakeAuth);
    mailProviderMock.send.mockResolvedValue(true);

    const result = await sut.exec(fakeInput);
    expect(result).toEqual(true);
  });

  it('Should return false when auth found and not send.', async () => {
    authenticateRepository.getAuthByCredentials.mockResolvedValue(fakeAuth);
    mailProviderMock.send.mockResolvedValue(false);

    const result = await sut.exec(fakeInput);
    expect(result).toEqual(false);
  });
});
