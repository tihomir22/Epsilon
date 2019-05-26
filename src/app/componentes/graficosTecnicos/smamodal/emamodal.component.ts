import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-emamodal',
  templateUrl: './emamodal.component.html',
  styleUrls: ['./emamodal.component.scss']
})
export class EMAmodalComponent implements OnInit {
  @ViewChild('barCanvas') barCanvas: { nativeElement: any; };

  @Input('arrayDatos')
  set arrayDatos(arrayDatos: Array<number>) {
    if (arrayDatos != undefined) {
      this._arrayDatos = arrayDatos.reverse();
    }
  }

  @Input('tipo')
  set tipo(tipo: string) {
    if (tipo != undefined) {
      this._tipo = tipo
    }
  }

  @Input('arrayLabels')
  set arrayLabels(arrayLabels: Array<string>) {
    if (arrayLabels != undefined && this._arrayDatos != undefined) {
      this._arrayLabels = arrayLabels.reverse();
      this.cargarDatosGrafico(this._arrayLabels, this._arrayDatos)

      this.totalRegistros = this._arrayDatos.length
      this.recalcularDatos();
    }
  }
  barChart: any;

  public _arrayDatos: Array<number>;
  public _arrayLabels: Array<string>;
  public _tipo: string;
  public totalRegistros: number;
  public datosCortados: Array<any>;
  public labelCortados: Array<any>;
  public numeroRecorteMin = 0;
  public numeroRecorteMax = 5;
  constructor(private modalctrl: ModalController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadingController.dismiss();
  }

  private recalcularDatos(): void {
    let datosArray = JSON.parse(JSON.stringify(this._arrayDatos))
    datosArray = datosArray.splice(this.numeroRecorteMin, 5);
    this.datosCortados = datosArray.reverse();

    let datosLabels = JSON.parse(JSON.stringify(this._arrayLabels))
    datosLabels = datosLabels.splice(this.numeroRecorteMin, 5);
    this.labelCortados = datosLabels.reverse()
  }

  public cargarDatosGrafico(arrayLabels: Array<string>, arrayDatos: Array<any>): void {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: arrayLabels,
        datasets: [{
          label: 'Rendimiento del ' + this._tipo,
          data: arrayDatos,
          backgroundColor: '#0074D9',
          fill: false,
          borderColor: '#0074D9',
          borderWidth: 1
        }]
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: false,
          text: 'Rendimiento del portfolio'
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
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              display: false
            }
          }]
        }

      }
    });
  }

  public cerrarModal(): void {
    this.modalctrl.dismiss();
  }

  public pageChangeEvent(event) {
    let distancia = this.numeroRecorteMax - this.numeroRecorteMin;
    if (event.previousPageIndex < event.pageIndex) {
      //siguiente pagina
      this.numeroRecorteMin = this.numeroRecorteMin + distancia;
      this.numeroRecorteMax = this.numeroRecorteMax + distancia;
      this.recalcularDatos();
    } else {
      //anterior o nos quedamos igual
      this.numeroRecorteMin = this.numeroRecorteMin - distancia;
      this.numeroRecorteMax = this.numeroRecorteMax - distancia;
      this.recalcularDatos();
    }
  }

}
