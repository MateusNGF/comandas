import { iUsecase } from 'src/domain/contracts';
import { iHashAdapter } from '../../../../src/infra/cryptography/contracts';
import { AuthenticateEntity } from '../../../domain/entities';
import { BadRequestError, UnauthorizedError } from '../../../domain/errors';
import {
  iCreateTokenForCompany,
  iHasAuthenticationRecordCompany,
} from '../../../domain/usecases/authentications';
import { iAuthenticationRepository } from '../../../infra/database/contracts/repositorys';

export class HasAuthenticationRecordCompanyData
  implements iHasAuthenticationRecordCompany
{
  constructor(
    private readonly authenticationRepository: iAuthenticationRepository,
    private readonly createTokenForCompany: iCreateTokenForCompany,
    private readonly hashAdapter: iHashAdapter
  ) {}
  async exec(
    input: iHasAuthenticationRecordCompany.input,
    options?: iUsecase.Options
  ): Promise<iHasAuthenticationRecordCompany.output> {
    const foundedAuth: AuthenticateEntity =
      await this.authenticationRepository.getAuthByCredentials(
        {
          email: input?.email,
          cnpj: input?.cnpj,
        },
        options
      );

    if (input.password) {
      return this.validAuthForLogin(
        input as AuthenticateEntity,
        foundedAuth,
        options
      );
    } else {
      return this.validAuthExist(foundedAuth) as any;
    }
  }

  private async validAuthForLogin(
    incomingAuth: AuthenticateEntity,
    foundedAuth: AuthenticateEntity,
    options: iUsecase.Options
  ) {
    if (!foundedAuth) throw new BadRequestError('Account not found.');

    const accessReleased = await this.hashAdapter.compare(
      incomingAuth.password,
      foundedAuth.password
    );

    if (!accessReleased) throw new UnauthorizedError();

    const { token } = await this.createTokenForCompany.exec(
      {
        companyId: foundedAuth.associeteded_id,
      },
      options
    );

    return { token };
  }

  private async validAuthExist(foundedAuth: AuthenticateEntity) {
    if (foundedAuth)
      throw new UnauthorizedError(
        'This CNPJ or Email has record, try change your passwoord.'
      );
  }
}
