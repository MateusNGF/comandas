import { Auth } from "../../../domain/entities";
import { UnauthorizedError } from "../../../domain/errors";
import { iHasAuthenticationRecordCompany } from "../../../domain/usecases/authentications";
import { iAuthenticationRepository } from "../../../infra/database/contracts/repositorys";

export class HasAuthenticationRecordCompanyData implements iHasAuthenticationRecordCompany {
    constructor(
        private readonly authenticationRepository: iAuthenticationRepository
    ) { }
    async exec(
        input: iHasAuthenticationRecordCompany.input
    ): Promise<iHasAuthenticationRecordCompany.output> {
        const auth : Auth = await this.authenticationRepository.getAuth({
            email: input?.email,
            cnpj: input?.cnpj
        })

        if (auth) {
            throw new UnauthorizedError('This CNPJ or Email has record, try change your passwoord.')
        }
    }
}
