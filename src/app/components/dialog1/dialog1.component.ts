import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private dialogRef:MatDialogRef<Dialog1Component>,
  ) { }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
