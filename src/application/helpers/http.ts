export type HttpRequest = {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
};
export type HttpResponse<T = any> = {
  status: number;
  data: T;
};
