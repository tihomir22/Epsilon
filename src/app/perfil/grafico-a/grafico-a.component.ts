import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ServiceLoginDashboardService } from '../../servicios/service-login-dashboard.service';

@Component({
  selector: 'app-grafico-a',
  templateUrl: './grafico-a.component.html',
  styleUrls: ['./grafico-a.component.scss']
})
export class GraficoAComponent implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  public arrayActivo: Array<any>;
  //arrays relacionados con la fraccion del activo
  public arrayPrecioTotal: Array<number> = new Array;
  public arrayLabels: Array<string> = new Array;
  public hayDatos: boolean = true;

  constructor(private service: ServiceLoginDashboardService) { }

  ngOnInit() {
    this.arrayActivo = this.service.getArrayActivosCompletos();
    console.log(this.arrayActivo)
    this.calcularFracciones();
    this.generarChart();
  }

  private calcularFracciones(): void {
    //se calcula el importe del activo, al multiplicar la cantidad por el precio actual
    for (let i = 0; i < this.arrayActivo.length; i++) {
      const activo = this.arrayActivo[i];
      let cantidad = activo['cantidad'];
      let precioActual = activo['activo']['precio'];
      this.arrayPrecioTotal.push(precioActual * cantidad);
      this.arrayLabels.push(activo['activo']['nombre'])
      console.log(this.arrayPrecioTotal[i])

    }
  }
  generarChart() {
    if (this.arrayPrecioTotal.length == 0 || this.arrayLabels.length == 0) {
      this.hayDatos = false;
    } else {
      this.hayDatos = true;
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
          labels: this.arrayLabels,
          datasets: [{
            label: '# of Votes',
            data: this.arrayPrecioTotal,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
        }

      });
    }


  }

}
