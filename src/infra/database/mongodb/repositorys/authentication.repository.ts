import { Auth } from "@/src/domain/entities";
import { iHashAdapter } from "@/src/infra/cryptography/contracts";
import { Collection } from "mongodb";
import { iAuthenticationRepository } from "../../contracts/repositorys";

export class AuthenticationRepository implements iAuthenticationRepository {

    constructor(
        private readonly Colletion: Collection<Auth>,
        private readonly hashAdapter: iHashAdapter
    ) { }
    async getAuth(credentials: { email: string; cnpj: string; password: string; }): Promise<Auth> {
        return this.Colletion.findOne({
            $or : [
                { email : credentials?.email },
                { cnpj : credentials?.cnpj }
            ]
        }) 
    }


    async create(auth : Auth) : Promise<Auth> {
        auth = {
            ...auth,
            password : await this.hashAdapter.encrypt(auth.password),
            create_at : new Date().toISOString()
        }

        const result  = await this.Colletion.insertOne(auth)
        return {
            ...auth,
            _id : result.insertedId
        }
    }
}