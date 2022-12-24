import { Auth } from "@/src/domain/entities";
import { UnauthorizedError } from "@/src/domain/errors";
import { iHasAuthenticationRecordCompany } from "@/src/domain/usecases/authentication";
import { iAuthenticationRepository } from "@/src/infra/database/contracts/repositorys";

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
