import { iUsecase } from "../../contracts";
import { Auth } from "../../entities";


export abstract class iCreateAuthenticateForCompanyUsecase implements iUsecase {
    abstract exec(input: iCreateAuthenticateForCompanyUsecase.input): Promise<iCreateAuthenticateForCompanyUsecase.output>
}


export namespace iCreateAuthenticateForCompanyUsecase {
    export type input = {
        associeteded_id : string,
        email ?: string,
        cnpj ?: string,
        password : string
    }

    export type output = Auth
}