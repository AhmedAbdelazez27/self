import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {callRtlStyle , removeRtlStyle} from 'src/app/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService){
    translate.addLangs(['en','ar'])
  }

  lang = localStorage.getItem('lang');

  ngOnInit(){
    if(!!this.lang){
      this.translate.use(this.lang)
      document.getElementsByTagName('html')[0].lang=this.lang;
      if(this.lang == 'ar'){
        callRtlStyle();
      }else{
        removeRtlStyle();
      }
    }else{
      this.translate.use('ar');
      localStorage.setItem('lang','ar');
      callRtlStyle();
    }
  }

}
