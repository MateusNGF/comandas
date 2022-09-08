import { HttpError } from "../../../src/domain/errors";
import { HttpResponse } from "../helpers/http";

export abstract class iController {
  abstract exec<T=any>(request: any): Promise<HttpResponse<T>>;

  protected sendError(error: any): HttpResponse<{ message: string }> {
    if (error instanceof HttpError) {
      return makeBodyResponseError(error.code ? error.code : 400, error.message);
    }else{
      console.error(error)
      return makeBodyResponseError(500, "Internal Error. try later.")
    }
  }

  protected sendSucess(status: 200 | 204, data: any): HttpResponse<any> {
    return {
      status: status || 200,
      data: { ok : 1, ...data} || null,
    };
  }
}


const makeBodyResponseError = (status : any, message:any) => {
  return {status: status,data : { message }}
}
