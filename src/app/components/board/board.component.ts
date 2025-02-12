import { Component, OnInit, HostListener, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faChartBar, faFileUpload, faAddressCard, faLock, faStickyNote, faFile, faMoneyBill, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/services/auth.service";
import { BoardService } from "src/app/services/board.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, NavigationEnd } from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig, MatMenuTrigger } from '@angular/material';
import { HrPersonVacationsDto } from 'src/app/models/HrPersonVacationsDto';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { HrPersonsDto } from 'src/app/models/HrPersonsDto';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { UserService } from 'src/app/services/user.service';
import { NotificationDto } from 'src/app/models/NotificationDto';
import { formatDistanceToNow } from 'date-fns';
import { callRtlStyle, removeRtlStyle } from 'src/app/globals';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Console } from 'console';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('show', style({ height: '*', opacity: 1 })),
      state('hide', style({ height: '0px', opacity: 0 })),
      transition('show <=> hide', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})



export class BoardComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: false }) menuTrigger!: MatMenuTrigger;

  destroy$: Subject<boolean> = new Subject<boolean>();
  sliderRtl = true;
  showAll = false;
  constructor(
    private router: Router,
    private auth: AuthService,
    private BoardService: BoardService,
    private dropdownsService: SelectdropdownService,
    public translate: TranslateService,
    private dialog: MatDialog,
    private ProfileService: ProfileService,
    private MainpageService: MainpageService,
    private UsersAppService: UserService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects == '/board/main') {
        // this.getCounts();
      }
    });
  }
  links = [
    { text: 'الصفحة الرئيسية', icon: faChartBar, routerLink: 'main', routerLinkActive: 'active' },
    // {text:'تقديم طلب', icon:faFileUpload, routerLink:'addrequest', routerLinkActive:'active'},
    { text: 'الملف الشخصي', icon: faAddressCard, routerLink: 'profile', routerLinkActive: 'active' },
    { text: 'الاجازات', icon: faCalendar, routerLink: 'HrVacationsTypes', routerLinkActive: 'active' },
    { text: 'الطلبات المستندات', icon: faFile, routerLink: 'HrDocumentRequests', routerLinkActive: 'active' },
    { text: 'تأكيد طلب الشخص', icon: faFileUpload, routerLink: 'VacationRequests', routerLinkActive: 'active' },
    { text: 'الرواتب', icon: faMoneyBill, routerLink: 'HrPyPayrollOperations', routerLinkActive: 'active' },

    { text: 'طلبات الاجازات', icon: faMoneyBill, routerLink: 'LeavesRequest', routerLinkActive: 'active' },

    // {text:'الموافقة على طلبات المستندات', icon:faFile, routerLink:'HrDocumentRequestApprove', routerLinkActive:'active'},
    //  {text:'خروج الموظف ', icon:faFile, routerLink:'HrEmployeeResignation', routerLinkActive:'active'},
    //  {text:'الموافقة على خروج الموظف', icon:faFile, routerLink:'HrEmployeeResignationApprove', routerLinkActive:'active'},
    // {text:'تغيير كلمة المرور', icon:faLock, routerLink:'password', routerLinkActive:'active'},
  ];

  customOptions: OwlOptions;

  // cards=[
  //   {id:1,icon:'plus.svg', backgroundClass:'blue-bg', numberColor:'blue-color', text:'الطلبات', text2:'الاجمالي', number:0},
  //   {id:2,icon:'check.svg', backgroundClass:'green-bg', numberColor:'green-color', text:'طلبات', text2:'مقبولة', number:0},
  //   {id:3,icon:'clock.svg', backgroundClass:'yellow-bg', numberColor:'yellow-color', text:'طلبات', text2:'مؤقتة', number:0},
  //   {id:4,icon:'false.svg', backgroundClass:'red-bg', numberColor:'red-color', text:'طلبات', text2:'مرفوضة', number:0},
  // ];
  smallScreen = false;


  // =============
  icons = [
    // { id: 1, icon: faFacebookF, name: 'فيس بوك', link: 'https://www.facebook.com/Fujcharity' },
    // { id: 3, icon: faTwitter, name: 'تويتر', link: 'https://twitter.com/fujcharity' },
    // { id: 2, icon: faYoutube, name: 'يوتيوب', link: 'https://www.youtube.com/channel/UCdmGlG452PIUVrqp9t8ddAA' },
    // { id: 4, icon: faInstagram, name: 'انستقرام', link: 'https://www.instagram.com/fujcharity' }
  ];


  citiesList: any = [];
  genderList: any = [];
  maritalstatusList: any = [];
  nationalityList: any = [];

  lang: string;
  toastrMsgs: any;
  strid: any;
  NotificationList: any[];
  NotificationLink: string;
  NotificationMessage: string;
  NotificationDto = new NotificationDto()
  NotificationCount: number;
  tenantId: any;
  creationTime: string;
  timeAgoMessage: string = '';
  filePath: string;
  personPhoto: string;
  userData: any;
  ngOnInit() {

    this.lang = localStorage.getItem('lang');
    this.dropdownsInit();
    this.getIconsName();
    this.getToastrMsgs();
    this.strid = localStorage.getItem('user_id');
    this.tenantId = (localStorage.getItem("tenantId"));

    this.ProfileService.GetProfileData(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
         this.userData = data.result;
        this.personPhoto = data.result.personPhoto;
       });


    this.UsersAppService.GetNewNotificationsPortal(this.tenantId, this.strid,).subscribe
      (data => {
        this.NotificationCount = data.result;
       
      })
    this.loadNotifications();

    if (localStorage.getItem('lang') != 'ar') {
      this.sliderRtl = false;
    }
    // Slider
    this.customOptions = {
      rtl: this.sliderRtl,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1
        },
        445: {
          items: 2
        },
        665: {
          items: 3
        },
        930: {
          items: 4
        }
      },
      nav: false
    }

    this.isSmallScreen();
    // this.getCounts();
    this.getSidebarLinks();
    // this.getCountsLabels();
    this.BoardService.getNotificate()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // this.getCounts();
      })

    this.UsersAppService.GetTenantDetailDtoPortal(this.tenantId).subscribe(data => {
      this.filePath = data.result.filepath;
     
      console.log(data)
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
     this.destroy$.unsubscribe();
  }

  

  getSidebarLinks() {
    this.translate.get('Board.Sidebar')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.links[0].text = data.home;
        // this.links[1].text = data.addRequest;
        this.links[1].text = data.profile;
        this.links[2].text = data.HrVacationsTypes;
        this.links[3].text = data.HrDocumentRequests;
        this.links[4].text = data.Requests;
        this.links[5].text = data.HrPyPayrollOperations;
        this.links[6].text = data.LeavesRequest;
        //  this.links[6].text = data.HrDocumentRequestApprove;
        // this.links[7].text = data.HrEmployeeResignation;
        // this.links[8].text = data.HrEmployeeResignationApprove;
        // this.links[9].text = data.changePassword;

      })
  }

  // getCountsLabels(){
  //   this.translate.get('Board.Counts')
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe(data=>{      
  //     this.cards.map(x=>{
  //       x.text = data.requests;
  //     })
  //     this.cards[0].text2 = data.total;
  //     this.cards[1].text2 = data.accepted;
  //     this.cards[2].text2 = data.temporary;
  //     this.cards[3].text2 = data.rejected;
  //   })
  // }

  @HostListener('window:resize', [])
  onResize() {
    this.isSmallScreen()
  }
  isSmallScreen() {
    if (window.innerWidth < 840) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  Logout() {
    this.auth.Logout();
    this.router.navigate(['home']);
  }
  performSearch(event: any) {
    const query = event.target.value;

  }
  showLogout: boolean = false;

  toggleLogout() {
    this.showLogout = !this.showLogout;
  }
  changePassword() {
    this.router.navigate(['board/password']);
  }

  SetNotificationState(tenantId: number, notficationId: string, state: number) {
    this.NotificationDto.tenantId = tenantId;
    this.NotificationDto.notificationId = notficationId;
    this.NotificationDto.state = state;
    this.UsersAppService.ChangeNotificationStatePortal(this.NotificationDto).subscribe(data => {
    
    })
  }

  loadNotifications(): void {
    this.UsersAppService.NotificationsListPortal(this.tenantId, this.strid).subscribe(
      data => {
        this.NotificationList = data.result.map(notification => {
          const creationTime = notification.notification.creationTime;
          const timeAgoMessage = this.calculateTimeAgo(creationTime);
          return { ...notification, timeAgoMessage };
        });
        console.log("Notifications List:", this.NotificationList);
      },
      error => {
        console.error("Error fetching notifications:", error);
      }
    );
  }


  toggleShowAll(event: Event): void {
    event.preventDefault();
    this.showAll = !this.showAll;

    // setTimeout(() => {
    //   this.menuTrigger.openMenu();
    // });
    setTimeout(() => {
      this.menuTrigger.openMenu();
    }, 0);

  }


  // navigateToLink(link: string): void {
  //   if (link.includes('HrDocumentRequests')) {
  //     this.router.navigate(['board/VacationRequests']);
  //   } else if (link.includes('HrPersonVacations')) {
  //     this.router.navigate(['board/VacationRequests']);
  //   } else {
  //     window.open(link, '_blank');
  //   }
  // }

  navigateToLink(link: string): void {
    if (this.userData.hrPersonSupervisorId !== null) {
      if (link.includes('HrDocumentRequests')) {
        this.router.navigate(['board/HrDocumentRequests']).then(() => location.reload());
      } else if (link.includes('HrPersonVacations')) {
        this.router.navigate(['board/HrVacationsTypes']).then(() => location.reload());
      } else {
        window.open(link, '_blank');
      }
    } else {
      if (link.includes('HrDocumentRequests') || link.includes('HrPersonVacations')) {
        this.router.navigate(['board/VacationRequests']).then(() => location.reload());
      } else {
        window.open(link, '_blank');
      }
    }
  }
  
  handleNotificationClick(item: any): void {
    this.navigateToLink(item.notification.data.properties.link);
    this.SetNotificationState(item.tenantId, item.id, 1);
  }

  calculateTimeAgo(creationTime: string): string {
    if (!creationTime) return '';

    const creationDate = new Date(creationTime);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    };

    const formattedDate = creationDate.toLocaleDateString('en-US', options);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const formattedTime = creationDate.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} at ${formattedTime}`;
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
  getToastrMsgs() {
    this.translate.get('ToastrSuccess')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.toastrMsgs = data;
      })
  }

  changeLang(lang) {
    this.translate.use(lang)
    console.log("lang")
    console.log(lang)
    localStorage.setItem('lang', lang);
    this.lang = localStorage.getItem('lang');
    document.querySelector('html').lang = lang;
    if (lang == 'ar') {
      callRtlStyle();
      location.reload();
    } else {
      removeRtlStyle();
    }
    this.ngOnInit();
    this.getIconsName();
    this.dropdownsInit();
    this.getToastrMsgs();

  }

}