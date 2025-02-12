import { Component, OnInit } from '@angular/core';
import { ProfileService } from "src/app/services/profile.service";
import * as Chart from 'chart.js';
@Component({
  selector: 'chart4',
  templateUrl: './chart4.component.html',
  styleUrls: ['./chart4.component.css']
})
export class Chart4Component implements OnInit {
  greyValue:number
  private donutChart: Chart;
  constructor(private ProfileService: ProfileService) { }
  strid:string;
  sickLeaveDays:number;
  async ngOnInit() {
    this.strid = localStorage.getItem('user_id');
    const data = await this.ProfileService.GetTotalSickLeaveDays(this.strid).toPromise(); 
    this.sickLeaveDays=data.result;
    if(this.sickLeaveDays ==0 ){
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
        data: [this.greyValue,this.sickLeaveDays],
        backgroundColor: [
         'rgba(211, 211, 211, 1)',
          'rgba(206, 5, 5, 225)' 
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

    const donutChartCanvas = document.getElementById('donutChart4') as HTMLCanvasElement;
    this.donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: data,
      options: options
    });

  }
}
