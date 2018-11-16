export class JsUtils {
  static isBlank(value: string): boolean {
    if (value === undefined || value === null || value.trim() === '') {
      return true;
    }
    return false;
  }
}
