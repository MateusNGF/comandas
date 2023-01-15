import { AuthenticationsRepository } from "../../../../infra/database/mongodb/repositorys/authentications.repository";
import { Auth } from "../../../../domain/entities";
import { 
    iCreateAuthenticateForCompanyUsecase, 
    iCreateTokenForCompany, 
    iHasAuthenticationRecordCompany, 
    iSendEmailWithTokenAuthenticate, 
    iUpdadeAuthenticate 
} from "../../../../domain/usecases/authentications";
import { MongoDB } from "../../../../infra/database/mongodb";
import { makeHashAdapter, makeTokenAdapter } from "../../infra/cryptography";
import { CreateAuthenticateForCompanyData } from "../../../../data/usecases/authentications/CreateAuthenticateForCompany.data";
import { HasAuthenticationRecordCompanyData } from "../../../../data/usecases/authentications/HasAuthenticationRecordCompany.data";
import { CreateTokenForCompany as CreateTokenForCompanyData } from "../../../../../src/data/usecases/authentications/CreateTokenForCompany.data";
import { makeCompanyRepository } from "./companies.factory";
import { SendEmailWithTokenAuthenticateData } from "../../../../../src/data/usecases/authentications/SendEmailWithTokenAuthenticate.data";
import { makeMailProvider } from "../../infra/mail";
import { UpdateAuthenticateData } from "../../../../../src/data/usecases/authentications/UpdateAuthenticate.data";


export function makeAuthenticationRepository(): any {
    const collection = MongoDB.colletion<Auth>(process.env.COLLECTIONS_NAMES_AUTHENTICATIONS as string);
    const hashAdapter = makeHashAdapter()
    const repository = new AuthenticationsRepository(collection, hashAdapter);
    return repository;
}

export function makeUsecaseHasAuthenticationRecordCompany() : iHasAuthenticationRecordCompany {
    return new HasAuthenticationRecordCompanyData(
        makeAuthenticationRepository(),
        makeUsecaseCreateTokenForCompany(),
        makeHashAdapter()
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


export function makeUsecaseUpdateAuthenticate() : iUpdadeAuthenticate {
    return new UpdateAuthenticateData(
        makeAuthenticationRepository()
    )
}

export function makeUsecaseSendEmailForResentPasswordAuthenticateForCompany() : iSendEmailWithTokenAuthenticate {
    return new SendEmailWithTokenAuthenticateData(
        makeTokenAdapter(),
        makeMailProvider(),
        makeAuthenticationRepository()
    );
}