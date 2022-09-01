export type HttpRequest = {
  body : any,
  params : any
};
export type HttpResponse<T = any> = {
  status: number;
  data: T;
};
