export class JsUtils {
  static isBlank(value: string): boolean {
    if (value === undefined || value === null || value.trim() === '') {
      return true;
    }
    return false;
  }

  static isAnyBlank(...values: string[]): boolean {
    for (const v of values) {
      if (this.isBlank(v)) {
        return true;
      }
    }
    return false;
  }
}
