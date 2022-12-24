import { Auth } from "@/src/domain/entities/auth.entity";

type BasicCredentials = {email?: string, cnpj?: string }

export interface iAuthenticationRepository {
    getAuth(credentials: BasicCredentials): Promise<Auth>
    create(auth : Auth)  : Promise<Auth>
}