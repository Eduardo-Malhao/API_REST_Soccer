export default class EmailValidation {
  public static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
