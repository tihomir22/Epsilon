import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { stringify } from '@angular/core/src/util';
import { Subject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { DashboardPage } from '../dashboard/dashboard.page';
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';
import { mensajeModel } from '../mensajes/detalle-conversacion/modelos/mensajeModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginDashboardService {

  private userInfo: UsuarioInterface;
  private imagenUsuario: any;
  private activo: any;
  private tipoAdquisicion: string = '';
  public permitirCarga: boolean = false;
  private arrayActivosServ: Array<any> = new Array;
  private todosLosUsuariosExceptoActual: Array<UsuarioInterface> = [];


  private mensajesSinLeer: Array<mensajeModel> = [];
  private arrayActivosCompletos: Array<any> = new Array;
  private arrayActivosCompletosCerrados: Array<any> = new Array;
  private paqueteDeData: Array<any>;
  private baseURI: string = "http://dembow.gearhostpreview.com/";


  constructor(public http: HttpClient, public tostCtrl: ToastController) { }


  public recuperarPrecioCryptoCompare(siglasActivo: string, siglasContrapartida: string) {
    return this.http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + siglasActivo + "&tsyms=" + siglasContrapartida + "&api_key=6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc");
  }

  public recuperarPrecioCryptoCompareFullData(siglasActivo: string, siglasContrapartida: string) {
    return this.http.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + siglasActivo + "&tsyms=" + siglasContrapartida + "&api_key=6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc");
  }

  public getTodosLosUsuariosExceptoActual(): Array<UsuarioInterface> {
    return this.todosLosUsuariosExceptoActual;
  }

  public setTodosLosUsuariosExceptoActual(todosLosUsuariosExceptoActual: Array<any>): void {
    this.todosLosUsuariosExceptoActual = todosLosUsuariosExceptoActual;
  }

  public getMensajesSinLeer(): Array<mensajeModel> {
    return this.mensajesSinLeer;
  }

  public setMensajesSinLeer(mensajesSinLeer: Array<mensajeModel>): void {
    this.mensajesSinLeer = mensajesSinLeer;
  }



  public setPaqueteData(paquetito: any) {
    this.paqueteDeData = paquetito;
  }
  public getPaqueteData(): Array<any> {
    return this.paqueteDeData;
  }

  public requestCoinInfoFromCoinGecko(nombre_moneda_minusculas: string): Observable<any> {
    return this.http.get("https://api.coingecko.com/api/v3/coins/" + nombre_moneda_minusculas.toLowerCase())
  }


  public recuperarPrecioIEXTrading(siglasActivo: string) {
    return this.http.get("https://api.iextrading.com/1.0/stock/" + siglasActivo + "/price");
  }
  public obtenerPreciosActivosAnalconda(arrayActivos: any) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "analconda_activos_precios", "arrayActivos": arrayActivos },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }
  cargarActivos() {

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "todos_activos" },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)

  }
  modificarPerfilUsuario(usuario: UsuarioInterface) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "actualizar_usuario", "usuario": usuario },
      url: any = this.baseURI + "manage-dataIONIC.php";


    this.http.post(url, JSON.stringify(options), headers)

      .subscribe((data: any) => {
        // If the request was successful notify the user
        console.log(`Felicidades se ha actualizado el usuario`, data);
        // this.sendNotification("Actualizado con exito");
      },
        (error: any) => {
          if (error.status == 200) {
            console.log('No se pudo modificar el activo! ');
          } else {
            console.log(error);
          }
        });
  }

  recuperarRutaImgUsuario(idUsuario: number) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_ruta_imagen", "id_usuario": idUsuario },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)

  }
  setImagenUsuario(imagenPath: any) {
    this.imagenUsuario = imagenPath;
  }
  getImagenUsuario() {
    return this.imagenUsuario;
  }
  getHistoricalDataMensual(siglasActivo: any, tipoActivo: String) {
    if (tipoActivo == "Criptomoneda") {
      return this.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=" + siglasActivo + "&tsym=USD&limit=30&6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc")
    } else if (tipoActivo == "Stock") {
      return this.http.get("https://api.iextrading.com/1.0/stock/" + siglasActivo + "/chart/1m")
    }
  }
  getHistoricalDataSemanal(siglasActivo: any, tipoActivo: String) {
    if (tipoActivo == "Criptomoneda") {
      return this.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=" + siglasActivo + "&tsym=USD&limit=7&6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc")
    } else if (tipoActivo == "Stock") {
      return this.http.get("https://api.iextrading.com/1.0/stock/" + siglasActivo + "/chart/1m")
    }
  }
  getHistoricalDataDiaria(siglasActivo: any, tipoActivo: String) {
    if (tipoActivo == "Criptomoneda") {
      return this.http.get("https://min-api.cryptocompare.com/data/histohour?fsym=" + siglasActivo + "&tsym=USD&limit=24&6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc")
    } else if (tipoActivo == "Stock") {
      return this.http.get("https://api.iextrading.com/1.0/stock/" + siglasActivo + "/chart/1d")
    }
  }

  actualizarActivos(array: any) {

    array.forEach(element => {
      //console.log(element)
      if (element.tipo == "Criptomoneda") {
        this.recuperarPrecioCryptoCompare(element.siglas, "USD").subscribe(respuesta => {
          if (respuesta[element.siglas] != undefined) {
            console.log("precio recibido actual " + element.siglas + respuesta[element.siglas]["USD"])
            element.precio = respuesta[element.siglas]["USD"];
            this.actualizarPrecioActivo(element.id, element.precio)
          } else {
            console.log("omitiendo", respuesta)
          }
        })
      } else if (element.tipo == "Stock") {
        this.recuperarPrecioIEXTrading(element.siglas).subscribe(respuesta => {
          element.precio = respuesta;
          this.actualizarPrecioActivo(element.id, element.precio)
        })
      }
    });




  }

  public modificarTemaUsuario(idUsuario: any, tema: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "actualizar_tema_usuario", "id": idUsuario, "tema": tema },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public anyadirActivoAUsuario(idUsuario: any, activoId: any, tipoActivo: any, precioCompra: number, fechaOperacion: any, exchange: string, par: string, cantidad: any, observaciones: string, deExchange: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "anyadir_activo_a_usuario", "id_usuario_ajeno": idUsuario, "id_activo_ajeno": activoId, "tipo": tipoActivo, "precio_compra": precioCompra, "fecha_operacion": fechaOperacion, "exchange": exchange, "siglas_operacion": par, "cantidad": cantidad, "observaciones": observaciones, "de_exchange": deExchange },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public getPrecioForexPar(siglasIzq, siglasDere) {
    return this.http.get("https://forex.1forge.com/1.0.3/quotes?pairs=" + siglasIzq.toUpperCase() + "" + siglasDere.toUpperCase() + "&api_key=sqiS3IAJBRMm8jRIpEAOQmjOvZRfDHhL");
  }

  public setArrayActivos(array: any) {
    this.arrayActivosServ = array;
  }
  public getArrayActivos() {
    return this.arrayActivosServ;
  }
  public setArrayActivoCompletos(array: any) {
    this.arrayActivosCompletos = array;
  }
  public getArrayActivosCompletos() {
    return this.arrayActivosCompletos;
  }

  public setArrayActivoCompletosCerrados(array: Array<any>) {
    this.arrayActivosCompletosCerrados = array;
  }

  public getArrayActivoCompletosCerrados() {
    return this.arrayActivosCompletosCerrados;
  }


  public setDestn(destn) {
    this.userInfo = destn;
  }

  getDestn(): UsuarioInterface {
    return this.userInfo;
  }

  public setActivo(activo) {
    this.activo = activo;
  }
  getActivo() {
    return this.activo;
  }

  public setTipoAdquisicion(tipo: string) {
    this.tipoAdquisicion = tipo;
  }
  public getTipoAdquisicion() {
    return this.tipoAdquisicion;
  }
  public actualizarPrecioActivo(idActivo: any, precioLive: any) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "actualizar_precio_activo", "id_activo": idActivo, "precio_live": precioLive },
      url: any = this.baseURI + "manage-dataIONIC.php";


    this.http.post(url, JSON.stringify(options), headers)

      .subscribe((data: any) => {
        // If the request was successful notify the user
        console.log(`Felicidades se ha modificado el activo correctamente`);
        // this.sendNotification("Actualizado con exito");
      },
        (error: any) => {
          if (error.status == 200) {
            console.log('No se pudo modificar el activo! ');
          } else {
            console.log('Algo fue mal!' + JSON.stringify(options));
          }
        });
  }

  public eliminarRelacion(idRelacion: any) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "eliminar_relacion", "id_relacion": idRelacion },
      url: any = this.baseURI + "manage-dataIONIC.php";

    this.http.post(url, JSON.stringify(options), headers)

      .subscribe((data: any) => {
        // If the request was successful notify the user
        console.log(`Felicidades se ha eliminado exitosamente la relacion`);
        this.sendNotification("Activo eliminado con exito del usuario");

      },
        (error: any) => {
          if (error.status == 200) {
            console.log('No se pudo modificar el activo! ');
          } else {
            console.log('Algo fue mal!' + JSON.stringify(options));
          }
        });
  }

  public desactivarRelacion(idRelacion: any): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "desactivar_relacion", "id_relacion": idRelacion },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }





  async sendNotification(message: string) {
    let toast = await this.tostCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  public logOutMethod() {
    this.userInfo = null;
    this.activo = null;
    this.tipoAdquisicion = null;
    this.arrayActivosServ = new Array;
    this.arrayActivosCompletos = new Array;
    this.arrayActivosCompletosCerrados = new Array;
  }




}
