import { iUsecase } from 'src/domain/contracts';
import { BadRequestError } from 'src/domain/errors';
import { iHasAuthenticationRecordCompany } from '../../../../src/domain/usecases/authentications';
import { iAccessCompany } from '../../../../src/domain/usecases/companies';

export class AccessCompanyData implements iAccessCompany {
  constructor(
    private readonly hasAuthenticationRecordCompany: iHasAuthenticationRecordCompany
  ) {}

  async exec(
    input: iAccessCompany.input,
    options: iUsecase.Options
  ): Promise<iAccessCompany.output> {
    const { token } = await this.hasAuthenticationRecordCompany.exec(
      {
        password: input.password,
        cnpj: input?.cnpj,
        email: input?.email,
      },
      options
    );

    return { token };
  }
}
