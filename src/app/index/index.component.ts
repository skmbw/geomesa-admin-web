import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Connection} from '../bean/Connection';
import {StorageService} from '../service/storage.service';
import {Router} from '@angular/router';
import {JsUtils} from '../bean/JsUtils';
import {DatabaseService} from '../service/database.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  connection: Connection = new Connection();

  constructor(private toastr: ToastrService, private storage: StorageService,
              private router: Router, private database: DatabaseService) {
  }

  ngOnInit() {
  }

  public submit() {
    if (JsUtils.isBlank(this.connection.master)) {
      this.toastr.success('HBase master（HBase master 地址）不能为空！');
      return;
    }

    if (JsUtils.isBlank(this.connection.quorum)) {
      this.toastr.success('HBase zookeeper quorum（HBase zk 集群地址）不能为空！');
      return;
    }

    if (JsUtils.isBlank(this.connection.catalog)) {
      this.toastr.success('Database catalog（数据库名）不能为空！');
      return;
    }

    if (this.connection.port === null) {
      this.toastr.success('Zookeeper port（zk端口，默认2181）不能为空！');
      return;
    }

    let remember = false;
    if (this.connection.remember === true) {
      remember = true;
    }
    this.storage.saveConnect(this.connection, remember);
    this.database.post('dataSource/init', this.connection).subscribe(result => {
      if (result.code === 1) {
        this.router.navigateByUrl('/database').catch();
      } else {
        this.toastr.success(result.message);
      }
    });
  }
}
