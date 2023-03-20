import { iUsecase } from 'src/domain/contracts';
import { BadRequestError } from '../../../../src/domain/errors';
import { iSendEmailWithTokenAuthenticate } from '../../../../src/domain/usecases/authentications';
import { iTokenAdapter } from '../../../../src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '../../../../src/infra/database/contracts/repositorys';
import { iMailProvider } from '../../../../src/infra/mail/contracts/iMailProvider';

export class SendEmailWithTokenAuthenticateData
  implements iSendEmailWithTokenAuthenticate
{
  constructor(
    private readonly tokenAdapter: iTokenAdapter,
    private readonly mailProvider: iMailProvider,
    private readonly authenticateRepository: iAuthenticationRepository
  ) {}
  async exec(
    input: iSendEmailWithTokenAuthenticate.input,
    configuration?: iSendEmailWithTokenAuthenticate.Configuration,
    options ?: iUsecase.Options
  ): Promise<Boolean> {
    const auth = await this.authenticateRepository.getAuthByCredentials({
      email: input.email,
    }, options);
    if (!auth) throw new BadRequestError('Account not found.');

    const token =
      await this.tokenAdapter.sing<iSendEmailWithTokenAuthenticate.payloadToken>(
        { authId: auth.id },
        configuration
      );

    const bodyEmail: iMailProvider.ContentEmail = {
      to: auth.email,
      subject: 'Update pa',
      html: `<h2>${token}</h2>`,
    };

    return await this.mailProvider.send(bodyEmail);
  }
}
