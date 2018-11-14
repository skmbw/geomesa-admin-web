import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Connection} from '../bean/Connection';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  connection: Connection = new Connection();

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  public submit() {
  }
}
