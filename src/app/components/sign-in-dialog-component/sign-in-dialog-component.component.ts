import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { portalRequestCreate } from 'src/app/models/portalRequestCreate';


@Component({
  selector: 'app-sign-in-dialog-component',
  templateUrl: './sign-in-dialog-component.component.html',
  styleUrls: ['./sign-in-dialog-component.component.css']
})
export class SignInDialogComponentComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private dialogRef:MatDialogRef<SignInDialogComponentComponent>,
  ) { }
  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
