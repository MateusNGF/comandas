import { iUsecase } from "../../contracts"

export abstract class iRegistrationCompany implements iUsecase {
  abstract exec(input : iRegistrationCompany.input) : Promise<iRegistrationCompany.output>
}

export namespace iRegistrationCompany {
  export type input = {
    fantasy_name : string,
    cnpj : string,
    email : string,
    password : string
  }


  export type output = {
    token : string,
    createdAt : string
  }
}