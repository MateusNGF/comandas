
export abstract class HttpError extends Error {
  code : number
  message : string
}

export class UnauthorizedError extends HttpError {
  name = "Unauthorized Error"
  code = 401

  constructor(menssage : string){
    super();
    this.message = menssage
  }
} 