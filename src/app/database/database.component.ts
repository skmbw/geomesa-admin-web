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
  tableList = [{'from': 'newgdelt2', 'subject': '表名'}, {'from': 'newgdelt3', 'subject': '真的'}];
  dataSourceList: Connection[] = [];
  catalog = '';
  tableName = '';
  selected = 0;

  constructor(private toastr: ToastrService, private storage: StorageService,
              private database: DatabaseService) {
  }

  ngOnInit() {
    const conns: Connection[] = this.storage.getConn();
    if (conns !== null && conns.length > 0) {
      this.dataSourceList = conns;
    } else {
      this.toastr.success('请连接数据库呀，亲！', '温馨提示');
    }
  }

  open(catalog: string) {
    this.catalog = catalog;
    this.tableName = ''; // 清空当前表，防止多个库混乱
    // this.toastr.success(catalog);
  }

  radio(table: string) {
    this.tableName = table;
    // this.toastr.success(table);
  }
}
