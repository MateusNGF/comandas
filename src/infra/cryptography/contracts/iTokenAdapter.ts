import { PayloadToken } from "@/src/domain/types";

export interface iTokenAdapter {
  sing<T=any>(content : T, secret ?: string): Promise<string>;
  verify<T=any>(hash: string, secret ?: string): Promise<T>;
  createAccessToken(data: PayloadToken): Promise<string>;
}
