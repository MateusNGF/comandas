import { iCompanyRepository } from "../../../infra/database/contracts/repositorys";
import { iRegistrationCompany } from "../../../domain/usecases/company";
import { iHashAdapter, iTokenAdapter } from "../../../infra/cryptography/contracts";

export class RegistrationCompanyData extends iRegistrationCompany {

  constructor(
    private readonly repository: iCompanyRepository,
    private readonly tokenAdapter : iTokenAdapter,
    private readonly hashAdapter : iHashAdapter
  ) { super(); }

  async exec(
    input: iRegistrationCompany.input
  ): Promise<iRegistrationCompany.output> {
    
    const company = Object.assign(input)

    company.password = await this.hashAdapter.encrypt(company.password)
    const registredCompany = await this.repository.register(company)
  
    if (registredCompany) {
      return {
        token: await this.tokenAdapter.sing(registredCompany.id),
        createdAt: new Date().toISOString()
      }
    }
  } 
}
