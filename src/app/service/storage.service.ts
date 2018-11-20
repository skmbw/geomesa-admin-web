import {Injectable} from '@angular/core';
import {Connection} from '../bean/Connection';

const TOKEN_ID = 'sess_token_id';
const USER_ID = 'sess_user_id';
const CONN_INFO = 'sess_conn_info';
const IS_CONNECT = 'sess_is_connect_';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  saveConnect(conn: Connection, persist: boolean) {
    let conns = this.getConnectList();
    if (conns !== null) {
      conns = conns.concat(conn);
    } else {
      conns = [conn];
    }
    const value = JSON.stringify(conns);
    if (persist) {
      window.localStorage.setItem(CONN_INFO, value);
    } else {
      window.sessionStorage.setItem(CONN_INFO, value);
    }
  }

  getConnectList(): Connection[] {
    let value = window.localStorage.getItem(CONN_INFO);
    if (value) {
      return JSON.parse(value);
    } else {
      value = window.sessionStorage.getItem(CONN_INFO);
    }
    return JSON.parse(value);
  }

  removeConnect() {
    window.sessionStorage.removeItem(CONN_INFO);
    window.localStorage.removeItem(CONN_INFO);
  }

  connect(catalog: string) {
    window.sessionStorage.setItem(IS_CONNECT + catalog, '1');
  }

  isConnect(catalog: string): boolean {
    const value = window.sessionStorage.getItem(IS_CONNECT + catalog);
    if (value !== null && value !== undefined && value === '1') {
      return true;
    }
    return false;
  }

  getConnect(catalog: string): Connection {
    const conns = this.getConnectList();
    if (conns !== null) {
      for (const cn of conns) {
        if (cn.catalog === catalog) {
          return cn;
        }
      }
    }
    return null;
  }
}
