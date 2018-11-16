import { Component, OnInit } from '@angular/core';
import {StorageService} from '../service/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {
    this.storage.removeConn();
    this.router.navigateByUrl('/index').catch();
  }

}
