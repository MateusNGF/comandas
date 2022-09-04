import { HttpError } from "../../../src/domain/errors";
import { HttpResponse } from "../helpers/http-request";

export abstract class iController {
  abstract exec<T=any>(HttpRequest: any): Promise<HttpResponse<T>>;

  protected sendError(error: any): HttpResponse<{ message: string }> {
    if (error instanceof HttpError){
      return {
        status: error.code ? error.code : 500,
        data: {
          message : error.message
        }
      };
    }

    console.log(error)
    return {
      status: 500,
      data: {
        message : "Unknown error, come back later."
      }
    };
  }

  protected sendSucess(status: 200 | 204, data: any): HttpResponse<any> {
    return {
      status: status || 200,
      data: { ok : 1, ...data} || null,
    };
  }
}
