import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL_TIANXUN = 'http://localhost:8243/tianxun/';
  static URL = 'http://localhost:8775/';
  static IMAGE_HOST = 'http://10.0.30.233:8300/';
  static IMAGE_URL = '10.0.30.233:8300/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
  };
  static FORM = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  };

  static FORM_JSON = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),
    responseType: 'json'
  };
}
