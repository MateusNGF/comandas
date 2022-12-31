import { AuthenticationsRepository } from "../../../../infra/database/mongodb/repositorys/authentications.repository";
import { AuthenticateAndReturnTokenCompanyData } from "../../../../data/usecases/authentications/AuthenticateAndReturnTokenCompany.data";
import { Auth } from "../../../../domain/entities";
import { iAuthenticationAndReturnTokenCompany, iCreateAuthenticateForCompanyUsecase, iCreateTokenForCompany, iHasAuthenticationRecordCompany } from "../../../../domain/usecases/authentications";
import { MongoDB } from "../../../../infra/database/mongodb";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";
import { CreateAuthenticateForCompanyData } from "../../../../data/usecases/authentications/CreateAuthenticateForCompany.data";
import { HasAuthenticationRecordCompanyData } from "../../../../data/usecases/authentications/HasAuthenticationRecordCompany.data";
import { CreateTokenForCompany as CreateTokenForCompanyData } from "../../../../../src/data/usecases/authentications/CreateTokenForCompany.data";
import { makeCompanyRepository } from "./companies.factory";


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>(process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string);
    const hashAdapter = makeHashAdapter()
    const repository = new AuthenticationsRepository(collection, hashAdapter);
    return repository;
}

export function makeUsecaseAuthenticatieAndReturnTokenCompany(): iAuthenticationAndReturnTokenCompany {
    return new AuthenticateAndReturnTokenCompanyData(
        makeAuthenticationRepository(),
        makeUsecaseCreateTokenForCompany(),
        makeHashAdapter()
    );
}

export function makeUsecaseHasAuthenticationRecordCompany() : iHasAuthenticationRecordCompany {
    return new HasAuthenticationRecordCompanyData(
        makeAuthenticationRepository()
    )
}

export function makeUsecaseCreateAuthenticateForCompany() : iCreateAuthenticateForCompanyUsecase {
    return new CreateAuthenticateForCompanyData(
        makeAuthenticationRepository(),
        makeUsecaseHasAuthenticationRecordCompany()
    )
}

export function makeUsecaseCreateTokenForCompany() : iCreateTokenForCompany {
    return new CreateTokenForCompanyData(
        makeTokenAdapter(),
        makeCompanyRepository()
    )
}