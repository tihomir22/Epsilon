import { Component, OnInit } from '@angular/core';
import { ApisService } from '../servicios/apis.service';
import { ActivoBalance } from '../modales/gestion-api/modelos/ActivoBalance';
import { combineLatest, Observable } from 'rxjs';
import { timeout } from 'q';
import { ActivoBalanceInterface } from '../modales/gestion-api/modelos/ActivoBalanceInterface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-listado-ordenes-transacciones',
  templateUrl: './listado-ordenes-transacciones.component.html',
  styleUrls: ['./listado-ordenes-transacciones.component.scss']
})
export class ListadoOrdenesTransaccionesComponent implements OnInit {
  private preciosYSimbolosFase1: Array<any>;
  public balanceUsuarioFase1: Array<any>;
  private resultadoPosiblesOrdenes: Array<any> = [];
  public workflowStepping: string = 'Elige una de las siguientes criptomonedas'
  constructor(private apiService: ApisService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.iniciar("dembow");
  }

  public doRefresh(event: any): void {
    this.iniciar(event);
  }

  private iniciar(event: any): void {
    this.presentLoading();
    let preciosYSimbolos$ = this.apiService.getPreciosYSimbolos(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey));
    let balanceUsuario$ = this.apiService.obtenerBalanceBinance(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey));

    combineLatest(preciosYSimbolos$, balanceUsuario$, (preciosYSimbolos, balanceUsuario) => ({ preciosYSimbolos, balanceUsuario }))
      .subscribe(pair => {
        console.log(pair)
        this.preciosYSimbolosFase1 = Object.keys(pair.preciosYSimbolos);
        this.balanceUsuarioFase1 = this.filtrarSoloCantidadesPositivas(pair.balanceUsuario);
        this.filtrarPosiblesOrdenesYEliminarDuplicados();
        this.loadingController.dismiss();
        if (event != "dembow") {
          event.target.complete();
        }
      })

  }

  public detenerOrden(symbol: string, id: string, index: number, arrayHistorial: Array<any>) {
    console.log(symbol, id)
    this.apiService.cancelarOrden(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey), symbol, id).subscribe((data) => {
      console.log(data)
      arrayHistorial = arrayHistorial.splice(index, 1);
    })
  }

  public verTransacciones(simbolo: string): void {
    console.log(simbolo)
    this.apiService.consultarTransaccionesHistoricasParaUnSimbolo(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey), simbolo).subscribe((data => {
      console.log(data)
    }))
  }

  public verTodasLasTransaccionesDeUnaLista(listaPares: Array<string>): any {
    let listaFinal = [];
    listaPares.forEach(par => {
      this.apiService.consultarTransaccionesHistoricasParaUnSimbolo(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey), par).subscribe((data => {
        listaFinal.push({ "par": par, "historial": data, "mostrar": false });
        if (listaPares[listaPares.length - 1] == par) {
          this.loadingController.dismiss();
        }
      }))
    });
    return listaFinal;
  }

  public mostrarSubItemsYposiblesParesFiltrados(parparcial: ActivoBalanceInterface) {
    if (parparcial['clickeado'] == undefined || parparcial['clickeado'] == false) {
      this.presentLoading();
    }
    this.filtrarPosiblesOrdenesYEliminarDuplicadosUnitario(parparcial);
    parparcial['subitems'] = this.verTodasLasTransaccionesDeUnaLista(parparcial['subitems']);
    parparcial['clickeado'] = !parparcial['clickeado'];
  }


  public filtrarPosiblesOrdenesYEliminarDuplicadosUnitario(parparcial: ActivoBalanceInterface) { // recordar que se excluye a USD,USDT,ETC...
    let arrayTMP: Array<any> = [];
    this.preciosYSimbolosFase1.forEach(parcompleto => {
      if (parcompleto.includes(parparcial.nombre) && parparcial.nombre != "USDT" && parparcial.nombre != "BTC" && parparcial.nombre != "ETH") {
        arrayTMP.push(parcompleto)
      }

    });
    if (parparcial.nombre == "BTC") {
      this.añadirParesEstaticos("BTC", arrayTMP);
    }
    if (parparcial.nombre == "ETH") {
      this.añadirParesEstaticos("ETH", arrayTMP);
    }
    parparcial['subitems'] = arrayTMP;

  }

  private añadirParesEstaticos(simboloBase: string, arrayAModificar: Array<any>) {
    if (simboloBase != "BTC") {
      arrayAModificar.push(simboloBase + "BTC");
    }
    arrayAModificar.push(simboloBase + "USDT");
    arrayAModificar.push(simboloBase + "PAX");
    arrayAModificar.push(simboloBase + "TUSD");
    arrayAModificar.push(simboloBase + "USDC");
    if (simboloBase != "ETH") {
      arrayAModificar.push(simboloBase + "USDS");
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando registros',
      duration: 10000
    });
    await loading.present();
  }

  private filtrarPosiblesOrdenesYEliminarDuplicados() { // recordar que se excluye a USD,USDT,ETC...
    let j: number = 0;
    this.balanceUsuarioFase1.forEach(parparcial => {
      this.preciosYSimbolosFase1.forEach(parcompleto => {
        if (parcompleto.includes(parparcial.nombre) && parparcial.nombre != "USDT" && parparcial.nombre != "BTC" && parparcial.nombre != "ETH") {
          console.log("detectada coincidencia", [parcompleto, parparcial])
          this.resultadoPosiblesOrdenes.push(parcompleto)
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
