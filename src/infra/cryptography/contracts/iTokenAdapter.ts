import { PayloadToken } from "@/src/domain/types";

export interface iTokenAdapter {
  sing(text: string): Promise<any>;
  verify<T=any>(hash: string): Promise<T>;
  createAccessToken(data: PayloadToken): Promise<string>;
}
