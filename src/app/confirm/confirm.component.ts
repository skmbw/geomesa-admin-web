import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  config: any = {};

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
    if (this.config === undefined || this.config === null || this.config.content === undefined
      || this.config.content === null || this.config.content.trim() === '') {
      this.dialogRef.close(false);
      alert('确认信息[content]不能为空！');
    }
    if (this.config.title === undefined) {
      this.config.title = '温馨提示';
    }
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
