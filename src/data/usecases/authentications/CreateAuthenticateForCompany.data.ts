import { Auth } from '../../../domain/entities';
import {
  iCreateAuthenticateForCompanyUsecase,
  iHasAuthenticationRecordCompany,
} from '../../../domain/usecases/authentications';
import { iAuthenticationRepository } from '../../../infra/database/contracts/repositorys';

export class CreateAuthenticateForCompanyData
  implements iCreateAuthenticateForCompanyUsecase
{
  constructor(
    private readonly authenticationRepository: iAuthenticationRepository,
    private readonly hasAuthenticationRecordCompanyUsecase: iHasAuthenticationRecordCompany
  ) {}

  async exec(
    input: iCreateAuthenticateForCompanyUsecase.input
  ): Promise<iCreateAuthenticateForCompanyUsecase.output> {
    await this.hasAuthenticationRecordCompanyUsecase.exec({
      email: input?.email,
      cnpj: input?.cnpj,
    });

    const authForRecord = new Auth({
      associeteded_id: input.associeteded_id,
      email: input?.email,
      cnpj: input?.cnpj,
      password: input.password,
    });

    const authRecored = await this.authenticationRepository.create(
      authForRecord
    );

    return {
      authId: authRecored._id,
    };
  }
}
