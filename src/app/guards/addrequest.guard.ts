import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainpageService } from '../services/mainpage.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RequestmodalComponent } from 'src/app/components/requestmodal/requestmodal.component';
import { RequestmodalValidationComponent } from '../components/requestmodal-validation/requestmodal-validation.component';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AddrequestGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private mainPageService: MainpageService,
    private requestModal:MatDialog,
    private requestModalvalid:MatDialog,
    ){}
    result:any;
  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   
      this.mainPageService.GetValidationDataOnAddRequest().subscribe(response => {
        this.result=response.result.finalStatues;   
       
       }); 
      // else if( this.result=="S")
      // {return true;
      //  }
      if(   this.result=="F") {
        let matDialogvalid = new MatDialogConfig();
              matDialogvalid.disableClose = true;
              matDialogvalid.maxWidth = "500px";
              this.requestModalvalid.open(RequestmodalValidationComponent, matDialogvalid)
                .afterClosed().subscribe(res => {
                  return false;
                });
                return false;   
      }
else  if(!this.mainPageService.GetAddRequestPermission()){
      let matDialog = new MatDialogConfig();
      matDialog.disableClose = true;
      matDialog.maxWidth="350px";
      this.requestModal.open(RequestmodalComponent,matDialog)
      .afterClosed().subscribe(res=>{
        return false
      });
      this.router.navigate(["board/main"]);
      return false;
    }     

  //else 
  
  else {return true}




  }
}

