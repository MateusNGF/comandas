import { iDatabase } from "src/infra/database/contracts";
import { CUSTOM_ERROR, InternalError } from "../errors";

export abstract class iUsecase {
  abstract exec(input: any, options ?: iUsecase.Options): Promise<any>;

  handlersErros(error: any): Error {
    if (error instanceof CUSTOM_ERROR) {
      throw error
    } else {
      throw new InternalError('Internal Error, try later.')
    }
  }
}


export namespace iUsecase {
  export type Options = {
    session : iDatabase.iSession
  }
}