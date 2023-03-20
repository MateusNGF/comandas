import { PayloadToken } from '../../../../src/domain/types';
import { InternalError } from '../../../../src/domain/errors';
import { iCreateTokenForCompany } from '../../../../src/domain/usecases/authentications';
import { iTokenAdapter } from '../../../../src/infra/cryptography/contracts';
import { iCompanyRepository } from '../../../../src/infra/database/contracts/repositorys';
import { iUsecase } from 'src/domain/contracts';

export class CreateTokenForCompany implements iCreateTokenForCompany {
  constructor(
    private readonly tokenAdapter: iTokenAdapter,
    private readonly companyRepository: iCompanyRepository
  ) {}
  async exec(
    input: iCreateTokenForCompany.input,
    options: iUsecase.Options
  ): Promise<iCreateTokenForCompany.output> {
    const company = await this.companyRepository.findById(
      input.companyId,
      options
    );

    if (company) {
      const token = await this.tokenAdapter.sing<PayloadToken>({
        companyId: company.id,
        email: company.email,
        timezone: company.timezone,
      });

      return { token };
    } else
      throw new InternalError('Company not found with id: ' + input.companyId);
  }
}
