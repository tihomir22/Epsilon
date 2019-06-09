import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { apiModel } from './models/apiModel';
import { exchangeClass } from '../gestion-api/modelos/exchangeClass';
import { ApisService } from 'src/app/servicios/apis.service';
import { ActivoBalance } from '../gestion-api/modelos/ActivoBalance';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-vista-rapida-api',
  templateUrl: './vista-rapida-api.component.html',
  styleUrls: ['./vista-rapida-api.component.scss']
})
export class VistaRapidaApiComponent implements OnInit {


  // "value" passed in componentProps
  @Input() api: apiModel;
  public todosLosExchanges: Array<exchangeClass> = [];
  public exchange: exchangeClass = null;
  public terminaCargaBalanceExchange: boolean = false;
  public arrayRes: Array<any> = [];
  public arrayFinal: Array<any> = [];
  private mostrarMensajeErrorCarga: boolean = false;
  public totalActivos: number = 0;
  public huboModificaciones: boolean = false;
  public cargandoDatos: boolean = false;
  private credencialesBackup: apiModel;
  public mostrarTexto: boolean = true;
  public mostrarTexto2: boolean = true;


  constructor(navParams: NavParams, public modal: ModalController, private servicioApi: ApisService, public alertController: AlertController, public toastController: ToastController, private loadingCtrl: LoadingController) {
    // componentProps can also be accessed at construction time using NavParams
  }
  ngOnInit() {
    console.log(this.api)
    this.cargarTodosLosExchangesYBuscarElBueno();
    this.enviarKeysYRecibirBalanceActivos(this.api.apiKey, this.api.privateKey);
    this.credencialesBackup = this.api;
  }

  cerrarModal() {
    this.modal.dismiss();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
    });
    return await loading.present();
  }
  public stopLoading() {
    this.loadingCtrl.dismiss();
  }

  public cargarTodosLosExchangesYBuscarElBueno(): void {
    this.servicioApi.getTodosLosExchanges().subscribe((data: Array<exchangeClass>) => {
      this.todosLosExchanges = data;
      for (let i = 0; i < this.todosLosExchanges.length; i++) {
        if (this.todosLosExchanges[i].id == this.api.id_exchange_api) {
          this.exchange = this.todosLosExchanges[i];
        }
      }
      if (this.exchange == null) {
        console.log("no se ha encontrado el exchange")
      } else {
        console.log(this.exchange)
      }
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("termianda carga exchange")
    })
  }

  public enviarKeysYRecibirBalanceActivos(apikey: string, privateKey: string) {
    this.presentLoading();
    let observable = this.servicioApi.obtenerBalanceBinance(this.servicioApi.devolverPaquete(apikey, privateKey)).subscribe((data) => {
      this.arrayRes = new Array<any>();
      this.arrayRes.push(data);
      this.arrayRes = this.arrayRes[0];
      for (var key in this.arrayRes) {
        if (this.arrayRes.hasOwnProperty(key)) {
          //console.log(key + " -> " + this.arrayRes[key]["btcTotal"]);
          if (this.arrayRes[key]["btcTotal"] > 0 && this.arrayRes[key]["btcTotal"] != 0) {
            let activo: ActivoBalance = this.arrayRes[key]
            //activo['nombreActivo'] = key;
            this.generarImgCripto(activo['nombreActivo']).subscribe((data) => {
              if (data[0] != undefined) {
                activo.imgURL = "http://dembow.gearhostpreview.com/img-activos/" + data[0].nombre + ".png"
              } else {
                activo.imgURL = "http://dembow.gearhostpreview.com/logoepsilonoluminado.png"
              }
            })
            this.arrayFinal[key] = activo;
          }

        }
      }
      this.totalActivos = Object.keys(this.arrayFinal).length
    }, (error) => {
      observable.unsubscribe();
      console.log(error)
      this.stopLoading();
    }, () => {
      this.terminaCargaBalanceExchange = true;
      console.log(this.arrayFinal)
      this.stopLoading();
    })
    //si tarda demasiado la respuesta es porque ha fallado o la conexion es demasiado lenta, por eso se mostrará un boton para volver atras
    timer(10000).subscribe((data) => {
      if (!this.terminaCargaBalanceExchange) {
        console.log("tiempo expirado")
        observable.unsubscribe();
        this.mostrarMensajeErrorCarga = true;
      }
    })
  }
  generarImgCripto(nombreCripto: string): Observable<any> {
    let devolucion =
      this.servicioApi.recuperarImagenesAPartirDeSiglas(nombreCripto)

    return devolucion;
  }
  public enModificacion(): void {
    this.huboModificaciones = true;
  }
  public enviarCambiosApi(): void {
    this.huboModificaciones = false;
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Esta a punto de modificar sus claves de conexion a la API de ' + this.exchange.nombre + ' <strong>si ha introducido datos incorrectos no podra conectarse y volverá al inicio</strong>. Desea continuar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.cargandoDatos = true;
            this.presentLoading();
            this.enviarKeysYRecibirBalanceActivos
            this.servicioApi.obtenerBalanceBinance(this.servicioApi.devolverPaquete(this.api.apiKey, this.api.privateKey)).subscribe((data => {
              console.log(data)
              this.tramitarRespuesta();
            }), (error) => {
              console.log("Ha habido un error!")
              this.presentAlert("Resultado de solicitud", "Ups", [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }], "Ha habido un error y no se han podido cargar sus datos. Pruebe con otra clave.Los datos se reiniciarán")
              this.stopLoading();
              this.cargandoDatos = false;
            }, () => {
              this.stopLoading();
              this.cargandoDatos = false;
            })
          }
        }
      ]
    });

    await alert.present();
  }
  private tramitarRespuesta(): void {

    this.presentAlert("Conexion establecida", "Elige una opcion", [{
      text: 'Sobreescribir la existente',
      cssClass: 'secondary',
      handler: (blah) => {
        this.servicioApi.modificarClaveApi(this.api.id, this.api.apiKey, this.api.privateKey, this.api.nombre).subscribe((data => {
          console.log(data)
          this.presentToast(data['message'])
        }))
      }
    },
    {
      text: 'Agregar nueva conexion',
      cssClass: 'secondary',
      handler: (blah) => {
        console.log("pues agreguemos no?")
        //para evitar guardar la misma conexion duplicada
        this.servicioApi.recuperarClavesAPI(this.api.apiKey, this.api.privateKey, this.api.nombre).subscribe((data) => {
          let array: Array<any> = [];
          array.push(data);
          array = array[0]

          if (array.length > 0) {
            this.presentAlert("Ups", "Ha habido un error", ['OK'], "No puedes agregar una conexion ya existente!")
          } else {
            this.presentToast("Nueva clave " + this.api.nombre + " añadida con exito")
            this.servicioApi.guardarClaveAPI(this.api.apiKey, this.api.privateKey, this.api.nombre, this.api.id_exchange_api).subscribe((data) => {
              console.log(data)
              this.modal.dismiss({
                'result': "dembow"
              })

            })
            this.enviarKeysYRecibirBalanceActivos(this.api.apiKey, this.api.privateKey)
          }
        })
        /*/
        
        */
      }
    }], "Se ha podido conectar a la API. Pero no existe en nuestros registros. Desea agregarla como nueva conexion o sobreescribir la existente?")


  }

  async presentAlert(header: string, subheader: string, buttons: any, mensaje: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: mensaje,
      buttons: buttons
    });

    await alert.present();
  }


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
