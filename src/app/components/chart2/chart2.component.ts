import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GetVacationDaysInputDto } from 'src/app/models/GetVacationDaysInputDto';
import { ProfileService } from "src/app/services/profile.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {
  greyValue:number
  @Input() annualLeave: number;
  private donutChart: Chart;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private ProfileService: ProfileService) { 
    
  }
  annualLeaveDays:number;
  sickLeaveDays:number;
  otherLeaveDays:number;
  annualLeaveConsumedDays:number;
  annualLeaveBalance:number; 
  annualLeaveRemainingDays:number;
  // annualLeaveDaysTotal:number;
  TotalBlance : number;
  strid: string;
  async ngOnInit() : Promise<any> {
    this.strid = localStorage.getItem("user_id");
    let updateData1 = new GetVacationDaysInputDto();
      updateData1.HrVacationsTypeId=30;
      updateData1.HrPersonId= Number(this.strid);
      const leavedata = await this.ProfileService.GetTotalAnuualLeaveDays(this.strid).toPromise();
      this.annualLeaveDays=leavedata.result;
      const vacationdata = await this.ProfileService.GetVacationsBalance(updateData1).toPromise();
      this.annualLeaveBalance=vacationdata.result;

      
      //this.annualLeaveBalance = 22;
      this.annualLeaveConsumedDays = Number(this.annualLeaveBalance) - Number(this.annualLeaveDays); 
      this.annualLeaveRemainingDays = this.annualLeaveConsumedDays < 0 ?0:this.annualLeaveConsumedDays;
      // this.annualLeaveDaysTotal=Number(this.annualLeaveBalance) + Number(this.annualLeaveDays); 
      const TotalLeavedata =await this.ProfileService.GetTotalBalance(this.strid).toPromise();
      this.TotalBlance = TotalLeavedata.result;
      console.log("total-leaves-vacation",this.TotalBlance)
      if(this.annualLeaveBalance ==0 && this.annualLeaveConsumedDays==0){
        this.greyValue=1
      } 
    this.drawDonutChart(); 
  }

  ngOnChanges() {
    // if (this.annualLeave !== undefined) {
      
    // }
  }

  private drawDonutChart(): void { 
    // var complementaryValue = 365 - this.annualLeave; 
    
    const data = { 
      labels: null,
      datasets: [{ 
        data: [this.annualLeaveDays,this.annualLeaveRemainingDays,this.greyValue],
        backgroundColor: [
          'red',
          'rgba(151,199,75,255)',
          'rgba(211, 211, 211, 1)'
        ]
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 85,
      tooltips: {
        enabled : false
       }
    };

    const donutChartCanvas = document.getElementById('donutChart2') as HTMLCanvasElement;
    this.donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: data,
      options: options
    });

     
  }

}
