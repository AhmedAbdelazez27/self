import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignInDialogComponentComponent } from '../components/sign-in-dialog-component/sign-in-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openSignInDialog(): void {
    this.dialog.open(SignInDialogComponentComponent, {
      width: '300px'
    });
  }
}