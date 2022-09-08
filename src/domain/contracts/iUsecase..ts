export interface iUsecase {
  exec(input: any): Promise<any>;
}
