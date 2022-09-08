import { iCompanyRepository } from "../../../infra/database/contracts/repositorys";
import { iRegistrationCompany } from "../../../domain/usecases/company";
import { iHashAdapter, iTokenAdapter } from "../../../infra/cryptography/contracts";
import { Company } from "./../../../domain/entities";
import { ObjectManager } from "../../../domain/utils";
import { UnauthorizedError } from "../../../../src/domain/errors";

export class RegistrationCompanyData extends iRegistrationCompany {

  constructor(
    private readonly repository: iCompanyRepository,
    private readonly tokenAdapter : iTokenAdapter,
    private readonly hashAdapter : iHashAdapter
  ) { super(); }

  async exec(
    input: iRegistrationCompany.input
  ): Promise<iRegistrationCompany.output> {
    
    ObjectManager.hasKeys([
      "name_fantasy", "email", "cnpj", "password"
    ], input)

    const company = new Company(input)

    const hasRecord = await this.checkRecordEmailOrCnpj(company.email, company.cnpj)

    if (hasRecord){
      throw new UnauthorizedError("Email or Cnpj already registered.")
    }

    const registeredCompany = await this.repository.register({
      ...company,
      password : await this.hashAdapter.encrypt(company.password)
    })

    if (registeredCompany) {
      return {
        token: await this.tokenAdapter.sing(registeredCompany._id),
        createdAt: new Date().toISOString()
      }
    }
  }

  private async checkRecordEmailOrCnpj(email : string, cnpj : string = null) {
    return !!(await Promise.all([
      this.repository.findByEmail(email),
      this.repository.findByCNPJ(cnpj)
    ])).filter(account => account).length
  }
}
