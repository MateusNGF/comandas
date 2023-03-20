import { iDatabase } from "src/infra/database/contracts";

export interface iUsecase {
  exec(input: any, ...args : any[]): Promise<any>;
}


export namespace iUsecase {
  export interface Options extends iDatabase.Options {}
}
