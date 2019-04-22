import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceLoginDashboardService } from '../../servicios/service-login-dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-b',
  templateUrl: './grafico-b.component.html',
  styleUrls: ['./grafico-b.component.scss']
})
export class GraficoBComponent implements OnInit {

  @ViewChild('pieCanvas') pieCanvas;

  pieChart: any;
  public arrayActivo: Array<any>;
  public arrayLabels: Array<string> = new Array("Crypto", "Stock");
  private totalSumaActivos: number = 0;
  private totalSumaCripto: number = 0;
  private totalSumaStock: number = 0;
  public porcentajeCripto: any = 0;
  public porcentajeStock: any = 0;
  public hayDatos: boolean = true;
  constructor(private service: ServiceLoginDashboardService) { }

  ngOnInit() {
    this.arrayActivo = this.service.getArrayActivosCompletos();
    this.calcularPorcentaje();
    this.generarChart();
  }

  private calcularPorcentaje(): void {
    for (let i = 0; i < this.arrayActivo.length; i++) {
      const activo = this.arrayActivo[i];
      let cantidad = activo['cantidad'];
      let precioActual = activo['activo']['precio'];
      let tipo = activo['activo']['tipo'];
      this.totalSumaActivos = +this.totalSumaActivos + (+precioActual * +cantidad);
      if (tipo == "Stock") {
        this.totalSumaStock = +this.totalSumaStock + (+precioActual * +cantidad);
      } else if (tipo == "Criptomoneda") {
        this.totalSumaCripto = +this.totalSumaCripto + (+precioActual * +cantidad);
      }
    }

    this.porcentajeCripto = (+(100 * +this.totalSumaCripto) / +this.totalSumaActivos).toFixed(3);
    this.porcentajeStock = (+(100 * +this.totalSumaStock) / +this.totalSumaActivos).toFixed(3);
  }
  generarChart() {
    console.log(this.porcentajeCripto)
    console.log(this.porcentajeStock)
    if (isNaN(this.porcentajeStock) || isNaN(this.porcentajeCripto) || this.arrayLabels.length == 0) {
      this.hayDatos = false;
    } else {
      this.hayDatos = true;
      this.pieChart = new Chart(this.pieCanvas.nativeElement, {

        type: 'pie',
        data: {
          labels: this.arrayLabels,
          datasets: [{
            label: '# of Votes',
            data: [this.porcentajeCripto, this.porcentajeStock],
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
