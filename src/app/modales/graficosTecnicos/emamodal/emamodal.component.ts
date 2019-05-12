import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-emamodal',
  templateUrl: './emamodal.component.html',
  styleUrls: ['./emamodal.component.scss']
})
export class EMAmodalComponent implements OnInit {
  @ViewChild('barCanvas') barCanvas: { nativeElement: any; };

  barChart: any;

  constructor() { }

  ngOnInit() {
    this.cargarDatosGrafico(['dembow', 'dembow2'], [1, 4])
  }

  public cargarDatosGrafico(arrayLabels: Array<string>, arrayDatos: Array<any>): void {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: arrayLabels,
        datasets: [{
          label: 'Rendimiento total en dolares',
          data: arrayDatos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
        options: {
          legend: {
            display: false
          },
          responsive: true,
          title: {
            display: true,
            text: 'Rendimiento total'
          },
          tooltips: {
            mode: 'index',
            intersect: false,

          },
          hover: {
            mode: 'dataset',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: false,

            }],
            yAxes: [{
              display: false,
            }]
          }

        }

      }
    });
  }

}
