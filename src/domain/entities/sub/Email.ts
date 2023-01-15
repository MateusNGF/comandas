export class Email {
  private readonly content: string;
  constructor(email: string) {
    this.content = email;
  }

  [Symbol.toPrimitive](typeConvert) {
    if (typeConvert === 'string') {
      return this.content;
    }
  }
}
