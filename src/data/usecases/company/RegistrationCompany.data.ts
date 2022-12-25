import { iCompanyRepository } from '../../../infra/database/contracts/repositorys';
import { iRegistrationCompany } from '../../../domain/usecases/company';
import { Company } from './../../../domain/entities';
import { iCreateAuthenticateForCompanyUsecase } from '@/src/domain/usecases/authentication';

export class RegistrationCompanyData extends iRegistrationCompany {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly createAuthenticationForCompany : iCreateAuthenticateForCompanyUsecase
  ) {
    super();
  }

  async exec(
    input: iRegistrationCompany.input
  ): Promise<iRegistrationCompany.output> {
    
    const company = new Company({
      ...input,
      _id : this.companyRepository.generateId()
    });

    const credentialsAccessCreated = await this.createAuthenticationForCompany.exec({
      associeteded_id : company._id,
      email : company.email,
      cnpj : company.cnpj,
      password : input.password
    })

    const recordCompany = await this.companyRepository.register({
      _id : company._id,
      name_fantasy : company.name_fantasy,
      cnpj : company.cnpj,
      email  :company.email
    });

    if (recordCompany) {
      return {
        token: credentialsAccessCreated.token
      };
    }
  }
}
