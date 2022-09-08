export class Email {
  private email: string;
  private regex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  public get(): string {
    return this.email;
  }

  public set(email: string) {
    this.email = email;
  }
}
