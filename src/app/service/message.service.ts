import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor() {
  }

  sendTable(name: string) {
    this.subject.next(name);
  }

  getTable(): Observable<any> {
    return this.subject.asObservable();
  }
}
