import { Component, OnInit } from '@angular/core';
import { ApisService } from '../servicios/apis.service';
import { ActivoBalance } from '../modales/gestion-api/modelos/ActivoBalance';
import { combineLatest, Observable } from 'rxjs';
import { timeout } from 'q';
import { ActivoBalanceInterface } from '../modales/gestion-api/modelos/ActivoBalanceInterface';

@Component({
  selector: 'app-listado-ordenes-transacciones',
  templateUrl: './listado-ordenes-transacciones.component.html',
  styleUrls: ['./listado-ordenes-transacciones.component.scss']
})
export class ListadoOrdenesTransaccionesComponent implements OnInit {
  private preciosYSimbolosFase1: Array<any>;
  private balanceUsuarioFase1: Array<any>;
  private resultadoPosiblesOrdenes: Array<any> = [];
  public workflowStepping: string = 'Elige una de las siguientes criptomonedas'
  constructor(private apiService: ApisService) { }

  ngOnInit() {


    let preciosYSimbolos$ = this.apiService.getPreciosYSimbolos(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey));
    let balanceUsuario$ = this.apiService.obtenerBalanceBinance(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey));

    combineLatest(preciosYSimbolos$, balanceUsuario$, (preciosYSimbolos, balanceUsuario) => ({ preciosYSimbolos, balanceUsuario }))
      .subscribe(pair => {
        console.log(pair)
        this.preciosYSimbolosFase1 = Object.keys(pair.preciosYSimbolos);
        this.balanceUsuarioFase1 = this.filtrarSoloCantidadesPositivas(pair.balanceUsuario);
        this.filtrarPosiblesOrdenesYEliminarDuplicados();
        console.log("balance user 1 fase 1 ", this.balanceUsuarioFase1)
        console.log("arrayFinal!!!!", this.resultadoPosiblesOrdenes)

      })

  }

  public verTransacciones(simbolo: string): void {
    console.log(simbolo)
    this.apiService.consultarTransaccionesHistoricasParaUnSimbolo(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey), simbolo).subscribe((data => {
      console.log(data)
    }))
  }

  public mostrarSubItemsYposiblesParesFiltrados(parparcial: ActivoBalanceInterface) {
    this.filtrarPosiblesOrdenesYEliminarDuplicadosUnitario(parparcial);
    parparcial['clickeado'] = !parparcial['clickeado'];
  }

  public filtrarPosiblesOrdenesYEliminarDuplicadosUnitario(parparcial: ActivoBalanceInterface) { // recordar que se excluye a USD,USDT,ETC...
    let arrayTMP: Array<any> = [];
    this.preciosYSimbolosFase1.forEach(parcompleto => {
      if (parcompleto.includes(parparcial.nombre) && parparcial.nombre != "USDT" && parparcial.nombre != "BTC" && parparcial.nombre != "ETH") {
        console.log("detectada coincidencia", [parcompleto, parparcial])
        arrayTMP.push(parcompleto)
        // this.preciosYSimbolosFase1 = this.preciosYSimbolosFase1.splice(j, 1);
      }
    });
    parparcial['subitems'] = arrayTMP;
  }



  private filtrarPosiblesOrdenesYEliminarDuplicados() { // recordar que se excluye a USD,USDT,ETC...
    let j: number = 0;
    this.balanceUsuarioFase1.forEach(parparcial => {
      //console.log(parparcial.nombre)
      this.preciosYSimbolosFase1.forEach(parcompleto => {
        //console.log(parcompleto)

        if (parcompleto.includes(parparcial.nombre) && parparcial.nombre != "USDT" && parparcial.nombre != "BTC" && parparcial.nombre != "ETH") {
          console.log("detectada coincidencia", [parcompleto, parparcial])
          this.resultadoPosiblesOrdenes.push(parcompleto)
          // this.preciosYSimbolosFase1 = this.preciosYSimbolosFase1.splice(j, 1);

        }
        j++;
      });
      j = 0;
    });

  }

  private filtrarSoloCantidadesPositivas(data: Array<any>) {
    let arrayTMP = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        //console.log(key + " -> " + this.arrayRes[key]["btcTotal"]);
        if (data[key]["btcTotal"] > 0 && (data[key]["available"] > 0 || data[key]["onOrder"] > 0)) {
          //console.log("añadiendo", key)
          let activo: ActivoBalance = data[key]
          activo.nombre = key;
          this.generarImgCripto(activo.nombre).subscribe((data) => {
            //console.log(data)
            if (data[0] != undefined) {
              activo.imgURL = "http://dembow.gearhostpreview.com/img-activos/" + data[0].nombre + ".png"
            } else {
              activo.imgURL = "http://dembow.gearhostpreview.com/logoepsilonoluminado.png"
            }
          })
          arrayTMP.push(activo);
        }

      }
    }
    return arrayTMP;
  }

  generarImgCripto(nombreCripto: string): Observable<any> {
    let devolucion =
      this.apiService.recuperarImagenesAPartirDeSiglas(nombreCripto)

    return devolucion;
  }

}
