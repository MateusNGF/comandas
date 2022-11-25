import { Auth } from "@/src/domain/entities/auth.entity";


export interface iAuthenticationRepository {
    getAuth(credentials: { email: string, cnpj: string }): Promise<Auth>
}