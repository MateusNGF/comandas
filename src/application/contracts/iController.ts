import { HTTP_STATUS } from '@/src/domain/types/Http.status';
import { HttpError } from '../../../src/domain/errors';
import { HttpRequest, HttpResponse } from '../helpers/http';

export abstract class iController {
  abstract exec<T = any>(request: HttpRequest): Promise<HttpResponse<T>>;

  protected sendError(error: any): HttpResponse<{ message: string }> {
    if (error instanceof HttpError) {
      return makeBodyResponseError(
        error.code ? error.code : HTTP_STATUS.BAD_REQUEST,
        error.message
      );
    } else {
      console.error(error);
      return makeBodyResponseError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal Error. try later.');
    }
  }

  protected sendSucess(
    status: HTTP_STATUS.OK | HTTP_STATUS.ACCEPTED | HTTP_STATUS.CREATED | HTTP_STATUS.CONTINUE,
    data?: any
  ): HttpResponse<any> {
    return {
      status: status || 200,
      data: { ok: 1, ...data } || null,
    };
  }
}

const makeBodyResponseError = (status: any, message: any) => {
  return { status: status, data: { message } };
};
