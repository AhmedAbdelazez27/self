import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GetVacationDaysInputDto } from 'src/app/models/GetVacationDaysInputDto';
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: 'chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  greyValue: number;
  @Input() annualLeaveBalance: number;
  @Input() annualLeaveDays:number;
  annualLeaveConsumedDays:number; 
  annualLeaveRemainingDays:number;
  // annualLeaveDaysTotal:number;
  TotalBlance :number;
   donutChart: Chart;
  constructor(private ProfileService: ProfileService) { }

  async ngOnInit() {
      let strid = localStorage.getItem('user_id');
      let updateData1 = new GetVacationDaysInputDto();
      updateData1.HrVacationsTypeId=30;
      updateData1.HrPersonId= Number(strid);
      const leavedata = await this.ProfileService.GetTotalAnuualLeaveDays(strid).toPromise();
      this.annualLeaveDays=Number(leavedata.result);
      const vacationdata = await this.ProfileService.GetVacationsBalance(updateData1).toPromise();
      this.annualLeaveBalance=vacationdata.result;
      const TotalLeavedata =await this.ProfileService.GetTotalBalance(strid).toPromise();
      this.TotalBlance = TotalLeavedata.result;
      this.annualLeaveConsumedDays = Number(this.annualLeaveBalance) - Number(this.annualLeaveDays); 
      this.annualLeaveRemainingDays = this.annualLeaveConsumedDays < 0 ?0:this.annualLeaveConsumedDays;
      // this.annualLeaveDaysTotal=Number(this.annualLeaveBalance) + Number(this.annualLeaveDays); 
      if(this.annualLeaveBalance ==0 && this.annualLeaveConsumedDays==0){
        this.greyValue=1
      } 
      this.drawDonutChart(); 
  }
  ngOnChanges() {  
  }

  private drawDonutChart(): void {    
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
       cutoutPercentage: 88,
       tooltips: {
       enabled : false
      }
    };

    const donutChartCanvas = document.getElementById('donutChart1') as HTMLCanvasElement;
    this.donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: data,
      options: options
    });

  }

}
