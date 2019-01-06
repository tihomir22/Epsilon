import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, MenuController, IonItemSliding, LoadingController } from '@ionic/angular';
import 'rxjs/add/operator/map';
import "hammerjs"; // HAMMER TIME
import { HammerGestureConfig } from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends HammerGestureConfig implements OnInit {

  data: any;
  relaciones: Array<any> = new Array;
  arrayActivos: Array<any> = new Array;
  public obj: any;
  public hayActivos: boolean = false;

  totalInvertidoBase: any = 0;
  totalInvertidoActual: any = 0;
  porcentajeNum: any;



  buildHammer(element: HTMLElement) {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
  private baseURI: string = "http://dembow.gearhostpreview.com/";

  constructor(public menuCtrl: MenuController,public loadingController: LoadingController, private ref: ChangeDetectorRef, public service: ServiceLoginDashboardService, public http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController) {
    super();
    this.data = this.service.getDestn();
    this.menuCtrl.enable(true);
    // this.cargarActivos();

  }


  ngOnInit() {
    console.dir("me he iniciado")

  }
  ngAfterViewInit(){
    this.loadingController.dismiss()
  }


  ionViewWillEnter() {
    this.presentLoading();
    this.reiniciarFinanzasUsuario();
    this.cargarActivos().subscribe((data: any) => {
      
      if (data == null || data == false) {
        this.sendNotification("No tiene activos el usuario...");
        this.hayActivos = false;
      } else {
        this.hayActivos = true;
        console.dir(data);
        data.forEach(async relacion => {
          await this.procesarActivo(relacion.id_activo_ajeno, relacion)
        });
        
      }
    },
      (error: any) => {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos = false;
      });

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    return await loading.present();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.service.actualizarActivos(this.arrayActivos)
    this.cargarActivos().subscribe((data: any) => {
      if (data == null || data == false) {
        this.sendNotification("No tiene activos el usuario...");
        this.hayActivos = false;
      } else {

        this.hayActivos = true;
        console.dir(data); 
        data.forEach(async relacion => {
          await this.procesarActivo(relacion.id_activo_ajeno, relacion)
        });
        event.target.complete();
      }
    },

      (error: any) => {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos = false;
      });
  }


  seleccionarItem() {
    console.dir("me seleccionaste");
  }
  reiniciarFinanzasUsuario() {
    this.totalInvertidoBase = 0;
    this.totalInvertidoActual = 0;
    this.porcentajeNum = '';
  }

  expandItem(item: any) {
    var actual: string = document.getElementById("dembow" + item.id_unico).style.display;
    if (actual == "none") {
      document.getElementById("dembow" + item.id_unico).style.display = "block";
      item.expanded = true;
      document.getElementById("sliding" + item.id_unico).setAttribute("disabled", "disabled");
    } else {
      document.getElementById("dembow" + item.id_unico).style.display = "none";
      item.expanded = false;
      document.getElementById("sliding" + item.id_unico).removeAttribute("disabled");
    }
  }


  cargarActivos() {
    this.arrayActivos.length = 0;
    this.reiniciarFinanzasUsuario();
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "activos", "id_usuario": this.data.idepsilon_usuarios },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)

      

  }
  procesarActivo(id: any, relacion: any) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_activo", "id_activo": id },
      url: any = this.baseURI + "retrieve-data.php";
    console.dir(id);
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((activoRec: any) => {
        if (activoRec == null || activoRec == false) {
          this.sendNotification("No se encuentra el activo");
        } else {

          if (activoRec.tipo == "Criptomoneda") {
            var obj: any;
            this.service.recuperarPrecioCryptoCompare(activoRec.siglas, relacion.siglas_operacion)
              .subscribe(response => {
                obj = response;

                activoRec.precio = obj[activoRec.siglas][relacion.siglas_operacion];
                activoRec['precio_compra'] = relacion.precio_compra;
                activoRec['id_unico'] = relacion.id;
                activoRec['PAR_FULL'] = activoRec.siglas + "/" + relacion.siglas_operacion;
                activoRec['id_relacion'] = relacion.id;
                activoRec['expanded'] = false;
                activoRec['exchange'] = relacion.exchange;
                activoRec['fecha_operacion'] = relacion.fecha_operacion;
                activoRec['tipoRelacion'] = relacion.tipo;
                activoRec['cantidad'] = relacion.cantidad;
                activoRec['contrapartida'] = relacion.siglas_operacion;


                this.arrayActivos.push(activoRec);
                this.actualizarFinanzasUsuario(relacion.precio_compra, activoRec.precio, relacion.cantidad,relacion.siglas_operacion,relacion.tipo);
                this.calcularPorcentajeActivo(activoRec);
                this.service.actualizarPrecioActivo(activoRec.id, obj[activoRec.siglas][relacion.siglas_operacion]);
              });
          }else if(activoRec.tipo=="Stock"){
            this.service.recuperarPrecioIEXTrading(activoRec.siglas).subscribe(response=>{
              obj = response;
              activoRec.precio = obj;
              activoRec['precio_compra'] = relacion.precio_compra;
              activoRec['id_unico'] = relacion.id;
              activoRec['PAR_FULL'] = activoRec.siglas + "/" + relacion.siglas_operacion;
              activoRec['id_relacion'] = relacion.id;
              activoRec['expanded'] = false;
              activoRec['exchange'] = relacion.exchange;
              activoRec['fecha_operacion'] = relacion.fecha_operacion;
              activoRec['tipoRelacion'] = relacion.tipo;
              activoRec['cantidad'] = relacion.cantidad;
              activoRec['contrapartida'] = relacion.siglas_operacion;

              this.arrayActivos.push(activoRec);
              this.actualizarFinanzasUsuario(relacion.precio_compra, activoRec.precio, relacion.cantidad,relacion.siglas_operacion,relacion.tipo);
              this.calcularPorcentajeActivo(activoRec);
              this.service.actualizarPrecioActivo(activoRec.id, obj);
            })

          }

        }
      },
        (error: any) => {
          this.sendNotification("Hubo un error inesperado...");
        });

  }

  
  public actualizarFinanzasUsuario(precioInicial: number, precioActual: number, cantidad: number,siglas:string,tipo:string) { // metodo que usamos para actualizar la información financiera del usuario
    if(siglas=="USD" || siglas=="USDT"){

      if(tipo.toLocaleLowerCase()=="vender"){
        var calculoNegativo=(+precioInicial - +precioActual);
        if(calculoNegativo>0){ // la operacion de venta esta obteniendo beneficios
          precioActual=(+precioInicial + +calculoNegativo);
        }else{
          precioActual=(+precioInicial - +calculoNegativo);
        }
      }
      this.totalInvertidoBase = (+this.totalInvertidoBase + (+precioInicial * +cantidad)).toFixed(2);
      this.totalInvertidoActual = (+this.totalInvertidoActual + (+precioActual * +cantidad)).toFixed(2);
      // si es venta precioInicial 140 precioActual 100 ( 40 beneficio )
      var resta = this.totalInvertidoBase - this.totalInvertidoActual;
      if (resta > 0) {
        this.porcentajeNum = "-" + (resta * 100 / this.totalInvertidoBase).toFixed(2) + "%";
      
      } else {
        var rentaNum = (resta * 100 / this.totalInvertidoBase).toFixed(2);
        this.porcentajeNum = "+" + (rentaNum.substr(1, rentaNum.length));
      }

    }else{
      this.service.recuperarPrecioCryptoCompare(siglas,"USD").subscribe(respuesta=>{ // XRP/ETH para saber los ETH que necesitamos para comprar 1 XRP
        var precioEquivaleEnDolares=respuesta[siglas]['USD'];
        this.totalInvertidoBase = (+this.totalInvertidoBase + ((+precioInicial * +precioEquivaleEnDolares) * +cantidad)).toFixed(2);
        this.totalInvertidoActual = (+this.totalInvertidoActual + ((+precioActual * +precioEquivaleEnDolares) * +cantidad)).toFixed(2);
        var resta = this.totalInvertidoBase - this.totalInvertidoActual;
        if (resta > 0) {
          this.porcentajeNum = "-" + (resta * 100 / this.totalInvertidoBase).toFixed(2) + "%";
        } else {
          var rentaNum = (resta * 100 / this.totalInvertidoBase).toFixed(2);
          this.porcentajeNum = "+" + (rentaNum.substr(1, rentaNum.length));
        }  
      })
    }
      
    
    
  }

  public calcularPorcentajeActivo(item: any) {
    var precioActual = item.precio;
    var precioCompra = item.precio_compra;

    if(item.tipoRelacion.toLocaleLowerCase()=="vender"){
      var calculoNegativo=(+precioCompra - +precioActual);
      if(calculoNegativo>0){ // la operacion de venta esta obteniendo beneficios
        precioActual=(+precioCompra + +calculoNegativo);
      }else{
        precioActual=(+precioCompra - +calculoNegativo);
      }
    }
    var resta = precioCompra - precioActual;
    if (resta > 0) {
      console.dir("Hay perdidas" + (resta * 100 / precioCompra).toFixed(1) + "%");
      item['color'] = "rojo";
      item['rentabilidad'] = "-" + (resta * 100 / precioCompra).toFixed(1) + "%";
    } else {
      console.dir("Hay ganancias! " + (resta * 100 / precioCompra).toFixed(1) + "%");
      item['color'] = "verde";
      var rentaNum = (resta * 100 / precioCompra).toFixed(1);
      var rentabilidad = (rentaNum.substr(1, rentaNum.length));
      item['rentabilidad'] = "+" + rentabilidad + "%";
    }




  }
  tenyirLabel(item: any) {
    if (item != undefined) {
      if (item.charAt(0) == "-") {
        return "danger";
      } else {
        return "success";
      }
    }
  }
  eliminar_activo(activo: any) {
    const index = this.arrayActivos.indexOf(activo);
    this.arrayActivos.splice(index, 1);
    this.service.eliminarRelacion(activo.id_relacion);
    if (this.arrayActivos.length == 0) {
      this.hayActivos = false;
    }
  }

  agregarNuevosActivos() {
    this.navCtrl.navigateForward("/agregar-activos");
  }

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  getPrecioCompra(activo: any) {
    this.relaciones.forEach(relacion => {
      if (relacion.id_activo_ajeno == activo.id) {
        return relacion.precio_compra;
      }
    });
  }

  generarImgCripto(activo) {
    return this.baseURI + "img-activos/" + activo.nombre + ".png";
  }
  generarImgStock(activo) {
    return this.baseURI + "img-activos-stocks/" + activo.nombre + ".png";
  }

}


