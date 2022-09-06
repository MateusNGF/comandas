export class CNPJ {
  private cnpj : string
  private readonly regex_formart : RegExp = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

  public set(v : string) {
    this.cnpj = v;
  }

  
  public get() : string {
    return this.cnpj
  }
}