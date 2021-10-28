import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets: [
          //   {
          //     label: 'Current Vallue',
          //     data: [0, 20, 40, 50],
          //     backgroundColor: "rgb(115 185 243 / 65%)",
          //     borderColor: "#007ee7",
          //     fill: true,
          // },
          {
            label: 'Number of Patients Visits',
            data: [0, 20, 40, 60, 80],
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
        }],
          labels: ['July 2021', 'Aug 2021', 'Sep 2021', 'Oct 2021']
      },
  });
  }
}
