import { CustomError } from './custom.error';

export abstract class HttpError extends CustomError {
  code: number;
  message: string;
}

export class UnauthorizedError extends HttpError {
  name = 'Unauthorized Error';
  code = 401;

  constructor(menssage: string = 'Request Denied.') {
    super();
    this.message = menssage;
  }
}

export class BadRequestError extends HttpError {
  name = 'BadRequest Error';
  code = 400;

  constructor(menssage: string = 'Request Failed.') {
    super();
    this.message = menssage;
  }
}


export class InternalError extends Error {
  name = 'InternalError'
  code = 500
  constructor(message:string = "Internal Error. Try later."){
    super();
    this.message = message
  }
}
