import {
    BadRequestError,
    UnauthorizedError,
} from '../../../domain/errors';
import { iAuthenticationAndReturnTokenCompany } from '@/src/domain/usecases/authentication';
import {
    iHashAdapter,
    iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iAuthenticationRepository } from '@/src/infra/database/contracts/repositorys';
import { Auth } from '../../../domain/entities';


export class AuthenticateAndReturnTokenCompanyData implements iAuthenticationAndReturnTokenCompany {
    constructor(
        private readonly authenticationRepository: iAuthenticationRepository,
        private readonly tokenAdapter: iTokenAdapter,
        private readonly hashAdapter: iHashAdapter
    ) { }
    async exec(
        input: iAuthenticationAndReturnTokenCompany.input
    ): Promise<iAuthenticationAndReturnTokenCompany.output> {
        console.log(input);
        
        const auth : Auth = await this.authenticationRepository.getAuth({
            email: input?.email,
            cnpj: input?.cnpj
        })

        console.log(auth)
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
