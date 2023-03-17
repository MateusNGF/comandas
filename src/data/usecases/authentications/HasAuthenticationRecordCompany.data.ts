import { iHashAdapter } from '../../../../src/infra/cryptography/contracts';
import { Auth } from '../../../domain/entities';
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
    input: iHasAuthenticationRecordCompany.input
  ): Promise<iHasAuthenticationRecordCompany.output> {
    const foundedAuth: Auth =
      await this.authenticationRepository.getAuthByCredentials({
        email: input?.email,
        cnpj: input?.cnpj,
      });

    if (input.password) {
      return this.validAuthForLogin(input as Auth, foundedAuth);
    } else {
      return this.validAuthExist(foundedAuth) as any;
    }
  }

  private async validAuthForLogin(incomingAuth: Auth, foundedAuth: Auth) {
    if (!foundedAuth) throw new BadRequestError('Account not found.');

    const accessReleased = await this.hashAdapter.compare(
      incomingAuth.password,
      foundedAuth.password
    );

    if (!accessReleased) throw new UnauthorizedError();

    const { token } = await this.createTokenForCompany.exec({
      companyId: foundedAuth.associeteded_id,
    });

    return { token };
  }

  private async validAuthExist(foundedAuth: Auth) {
    if (foundedAuth)
      throw new UnauthorizedError(
        'This CNPJ or Email has record, try change your passwoord.'
      );
  }
}
