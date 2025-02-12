import { Component, OnInit } from '@angular/core';
import { ProfileService } from "src/app/services/profile.service";
import * as Chart from 'chart.js';

@Component({
  selector: 'chart5',
  templateUrl: './chart5.component.html',
  styleUrls: ['./chart5.component.css']
})
export class Chart5Component implements OnInit {
  greyValue:number
  private donutChart: Chart;
  constructor(private ProfileService: ProfileService) { }
  strid: string;
  otherLeaveDays: number;
  async ngOnInit() {
    this.strid = localStorage.getItem('user_id');
    const data = await this.ProfileService.GetTotalOtherLeaveDays(this.strid).toPromise(); 
    this.otherLeaveDays=data.result;
    this.otherLeaveDays=data.result;
    if(this.otherLeaveDays ==0 ){
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
       //labels: ['Annual Leave'],
      labels: null,
      datasets: [{
        data: [this.greyValue,this.otherLeaveDays],
        backgroundColor: [
          'rgba(211, 211, 211, 1)',
          'rgba(25,117,170,255)'
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

    const donutChartCanvas = document.getElementById('donutChart5') as HTMLCanvasElement;
    this.donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: data,
      options: options
    });

  }
}
