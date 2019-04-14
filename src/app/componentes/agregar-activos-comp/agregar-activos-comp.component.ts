import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import "rxjs/add/operator/debounceTime";
import "hammerjs"; // HAMMER TIME
import { HammerGestureConfig } from "@angular/platform-browser";
import { UsuarioInterface } from 'src/app/perfil/class/UsuarioInterface';
import { ServiceLoginDashboardService } from 'src/app/servicios/service-login-dashboard.service';

@Component({
  selector: 'app-agregar-activos-comp',
  templateUrl: './agregar-activos-comp.component.html',
  styleUrls: ['./agregar-activos-comp.component.scss']
})
export class AgregarActivosCompComponent extends HammerGestureConfig implements OnInit {

  buildHammer(element: HTMLElement) {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }


  @Input('mostrarCripto')
  set mostrarCripto(valor: boolean) {
    this._mostrarCripto = valor;
  }
  @Input('mostrarStock')
  set mostrarStock(valor: boolean) {
    this._mostrarStock = valor;
  }
  @Input('mostrarDivisas')
  set mostrarDivisas(valor: boolean) {
    this._mostrarDivisas = valor;
  }

  @Input('esModal')
  set esModal(valor: boolean) {
    this._esModal = valor;
  }

  @Input('desactivarSlidingItems')
  set desactivarSlidingItems(valor: boolean) {
    this._desactivarSliding = valor;
  }
  @Input('paquete')
  set paquete(paquete: any) {
    console.log(paquete)
    this._mostrarCripto = paquete['mostrarCripto'];
    this._mostrarDivisas = paquete['mostrarDivisas'];
    this._mostrarStock = paquete['mostrarStock'];
    this._desactivarSliding = paquete['desactivarSliding'];
    this._esModal = paquete['esModal'];

  }


  data: UsuarioInterface;

  searchTerm: string;
  public _mostrarCripto: boolean = true;
  public _mostrarStock: boolean = true;
  public _mostrarDivisas: boolean = true;
  public _desactivarSliding: boolean = false;
  public _esModal: boolean = true;


  copiaData: Array<any> = new Array;
  public activos_cripto: Array<any> = new Array;
  public activos_stock: Array<any> = new Array;
  public activos_divisas: Array<any> = new Array;
  searching: any = false;
  startPage: Number;
  paginationLimit: Number;
  startPageStocks: Number;
  paginationLimitStocks: Number;
  startPageDivisas: Number;
  paginationLimitDivisas: Number;

  public cargando: boolean = true;

  private baseURI: string = "http://dembow.gearhostpreview.com/";


  constructor(public alertController: AlertController, public loadingController: LoadingController, public modal: ModalController, public service: ServiceLoginDashboardService, public http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super();
    this.data = service.getDestn();
    this.startPage = 0;
    this.paginationLimit = 5;
    this.startPageStocks = 0;
    this.paginationLimitStocks = 5;
    this.startPageDivisas = 0;
    this.paginationLimitDivisas = 5;

  }

  ngOnInit() {
    this.cargarActivosDesdeServidor();
    this.cargarDivisasDeEjemplo();
    console.log(this._esModal)
  }

  public cargarDivisasDeEjemplo(): void {
    this.activos_divisas = [
      { siglas: "USD", nombre: "united-states", tipo: "divisa", desc: "Dolares estadounidenses", img: 'http://dembow.gearhostpreview.com/img-forex/united-states.png' },
      { siglas: "USDT", nombre: "tether", tipo: "Criptomoneda", desc: "Tether USD", img: 'http://dembow.gearhostpreview.com/img-activos/tether.png' },
      { siglas: "EUR", nombre: "european-union", tipo: "divisa", desc: "Moneda europea", img: 'http://dembow.gearhostpreview.com/img-forex/european-union.png' },
      { siglas: "GBP", nombre: "united-kingdom", tipo: "divisa", desc: "Libra estarlina", img: 'http://dembow.gearhostpreview.com/img-forex/united-kingdom.png' },
      { siglas: "AUD", nombre: "australia", tipo: "divisa", desc: "Dolares autralianos", img: 'http://dembow.gearhostpreview.com/img-forex/australia.png' },
      { siglas: "NZD", nombre: "new-zealand", tipo: "divisa", desc: "Dolares neozelandeses", img: 'http://dembow.gearhostpreview.com/img-forex/new-zealand.png' },

    ]
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 10000
    });
    await loading.present();
  }

  public cargarActivosDesdeServidor(): void {
    this.service.cargarActivos().subscribe(async (data: any) => {
      console.dir(data);
      if (data == null || data == false) {
        this.sendNotification("No existen activos...");
      } else {
        await this.service.actualizarActivos(data)
        this.clasificarResultado(data);
      }
      this.cargando = false;
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
    } else if (opcion == "divisas") {
      this.paginationLimitDivisas = Number(this.paginationLimitDivisas) + 3;
    }
  }
  showLessItems(opcion: string) {
    if (opcion == "cripto") {
      this.paginationLimit = Number(this.paginationLimit) - 3;
    } else if (opcion == "stocks") {
      this.paginationLimitStocks = Number(this.paginationLimitStocks) - 3;
    } else if (opcion == "divisas") {
      this.paginationLimitDivisas = Number(this.paginationLimitDivisas) - 3;
    }
  }




  filtrarActivos() {
    this.searching = true;
    let array: Array<any> = new Array;
    this.copiaData.forEach(element => {
      let nombre: string = element.nombre;
      console.dir(nombre);
      if (nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        array.push(element);
      }
    });
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

    if (this._esModal) {
      console.dir("es modal no pasa nada ", activo.nombre);
      this.modal.dismiss(activo)
    } else {
      this.service.setActivo(activo);
      this.service.setTipoAdquisicion("indeterminada");
      this.navCtrl.navigateForward("/detalles-activo");
    }

  }
  comprar(item: any) {
    this.service.setActivo(item);
    this.service.setTipoAdquisicion("comprar");
    this.navCtrl.navigateForward("/detalles-activo");
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

  public cerrarModal(): void {
    this.modal.dismiss();
  }

}

