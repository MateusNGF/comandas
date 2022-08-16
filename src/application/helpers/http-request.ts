export type HttpRequest = any;
export type HttpResponse<T = any> = {
  status: number;
  data: T;
};
