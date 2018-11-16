import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Query} from '../bean/Query';
import {DatabaseService} from '../service/database.service';
import {JsUtils} from '../bean/JsUtils';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  @Input() catalog = '';
  @Input() tableName = '';
  query: Query = new Query();
  tableList = [{'name': 'newgdelt2', 'catalog': 'gdelt2'}, {'name': 'newgdelt3', 'catalog': 'gdelt2'}];

  constructor(private toastr: ToastrService, private database: DatabaseService) {
  }

  ngOnInit() {
  }

  submit() {
    if (JsUtils.isBlank(this.catalog)) {
      this.toastr.success('请选择数据库');
      return;
    }
    if (JsUtils.isBlank(this.tableName)) {
      this.toastr.success('请选择要查询的表');
      return;
    }
    if (JsUtils.isBlank(this.query.ecql)) {
      this.toastr.success('ECQL语句不能为空');
      return;
    }
    this.query.catalog = this.catalog;
    this.query.tableName = this.tableName;
    // this.database.post('table/query', this.query).subscribe(result => {});
  }

  // catalogChange($event) {
  //   // this.toastr.success($event);
  //   if ($event === 'gdelt') {
  //     this.tableList.push({'catalog': 'mysql', 'name': 'user'});
  //   } else {
  //     this.tableList.push({'catalog': 'oracle', 'name': 'roles'});
  //   }
  // }
}
