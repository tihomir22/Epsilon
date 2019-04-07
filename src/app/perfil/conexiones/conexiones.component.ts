import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/servicios/apis.service';
import { ServiceLoginDashboardService } from 'src/app/servicios/service-login-dashboard.service';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { GestionApiComponent } from "../../modales/gestion-api/gestion-api.component";
import { exchangeClass } from 'src/app/modales/gestion-api/modelos/exchangeClass';
import { Observable } from 'rxjs';
import { VistaRapidaApiComponent } from 'src/app/modales/vista-rapida-api/vista-rapida-api.component';
import { apiInterfaz } from 'src/app/modales/vista-rapida-api/models/apiInterfaz';
import { PopoverOpcionesComponent } from '../popover-opciones/popover-opciones.component';


@Component({
  selector: 'app-conexiones',
  templateUrl: './conexiones.component.html',
  styleUrls: ['./conexiones.component.scss']
})
export class ConexionesComponent implements OnInit {
  private arrayActivos: Array<any>;
  public modalAbierto: boolean = false;
  public arrayTodosLosEchangesRegistrados: Array<exchangeClass> = new Array;
  public arrayClavesApi: Array<any> = new Array;

  constructor(private servicio: ServiceLoginDashboardService, private apiservice: ApisService, public modalController: ModalController, private toastCtrl: ToastController, private popover: PopoverController) { }

  ngOnInit() {
    this.modalAbierto = true;
    this.arrayActivos = this.servicio.getArrayActivosCompletos();
    this.cargarTodasLasApis();

    this.apiservice.getTodosLosExchanges().subscribe((data) => {
      this.arrayTodosLosEchangesRegistrados = data
      console.log(this.arrayTodosLosEchangesRegistrados)

    })
  }
  async ver(e: any, item: apiInterfaz) {
    e.stopPropagation();
    const modal = await this.modalController.create({
      component: VistaRapidaApiComponent,
      componentProps: { api: item }
    });
    modal.onDidDismiss().then((data) => {
      const dembow = data;
      if (dembow.data != undefined) {
        if (dembow.data.result == "dembow") {
          this.cargarTodasLasApis();
        }
      }
    })

    return await modal.present();
  }
  public eliminar(e: any, item: apiInterfaz, indice: number): void {
    console.log(item)
    e.stopPropagation();
    this.apiservice.eliminarClaveApi(item.id).subscribe((data) => {
      console.log(this.presentToast("Fue eliminado con exito"))
      this.arrayClavesApi.splice(indice, 1);
    })
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


  async presentModal() {
    this.modalAbierto = true;
    let modal = await this.modalController.create({
      component: GestionApiComponent
    });
    modal.onDidDismiss().then((data: any) => {
      this.cargarTodasLasApis();
    })
    return await modal.present();
  }

  public cargarTodasLasApis(): void {
    this.apiservice.recuperarClavesAPIbyIDUSER(this.servicio.getDestn().idepsilon_usuarios).subscribe((data) => {
      this.arrayClavesApi.length = 0;
      this.arrayClavesApi.push(data);
      this.arrayClavesApi = this.arrayClavesApi[0];

      console.log(data)
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("terminada la carga", this.arrayClavesApi)
      this.modalAbierto = false;
    })
  }

  public recuperarImagenExchange(id_exchange: number): string {
    let exchange: exchangeClass = null;
    for (let i = 0; i < this.arrayTodosLosEchangesRegistrados.length; i++) {
      if (this.arrayTodosLosEchangesRegistrados[i].id = id_exchange) {
        exchange = this.arrayTodosLosEchangesRegistrados[i];
      }
    }
    if (exchange != null) {
      return exchange.imagen_icono;
    }
  }
  async abrirDetallesApi(e: any, api: apiInterfaz): Promise<any> {
    this.apiservice.setApi(api);
    const popover = await this.popover.create({
      component: PopoverOpcionesComponent,
      event: e,
      translucent: true
    });
    return await popover.present();


  }




}
