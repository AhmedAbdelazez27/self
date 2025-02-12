import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-forgetpasswordmodal',
  templateUrl: './forgetpasswordmodal.component.html',
  styleUrls: ['./forgetpasswordmodal.component.css']
})
export class ForgetpasswordmodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private forgetModal:MatDialogRef<ForgetpasswordmodalComponent>,
  ) { }

  email:string;

  ngOnInit() {
  }

  close(){
    this.forgetModal.close(null);
  }

  send(){
    this.forgetModal.close(this.email);
  }

}
