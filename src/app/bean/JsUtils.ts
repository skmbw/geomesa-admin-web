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

  static toQueryString(obj: any): string {
    let rs = '';
    for (const p in obj) {
      // for in statement must filtered with an if statement
      if (obj.hasOwnProperty(p)) {
        const v = obj[p];
        if (v !== undefined && v !== null) {
          rs += p + '=' + v + '&';
        }
      }
    }
    return rs.substring(0, rs.length - 1);
  }

  static getColumn(obj: any): string[] {
    const rs: string[] = [];
    for (const p in obj) {
      // for in statement must filtered with an if statement
      if (obj.hasOwnProperty(p)) {
        rs.push(p);
      }
    }
    return rs;
  }
}
