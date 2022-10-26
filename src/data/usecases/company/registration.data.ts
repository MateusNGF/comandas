import { iCompanyRepository } from '../../../infra/database/contracts/repositorys';
import { iRegistrationCompany } from '../../../domain/usecases/company';
import {
  iHashAdapter,
  iTokenAdapter,
} from '../../../infra/cryptography/contracts';
import { Company } from './../../../domain/entities';
import { UnauthorizedError } from '../../../../src/domain/errors';

export class RegistrationCompanyData extends iRegistrationCompany {
  constructor(
    private readonly repository: iCompanyRepository,
    private readonly tokenAdapter: iTokenAdapter,
    private readonly hashAdapter: iHashAdapter
  ) {
    super();
  }

  async exec(
    input: iRegistrationCompany.input
  ): Promise<iRegistrationCompany.output> {
    
    const company = new Company(input);

    if (
      await this.repository.findByEmail(company.email) ??
      await this.repository.findByCNPJ(company.cnpj)
    ) {
      throw new UnauthorizedError('Email or cnpj already registered.');
    }

    const registeredCompany = await this.repository.register({
      ...company,
      password: await this.hashAdapter.encrypt(company.password),
    });

    if (registeredCompany) {
      return {
        token: await this.tokenAdapter.sing(registeredCompany._id),
        createdAt: new Date().toISOString(),
      };
    }
  }
}
