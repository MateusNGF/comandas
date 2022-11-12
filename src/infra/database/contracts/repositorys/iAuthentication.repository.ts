import { Auth } from "@/src/domain/entities";


export interface iAuthenticationRepository {
    getAuth(credentials: { email: string, cnpj: string }): Promise<Auth>
}