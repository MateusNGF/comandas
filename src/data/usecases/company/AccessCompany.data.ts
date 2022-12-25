import { iAuthenticationAndReturnTokenCompany } from "@/src/domain/usecases/authentication";
import { iAccessCompany } from "@/src/domain/usecases/company";


export class AccessCompany implements iAccessCompany {
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