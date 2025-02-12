import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog3',
  templateUrl: './dialog3.component.html',
  styleUrls: ['./dialog3.component.css']
})
export class Dialog3Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private dialogRef:MatDialogRef<Dialog3Component>,
  ) { }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
