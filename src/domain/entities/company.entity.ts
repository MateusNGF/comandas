import { ObjectManager } from "../utils"

export class Company  {
  public readonly name_fantasy : string = undefined
  public readonly email : string = undefined
  public readonly cnpj : string = undefined
  public readonly password : string = undefined

  constructor(company : Company){
    ObjectManager.assing(this, company)
  }
}

export namespace Company {}