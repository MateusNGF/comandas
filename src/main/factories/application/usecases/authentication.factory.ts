import { AuthenticationRepository } from "../../../../infra/database/mongodb/repositorys/authentication.repository";
import { AuthenticateAndReturnTokenCompanyData } from "../../../../data/usecases/authentication/AuthenticateAndReturnTokenCompany.data";
import { Auth } from "../../../../domain/entities";
import { iAuthenticationAndReturnTokenCompany, iCreateAuthenticateForCompanyUsecase, iHasAuthenticationRecordCompany } from "../../../../domain/usecases/authentication";
import { MongoDB } from "../../../../infra/database/mongodb";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";
import { CreateAuthenticateForCompany } from "../../../../../src/data/usecases/authentication/CreateAuthenticateForCompany.data";
import { HasAuthenticationRecordCompanyData } from "../../../../../src/data/usecases/authentication/HasAuthenticationRecordCompany.data";


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>(process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string);
    const hashAdapter = makeHashAdapter()
    const repository = new AuthenticationRepository(collection, hashAdapter);
    return repository;
}

export function makeUsecaseAuthenticatieAndReturnTokenCompany(): iAuthenticationAndReturnTokenCompany {
    return new AuthenticateAndReturnTokenCompanyData(
        makeAuthenticationRepository(),
        makeTokenAdapter(),
        makeHashAdapter()
    );
}

export function makeUsecaseHasAuthenticationRecordCompany() : iHasAuthenticationRecordCompany {
    return new HasAuthenticationRecordCompanyData(
        makeAuthenticationRepository()
    )
}

export function makeUsecaseCreateAuthenticateForCompany() : iCreateAuthenticateForCompanyUsecase {
    return new CreateAuthenticateForCompany(
        makeAuthenticationRepository(),
        makeTokenAdapter(),
        makeUsecaseHasAuthenticationRecordCompany()
    )
}