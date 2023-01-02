import { Auth } from "@/src/domain/entities";
import { iHashAdapter } from "@/src/infra/cryptography/contracts";
import { Collection, ObjectId } from "mongodb";
import { iAuthenticationRepository } from "../../contracts/repositorys";
import { UpdateAuthenticateDTO } from "../../dtos";

export class AuthenticationsRepository implements iAuthenticationRepository {

    constructor(
        private readonly Colletion: Collection<Auth>,
        private readonly hashAdapter: iHashAdapter
    ) { }
    async getAuthByCredentials(credentials: { email?: string; cnpj?: string;}): Promise<Auth> {
        return this.Colletion.findOne({
            $or : [
                { email : credentials?.email },
                { cnpj : credentials?.cnpj }
            ]
        }) 
    }

    async getAuthById(_id: string): Promise<Auth> {
        return this.Colletion.findOne({_id : new ObjectId(_id)})
    }

    async create(auth : Auth) : Promise<Auth> {
        auth = {
            ...auth,
            password : await this.hashAdapter.encrypt(auth.password),
            create_at : new Date().toISOString(),
            update_at  :new Date().toISOString()
        }

        const result  = await this.Colletion.insertOne(auth)
        return {
            ...auth,
            _id : result.insertedId
        }
    }

    async update(auth: UpdateAuthenticateDTO): Promise<Boolean> {
        if (!auth.authId) return false;

        const _id = auth.authId
        delete auth.authId

        if (auth.password) {
            auth.password = await this.hashAdapter.encrypt(auth.password)
        }

        const result = await this.Colletion.updateOne(
            { _id: new ObjectId(_id) },
            {
                $set: {
                    ...auth,
                    update_at: new Date().toISOString()
                }
            }
        )

        return Boolean(result.modifiedCount)
    }
}