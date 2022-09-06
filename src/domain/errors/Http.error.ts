import { CustomError } from "./custom.error";


export abstract class HttpError extends CustomError {
  code : number
  message : string
}

export class UnauthorizedError extends HttpError {
  name = "Unauthorized Error"
  code = 401

  constructor(menssage : string = "Access Denied."){
    super();
    this.message = menssage
  }
}

export class BadRequestError extends HttpError {
  name = "BadRequest Error"
  code = 400

  constructor(menssage : string){
    super();
    this.message = menssage
  }
} 