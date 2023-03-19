import { iDatabase } from "src/infra/database/contracts";

export interface iUsecase {
  exec(input: any, options ?: iUsecase.Options): Promise<any>;
}


export namespace iUsecase {
  export type Options = {
    session : iDatabase.iSession
  }
}
