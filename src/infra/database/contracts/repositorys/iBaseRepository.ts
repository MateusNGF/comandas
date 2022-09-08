export interface iBaseRepository<T=any> {
  findById(_id : string) : Promise<T>
}