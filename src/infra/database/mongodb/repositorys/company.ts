import { Company } from "@/src/domain/entities";
import { Collection, ObjectId, WithId } from "mongodb";
import { iCompanyRepository } from "../../contracts/repositorys";

export class CompanyRepository implements iCompanyRepository {
  constructor(
    private readonly Colletion : Collection<Company>
  ){}

  async findByCNPJ(cnpj: string): Promise<WithId<Company>> {
    return this.Colletion.findOne({cnpj})
  }

  async findByEmail(email: string): Promise<WithId<Company>> {
    return this.Colletion.findOne({email})
  }
  async findById(id: string): Promise<WithId<Company>> {
    return this.Colletion.findOne({ _id : new ObjectId(id)})
  }

  async register(company: Company): Promise<{id : string}> {
    const result = await this.Colletion.insertOne(company)
    if (result && result.acknowledged){
      return { id : result.insertedId.toHexString()}
    }
  }
}