import { AuthenticationCompanyData, RegistrationCompanyData } from "../../../../data/usecases/company";
import { iAuthenticationCompany, iRegistrationCompany } from "../../../../domain/usecases/company";
import { MongoDB } from "../../../../infra/database/mongodb";
import { Company } from "../../../../domain/entities";
import { iHashAdapter, iTokenAdapter } from "../../../../infra/cryptography/contracts";
import { BcryptAdapter, JWTAdapter } from "../../../../infra/cryptography";
import { CompanyRepository } from "../../../../infra/database/mongodb/repositorys";

function makeRepository() : any {
  const collection = MongoDB.colletion<Company>('companies')
  const repository = new CompanyRepository(collection)
  return repository
}


function makeHashAdapter() : iHashAdapter{
  return new BcryptAdapter(4)
}

function makeTokenAdapter() : iTokenAdapter {
  return new JWTAdapter()
}

export const makeUseCaseAuthenticationCompany = (): iAuthenticationCompany => {
  return new AuthenticationCompanyData(
    makeRepository(),
    makeTokenAdapter(),
    makeHashAdapter()
  );
};

export const makeUseCaseRegistrationCompany = () : iRegistrationCompany => {
  return new RegistrationCompanyData(
    makeRepository(),
    makeTokenAdapter(),
    makeHashAdapter()
  )
}
