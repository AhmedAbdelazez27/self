import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { faFacebookF, faInstagram, faSnapchatGhost, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectdropdownService } from "src/app/services/selectdropdown.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ForgertpasswordService } from "src/app/services/forgertpassword.service";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { callRtlStyle, removeRtlStyle } from 'src/app/globals';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ForgetpasswordmodalComponent } from 'src/app/components/forgetpasswordmodal/forgetpasswordmodal.component';
import { DialogService } from 'src/app/services/dialog.service';
import { SignInDialogComponentComponent } from '../sign-in-dialog-component/sign-in-dialog-component.component';
import { Dialog1Component } from '../dialog1/dialog1.component';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { Dialog3Component } from '../dialog3/dialog3.component';
import { portalRequestCreate } from 'src/app/models/portalRequestCreate';
import { PortalUserDto } from 'src/app/models/portalUserDto';
import { AddrequestService } from "src/app/services/addrequest.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private dropdownsService: SelectdropdownService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private forgetModal: MatDialog,
    private AddrequestService: AddrequestService,
    private forgertpasswordService: ForgertpasswordService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    @Inject(Window) private _window: Window
  ) { }
  // Slider
  customOptionsAr: OwlOptions;
  customOptionsEn: OwlOptions;
  slides1 = [
    { id: 1, icon: 'icon3.svg', text: 'اعانة مالية' },
    { id: 2, icon: 'icon1.svg', text: 'مساعدة طبية' },
    { id: 3, icon: 'icon2.svg', text: 'اعانة مدرسية' },
    { id: 4, icon: 'icon3.svg', text: 'مساعدة صيانة' },
  ]
  slides2 = [
    { id: 1, icon: 'icon1.svg', text: 'Financial benefit' },
    { id: 2, icon: 'icon2.svg', text: 'Medical assistance' },
    { id: 3, icon: 'icon3.svg', text: 'School benefit' },
    { id: 4, icon: 'icon3.svg', text: 'Fixing asseistance' },
  ]
  // =============
  icons = [
    // { id: 1, icon: faFacebookF, name: 'فيس بوك', link: 'https://www.facebook.com/Fujcharity' },
    // { id: 3, icon: faTwitter, name: 'تويتر', link: 'https://twitter.com/fujcharity' },
    // { id: 2, icon: faYoutube, name: 'يوتيوب', link: 'https://www.youtube.com/channel/UCdmGlG452PIUVrqp9t8ddAA' },
    // { id: 4, icon: faInstagram, name: 'انستقرام', link: 'https://www.instagram.com/fujcharity' }
  ];
  showRegister = false;
  registerForm: FormGroup;
  submittedRegister = false;
  loginForm: FormGroup;
  submittedLogin = false;
  userData = new PortalUserDto();
  addrequet = new portalRequestCreate();
  tenantId: any;
  filePath: string;

  get f() { return this.registerForm.controls; }
  get ff() { return (<FormGroup>this.registerForm.get('user')).controls }
  get l() { return this.loginForm.controls; }

  citiesList: any = [];
  genderList: any = [];
  maritalstatusList: any = [];
  nationalityList: any = [];

  loadingOverlay = false;

  emailAfterRegister = null;
  passAfterRegister = null;

  lang: string;
  toastrMsgs: any;

  ngOnInit() {
    this.tenantId = (localStorage.getItem("tenantId"));
    this.lang = localStorage.getItem('lang');
    this.sliderInit();
    this.dropdownsInit();
    this.getIconsName();
    this.getToastrMsgs();
    this.registerForm = this.formBuilder.group({
      birthDate: ['', Validators.required],
      genderLkpId: ['null', Validators.required],
      cityLkpId: ['null', Validators.required],
      region: ['', Validators.required],
      idNumber: ['', Validators.required],
      idExpirationDate: ['', Validators.required],
      maritalStatusLkpId: ['null', Validators.required],
      nationalityLkpId: ['null', Validators.required],
      mobileNumber1: ['', Validators.required],

      user: this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
      }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') }),
    }
    );

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userService.GetTenantDetailDtoPortal(this.tenantId).subscribe(data => {
      this.filePath = data.result.filepath;
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    document.getElementsByClassName('owl-dots')[0].className = 'owl-dots container text-md-left text-center';
    document.getElementsByClassName('owl-dots')[1].className = 'owl-dots container text-md-left text-center';
    document.getElementsByClassName('owl-dots')[2].className = 'owl-dots container text-md-left text-center';
    document.getElementsByClassName('owl-dots')[3].className = 'owl-dots container text-md-left text-center';
  }

  dropdownsInit() {
    // Cities Select Drop Down
    this.dropdownsService.GetCitiesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.citiesList = data;
      })

    // Gender Select Drop Down
    this.dropdownsService.GetGenderList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.genderList = data;
      })

    // MaritalStatus Select Drop Down
    this.dropdownsService.GetMaritalStatusList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.maritalstatusList = data;
      })

    // Nationality Select Drop Down
    this.dropdownsService.GetNationalityList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.nationalityList = data;
        console.log(data);

      })
  }

  sliderInit() {
    this.customOptionsAr = {
      rtl: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1,
        },
        660: {
          items: 1,
          stagePadding: 150
        },
        900: {
          items: 2,
          stagePadding: 100
        },
        1160: {
          items: 3,
          stagePadding: 70
        },
        1520: {
          items: 4,
          stagePadding: 70
        }
      },
      nav: false
    }

    this.customOptionsEn = {
      rtl: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1,
        },
        660: {
          items: 1,
          stagePadding: 150
        },
        900: {
          items: 2,
          stagePadding: 100
        },
        1160: {
          items: 3,
          stagePadding: 70
        },
        1520: {
          items: 4,
          stagePadding: 70
        }
      },
      nav: false
    }

  }

  getIconsName() {
    this.translate.get('Icons')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.icons[0].name = data.facebook;
        this.icons[1].name = data.snapchat;
        this.icons[2].name = data.twitter;
        this.icons[3].name = data.whatsup;
      })
  }

  getToastrMsgs() {
    this.translate.get('ToastrSuccess')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.toastrMsgs = data;
      })
  }

  changeLang(lang) {
    this.translate.use(lang)
    localStorage.setItem('lang', lang);
    this.lang = localStorage.getItem('lang');
    document.querySelector('html').lang = lang;
    if (lang == 'ar') {
      callRtlStyle();
    } else {
      removeRtlStyle();
    }
    this.getIconsName();
    this.dropdownsInit();
    this.getToastrMsgs();
  }

  onSubmitRegister() {

    this.submittedRegister = true;
    // stop here if form is invalid
    if (this.registerForm.invalid || (<FormGroup>this.registerForm.get('user')).invalid) {
      return;
    } else {
      this.loadingOverlay = true;
      let submittingForm = this.registerForm.value;
      submittingForm.birthDate = this.datePipe.transform(submittingForm.birthDate, "dd/MM/yyyy")
      submittingForm.idExpirationDate = this.datePipe.transform(submittingForm.idExpirationDate, "dd/MM/yyyy")

      submittingForm.registrationDate = this.datePipe.transform(Date.now(), "dd/MM/yyyy");

      submittingForm.user.isActive = true;
      submittingForm.name = submittingForm.user.name + ' ' + submittingForm.user.surname;
      let tenancyName = this._window.location.hostname.split(".")[0];
      this.userService.addUser(submittingForm)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data);
          this.toastr.success(this.toastrMsgs.newAccount);
          let dialogConfig = new MatDialogConfig();
          dialogConfig.position = {
            top: '0'
          };
          this.dialog.open(SignInDialogComponentComponent, dialogConfig);
          this.auth.GetTokenFromServer(submittingForm.user.userName, submittingForm.user.password, tenancyName)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.auth.SetTokenToSessionStorage(data.result.accessToken)
              this.router.navigate(['board/main']);
            })
          this.loadingOverlay = false;
        }, error => {
          console.log(error);
          this.toastr.error(error.error.error.message);
          this.loadingOverlay = false;
        })
    }
  }

  onSubmitLogin() {
    this.submittedLogin = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loadingOverlay = true;
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;
      let tenancyName = this._window.location.hostname.split(".")[0];
      this.auth.GetTokenFromServer(email, password, tenancyName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
       
          console.log(data.result);

          if (data.result.status != 401) {
            localStorage.setItem('user_id', data.result.userId.toString());
            localStorage.setItem('username', data.result.userName);
            localStorage.setItem('tenantId', data.result.tenantId.toString());
            this.toastr.success(this.toastrMsgs.login);



            this.loadingOverlay = false;
            this.auth.SetTokenToSessionStorage(data.result.accessToken);
            this.auth.SetTenantIdToSessionStorage(data.result.tenantId);
            this.router.navigate(['board/main']);
          }
          else {
            this.toastr.error(data.result.message);
          }

        }, error => {
          console.log(error.error.error);
          this.toastr.error(error.error.error.details);
          this.loadingOverlay = false;
        })
    }
  }

  sendForgetPasswordEmail(email: string) {

    if (!email || email.trim() === '') {
      this.toastr.error("Please Enter the Email Address");
      return;
    }

    this.loadingOverlay = true;
    let tenancyName = this._window.location.hostname.split(".")[0];

    if (!tenancyName) {
      this.toastr.error('TenancyName not found');
      this.loadingOverlay = false;
      return;
    }
    //tenancyName = "Propertyuae";
    this.forgertpasswordService.sendEmail(email, tenancyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          if (response.status == 200) {
            this.toastr.success(this.toastrMsgs.checksEmail);
          } else {
            this.toastr.error(response.message);
          }
          this.loadingOverlay = false;
        },
        error => {
          console.error("Error sending email", error);
          this.toastr.error(this.toastrMsgs.invalidEmail);
          this.loadingOverlay = false;
        }
      );

    error => {
      console.error("Error retrieving tenant information", error);
      this.toastr.error('Failed to retrieve tenant information');
      this.loadingOverlay = false;
    }

  }


  resetRegisterForm() {
    this.submittedRegister = false;
    this.registerForm.reset();
  }

  resetLoginForm() {
    this.submittedLogin = false;
    this.loginForm.reset();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isLargeScreen()
  }

  @HostListener('wheel', ['$event'])
  handleWheelEvent(event) {
    if (this.loadingOverlay) {
      event.preventDefault();
    }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value || !passwordInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  isLargeScreen() {
    if (window.innerWidth > 767) {
      return true;
    } else {
      return false;
    }
  }

  goToLogin() {
    let el = document.getElementById('login');
    el.scrollIntoView({ behavior: 'smooth' });
  }

  goToBoard() {
    this.router.navigate(['board']);
  }

  showRegisterForm() {
    this.showRegister = true;
    this.resetRegisterForm();
    this.resetLoginForm();
  }

  showLoginForm() {
    this.showRegister = false;
    this.resetRegisterForm();
    this.resetLoginForm();
  }

  showForgetPassword() {
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth = "450px";
    this.forgetModal.open(ForgetpasswordmodalComponent, matDialog)
      .afterClosed().subscribe(res => {
        if (res === null) {
          //this.toastr.error("Email is Empty");
        } else {
          this.sendForgetPasswordEmail(res);
        }
      });
  }


  opendialog1() {
    let dialogConfig1 = new MatDialogConfig();
    dialogConfig1.position = {
      bottom: '170px'
    };
    this.dialog.open(Dialog1Component, dialogConfig1)
  }
  opendialog2() {
    let dialogConfig2 = new MatDialogConfig();
    dialogConfig2.position = {
      bottom: '170px'
    };
    this.dialog.open(Dialog2Component, dialogConfig2)
  }
  opendialog3() {
    let dialogConfig3 = new MatDialogConfig();
    dialogConfig3.position = {
      bottom: '170px'
    };
    this.dialog.open(Dialog3Component, dialogConfig3)
  }




}
