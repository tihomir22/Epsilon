import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doslineasconbarras',
  templateUrl: './doslineasconbarras.component.html',
  styleUrls: ['./doslineasconbarras.component.scss']
})
export class DoslineasconbarrasComponent implements OnInit {

  @ViewChild('mixedCanvas') mixedCanvas: { nativeElement: any; };

  @Input('arrayDatosPrimarios')
  set arrayDatosPrimarios(arrayDatosPrimarios: Array<number>) {
    if (arrayDatosPrimarios != undefined) {
      this._arrayDatosPrimarios = arrayDatosPrimarios.reverse();
    }
  }

  @Input('arrayDatosSecundarios')
  set arrayDatosSecundarios(arrayDatosSecundarios: Array<number>) {
    if (arrayDatosSecundarios != undefined) {
      this._arrayDatosSecundarios = arrayDatosSecundarios.reverse();
    }
  }

  @Input('arrayDatosTerciarios')
  set arrayDatosTerciarios(arrayDatosTerciarios: Array<number>) {
    if (arrayDatosTerciarios != undefined) {
      this._arrayDatosTerciarios = arrayDatosTerciarios.reverse();
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
    if (arrayLabels != undefined && this._arrayDatosPrimarios != undefined && this._arrayDatosSecundarios != undefined) {
      this._arrayLabels = arrayLabels.reverse();
      //this.cargarDatosGrafico(this._arrayLabels, this._arrayDatos)
      this.cargarDatosGrafico(this._arrayLabels);
      this.totalRegistros = this._arrayDatosPrimarios.length
      this.recalcularDatos();
    }
  }

  public _arrayDatosPrimarios: Array<number>;
  public _arrayDatosSecundarios: Array<number>;
  public _arrayDatosTerciarios: Array<number>;
  public _arrayLabels: Array<string>;
  public _tipo: string;
  public totalRegistros: number;
  public datosCortados: Array<any>;
  public datosCortados2: Array<any>;
  public datosCortados3: Array<any>;
  public labelCortados: Array<any>;
  public numeroRecorteMin = 0;
  public numeroRecorteMax = 5;

  mixedChart: any;

  constructor(private loadingController: LoadingController, private modalController: ModalController) { }

  ngOnInit() {

  }

  private recalcularDatos(): void {
    let datosArray = JSON.parse(JSON.stringify(this._arrayDatosPrimarios))
    let datosArray2 = JSON.parse(JSON.stringify(this._arrayDatosSecundarios))
    let datosArray3 = JSON.parse(JSON.stringify(this._arrayDatosTerciarios))
    datosArray = datosArray.splice(this.numeroRecorteMin, 5);
    datosArray2 = datosArray2.splice(this.numeroRecorteMin, 5);
    datosArray3 = datosArray3.splice(this.numeroRecorteMin, 5);

    this.datosCortados = datosArray.reverse();
    this.datosCortados2 = datosArray2.reverse();
    this.datosCortados3 = datosArray3.reverse();

    let datosLabels = JSON.parse(JSON.stringify(this._arrayLabels))
    datosLabels = datosLabels.splice(this.numeroRecorteMin, 5);
    this.labelCortados = datosLabels.reverse()
  }

  public cargarDatosGrafico(arrayLabels: Array<string>): void {
    this.mixedChart = new Chart(this.mixedCanvas.nativeElement, {
      type: 'bar',
      data: {

        datasets: [{
          label: 'Rendimiento del MACD normal',
          type: 'line',
          data: this._arrayDatosPrimarios,
          backgroundColor: '#0074D9',
          fill: false,
          borderColor: '#0074D9',
          borderWidth: 1
        },
        {
          label: 'Rendimiento del MACD señal',
          type: 'line',
          data: this._arrayDatosSecundarios,
          backgroundColor: '#FF851B',
          fill: false,
          borderColor: '#FF851B',
          borderWidth: 1
        },
        {
          label: 'Histograma MACD',
          type: 'bar',
          backgroundColor: "rgba(0,0,0,0.2)",
          backgroundColorHover: "#3e95cd",
          data: this._arrayDatosTerciarios,
          fill: true
        },

        ],
        labels: arrayLabels,
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
    this.loadingController.dismiss();
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

  public cerrarModal(): void {
    this.modalController.dismiss();
  }





}
