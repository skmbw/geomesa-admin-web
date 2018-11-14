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

  saveConn(conn: Connection, persist: boolean) {
    let conns = this.getConn();
    if (conns !== null) {
      conns = conns.concat(conn);
    }
    const value = JSON.stringify(conns);
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

  removeConn() {
    window.sessionStorage.removeItem(CONN_INFO);
    window.localStorage.removeItem(CONN_INFO);
  }
}
