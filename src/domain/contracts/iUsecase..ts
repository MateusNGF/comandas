import { CUSTOM_ERROR, InternalError } from "../errors";

export abstract class iUsecase {
  abstract exec(input: any, ...args: any[]): Promise<any>;

  handlersErros(error: any): Error {
    if (error instanceof CUSTOM_ERROR) {
      throw error
    } else {
      throw new InternalError('Internal Error, try later.')
    }
  }
}