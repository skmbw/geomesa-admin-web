import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geomesa-admin-web';
  userName: string;
  userId: string;
  keyword: string;

  search() {
  }
}
