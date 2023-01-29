import {
  iCreateAuthenticateForCompanyUsecase,
  iCreateTokenForCompany,
  iHasAuthenticationRecordCompany,
  iSendEmailWithTokenAuthenticate,
  iUpdadeAuthenticate,
} from '../../../../domain/usecases/authentications';
import { makeHashAdapter, makeTokenAdapter } from '../../infra/cryptography';
import { CreateAuthenticateForCompanyData } from '../../../../data/usecases/authentications/CreateAuthenticateForCompany.data';
import { HasAuthenticationRecordCompanyData } from '../../../../data/usecases/authentications/HasAuthenticationRecordCompany.data';
import { CreateTokenForCompany as CreateTokenForCompanyData } from '../../../../../src/data/usecases/authentications/CreateTokenForCompany.data';
import { SendEmailWithTokenAuthenticateData } from '../../../../../src/data/usecases/authentications/SendEmailWithTokenAuthenticate.data';
import { makeMailProvider } from '../../infra/mail';
import { UpdateAuthenticateData } from '../../../../../src/data/usecases/authentications/UpdateAuthenticate.data';
import { makeAuthenticationRepository, makeCompanyRepository } from '../../infra/database/mongo.factory';



export function makeUsecaseHasAuthenticationRecordCompany(): iHasAuthenticationRecordCompany {
  return new HasAuthenticationRecordCompanyData(
    makeAuthenticationRepository(),
    makeUsecaseCreateTokenForCompany(),
    makeHashAdapter()
  );
}

export function makeUsecaseCreateAuthenticateForCompany(): iCreateAuthenticateForCompanyUsecase {
  return new CreateAuthenticateForCompanyData(
    makeAuthenticationRepository(),
    makeUsecaseHasAuthenticationRecordCompany()
  );
}

export function makeUsecaseCreateTokenForCompany(): iCreateTokenForCompany {
  return new CreateTokenForCompanyData(
    makeTokenAdapter(),
    makeCompanyRepository()
  );
}

export function makeUsecaseUpdateAuthenticate(): iUpdadeAuthenticate {
  return new UpdateAuthenticateData(makeAuthenticationRepository());
}

export function makeUsecaseSendEmailForResentPasswordAuthenticateForCompany(): iSendEmailWithTokenAuthenticate {
  return new SendEmailWithTokenAuthenticateData(
    makeTokenAdapter(),
    makeMailProvider(),
    makeAuthenticationRepository()
  );
}
