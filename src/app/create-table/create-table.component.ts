import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../bean/Table';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  @Input() catalog = '';
  table: Table = new Table();

  constructor() {
  }

  ngOnInit() {
  }

}
