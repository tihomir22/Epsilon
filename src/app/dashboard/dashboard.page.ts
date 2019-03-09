import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, MenuController, IonItemSliding, LoadingController } from '@ionic/angular';
import 'rxjs/add/operator/map';
import "hammerjs"; // HAMMER TIME
import { HammerGestureConfig } from "@angular/platform-browser";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends HammerGestureConfig implements OnInit {

  data: any;
  cambiado: boolean = false;
  relaciones: Array<any> = new Array;
  //arrayActivos: Array<any> = new Array;
  arrayDiasGraficoCripto: Array<any> = new Array;
  arrayDiasGraficoStock: Array<any> = new Array;
  arrayDiasTotal: Array<any> = new Array;
  public obj: any;
  public hayActivos: boolean = false;

  totalInvertidoBase: any = 0;
  totalInvertidoActual: any = 0;
  porcentajeNum: any;
  imagenUsuario: any;

  activeCurrency: any;

  @ViewChild('barCanvas') barCanvas: { nativeElement: any; };

  barChart: any;

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

  constructor(public menuCtrl: MenuController, public loadingController: LoadingController, private ref: ChangeDetectorRef, public service: ServiceLoginDashboardService, public http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController) {
    super();
    this.data = this.service.getDestn();
    this.menuCtrl.enable(true);
    this.activeCurrency = "USD";
    console.dir("dembow")
    console.dir(this.data['foto_usuario'])
    this.imagenUsuario = this.data['foto_usuario'];
    // this.cargarActivos();

  }


  ngOnInit() {

    this.presentLoading();
    console.dir("me he iniciado")

   // setTimeout(() => console.log(this.service.getArrayActivos()), 3000);

  }
  ngAfterViewInit() {
    this.loadingController.dismiss()

  }



  ionViewWillEnter() {

    this.reiniciarFinanzasUsuario();
    this.cargarActivos().subscribe((data: any) => {

      if (data == null || data == false) {
        this.sendNotification("No tiene activos el usuario...");
        this.hayActivos = false;
      } else {
        this.hayActivos = true;
        console.dir(data);
        data.forEach(relacion => {
          this.procesarActivo(relacion.id_activo_ajeno, relacion)

        })

      }
    },
      err => {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos = false;
      },

    )
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 2000
    });
    return await loading.present();
  }


  async doRefresh(event) {
    this.arrayDiasTotal.length = 0;
    this.presentLoading();

    console.log('Begin async operation');
    this.service.actualizarActivos(this.service.getArrayActivos())
    this.cargarActivos().subscribe((data: any) => {
      if (data == null || data == false) {
        this.sendNotification("No tiene activos el usuario...");
        this.hayActivos = false;
      } else {

        this.hayActivos = true;
        console.dir(data);
        data.forEach(relacion => {
          this.procesarActivo(relacion.id_activo_ajeno, relacion)
        });
        if (event != undefined) {
          event.target.complete();
        }
      }
    },

      (error: any) => {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos = false;
      });


    setTimeout(() => {
      this.loadingController.dismiss()
    }, 1500);
  }
  cambiarOrden() {
    if (this.cambiado == false) {
      this.arrayDiasTotal.reverse();
      this.cambiado = true;
    }
  }

  devolverDiaEnString(int: number) {
    switch (int) {
      case 0:
        return "Domingo"
      case 1:
        return "Lunes"
      case 2:
        return "Martes"
      case 3:
        return "Miercoles"
      case 4:
        return "Jueves"
      case 5:
        return "Viernes"
      case 6:
        return "Sabado"
      default:
        break;
    }
  }


  generarChart() {

    var arrayDias: Array<String> = new Array();
    for (let i = 6; i >= 0; i--) { // metodo usado para calcular los labels para el grafico de los dias anteriores al actual
      var yesterday = new Date(new Date().setDate(new Date().getDate() - i));
      arrayDias.push(this.devolverDiaEnString(yesterday.getDay()));
    }
    // console.dir(arrayDias)

    if (this.barChart) {
      this.barChart.destroy();
    }
    //var arrayAux=this.arrayDiasTotal.reverse();
    //console.dir("recibido " + arrayAux)
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: arrayDias,
        datasets: [{
          label: 'Rendimiento total en dolares',
          data: this.arrayDiasTotal,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          fill: false,
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
        options: {
          legend: {
            display: false
          },
          responsive: true,
          title: {
            display: true,
            text: 'Rendimiento total'
          },
          tooltips: {
            mode: 'index',
            intersect: false,

          },
          hover: {
            mode: 'dataset',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: false,

            }],
            yAxes: [{
              display: false,
            }]
          }

        }

      }
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
//    this.arrayActivos.length = 0;

    this.service.getArrayActivos().length=0;
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
          var dias_chart: Array<any> = new Array();
          activoRec['array_dias_chart'] = dias_chart;
          if (activoRec.tipo == "Criptomoneda") {
            var obj: any;
            this.service.recuperarPrecioCryptoCompare(activoRec.siglas, relacion.siglas_operacion)
              .subscribe(response => {
                obj = response;
                activoRec.precio = obj[activoRec.siglas][relacion.siglas_operacion];
                this.iniciarValoresActivo(activoRec, relacion)
                this.service.getArrayActivos().push(activoRec);
                this.actualizarFinanzasUsuario(relacion.precio_compra, activoRec.precio, relacion.cantidad, relacion.siglas_operacion, relacion.tipo);
                this.calcularPorcentajeActivo(activoRec);
                this.service.actualizarPrecioActivo(activoRec.id, obj[activoRec.siglas][relacion.siglas_operacion]);
                //funcion para generar un array con los ultimos datos historicos de un activo
                this.añadirActivoAGrafico(activoRec)

              });


          } else if (activoRec.tipo == "Stock") {
            this.service.recuperarPrecioIEXTrading(activoRec.siglas).subscribe(response => {
              obj = response;
              activoRec.precio = obj;
              this.iniciarValoresActivo(activoRec, relacion)
              this.service.getArrayActivos().push(activoRec);
              this.actualizarFinanzasUsuario(relacion.precio_compra, activoRec.precio, relacion.cantidad, relacion.siglas_operacion, relacion.tipo);
              this.calcularPorcentajeActivo(activoRec);
              this.service.actualizarPrecioActivo(activoRec.id, obj);
              //funcion para generar un array con los ultimos datos historicos de un activo
              this.añadirActivoAGrafico(activoRec)

            })

          }



        }
      },
        (error: any) => {
          this.sendNotification("Hubo un error inesperado...");
        },
        () => {
          console.dir("Nos hemos terminado de cargar weeeyy!!")
        },
      )
  }

  añadirActivoAGrafico(activoRec) {
    this.service.getHistoricalDataSemanal(activoRec.siglas, activoRec.tipo).subscribe(respuesta => {

      activoRec['historic_daily'] = respuesta;
      console.dir(activoRec['historic_daily'])
      this.procesarArrayDeDiasChart7(activoRec);

      if (this.arrayDiasTotal.length == 0) {
        this.arrayDiasTotal = new Array(0, 0, 0, 0, 0, 0, 0);
        console.dir("entro en inicio array total " + this.arrayDiasTotal)
      }

      if (activoRec.tipo == "Criptomoneda") {
        if (this.arrayDiasGraficoCripto.length == 0) {
          this.arrayDiasGraficoCripto = new Array(0, 0, 0, 0, 0, 0, 0);
          console.dir("entro en inicio array cripto " + this.arrayDiasGraficoCripto)
        }

        for (let i = 0; i < this.arrayDiasGraficoCripto.length; i++) {
          if (activoRec['tipoRelacion'].toLowerCase() == "vender") {
            console.dir("detectada venta");
            this.arrayDiasGraficoCripto[i] = (+this.arrayDiasGraficoCripto[i] + this.calcularPrecioActivoGrafico(activoRec, activoRec['array_dias_chart'][i]) * +activoRec['cantidad']).toFixed(2);
            this.arrayDiasTotal[i] = (+this.arrayDiasTotal[i] + this.calcularPrecioActivoGrafico(activoRec, activoRec['array_dias_chart'][i]) * +activoRec['cantidad']).toFixed(2);
          } else {
            this.arrayDiasGraficoCripto[i] = (+this.arrayDiasGraficoCripto[i] + (+activoRec['array_dias_chart'][i] * +activoRec['cantidad'])).toFixed(2);
            this.arrayDiasTotal[i] = (+this.arrayDiasTotal[i] + (+activoRec['array_dias_chart'][i] * +activoRec['cantidad'])).toFixed(2);
          }
          console.dir("sumando " + this.arrayDiasTotal[i] + " junto a " + activoRec['array_dias_chart'][i] + "cantidad " + activoRec['cantidad'])
        }

      } else if (activoRec.tipo == "Stock") {
        if (this.arrayDiasGraficoStock.length == 0) {
          this.arrayDiasGraficoStock = new Array(0, 0, 0, 0, 0, 0, 0);
          console.dir("entro en inicio array stock " + this.arrayDiasGraficoStock)
        }
        for (let i = 0; i < this.arrayDiasGraficoStock.length; i++) {
          if (activoRec['tipoRelacion'].toLowerCase() == "vender") {
            console.dir("detectada venta");
            this.arrayDiasTotal[i] = (+this.arrayDiasTotal[i] + this.calcularPrecioActivoGrafico(activoRec, activoRec['array_dias_chart'][i]) * +activoRec['cantidad']).toFixed(2);
            this.arrayDiasGraficoStock[i] = (+this.arrayDiasGraficoStock[i] + this.calcularPrecioActivoGrafico(activoRec, activoRec['array_dias_chart'][i]) * +activoRec['cantidad']).toFixed(2);
          } else {
            this.arrayDiasTotal[i] = (+this.arrayDiasTotal[i] + (+activoRec['array_dias_chart'][i] * +activoRec['cantidad'])).toFixed(2);
            this.arrayDiasGraficoStock[i] = (+this.arrayDiasGraficoStock[i] + (+activoRec['array_dias_chart'][i] * +activoRec['cantidad'])).toFixed(2);
          }
          console.dir("sumando " + this.arrayDiasTotal[i] + " junto a " + activoRec['array_dias_chart'][i])
        }

      }
      this.generarChart()

    });

  }

  calcularPrecioActivoGrafico(activoRec, precioVivo) {
    var resultado = 0;
    var calculoNegativo = (+activoRec['precio_compra'] - +precioVivo);
    if (calculoNegativo > 0) { // la operacion de venta esta obteniendo beneficios
      resultado = (+activoRec['precio_compra'] + +calculoNegativo);
    } else {
      resultado = (+activoRec['precio_compra'] - +calculoNegativo);
    }
    return resultado;
  }


  iniciarValoresActivo(activoRec: any, relacion: any) {
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
  }

  public procesarArrayDeDiasChart7(activo: any) {
    if (activo.tipo == "Criptomoneda") {
      var aux: Array<any> = activo['historic_daily']['Data'].map(a => a.close);
    } else if (activo.tipo == "Stock") {
      var aux: Array<any> = activo['historic_daily'].map(a => a.close);
    }
    console.dir(aux)
    aux.length = 7
    for (let i = 0; i < aux.length; i++) {
      activo.array_dias_chart.push(aux[i])
    }


  }


  public actualizarFinanzasUsuario(precioInicial: number, precioActual: number, cantidad: number, siglas: string, tipo: string) { // metodo que usamos para actualizar la información financiera del usuario
    if (siglas == "USD" || siglas == "USDT") {

      if (tipo.toLocaleLowerCase() == "vender") {
        var calculoNegativo = (+precioInicial - +precioActual);
        if (calculoNegativo > 0) { // la operacion de venta esta obteniendo beneficios
          precioActual = (+precioInicial + +calculoNegativo);
        } else {
          precioActual = (+precioInicial - +calculoNegativo);
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

    } else { // Para traducir el precio de un par de criptomoneda a dolares
      this.traducirPrecio(siglas, precioInicial, precioActual, cantidad)
    }



  }
  public traducirPrecio(siglas, precioInicial, precioActual, cantidad) {
    this.service.recuperarPrecioCryptoCompare(siglas, "USD").subscribe(respuesta => { // XRP/ETH para saber los ETH que necesitamos para comprar 1 XRP
      var precioEquivaleEnDolares = respuesta[siglas]['USD'];
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

  public traducirPrecioUsuario(siglasDeseadas, simbolo) {
    const base = this.totalInvertidoBase;
    const actual = this.totalInvertidoActual;

    this.service.getPrecioForexPar(this.activeCurrency, siglasDeseadas).subscribe(respuesta => {
      if (this.activeCurrency.toLowerCase() == siglasDeseadas.toLowerCase()) {
        //this.reiniciarFinanzasUsuario();
        var precio: number = 1;
        console.dir("entro " + siglasDeseadas)
      } else {
        var precio: number = respuesta[0]['price'];
      }
      this.totalInvertidoBase = base * precio;
      this.totalInvertidoActual = actual * precio;
      console.dir(base + " " + actual)
      var resta = base - actual;
      if (resta > 0) {
        this.porcentajeNum = "-" + (resta * 100 / base).toFixed(2) + "%";

      } else {
        var rentaNum = (resta * 100 / base).toFixed(2);
        this.porcentajeNum = "+" + (rentaNum.substr(1, rentaNum.length));
      }

      this.activeCurrency = siglasDeseadas;

    });
  }


  public calcularPorcentajeActivo(item: any) {
    var precioActual = item.precio;
    var precioCompra = item.precio_compra;

    if (item.tipoRelacion.toLocaleLowerCase() == "vender") {
      var calculoNegativo = (+precioCompra - +precioActual);
      if (calculoNegativo > 0) { // la operacion de venta esta obteniendo beneficios
        precioActual = (+precioCompra + +calculoNegativo);
      } else {
        precioActual = (+precioCompra - +calculoNegativo);
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
    const index = this.service.getArrayActivos().indexOf(activo);
    this.service.getArrayActivos().splice(index, 1);
    this.service.eliminarRelacion(activo.id_relacion);
    this.arrayDiasTotal.length = 0;
    if (this.service.getArrayActivos().length == 0) {
      this.hayActivos = false;
      this.reiniciarFinanzasUsuario();
    }
    this.generarChart();
    this.doRefresh(undefined);

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
  generarImgForex(pais: string) {
    return this.baseURI + "img-forex/" + pais + ".png";
  }

}


