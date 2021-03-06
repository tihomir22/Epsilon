import { Component, OnInit, Input } from '@angular/core';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { timer } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-detalles-activo',
  templateUrl: './detalles-activo.page.html',
  styleUrls: ['./detalles-activo.page.scss'],
})
export class DetallesActivoPage implements OnInit {
  activo: any;
  tipo: string;
  usuario: any;
  // "value" passed in componentProps
  formgroup: FormGroup;

  name: AbstractControl;
  exchange: AbstractControl;
  par: AbstractControl;
  fecha: AbstractControl;
  precio: AbstractControl;
  observaciones: AbstractControl;

  /**
   * @name cantidad
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public cantidad: any;

  /**
   * @name idUsuario
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public idUsuario: any;

  /**
   * @name activoId
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public activoId: any;

  /**
   * @name exchangeStr
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public exchangeStr: any;

  /**
   * @name parStr
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public parStr: any = "USD";

  /**
   * @name fechaStr
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public fechaStr: any;

  /**
   * @name observacionesStr
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public observacionesStr: any;

  /**
   * @name precioDouble
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public precioDouble: any;

  public sector: any;
  private _link: string;

  public coinGeckoInfo: any;
  public objectKeys = Object.keys;

  @ViewChild('barCanvas') barCanvas: { nativeElement: any; };

  barChart: any;

  private baseURI: string = "http://dembow.gearhostpreview.com/";



  constructor(private service: ServiceLoginDashboardService,
    public formbuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public tostadita: ToastController,
    public http: HttpClient,
    public router: Router,
    private appBrowser: InAppBrowser,
    private screenOrientation: ScreenOrientation,
    private _element: ElementRef) {
    this.activo = service.getActivo();
    this.tipo = service.getTipoAdquisicion();
    this.usuario = service.getDestn();

    this.formgroup = formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      exchange: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      par: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      fecha: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      observaciones: ['', Validators.maxLength(255)]
    })


    this.name = this.formgroup.controls['name'];
    this.exchange = this.formgroup.controls['exchange'];
    this.par = this.formgroup.controls['par'];
    this.fecha = this.formgroup.controls['fecha'];
    this.precio = this.formgroup.controls['precio'];
    this.observaciones = this.formgroup.controls['observaciones'];
    this.iniciarChart(this.activo.tipo);


  }

  ngOnInit() {
    if (this.activo.tipo == "Stock") {
      this.getInformacionDeStock(this.activo.siglas).subscribe(respuesta => {
        console.dir(respuesta);
        var obj: any;
        obj = respuesta;
        this.exchangeStr = obj.primaryExchange;
        this.sector = obj.sector;
        this.par.setValue("USD");
        this.exchange.setValidators(this.exchangeStr);
      });
    } else if (this.activo.tipo == "Criptomoneda") {
      this.service.requestCoinInfoFromCoinGecko(this.activo.nombre).subscribe((data) => {
        console.log(data)
        this.coinGeckoInfo = data;
      })
    }
    this._enableDynamicHyperlinks();

  }

  private _enableDynamicHyperlinks(): void {
    timer(2000).subscribe((data) => {
      // Query the DOM to find ALL occurrences of the <a> hyperlink tag
      const urls: any = this._element.nativeElement.querySelectorAll('a');

      // Iterate through these
      urls.forEach((url) => {
        // Listen for a click event on each hyperlink found
        url.addEventListener('click', (event) => {
          // Retrieve the href value from the selected hyperlink
          event.preventDefault();
          this._link = event.target.href;

          // Log values to the console and open the link within the InAppBrowser plugin
          console.log('Name is: ' + event.target.innerText);
          console.log('Link is: ' + this._link);
          this._launchInAppBrowser(this._link);
        }, false);
      });
    })
  }

  private _launchInAppBrowser(link: string): void {
    let opts: string = "location=yes,clearcache=yes,hidespinner=no"
    this.appBrowser.create(link, '_blank', opts);
  }

  iniciarChart(tipoGrafico: any) {
    console.dir("entro aqui las singlas son " + this.activo.siglas)
    if (tipoGrafico == "Criptomoneda") {
      this.service.getHistoricalDataMensual(this.activo.siglas, tipoGrafico).subscribe(respuesta => {
        this.generarChartCripto(respuesta);
      })
    } else if (tipoGrafico == "Stock") {
      this.service.getHistoricalDataMensual(this.activo.siglas, tipoGrafico).subscribe(respuesta => {
        this.generarChartStock(respuesta)
      })
    }
  }
  generarChartCripto(respuesta: any) {
    var arrayPrecios: Array<any> = this.filtrarRespuestaPrecios(respuesta['Data'])
    var arrayLabelData: Array<any> = this.filtrarRespuestaFechasLabel(respuesta['Data'])
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: arrayLabelData,
        datasets: [{
          label: this.activo.siglas,
          data: arrayPrecios,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: 'Precio actual ' + arrayPrecios[arrayPrecios.length - 1] + " $"
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
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              display: false
            }
          }]
        }
      }
    });
  }
  generarChartStock(respuesta: any) {

    var arrayPrecios: Array<any> = this.filtrarRespuestaPrecios(respuesta)
    var arrayLabelData: Array<any> = this.filtrarRespuestaFechasLabel(respuesta)
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: arrayLabelData,
        datasets: [{
          label: this.activo.siglas,
          data: arrayPrecios,
          backgroundColor: [
            '#7FDBFF'
          ],
          borderColor: [
            '#001f3f'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Grafico de ' + this.activo.siglas + ' en los ultimos 7dias'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            scaleLabel: {
              display: false,
              labelString: 'Dia'
            }
          }],
          yAxes: [{
            display: false,
            scaleLabel: {
              display: false,
              labelString: 'Valor '
            }
          }]
        }
      }

    });
  }
  filtrarRespuestaPrecios(arrayObjectos: any) {
    var nuevoArray: Array<any> = new Array
    arrayObjectos.forEach(element => {
      nuevoArray.push(element['close'])
    });
    return nuevoArray;
  }
  filtrarRespuestaFechasLabel(arrayObjectos: any) {
    var nuevoArrayFecha: Array<any> = new Array
    arrayObjectos.forEach(element => {
      if (this.activo.tipo == "Criptomoneda") {
        var date = new Date(element['time'] * 1000)
        nuevoArrayFecha.push(date.getDate())
      } else if (this.activo.tipo == "Stock") {
        nuevoArrayFecha.push(element['label'])
      }

    });
    return nuevoArrayFecha;
  }
  getInformacionDeStock(stockName: string) {
    return this.http.get("https://api.iextrading.com/1.0/stock/" + stockName + "/quote");
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'El formulario no es valido!',
      message: 'Vuelve a comprobar los datos del introducidos y vuelve a enviarlos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  public dembow() {
    console.log(this.formgroup.valid)
    if (this.formgroup.valid == false) {
      this.presentAlert();
    } else {
      this.service.permitirCarga = true;
      console.log("No hay error se puede enviar" + this.activo.id + " " + this.usuario.idepsilon_usuarios + " " + this.parStr + " " + this.fechaStr + " " + this.exchangeStr + " " + this.cantidad);
      this.idUsuario = this.usuario.idepsilon_usuarios;
      this.activoId = this.activo.id;
      this.service.anyadirActivoAUsuario(this.idUsuario, this.activo.id, this.tipo, this.precioDouble, this.fechaStr, this.exchangeStr, this.parStr, this.cantidad, this.observacionesStr, 0)
        .subscribe((data: any) => {
          // If the request was successful notify the user
          console.log(`Felicidades se ha agregado el activo correctamente`);
          this.service.sendNotification("Felicidades se ha agregado el activo " + this.parStr + " correctamente")
          this.router.navigate(['dashboard'], { replaceUrl: true });
          //this.navCtrl.goBack();
        },
          (error: any) => {
            console.log(error)
          });


    }
  }




  async mostrarListaExchanges() {

    const alert = await this.alertCtrl.create({
      header: 'Radio',
      inputs: [
        {
          name: 'Binance',
          type: 'radio',
          label: 'Binance',
          value: 'Binance',
          checked: true
        },
        {
          name: 'OKEx',
          type: 'radio',
          label: 'OKEx',
          value: 'OKEx'
        },
        {
          name: 'Huobi',
          type: 'radio',
          label: 'Huobi',
          value: 'Huobi'
        },
        {
          name: 'DigiFinex',
          type: 'radio',
          label: 'DigiFinex',
          value: 'DigiFinex'
        },
        {
          name: 'Bit-Z',
          type: 'radio',
          label: 'Bit-Z',
          value: 'Bit-Z'
        },
        {
          name: 'CoinBene',
          type: 'radio',
          label: 'CoinBene ',
          value: 'CoinBene'
        },
        {
          name: 'HitBTC',
          type: 'radio',
          label: 'HitBTC ',
          value: 'HitBTC'
        },
        {
          name: 'Bitfinex',
          type: 'radio',
          label: 'Bitfinex',
          value: 'Bitfinex'
        },
        {
          name: 'BitForex',
          type: 'radio',
          label: 'BitForex',
          value: 'BitForex'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data: string) => {
            this.exchangeStr = data;
            console.log(this.exchangeStr);
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarListaPares() {

    const alert = await this.alertCtrl.create({
      header: 'Radio',
      inputs: [
        {
          name: this.activo.siglas + '/USDT',
          type: 'radio',
          label: this.activo.siglas + '/USDT',
          value: 'USDT',
          checked: true
        },
        {
          name: this.activo.siglas + '/ETH',
          type: 'radio',
          label: this.activo.siglas + '/ETH',
          value: 'ETH'
        },
        {
          name: this.activo.siglas + '/XRP',
          type: 'radio',
          label: this.activo.siglas + '/XRP',
          value: 'XRP'
        },
        {
          name: this.activo.siglas + '/BCH',
          type: 'radio',
          label: this.activo.siglas + '/BCH',
          value: 'BCH'
        },
        {
          name: this.activo.siglas + '/USD',
          type: 'radio',
          label: this.activo.siglas + '/USD',
          value: 'USD'
        },
        {
          name: this.activo.siglas + '/EUR',
          type: 'radio',
          label: this.activo.siglas + '/EUR',
          value: 'EUR'
        },
        {
          name: this.activo.siglas + '/KRW',
          type: 'radio',
          label: this.activo.siglas + '/KRW ',
          value: 'KRW'
        },
        {
          name: this.activo.siglas + '/GBP',
          type: 'radio',
          label: this.activo.siglas + '/GBP ',
          value: 'GBP'
        },
        {
          name: this.activo.siglas + '/AUD',
          type: 'radio',
          label: this.activo.siglas + '/AUD',
          value: 'AUD'
        },
        {
          name: this.activo.siglas + '/CHF',
          type: 'radio',
          label: this.activo.siglas + '/CHF',
          value: 'CHF'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data: string) => {
            this.parStr = data;
            console.log(this.exchangeStr);
          }
        }
      ]
    });

    await alert.present();
  }


  cambiarTipo(valor: string) {
    if (valor == "compra") {
      this.tipo = "comprar";
      this.service.setTipoAdquisicion("comprar");
    } else if (valor == "venta") {
      this.tipo = "vender";
      this.service.setTipoAdquisicion("vender");
    }
  }
  getRandomColor() {
    var colores = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'dark', 'medium', 'light'];
    var ale = Math.floor(Math.random() * colores.length);
    let color: string = colores[ale];
    return color;
  }

  getStyle() {
    //const style = `background-image: url(${profilePicUrl})`;
    var url: string;
    if (this.activo.tipo == "Criptomoneda") {
      url = this.generarImgCripto(this.activo);
    } else if (this.activo.tipo == "Stock") {
      url = this.generarImgStock(this.activo);
    }
    const style = `background-image:url(${url});background-position:center center;background-repeat:no-repeat;background-size: 100px 100px;`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  generarImgCripto(activo) {
    return activo.rutaIMG;
  }
  generarImgStock(activo) {
    return this.baseURI + "img-activos-stocks/" + activo.nombre + ".png";
  }
  public cambiarRotacion(): void {
    console.log(this.screenOrientation.type)
    console.log(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    if (this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT || this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY || this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY) {
      console.log("cambiando a landscape")
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.screenOrientation.unlock();
    } else {
      console.log("cambiando a portrairt")
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
  }

}
