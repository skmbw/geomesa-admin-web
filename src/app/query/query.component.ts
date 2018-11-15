import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Query} from '../bean/Query';
import {DatabaseService} from '../service/database.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  catalog = '22';
  tableName = '11';
  query: Query = new Query();
  tableList = [{'name': 'newgdelt2', 'catalog': 'gdelt2'}, {'name': 'newgdelt3', 'catalog': 'gdelt2'}];

  constructor(private toastr: ToastrService, private database: DatabaseService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.query.catalog === undefined) {
      this.toastr.success('请选择数据库');
      return;
    }
    if (this.query.tableName === undefined) {
      this.toastr.success('请选择要查询的表');
      return;
    }
    if (this.query.ecql === undefined || this.query.ecql.trim() === '') {
      this.toastr.success('ECQL语句不能为空');
      return;
    }
    // this.database.post('table/query', this.query).subscribe(result => {});
  }

  catalogChange($event) {
    // this.toastr.success($event);
    if ($event === 'gdelt') {
      this.tableList.push({'catalog': 'mysql', 'name': 'user'});
    } else {
      this.tableList.push({'catalog': 'oracle', 'name': 'roles'});
    }
  }
}
