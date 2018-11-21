import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from '../service/storage.service';
import {Connection} from '../bean/Connection';
import {DatabaseService} from '../service/database.service';
import {Table} from '../bean/Table';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  tableList: string[] = [];
  dataSourceList: Connection[] = [];
  catalog = '';
  tableName = '';
  selected = 0;
  checked = false;

  constructor(private toastr: ToastrService, private storage: StorageService,
              private database: DatabaseService, private message: MessageService) {
  }

  ngOnInit() {
    const conns: Connection[] = this.storage.getConnectList();
    if (conns !== null && conns.length > 0) {
      this.dataSourceList = conns;
    } else {
      this.toastr.success('请连接数据库呀，亲！', '温馨提示');
    }
    // 订阅表名的变化
    this.message.getTable().subscribe(result => {
      // const t = new Table();
      // t.name = result;
      this.tableList.push(result);
    });
  }

  open(catalog: string) {
    this.catalog = catalog;
    this.tableName = ''; // 清空当前表，防止多个库混乱
    this.checked = false;
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
    // 表的数据可能会很多，如果保存在本地的话，可能会超过5M的限制，后端也是缓存查询一次也没有大的影响
    const table = new Table();
    table.catalog = catalog;
    this.database.post('table/list', table).subscribe(result => {
      if (result.code === 1) {
        this.tableList = result.data;
      } else if (result.code === 3) {
        if (this.storage.isConnect(this.catalog)) {
          this.toastr.success('Session已经失效，请关闭浏览器，重新打开。');
        } else {
          this.toastr.success(result.message);
        }
      } else {
        this.toastr.success(result.message);
      }
    });
  }

  radio(table: string) {
    this.tableName = table;
    this.checked = true;
  }
}
