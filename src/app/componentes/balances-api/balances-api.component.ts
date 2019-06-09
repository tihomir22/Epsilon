import { Component, OnInit, Input } from '@angular/core';
import { ActivoBalance } from '../../modales/gestion-api/modelos/ActivoBalance';
import { Observable } from 'rxjs';
import { ApisService } from 'src/app/servicios/apis.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-balances-api',
  templateUrl: './balances-api.component.html',
  styleUrls: ['./balances-api.component.scss']
})
export class BalancesApiComponent implements OnInit {
  @Input('arrayFinal')
  set arrayFinal(array: Array<any>) {

    console.log(array)
    let arrayTMP = new Array<any>();
    arrayTMP.push(array)
    arrayTMP = arrayTMP[0];

    for (var key in arrayTMP) {
      if (arrayTMP.hasOwnProperty(key)) {
        if (arrayTMP[key]["btcTotal"] > 0 && arrayTMP[key]["btcTotal"] != 0) {
          console.log("añadiendo", key)
          let activo: ActivoBalance = arrayTMP[key]
          activo.nombre = key;
          this.generarImgCripto(activo.nombre).subscribe((data) => {
            console.log(data)
            
            if (data[0] != undefined) {
              activo.imgURL = data[0].rutaIMG;
            } else {
              activo.imgURL = "http://dembow.gearhostpreview.com/logoepsilonoluminado.png"
            }
          })
          this._arrayFinal.push(activo);
        }

      }
    }


  }

  public _arrayFinal: Array<ActivoBalance> = [];
  constructor(private servicioApi: ApisService, public loadingController: LoadingController) {

  }

  ngOnInit() {

  }

  generarImgCripto(nombreCripto: string): Observable<any> {
    let devolucion =
      this.servicioApi.recuperarImagenesAPartirDeSiglas(nombreCripto)

    return devolucion;
  }

}
