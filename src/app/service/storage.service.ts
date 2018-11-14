import {Injectable} from '@angular/core';
import {Connection} from '../bean/Connection';

const TOKEN_ID = 'sess_token_id';
const USER_ID = 'sess_user_id';
const CONN_INFO = 'sess_conn_info';
const USER_NAME = 'sess_user_name';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  saveConn(conn: Connection[], persist: boolean) {
    const value = JSON.stringify(conn);
    if (persist) {
      window.localStorage.setItem(CONN_INFO, value);
    } else {
      window.sessionStorage.setItem(CONN_INFO, value);
    }
  }

  getConn(): Connection[] {
    let value = window.localStorage.getItem(CONN_INFO);
    if (value) {
      return JSON.parse(value);
    } else {
      value = window.sessionStorage.getItem(CONN_INFO);
    }
    return JSON.parse(value);
  }
}
