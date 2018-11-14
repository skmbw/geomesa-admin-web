import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../service/storage.service';
import {Connection} from '../bean/Connection';
import {DatabaseService} from '../service/database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  messages = [{'from': 'newgdelt2', 'subject': '表名'}, {'from': 'newgdelt3', 'subject': '真的'}];
  dataSourceList = [{'catalog': 'gdelt2', 'master': 'server1:60000'}, {'catalog': 'gdelt', 'master': 'server1:60000'}];

  constructor(private toastr: ToastrService, private storage: StorageService,
              private database: DatabaseService) {
  }

  ngOnInit() {
    const conns: Connection[] = this.storage.getConn();
    if (conns !== undefined && conns.length > 0) {
    }
  }

}
