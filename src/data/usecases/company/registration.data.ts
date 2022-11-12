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
    private readonly companyRepository: iCompanyRepository,
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
      await this.companyRepository.findByEmail(company.email) ??
      await this.companyRepository.findByCNPJ(company.cnpj)
    ) {
      throw new UnauthorizedError('Email or cnpj already registered.');
    }

    const registeredCompany = await this.companyRepository.register({
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
