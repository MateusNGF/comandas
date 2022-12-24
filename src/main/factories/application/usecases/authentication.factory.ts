import { AuthenticationRepository } from "../../../../infra/database/mongodb/repositorys/authentication.repository";
import { AuthenticateAndReturnTokenCompanyData } from "../../../../data/usecases/authentication/AuthenticateAndReturnTokenCompany.data";
import { Auth } from "../../../../domain/entities";
import { iAuthenticationAndReturnTokenCompany } from "../../../../domain/usecases/authentication";
import { MongoDB } from "../../../../infra/database/mongodb";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>(process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string);
    const repository = new AuthenticationRepository(collection);
    return repository;
}


export function makeAuthenticatieAndReturnTokenCompanyUsecase(): iAuthenticationAndReturnTokenCompany {
    return new AuthenticateAndReturnTokenCompanyData(
        makeAuthenticationRepository(),
        makeTokenAdapter(),
        makeHashAdapter()
    );
} 