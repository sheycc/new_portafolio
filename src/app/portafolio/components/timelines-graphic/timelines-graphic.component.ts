import { Component } from '@angular/core';

import { PrimengModule } from "../../../primeng/primeng.module";

@Component({
  selector: 'app-timelines-graphic',
  standalone: true,
  imports: [
    PrimengModule
  ],
  templateUrl: './timelines-graphic.component.html',
  styleUrl: './timelines-graphic.component.scss'
})
export class TimelinesGraphicComponent {

  data: any;
  options: any;

  ngOnInit() {

    this.data = {
      labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'School Time',
          data: [4, 10, 10, 10, 10, 10, 8, 0, 0, 0],
          fill: true,
          backgroundColor: 'rgba(253,52,107,0.36)',
          borderColor: '#fd346b',
          borderWidth: 1,
          tension: 0.4
        },
        {
          label: 'Internship Time',
          data: [0, 0, 0, 0, 4, 10, 10, 0, 0, 0],
          fill: true,
          backgroundColor: 'rgba(240,246,59,0.37)',
          borderColor: '#ffe06d',
          borderWidth: 1,
          tension: 0.4
        },
        {
          label: 'WorkTime',
          data: [0, 0, 0, 0, 0, 0, 0, 12, 8, 0],
          fill: true,
          backgroundColor: 'rgba(68,213,244,0.35)',
          borderColor: '#44d5f4',
          borderWidth: 1,
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        title: {
          display: true,
          text: 'Distribution of Time: Study, Internship, and Work (2016 - 2025)',
          color: '#7e8081',
          font: {
            size: 18
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.raw || '0';
              return `${label}: ${value} months`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            drawBorder: false
          }
        },
        y: {
          ticks: {
            display: false,
          },
          stacked: true,
          grid: {
            drawBorder: false
          }
        },
        // beginAtZero: true
      }
    };
  }
}
