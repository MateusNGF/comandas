import { iUsecase } from 'src/domain/contracts';
import { AuthenticateEntity } from '../../../domain/entities';
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
    input: iCreateAuthenticateForCompanyUsecase.input,
    options: iUsecase.Options
  ): Promise<iCreateAuthenticateForCompanyUsecase.output> {
    await this.hasAuthenticationRecordCompanyUsecase.exec(
      {
        email: input?.email,
        cnpj: input?.cnpj,
      },
      options
    );

    const authForRecord = new AuthenticateEntity({
      associeteded_id: input.associeteded_id,
      email: input?.email,
      cnpj: input?.cnpj,
      password: input.password,
      id: this.authenticationRepository.generateId()
    });

    const authRecored = await this.authenticationRepository.create(
      authForRecord,
      options
    );

    return {
      authId: authRecored.id,
    };
  }
}
