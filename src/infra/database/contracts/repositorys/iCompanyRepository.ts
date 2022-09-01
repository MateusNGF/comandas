import { Company } from "@/src/domain/entities"
import { iBaseRepository } from "."

export interface iCompanyRepository extends iBaseRepository {
  findByCNPJ(cnpj : string) : Promise<Company>
  findByEmail(cnpj : string) : Promise<Company>
  register(company : Company) : Promise<{id : string}>
}