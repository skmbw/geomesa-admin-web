import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../bean/Table';
import {JsUtils} from '../bean/JsUtils';
import {ToastrService} from 'ngx-toastr';
import {DatabaseService} from '../service/database.service';
import {MessageService} from '../service/message.service';
import {catchError, startWith} from 'rxjs/internal/operators';
import {of} from 'rxjs';
import {JsonBean} from '../bean/JsonBean';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  @Input() catalog = '';
  @Input() master = '';
  disabled = false;
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
    this.table.master = this.master;
    this.database.post('dataSource/create', this.table).pipe(
      startWith(() => {
        this.disabled = true;
      }),
      catchError(() => {
        this.disabled = false;
        const bean = new JsonBean();
        bean.code = -2;
        bean.message = 'Http请求异常。';
        return of(bean);
      })
    ).subscribe(result => {
      if (result.code === 1) {
        this.toastr.success('新建表[' + this.table.name + ']成功。');
        const tableName = this.table.name; // 引用传递
        this.message.sendTable(tableName);
        this.table = new Table(); // reset
      } else {
        this.toastr.success(result.message);
      }
      this.disabled = false;
    });
  }
}
