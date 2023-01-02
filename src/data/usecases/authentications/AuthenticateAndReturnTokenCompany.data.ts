import {
    BadRequestError,
    UnauthorizedError,
} from '../../../domain/errors';
import { iAuthenticationAndReturnTokenCompany, iCreateTokenForCompany } from '@/src/domain/usecases/authentications';
import {
    iHashAdapter,
} from '@/src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '@/src/infra/database/contracts/repositorys';
import { Auth } from '../../../domain/entities';


export class AuthenticateAndReturnTokenCompanyData implements iAuthenticationAndReturnTokenCompany {
    constructor(
        private readonly authenticationRepository: iAuthenticationRepository,
        private readonly createTokenForCompany: iCreateTokenForCompany,
        private readonly hashAdapter: iHashAdapter
    ) { }
    async exec(
        input: iAuthenticationAndReturnTokenCompany.input
    ): Promise<iAuthenticationAndReturnTokenCompany.output> {
        const auth : Auth = await this.authenticationRepository.getAuthByCredentials({
            email: input?.email,
            cnpj: input?.cnpj
        })

        if (!auth) throw new BadRequestError('Account not found.')
        
        const accessReleased = await this.hashAdapter.compare(
            input.password,
            auth.password
        );

        if (!accessReleased) throw new UnauthorizedError();

        const {token} = await this.createTokenForCompany.exec({companyId : auth.associeteded_id})

        return {token};
    }
}
