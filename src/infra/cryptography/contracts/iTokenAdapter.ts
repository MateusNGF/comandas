export interface iTokenAdapter {
  sing(text : string) : Promise<any>
  verify(hash  :string) : Promise<any>
}