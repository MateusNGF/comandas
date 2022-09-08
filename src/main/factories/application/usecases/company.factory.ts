import { AuthenticationCompanyData, RegistrationCompanyData } from "../../../../data/usecases/company";
import { iAuthenticationCompany, iRegistrationCompany } from "../../../../domain/usecases/company";
import { MongoDB } from "../../../../infra/database/mongodb";
import { Company } from "../../../../domain/entities";
import { CompanyRepository } from "../../../../infra/database/mongodb/repositorys";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";

export function makeCompanyRepository() : any {
  const collection = MongoDB.colletion<Company>('companies')
  const repository = new CompanyRepository(collection)
  return repository
}

export const makeUseCaseAuthenticationCompany = (): iAuthenticationCompany => {
  return new AuthenticationCompanyData(
    makeCompanyRepository(),
    makeTokenAdapter(),
    makeHashAdapter()
  );
};

export const makeUseCaseRegistrationCompany = () : iRegistrationCompany => {
  return new RegistrationCompanyData(
    makeCompanyRepository(),
    makeTokenAdapter(),
    makeHashAdapter()
  )
}
