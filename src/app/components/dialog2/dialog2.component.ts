import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private dialogRef:MatDialogRef<Dialog2Component>,
  ) { }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
