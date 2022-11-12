import {
    BadRequestError,
    UnauthorizedError,
} from '../../../../src/domain/errors';
import { iAuthenticationCompany } from '@/src/domain/usecases/authentication';
import {
    iHashAdapter,
    iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '@/src/infra/database/contracts/repositorys';
import { Auth } from '../../../../src/domain/entities';


export class AuthenticationCompanyData implements iAuthenticationCompany {
    constructor(
        private readonly authenticationRepository: iAuthenticationRepository,
        private readonly tokenAdapter: iTokenAdapter,
        private readonly hashAdapter: iHashAdapter
    ) { }
    async exec(
        input: iAuthenticationCompany.input
    ): Promise<iAuthenticationCompany.output> {
        const auth : Auth = await this.authenticationRepository.getAuth({
            email: input?.email,
            cnpj: input?.cnpj
        })

        if (!auth) throw new BadRequestError('Account not found.')
        
        const accessReleased = await this.hashAdapter.compare(
            input.password,
            auth.password
        );

        if (!accessReleased) throw new UnauthorizedError();

        return {
            token: await this.tokenAdapter.createAccessToken({
                _id: auth.associeteded_id,
            }),
        };
    }
}
