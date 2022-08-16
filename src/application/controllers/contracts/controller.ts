import { HttpResponse } from '@src/application/helpers/http-request';

export interface Controller {
  exec(HttpRequest: any): Promise<HttpResponse>;
}
