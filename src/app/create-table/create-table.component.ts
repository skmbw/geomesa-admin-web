import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../bean/Table';
import {JsUtils} from '../bean/JsUtils';
import {ToastrService} from 'ngx-toastr';
import {DatabaseService} from '../service/database.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  @Input() catalog = '';
  table: Table = new Table();

  constructor(private toastr: ToastrService, private database: DatabaseService,
              private message: MessageService) {
  }

  ngOnInit() {
  }

  create() {
    if (JsUtils.isBlank(this.catalog)) {
      this.toastr.success('请选择数据库。');
      return;
    }
    if (JsUtils.isBlank(this.table.name)) {
      this.toastr.success('新建数据表的名字不能为空。');
      return;
    }
    if (JsUtils.isBlank(this.table.ecql)) {
      this.toastr.success('ECQL语句不能为空。');
      return;
    }
    // this.message.sendTable(this.table.name);
    this.table.catalog = this.catalog;
    // this.table = new Table(); // reset
    this.database.post('dataSource/create', this.table).subscribe(result => {
      if (result.code === 1) {
        this.toastr.success('新建表[' + this.table.name + ']成功。');
        const tableName = this.table.name; // 引用传递
        this.message.sendTable(tableName);
        this.table = new Table(); // reset
      } else {
        this.toastr.success(result.message);
      }
    });
  }
}
