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
    const conns: Connection[] = this.storage.getConnectList();
    if (conns !== null && conns.length > 0) {
      this.dataSourceList = conns;
    } else {
      this.toastr.success('请连接数据库呀，亲！', '温馨提示');
    }
  }

  open(catalog: string) {
    this.catalog = catalog;
    this.tableName = ''; // 清空当前表，防止多个库混乱
    // 连接后端数据库
    if (!this.storage.isConnect(this.catalog)) { // 是否已经连接
      const connect = this.storage.getConnect(catalog);
      if (connect === null || connect === undefined) {
        this.toastr.success('本地数据库连接信息已失效，请登出，重新连接数据库。');
        return;
      }
      this.database.post('dataSource/init', connect).subscribe(result => {
        if (result.code === 1) {
          this.storage.connect(this.catalog); // 设置标志，已经连接
        } else {
          this.toastr.success(result.message);
        }
      });
    }
  }

  radio(table: string) {
    this.tableName = table;
  }
}
