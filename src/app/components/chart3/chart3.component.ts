import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css']
})
export class Chart3Component implements OnInit {

  @Input() annualLeave: number;
private donutChart: Chart;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.annualLeave !== undefined) {
      this.drawDonutChart();
    }
  }

  private drawDonutChart(): void {
    var complementaryValue = 365 - this.annualLeave;
    const data = {
       //labels: ['Annual Leave'],
      labels: null,
      datasets: [{
        data: [complementaryValue],
        backgroundColor: [
          'rgba(206, 5, 5, 225)',
          'rgba(0, 0, 0, 0.06)'
        ],
        borderRadius: 30
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

    const donutChartCanvas = document.getElementById('donutchart3') as HTMLCanvasElement;
    this.donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: data,
      options: options
    });

     
  }

}
