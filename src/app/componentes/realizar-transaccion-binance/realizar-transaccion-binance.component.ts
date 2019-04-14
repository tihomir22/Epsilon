import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { AgregarActivosCompComponent } from '../agregar-activos-comp/agregar-activos-comp.component';
import { ApisService } from 'src/app/servicios/apis.service';
import { timer, interval } from 'rxjs';
import { ActivoBalance } from 'src/app/modales/gestion-api/modelos/ActivoBalance';

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
  public colorMensajeRecibido: string = "success";
  public ultimoPrecio: number = 0;
  public valorCantidad: number = 0.0001;
  public tipoOperacion: string = "compra";
  public tipoOrden: string = "market";
  public listaBalanceBinanceUsuario: ActivoBalance[];




  private baseURI: string = "http://dembow.gearhostpreview.com/";

  constructor(private modalctrl: ModalController, private apiservice: ApisService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.cargarPrecioBinance();

    this.apiservice.obtenerBalanceBinance(this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey)).subscribe((data: ActivoBalance[]) => {
      this.listaBalanceBinanceUsuario = data;
    })

    interval(5000).subscribe((data) => {
      this.cargarPrecioBinance()
    })

  }
  public realizarOperacion(): void {
    console.log("operacion " + this.tipoOperacion)
    console.log("orden " + this.tipoOrden)
    console.log("activo " + this.seleccionBase)
    console.log("activo contra " + this.seleccionContra)

  }
  public comprobarValor(): void {
    if (this.valorCantidad > 100) {
      this.valorCantidad = 100;
    }
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
  private cargarPrecioBinance(): void {

    this.colorMensajeRecibido = 'medium';
    let paquete = this.apiservice.devolverPaquete(this.apiservice.getApi().apiKey, this.apiservice.getApi().privateKey)
    this.apiservice.recuperarPrecioActivo(paquete, this.seleccionBase.siglas, this.seleccionContra.siglas).subscribe((data: any) => {
      if (!isNaN(data)) {
        if (data > this.ultimoPrecio) {
          this.colorMensajeRecibido = "success";
        } else {
          this.colorMensajeRecibido = "danger";
        }
        let num = parseFloat(data);
        this.ultimoPrecio = num;
        this.precioActivoSeleccionado = num.toFixed(2) + " $";
      }
    }, (error) => {
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
      duration: 2000
    });
    await loading.present();
  }

  async presentModal() {
    const modal = await this.modalctrl.create({
      component: AgregarActivosCompComponent,
      componentProps: { paquete: { mostrarDivisas: true, mostrarStock: false, mostrarCripto: true, desactivarSliding: true, esModal: true } }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (this.eRbase) {
          this.seleccionBase = data.data;
        } else if (this.eRcontra) {
          this.seleccionContra = data.data;
        }
        this.cargarPrecioBinance();
      });

    await modal.present();

  }

  public cambiarSimbolos(): void {
    let tmpBase = this.seleccionBase;
    this.seleccionBase = this.seleccionContra;
    this.seleccionContra = tmpBase;
    this.cargarPrecioBinance();
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
