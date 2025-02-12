import { Component, OnInit } from '@angular/core';
import { ChangepasswordService } from 'src/app/services/changepassword.service';
import { ChangePasswordDto } from 'src/app/models/changePasswordDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private changepasswordService: ChangepasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  changePassword = new ChangePasswordDto();
  loadingOverlay = false;
  currentPasswordError = false;
  newPasswordError = false;
  toastrMsgs: any;
  username: any;
  ngOnInit() {
    this.getToastrMsgs();
    this.username = localStorage.getItem('username');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  validate() {
    if (!this.changePassword.currentPassword) {
      this.currentPasswordError = true;
    } else {
      this.currentPasswordError = false;
    }
    if (!this.changePassword.newPassword) {
      this.newPasswordError = true;
    } else {
      this.newPasswordError = false;
    }
    if (this.currentPasswordError == true || this.newPasswordError == true) {
      return false;
    } else {
      return true;
    }
  }

  focused(event) {
    if (event.target.previousSibling.classList.contains('label-over')) {
      return false;
    } else {
      event.target.previousSibling.classList.add('label-over');
    }
  }

  blured(event, value) {
    if (
      event.target.previousSibling.classList.contains('label-over') &&
      !value
    ) {
      event.target.previousSibling.classList.remove('label-over');
    } else {
      return false;
    }
  }

  getToastrMsgs() {
    this.translate
      .get('ToastrSuccess')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.toastrMsgs = data;
      });
  }

  submit() {
    if (
      this.changePassword.newPassword == this.changePassword.confirmNewPassword
    ) {
      if (this.validate()) {
        this.loadingOverlay = true;
        this.changePassword.userName = this.username;
        this.changepasswordService
          .ChangePassword(this.changePassword)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              console.log(data);
              this.toastr.success(this.toastrMsgs.editPassword);
              this.loadingOverlay = false;
              this.changePassword = new ChangePasswordDto();
            },
            (error) => {
              console.log(error);
              this.loadingOverlay = false;
              this.toastr.error(error.error.error.message);
            }
          );
      }
    } else if (
      this.changePassword.newPassword != this.changePassword.confirmNewPassword
    ) {
      this.toastr.warning('الرجاء التحقق من تأكيد كلمة السر الجديدة');
    }
  }
}
