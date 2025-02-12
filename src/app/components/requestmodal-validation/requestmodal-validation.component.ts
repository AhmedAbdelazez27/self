import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-requestmodal-validation',
  templateUrl: './requestmodal-validation.component.html',
  styleUrls: ['./requestmodal-validation.component.css']
})
export class RequestmodalValidationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
  private requestModalvalid:MatDialogRef<RequestmodalValidationComponent>,) { }

  ngOnInit() {
  }
  close(){
    this.requestModalvalid.close(null);
  }
}
