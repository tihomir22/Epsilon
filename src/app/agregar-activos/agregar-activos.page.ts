import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import "rxjs/add/operator/debounceTime";
import "hammerjs"; // HAMMER TIME
import { HammerGestureConfig } from "@angular/platform-browser";
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';


@Component({
  selector: 'app-agregar-activos',
  templateUrl: './agregar-activos.page.html',
  styleUrls: ['./agregar-activos.page.scss'],
})
export class AgregarActivosPage extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }
  data: UsuarioInterface;

  searchTerm: string;

  copiaData: Array<any> = new Array;
  activos_cripto: Array<any> = new Array;
  activos_stock: Array<any> = new Array;
  searching: any = false;
  startPage: Number;
  paginationLimit: Number;
  startPageStocks: Number;
  paginationLimitStocks: Number;


  private baseURI: string = "http://dembow.gearhostpreview.com/";


  constructor(public alertController: AlertController, public service: ServiceLoginDashboardService, public http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super();
    this.data = service.getDestn();
    this.startPage = 0;
    this.paginationLimit = 5;
    this.startPageStocks = 0;
    this.paginationLimitStocks = 5;
  }

  ngOnInit() {
    this.service.cargarActivos().subscribe(async (data: any) => {
      console.dir(data);
      if (data == null || data == false) {
        this.sendNotification("No existen activos...");
      } else {
        await this.service.actualizarActivos(data)
        this.clasificarResultado(data);
      }
    },
      (error: any) => {
        this.sendNotification("Hubo un error inesperado...");
      });;
  }


  showMoreItems(opcion: string) {
    if (opcion == "cripto") {
      this.paginationLimit = Number(this.paginationLimit) + 3;
    } else if (opcion == "stocks") {
      this.paginationLimitStocks = Number(this.paginationLimitStocks) + 3;
    }
  }
  showLessItems(opcion: string) {
    if (opcion == "cripto") {
      this.paginationLimit = Number(this.paginationLimit) - 3;
    } else if (opcion == "stocks") {
      this.paginationLimitStocks = Number(this.paginationLimitStocks) - 3;
    }
  }




  filtrarActivos() {
    this.searching = true;
    let array: Array<any> = new Array;
    this.copiaData.forEach(element => {
      let nombre: string = element.nombre;
      console.dir(nombre);
      if (nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        console.dir(nombre + " contiene " + this.searchTerm);
        array.push(element);
      }
    });
    console.dir(array.length);
    this.clasificarResultado(array);

  }
  async presentAlert(activo: any) {
    const alert = await this.alertController.create({
      header: activo.nombre,
      subHeader: activo.tipo,
      message: activo.descripcion,
      buttons: ['OK']
    });

    await alert.present();
  }



  generarImgCripto(activo) {
    return this.baseURI + "img-activos/" + activo.nombre + ".png";
  }
  generarImgStock(activo) {
    return this.baseURI + "img-activos-stocks/" + activo.nombre + ".png";
  }


  clasificarResultado(data: any) {
    if (this.copiaData.length == 0) {
      this.copiaData = data;
    }
    if (this.activos_cripto.length > 0) {
      this.activos_cripto.length = 0;
    }
    if (this.activos_stock.length > 0) {
      this.activos_stock.length = 0;
    }

    this.data = data;
    data.forEach(element => {
      if (element.tipo == "Criptomoneda") {
        this.activos_cripto.push(element);
      }
      if (element.tipo == "Stock") {
        this.activos_stock.push(element);
      }
    });
    this.searching = false;
  }
  abrirDetalles(activo: any) {
    this.service.setActivo(activo);
    this.service.setTipoAdquisicion("indeterminada");
    this.navCtrl.navigateForward("/detalles-activo");
    console.dir(activo.nombre);
  }
  comprar(item: any) {
    this.service.setActivo(item);
    this.service.setTipoAdquisicion("comprar");
    this.navCtrl.navigateForward("/detalles-activo");
    console.dir(item.nombre);
  }
  vender(item: any) {
    this.service.setActivo(item);
    this.service.setTipoAdquisicion("vender");
    this.navCtrl.navigateForward("/detalles-activo");
    console.dir(item.nombre);
  }
  buscar() {
    console.dir("vamos a buscar loco" + this.searchTerm);
  }
  mostrarDescripcion(activo: any) {
    console.dir(activo.descripcion);
  }

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
