export interface iBaseRepository<T=any> {
  findById(id : string) : Promise<T>
}