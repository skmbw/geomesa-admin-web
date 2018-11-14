import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  panelOpenState = false;
  messages = [{'from': 'newgdelt2', 'subject': '表名'}, {'from': 'newgdelt3', 'subject': '真的'}]
  dataSourceList = [{'catalog': 'gdelt2', 'master': 'server1:60000'}, {'catalog': 'gdelt', 'master': 'server1:60000'}];
  constructor() {
  }

  ngOnInit() {
  }

}
