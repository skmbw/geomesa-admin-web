import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {ConfirmComponent} from '../confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  confirm(content: string, title?: string): Observable<any> {
    return this.dialog.open(ConfirmComponent, {
      width: '480px',
      height: '320px',
      data: {'content': content, 'title': title}
    }).afterClosed();
  }
}
