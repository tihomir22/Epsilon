import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AgregarActivosCompComponent } from '../agregar-activos-comp/agregar-activos-comp.component';
import { ApisService } from 'src/app/servicios/apis.service';
import { timer, interval, Observable, Subscription } from 'rxjs';
import { ActivoBalance } from 'src/app/modales/gestion-api/modelos/ActivoBalance';
import { ServiceLoginDashboardService } from 'src/app/servicios/service-login-dashboard.service';
import { OrderFilledModel } from './modelos/order-filled-model';

@Component({
  selector: 'app-realizar-transaccion-binance',
  templateUrl: './realizar-transaccion-binance.component.html',
  styleUrls: ['./realizar-transaccion-binance.component.scss']
})
export class RealizarTransaccionBinanceComponent implements OnInit {

  public eRbase: boolean = false;
  public eRcontra: boolean = false;
  public seleccionBase: any = { siglas: "BTC", tipo: "Criptomoneda", nombre: "Bitcoin" };
  public seleccionContra: any = { siglas: "USDT", tipo: "Criptomoneda", nombre: "Tether" };
  public precioActivoSeleccionado: any = 5000;
  public precioLimitOrder: number = 0;
  public acompanyanteCPrecisa: string = '';
  public cantidadBase: any = 0;
  public cantidadContra: any = 0;
  public cantidadResultante: any = 0;
  public colorMensajeRecibido: string = "success";
  public ultimoPrecio: number = 0;
  public valorCantidad: number = 0;
  public valorCantidadPrecisa: any = 0;
  public tipoOperacion: string = "compra";
  public tipoOrden: string = "market";
  public listaBalanceBinanceUsuario: ActivoBalance[];
  public agregarAPortfolio: boolean = false;

  public observablePrecios: Subscription;




  private baseURI: string = "http://dembow.gearhostpreview.com/";

  constructor(private modalctrl: ModalController, private loginService: ServiceLoginDashboardService, private apiservice: ApisService, public loadingController: LoadingController, public toastController: ToastController, public alertController: AlertController) {
    this.actualizarAcompanyante();
  }

  public actualizarAcompanyante(): void {
    if (this.tipoOperacion == 'compra') {
      this.acompanyanteCPrecisa = this.seleccionContra.siglas;
    } else if (this.tipoOperacion == 'venta') {
      this.acompanyanteCPrecisa = this.seleccionBase.siglas;
    }
  }

  ngOnInit() {
    this.recuperarPrecioActivo("BTC", "USDT", this.seleccionBase);
    this.recuperarPrecioActivo("USDT", "BTC", this.seleccionContra);

    this.presentLoading();
    this.cargarPrecioBinance(false);
    this.obtenerBalanceBNB();


    this.observablePrecios = interval(5000).subscribe((data) => {
      this.cargarPrecioBinance(true)
    })


  }
  public recuperarPrecioActivo(base: string, contra: string, par: any) {
    this.loginService.recuperarPrecioCryptoCompare(base, contra).subscribe((data) => {
      par['precio'] = data[base][contra];
    })
  }
  public realizarOperacion(): void {
    this.presentAlertConfirm();

  }

