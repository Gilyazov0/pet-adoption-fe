export default class PasswordValidation {
  public static validate(pw1: string, pw2?: string): string {
    if (pw2 !== undefined && pw1 !== pw2) return "passwords do not match";
    if (pw1.length < 6) return "password length less than 6";
    if (!this.isHaveLetter(pw1))
      return "password have to have at list one letter";
    if (!this.isHaveNumber(pw1))
      return "password have to have at list one number";
    return "";
  }

  private static isHaveLetter(s: string) {
    return s
      .split("")
      .some(
        (char) =>
          char.charCodeAt(0) >= "a".charCodeAt(0) &&
          char.charCodeAt(0) <= "z".charCodeAt(0)
      );
  }

  private static isHaveNumber(s: string) {
    return s
      .split("")
      .some(
        (char) =>
          char.charCodeAt(0) >= "0".charCodeAt(0) &&
          char.charCodeAt(0) <= "9".charCodeAt(0)
      );
  }
}
