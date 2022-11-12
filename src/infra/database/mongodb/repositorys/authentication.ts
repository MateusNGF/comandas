import { Auth } from "@/src/domain/entities";
import { Collection } from "mongodb";
import { iAuthenticationRepository } from "../../contracts/repositorys";

export class AuthenticationRepository implements iAuthenticationRepository {

    constructor(
        private readonly Colletion: Collection<Auth>,
    ) { }
    getAuth(credentials: { email: string; cnpj: string; password: string; }): Promise<Auth> {
        return this.Colletion.findOne({
            $or : [
                { email : credentials?.email },
                { cnpj : credentials?.cnpj }
            ]
        }) 
    }
}