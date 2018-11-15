import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Query} from '../bean/Query';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  catalog = '22';
  tableName = '11';
  query: Query = new Query();

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  submit() {
    this.toastr.success(this.catalog);
  }
}
