import { HttpResponse } from '@src/application/helpers/http-request';

export abstract class Controller {
  abstract exec(HttpRequest: any): Promise<HttpResponse>;

  protected sendError(error: any): HttpResponse<{ message: string }> {
    return {
      status: error.code ? error.code : 500,
      data: error.message,
    };
  }

  protected sendSucess(status: 200 | 204, data: any): HttpResponse<any> {
    return {
      status: status || 200,
      data: data || null,
    };
  }
}
