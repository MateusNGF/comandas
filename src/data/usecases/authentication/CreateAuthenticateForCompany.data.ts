import { iTokenAdapter } from "@/src/infra/cryptography/contracts";
import { Auth } from "../../../../src/domain/entities";
import { iCreateAuthenticateForCompanyUsecase, iHasAuthenticationRecordCompany } from "../../../../src/domain/usecases/authentication";
import { iAuthenticationRepository } from "../../../../src/infra/database/contracts/repositorys";


export class CreateAuthenticateForCompany implements iCreateAuthenticateForCompanyUsecase {
    constructor(
        private readonly authenticationRepository : iAuthenticationRepository,
        private readonly tokenAdapter: iTokenAdapter,
        private readonly hasAuthenticationRecordCompanyUsecase : iHasAuthenticationRecordCompany
    ){}

    async exec(input: iCreateAuthenticateForCompanyUsecase.input): Promise<iCreateAuthenticateForCompanyUsecase.output> {
        await this.hasAuthenticationRecordCompanyUsecase.exec({
            email : input?.email,
            cnpj : input?.cnpj
        })

        const authForRecord = new Auth({
            associeteded_id : input.associeteded_id,
            email : input?.email,
            cnpj : input?.cnpj,
            password : input.password 
        })

        const authRecored = await this.authenticationRepository.create(authForRecord)
        
        return {
            authId : authRecored._id,
            token: await this.tokenAdapter.createAccessToken({
                companyId: authRecored.associeteded_id,
                email: authRecored?.email,
                cnpj: authRecored?.cnpj
            }),
        }
    }
}