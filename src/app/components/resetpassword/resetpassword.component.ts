import { Component, OnInit } from '@angular/core';
import { ForgertpasswordService } from "src/app/services/forgertpassword.service";
import { ForgetPasswordDto } from 'src/app/models/ForgetPasswordDto';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public translate: TranslateService,
    private toastr: ToastrService,
    private forgertpasswordService:ForgertpasswordService
  ) { }

  loadingOverlay=false;
  password:string;
  confirmPassword:string;
  lang:string;
  toastrMsgs:any;
  body = new ForgetPasswordDto();

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      
      this.body.email = params.Email;
      this.body.resetToken = params.ResetToken;
    })
    this.lang = localStorage.getItem('lang');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  onSubmitLogin() {
    // stop here if form is invalid
    if (!this.password || !this.confirmPassword || this.password != this.confirmPassword) {
      return;
    }else{
      this.loadingOverlay = true;
      this.body.newPassword = this.password;
      console.log(this.body);
      this.forgertpasswordService.resetPassword(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        console.log(data.result);
        this.toastr.success(this.toastrMsgs.pleaseLogin);
        this.loadingOverlay = false;
        this.router.navigate(['home']);
      },error=>{
        console.log(error.error.error);
        this.toastr.error(error.error.error.message);
        this.loadingOverlay = false; 
      })
    }
  }


}
