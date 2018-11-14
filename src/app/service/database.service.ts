import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consts} from '../bean/consts';
import {JsonBean} from '../bean/JsonBean';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<JsonBean> {
    return this.http.get(Consts.URL + url, Consts.FORM).pipe();
  }

  post(url: string, body: any | null): Observable<JsonBean> {
    return this.http.post(Consts.URL + url, body, Consts.JSON).pipe();
  }
}
