export class Content {
  private content: string;

  get value(): string {
    return this.content;
  }

  validateContent(value: string) {
    return value.length >= 5 && value.length <= 240;
  }

  constructor(value: string) {
    const isContentValid = this.validateContent(value);

    if (!isContentValid) {
      throw new Error(
        "Content length should be greater than 5 characters and less than 240"
      );
    }

    this.content = value;
  }
}
