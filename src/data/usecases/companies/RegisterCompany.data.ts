import { iCompanyRepository } from '../../../infra/database/contracts/repositorys';
import { iRegisterCompany } from '../../../domain/usecases/companies';
import { Company } from '../../../domain/entities';
import { iCreateAuthenticateForCompanyUsecase } from '@/src/domain/usecases/authentications';

export class RegisterCompanyData extends iRegisterCompany {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly createAuthenticationForCompany : iCreateAuthenticateForCompanyUsecase
  ) {
    super();
  }

  async exec(
    input: iRegisterCompany.input
  ): Promise<iRegisterCompany.output> {
    
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
