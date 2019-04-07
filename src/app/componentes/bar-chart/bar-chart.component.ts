import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivoBalance } from 'src/app/modales/gestion-api/modelos/ActivoBalance';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChart') barChart;
  barChartTmp: any;
  private arrayData: Array<number> = [];
  private arrayLabels: Array<string> = [];

  @Input('arrayFinal')
  set arrayFinal(array: Array<any>) {

    console.log(array)
    let arrayTMP = new Array<any>();
    arrayTMP.push(array)
    arrayTMP = arrayTMP[0];

    for (var key in arrayTMP) {
      if (arrayTMP.hasOwnProperty(key)) {
        //console.log(key + " -> " + this.arrayRes[key]["btcTotal"]);
        if (arrayTMP[key]["btcTotal"] > 0 && arrayTMP[key]["btcTotal"] != 0) {
          console.log("añadiendo", key)
          let activo: ActivoBalance = arrayTMP[key]
          activo.nombre = key;
          // this._arrayFinal.push(activo);
          this.arrayLabels.push(key)
          this.arrayData.push((arrayTMP[key]["available"]))
        }

      }
    }
  }

  constructor() { }

  ngOnInit() {
    this.generarChartBar();
  }

  generarChartBar() {

    this.barChartTmp = new Chart(this.barChart.nativeElement, {

      type: 'bar',
      data: {
        labels: this.arrayLabels,
        datasets: [{
          label: 'Cantidad de criptomoneda',
          data: this.arrayData,
        }]
      }

    });
  }

}
