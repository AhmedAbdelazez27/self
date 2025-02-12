import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-requestmodal',
  templateUrl: './requestmodal.component.html',
  styleUrls: ['./requestmodal.component.css']
})
export class RequestmodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private requestModal:MatDialogRef<RequestmodalComponent>,
  ) { }

  ngOnInit() {
  }

  close(){
    this.requestModal.close(null);
  }

}
