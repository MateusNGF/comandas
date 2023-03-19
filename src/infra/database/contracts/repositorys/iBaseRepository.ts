import { iDatabase, iSession } from "../iDatabase";

export abstract class iBaseRepository<T = any> {
  abstract findById(id: string, options ?: iBaseRepository.Options): Promise<T>;
}

export namespace iBaseRepository {
  export interface Options {
    session ?: iSession
  }
}