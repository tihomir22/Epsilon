import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApisService } from 'src/app/servicios/apis.service';
import { exchangeClass } from './modelos/exchangeClass';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ActivoBalance } from './modelos/ActivoBalance';


@Component({
  selector: 'app-gestion-api',
  templateUrl: './gestion-api.component.html',
  styleUrls: ['./gestion-api.component.scss']
})
export class GestionApiComponent implements OnInit {
  public arrayCriptoExchange: Array<exchangeClass> = new Array<exchangeClass>();
  public exchangeSeleccionado: boolean = false;
  public confirmarConexion: boolean = false;
  public tipoExchangeSeleccionado: string = "";
  public nombreExchangeSeleciconado: string = '';
  public paso1: string;
  public paso2: string;
  public paso3: string;
  public arrayRutasImgCripto: Array<string> = new Array("../../../assets/capturas/paso1cripto.png", "../../../assets/capturas/paso2cripto.png", "../../../assets/capturas/paso3cripto.png");
  public imagenQR: string = "../../../assets/capturas/qr-code.png";
  public apikeyString: string = "";
  public privatekeyString: string = "";
  public nombreApi: string;

  formgroup: FormGroup;
  apikey: AbstractControl;
  privatekey: AbstractControl;


  private arrayRes: Array<any> = new Array;
  private arrayFinal: Array<ActivoBalance> = new Array;
  private terminaCargaBalanceExchange: boolean = false;


  constructor(public modal: ModalController, private servicio: ApisService, public formbuilder: FormBuilder, private qrScanner: QRScanner, private toastCtrl: ToastController) {
    this.formgroup = formbuilder.group({
      apikey: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(70)])],
      privatekey: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(70)])]
    })


    this.apikey = this.formgroup.controls['apikey'];
    this.privatekey = this.formgroup.controls['privatekey'];



  }

  ngOnInit() {
    this.recuperarExchangesCripto();
  }

  cerrarModal() {
    this.modal.dismiss();
  }
  public recuperarExchangesCripto(): void {
    this.servicio.getTodosLosExchanges().subscribe((data: exchangeClass[]) => {
      console.log(data)
      this.arrayCriptoExchange = data;
    })
  }

  public seleccionarExchangeCripto(exchange: exchangeClass): void {
    this.exchangeSeleccionado = true;
    this.nombreExchangeSeleciconado = exchange.nombre;
    this.tipoExchangeSeleccionado = "cripto";
    this.generarPasosTuto(exchange);

  }
  public generarPasosTuto(exchange: exchangeClass): void {
    if (this.tipoExchangeSeleccionado == "cripto") {
      this.paso1 = "Primero logeate en tu exchange favorito, en este caso a " + exchange.nombre + ", despues si tienes activado el sistema de autenticación con Google deberas introducir tu numero secreto.";
      this.paso2 = "Despues de logearte deberás buscar el apartado de las APIS, suele estar en configuración o incluso en la pagina de inicio como en casos como Binance";
      this.paso3 = "Al acceder a nuestras apis, es posible que tengamos que crearnos una nueva, nos guardaremos la API Key y la Secret Key para usarlas."
    }
  }
  public guardarExchange(): void {

    if (this.formgroup.status == "VALID") {
      this.servicio.recuperarClavesAPI(this.apikeyString, this.privatekeyString, this.nombreApi).subscribe((data: any) => {
        console.log(data)
        if (data.length > 0) {
          this.presentarToast("Esas keys ya las introduciste antes!")
        } else {
          console.log("es nuevo el registro!!! se puede agregar!")
          this.servicio.guardarClaveAPI(this.apikeyString, this.privatekeyString, this.nombreApi).subscribe((data) => {
            console.log(data)
            this.confirmarConexion = true;
            this.enviarKeysYRecibirBalanceActivos();
          })
        }

      })
    } else {
      this.presentarToast("Has introducido unas keys incorrectas")
    }
  }
  public enviarKeysYRecibirBalanceActivos() {
    this.terminaCargaBalanceExchange = false;
    let json =
    {
      "api-key": this.apikeyString,
      "api-secret": this.privatekeyString,
      "curlOpts": {
        "CURLOPT_SSL_VERIFYPEER": 0,
        "INVALID_CONSTANT_NAME": 42
      }
    }
    this.servicio.obtenerBalanceBinance(json).subscribe((data) => {
      console.log(data)
      this.arrayRes.push(data);
      this.arrayRes = this.arrayRes[0];

      for (var key in this.arrayRes) {
        if (this.arrayRes.hasOwnProperty(key)) {
          //console.log(key + " -> " + this.arrayRes[key]["btcTotal"]);
          if (this.arrayRes[key]["btcTotal"] > 0 && this.arrayRes[key]["btcTotal"] != 0) {
            console.log("añadiendo", key)
            let activo: ActivoBalance = this.arrayRes[key]
            activo.nombre = key;
            activo.imgURL="http://dembow.gearhostpreview.com/img-activos/IOTA.png";
            this.arrayFinal.push(activo);
          }

        }
      }
    }, (error) => {
      this.presentarToast(error)
    }, () => {
      this.terminaCargaBalanceExchange = true;
    })
  }
  async presentarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Cerrar'
    });
    toast.present();


  }

  public escanearConQR(): void {
    const ionApp = <HTMLElement>document.getElementsByTagName('ion-app')[0];

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {

          // camera permission was granted
          console.log("estoy autorizado... abriendo camara??")
          this.qrScanner.show();
          ionApp.style.display = 'none';
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            if (this.nombreExchangeSeleciconado === "Binance") {
              let json = JSON.parse(text)
              this.apikeyString = json['apiKey'];
              this.privatekeyString = json['secretKey'];
              this.nombreApi = json['comment'];
            }

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            ionApp.style.display = 'block';


          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log("estoy sin permiso para siempre")
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log("sin permiso per temporal")
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }





}
