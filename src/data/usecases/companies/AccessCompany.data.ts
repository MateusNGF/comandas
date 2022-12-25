import { iAuthenticationAndReturnTokenCompany } from "@/src/domain/usecases/authentications";
import { iAccessCompany } from "@/src/domain/usecases/companies";


export class AccessCompanyData implements iAccessCompany {
    constructor(
        private readonly authenticateAndReturnToken : iAuthenticationAndReturnTokenCompany
    ){}

    async exec(input: iAccessCompany.input): Promise<iAccessCompany.output> {
        const resultAuthentication = await this.authenticateAndReturnToken.exec({
            password : input.password,
            cnpj : input?.cnpj,
            email : input?.email
        })

        return {
            token : resultAuthentication.token
        }
    }
}