  public obtenerBalanceBNB(): void {
    this.apiservice.obtenerBalanceBinance(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey)).subscribe((data: ActivoBalance[]) => {
      console.log(data);
      this.listaBalanceBinanceUsuario = data;
      this.cantidadBase = this.listaBalanceBinanceUsuario[this.seleccionBase.siglas].available;
      this.cantidadContra = this.listaBalanceBinanceUsuario[this.seleccionContra.siglas].available;
      //  console.log(this.listaBalanceBinanceUsuario)
      this.loadingController.dismiss();
    })
  }

  public comprobarValor(): void {
    if (this.valorCantidad > 100) {
      this.valorCantidad = 100;
    }
    //se comprobará de que exista cantidad en la criptomoneda contrapartidica

    if (this.tipoOperacion == 'compra') {
      if (this.cantidadContra == 0) {
        this.valorCantidadPrecisa = "No dispone de fondos";
        this.cantidadResultante = "No dispone de fondos";
      } else {
        this.valorCantidadPrecisa = ((+this.cantidadContra * +this.valorCantidad) / 100)
        this.cantidadResultante = (this.valorCantidadPrecisa / this.precioLimitOrder) + " " + this.seleccionBase.siglas;
      }
      //se comprobará si existe la cantidad suficiente para vender la base
    } else if (this.tipoOperacion == 'venta') {
      if (this.cantidadBase == 0) {
        this.valorCantidadPrecisa = "No dispone de fondos";
        this.cantidadResultante = "No dispone de fondos";
      } else {
        this.valorCantidadPrecisa = ((+this.cantidadBase * +this.valorCantidad) / 100)
        // console.log(this.cantidadBase,this.valorCantidad)
        this.cantidadResultante = (this.valorCantidadPrecisa * this.precioLimitOrder) + " " + this.seleccionContra.siglas;
      }
    }
    console.log("cantidadPrecisa", this.valorCantidadPrecisa)
    console.log("split raro", (this.precioLimitOrder))
    console.log("resultado", this.cantidadResultante)
  }



  public actualizarPorcentaje(): void {
    if (isNaN(this.valorCantidadPrecisa)) {
      this.presentToast();
    } else {
      if (this.tipoOperacion == 'compra') {
        if (this.valorCantidadPrecisa > this.cantidadContra) {
          this.valorCantidadPrecisa = (+this.cantidadContra)
        } else {
          let res: number = (+this.valorCantidadPrecisa / +this.cantidadContra)
          this.valorCantidad = res;
        }
      } else if (this.tipoOperacion == 'venta') {
        if (this.valorCantidadPrecisa > this.cantidadBase) {
          this.valorCantidadPrecisa = (+this.cantidadContra)
        } else {
          let res: number = (+this.valorCantidadPrecisa / +this.cantidadBase)
          this.valorCantidad = res;
        }
      }

    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No puedes modificar el texto',
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirme los datos',
      message: 'Usted va a realizar la ' + this.tipoOperacion
        + ' de ' + this.seleccionBase.siglas
        + ' por ' + this.seleccionContra.siglas + ' usando una orden de tipo ' + this.tipoOrden + 'con una cantidad de ' + this.valorCantidadPrecisa
        + ' y la operacion ' + this.devolverTxtAgregarOperacionPortfolio() + "\n" + '<strong>Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.presentLoading();
            let precioLimpio = this.precioActivoSeleccionado.split(" ")[0];
            if (this.tipoOperacion == 'compra') {
              if (this.tipoOrden == 'market') {
                this.apiservice.placeMARKETbuy(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey), this.cantidadResultante, precioLimpio, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
                  this.alertaExitosa(data);
                  this.valorCantidad = 0;
                  this.comprobarSiSeDebeAgregarAPortofolioPrincipal();
                }, (error) => {
                  this.tratamientoErroresTransaccion(error);
                })
              } else if (this.tipoOrden == 'limit') {
                this.apiservice.placeLIMITbuy(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey), this.cantidadResultante, this.precioLimitOrder, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
                  this.alertaExitosa(data);
                  this.valorCantidad = 0;
                  this.comprobarSiSeDebeAgregarAPortofolioPrincipal();
                }, (error) => {
                  this.tratamientoErroresTransaccion(error);
                })
              }
            } else if (this.tipoOperacion == 'venta') {
              if (this.tipoOrden == 'market') {
                this.apiservice.placeMARKETsell(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey), this.valorCantidadPrecisa, precioLimpio, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
                  this.alertaExitosa(data);
                  this.valorCantidad = 0;
                  this.comprobarSiSeDebeAgregarAPortofolioPrincipal();
                }, (error) => {
                  this.tratamientoErroresTransaccion(error);
                })
              } else if (this.tipoOrden == 'limit') {
                this.apiservice.placeLIMITsell(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey), this.valorCantidadPrecisa, this.precioLimitOrder, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
                  this.alertaExitosa(data);
                  this.valorCantidad = 0;
                  this.comprobarSiSeDebeAgregarAPortofolioPrincipal();
                }, (error) => {
                  this.tratamientoErroresTransaccion(error);
                })
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private comprobarSiSeDebeAgregarAPortofolioPrincipal(): void {
    if (this.agregarAPortfolio) {
      let precioEntrada = this.precioActivoSeleccionado.split(" ")[0].trim();
      this.loginService.anyadirActivoAUsuario(this.loginService.getDestn().idepsilon_usuarios, this.seleccionBase.id, this.tipoOperacion, precioEntrada, this.recuperarFechaFormateada(), "Binance", this.seleccionContra.siglas, this.valorCantidadPrecisa, "Compra realizada con la API de Binance numero de orden 1488", 1).subscribe((data) => {
        console.log(data)
      })
    }
  }

  private recuperarFechaFormateada(): any {
    var d = new Date();
    let dembow = ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
      ("00" + d.getDate()).slice(-2) + "-" +
      d.getFullYear() + " " +
      ("00" + d.getHours()).slice(-2) + ":" +
      ("00" + d.getMinutes()).slice(-2) + ":" +
      ("00" + d.getSeconds()).slice(-2)
    return dembow;


  }

  private tratamientoErroresTransaccion(error: any): void {
    if (error.error.text.includes("1013")) {
      this.cantidadDemasiadaBajaAlert();
    } else if (error.error.text.includes("2010")) {
      this.noTieneFondosAlert();
    }
    this.loadingController.dismiss();
  }

  async alertaExitosa(paquete: OrderFilledModel) {
    this.obtenerBalanceBNB();
    const alert = await this.alertController.create({
      header: 'Exito',
      message: '<ion-row>' +
        '<ion-col size="5" > </ion-col>' +
        '<ion-col size="2" ><img src="../../../assets/icons/checked.png"/> </ion-col>' +
        '<ion-col size="5" > </ion-col>' +
        '</ion-row>' +
        '<strong style="margin-bottom:5px;">A continuacion se muestran los datos de su transaccion</strong>' +
        ' <ion-row>' +
        '<ion-col size="4" > Orden id: ' + paquete.orderId + ' </ion-col>' +
        ' <ion-col size="4" > Estado: ' + paquete.status + ' </ion-col>' +
        ' <ion-col size="4" > Tipo Op: ' + paquete.side + ' </ion-col>' +
        ' </ion-row>' +
        ' <ion-row>' +
        '<ion-col size="6" > Cantidad ejecutada: ' + paquete.executedQty + ' </ion-col>' +
        ' <ion-col size="6" > Cantidad acumulativa: ' + paquete.cummulativeQuoteQty + ' </ion-col>' +
        ' </ion-row>' +
        ' <ion-row>' +
        '<ion-col size="4" > Tipo orden: ' + paquete.type + ' </ion-col>' +
        ' <ion-col size="4" > Simbolo: ' + paquete.symbol + ' </ion-col>' +
        ' <ion-col size="4" > Tiempo tx: ' + this.devolverTiempoFormateado(paquete.transactTime) + 'secs </ion-col>' +
        ' </ion-row>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Vale',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  private devolverTiempoFormateado(epoch: any) {
    let date = new Date(epoch);
    return (date.getSeconds() / 100);
  }

  private devolverTxtAgregarOperacionPortfolio(): string {
    if (this.agregarAPortfolio) {
      return 'será agregada al portofolio general de inversiones';
    } else {
      return 'no será agregada al portofolio general de inversiones;'
    }
  }
  async cantidadDemasiadaBajaAlert() {

    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'No dispone de una cantidad suficiente para realizar la transaccion',
      message: 'Ha introducido una cantidad demasiado baja o incorrecta! Revise el siguiente link para conocer más detalles : <a target="_blank" href="https://support.binance.com/hc/en-us/articles/115000594711-Trading-Rule">https://support.binance.com/hc/en-us/articles/115000594711-Trading-Rule</a>',
      buttons: ['OK']
    });

    await alert.present();

  }

  async noTieneFondosAlert() {

    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'No tiene los fondos minimos para realizar la transaccion!',
      message: 'No se alarme! Compruebe que tiene fondos y vuelva a realizar la transaccion, tenga en cuenta que Binance carga una pequeña comision, por lo que intente no vender/comprar el 100% de sus fondos para poder pagar la comision.',
      buttons: ['OK']
    });

    await alert.present();

  }

  public esNumero(numero: any) {
    let numTMP: any = (numero + "").split(" ")[0];
    numTMP = parseFloat(numTMP);
    if (!isNaN(numTMP)) {
      return true;
    } else {
      return false;
    }
  }
  private cargarPrecioBinance(esTicker: boolean): void {

    this.colorMensajeRecibido = 'medium';
    let paquete = this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey)
    this.apiservice.recuperarPrecioActivo(paquete, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
      // console.log("cargado", data)
      if (!isNaN(data) && data != undefined) {
        if (data > this.ultimoPrecio) {
          this.colorMensajeRecibido = "success";
        } else {
          this.colorMensajeRecibido = "danger";
        }
        //let num = parseFloat(data);
        this.ultimoPrecio = data;
        this.precioActivoSeleccionado = this.ultimoPrecio + " " + this.seleccionContra.siglas;

        if (!esTicker) {
          this.precioLimitOrder = this.precioActivoSeleccionado.split(" ")[0];
        }
      }
    }, (error) => {
      console.log(error)
      this.colorMensajeRecibido = "danger";
      this.precioActivoSeleccionado = "Ha habido un error." + "\n" + " Prueba a introducir otro par de criptomoneda."

    }, () => {
    })
  }

  public abrirSeleccion(): void {
    this.presentModal();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando precios',
      duration: 10000
    });
    await loading.present();
  }

  async presentModal() {
    const modal = await this.modalctrl.create({
      component: AgregarActivosCompComponent,
      componentProps: { paquete: { mostrarDivisas: true, mostrarStock: false, mostrarCripto: true, desactiletSliding: true, esModal: true } }
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data)
        if (data.data != undefined) {
          if (this.eRbase) {
            this.seleccionBase = data.data;
            this.cantidadBase = this.listaBalanceBinanceUsuario[data.data.siglas].available;
          } else if (this.eRcontra) {
            this.seleccionContra = data.data;
            this.cantidadContra = this.listaBalanceBinanceUsuario[data.data.siglas].available;
          }
          this.valorCantidad = 0;
          this.cargarPrecioBinance(false);
          this.actualizarAcompanyante();
        }
      });

    await modal.present();

  }

  public cambiarSimbolos(): void {

    this.observablePrecios.unsubscribe();
    this.presentLoading();
    let tmpBase = this.seleccionBase;
    this.seleccionBase = this.seleccionContra;
    this.seleccionContra = tmpBase;

    let tmpCantidad = this.cantidadBase;
    this.cantidadBase = this.cantidadContra;
    this.cantidadContra = tmpCantidad;
    this.cargarPrecioBinance(false);

    this.observablePrecios = interval(5000).subscribe((data) => {
      this.cargarPrecioBinance(true)
    })

  }

  public generarIMG(activoOBJ: any): string {
    if (activoOBJ.tipo == "Criptomoneda") {
      return this.baseURI + "img-activos/" + activoOBJ.nombre + ".png"
    } else if (activoOBJ.tipo == "divisa") {
      return this.baseURI + "img-forex/" + activoOBJ.nombre + ".png"
    } else {
      return this.baseURI + "logoepsilonoluminado.png";
    }
  }

  public updateUrl(event: any) {
    console.log(event)
  }

}
