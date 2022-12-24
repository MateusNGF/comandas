import { AuthenticationRepository } from "../../../../../src/infra/database/mongodb/repositorys/authentication.repository";
import { AuthenticateAndReturnTokenCompanyData } from "../../../../data/usecases/authentication/AuthenticateAndReturnToken-company.data";
import { Auth } from "../../../../../src/domain/entities";
import { iAuthenticationCompany } from "../../../../../src/domain/usecases/authentication";
import { MongoDB } from "../../../../../src/infra/database/mongodb";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>('authentication');
    const repository = new AuthenticationRepository(collection);
    return repository;
}


export function makeAuthenticationCompanyUsecase(): iAuthenticationCompany {
    return new AuthenticateAndReturnTokenCompanyData(
        makeAuthenticationRepository(),
        makeTokenAdapter(),
        makeHashAdapter()
    );
} 