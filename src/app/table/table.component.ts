import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DatabaseService} from '../service/database.service';
import {JsonBean} from '../bean/JsonBean';
import {Table} from '../bean/Table';
import {JsUtils} from '../bean/JsUtils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  jsonBean: JsonBean = new JsonBean();
  descList: string[] = [];
  @Input() catalog = '';
  @Input() tableName = '';

  constructor(private toastr: ToastrService, private database: DatabaseService) {
  }

  ngOnInit() {
  }

  desc() {
    if (JsUtils.isBlank(this.catalog)) {
      this.toastr.success('请选择数据库。');
      return;
    }
    if (JsUtils.isBlank(this.tableName)) {
      this.toastr.success('请选择数据表。');
      return;
    }
    const table = new Table();
    table.catalog = this.catalog;
    table.name = this.tableName;
    this.database.post('dataSource/desc', table).subscribe(result => {
      if (result.code === 1) {
        this.jsonBean = result;
        this.descList = result.data;
      }
    });
  }

}
