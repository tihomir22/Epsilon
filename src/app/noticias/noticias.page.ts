import { Component, OnInit } from '@angular/core';
import { NoticiasSSService } from '../servicios/noticias-ss.service';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import 'rxjs/add/operator/map';
import { map, filter } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TouchSequence } from 'selenium-webdriver';
import { Noticia } from './clases/noticiaClass';
import { ModalNoticiasComponent } from '../modales/modal-noticias/modal-noticias.component';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  arraySiglasCripto: Array<any> = new Array;
  arraySiglasStock: Array<any> = new Array;
  arrayNoticiasCalientes: Array<any> = new Array;

  arrayNoticiasCripto: Array<any> = new Array;
  arrayNoticiasStock: Array<any> = new Array;

  contCripto: number = 0;
  contStock: number = 0;

  public noHayActivo: boolean = false;

  segmentBool: boolean = false;

  cargarStockTerminada: boolean = false;
  cargarCriptoTerminada: boolean = false;
  constructor(public servicio: NoticiasSSService, public loadingController: LoadingController, private iab: InAppBrowser, private toast: ToastController, private modalController: ModalController) { }

  ngOnInit() {
    this.inicioCargaNoticias();
  }

  cambiarSegmentVar() {
    if (this.segmentBool == true) {
      this.segmentBool = false;
    } else {
      this.segmentBool = true;
    }
  }

  anadirNoticiaAFavoritos(noticia: Object) {
    console.log("Vamos a checkear el favorito we ", noticia.toString())
    let notician = new Noticia(noticia);
    console.log(notician.toString())

    this.servicio.subirNoticiaFavoritaServidor(notician).subscribe((data) => { this.presentToast("Noticia añadida a favoritos!") }, (error) => { console.log(error) }, () => { console.log("he terminado") })
  }



  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalNoticiasComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }



  public inicioCargaNoticias() {
    this.presentLoading();
    this.arraySiglasCripto.length = 0;
    this.arraySiglasStock.length = 0;
    //filtrar activos cripto y activos sotkc ( separlos )
    console.log(this.servicio.getArrayActivosUsuario())
    console.log(this.servicio.getArrayActivosUsuario().length)
    if (this.servicio.getArrayActivosUsuario().length == 0) {
      this.loadingController.dismiss();
      this.noHayActivo = true;
    } else {
      const source = from(this.servicio.getArrayActivosUsuario());

      const criptos = source.pipe(filter(activo => activo.tipo === "Criptomoneda"));
      const suscribe = criptos.subscribe(resultado => this.arraySiglasCripto.push(resultado.siglas), (error) => { console.log(error) }, () => {
        this.cargarNoticiasCriptomonedas()
      });
      const stocks = source.pipe(filter(activo => activo.tipo === "Stock"));
      const suscribestock = stocks.subscribe(resultado => this.arraySiglasStock.push(resultado.siglas), (error) => { console.log(error) }, () => {
        this.cargarNoticiasStock();
      });
    }


  }
  public cargarNoticiasCriptomonedas() {
    let arrayTMP = new Array
    this.servicio.cargarNoticias("Criptomoneda", this.arraySiglasCripto).subscribe((data) => {
      arrayTMP.push(data)
    }, (error) => { console.log(error) }, () => {
      this.arrayNoticiasCripto = arrayTMP;
      this.arrayNoticiasCripto = this.arrayNoticiasCripto[0]['Data'];
      this.arrayNoticiasCripto.forEach(element => {
        element['fechaBuena'] = this.trasformarEpocADate((element['published_on'] * 1000)).toLocaleString();
        element['categorias'] = element['categories'].split("|");
        if (element['categorias'].length > 5) {
          element['categorias'].length = 5;
        }
      });
      console.log(this.arrayNoticiasCripto);
      //this.generarNoticiasCalientes();
      this.cargarCriptoTerminada = true
      console.log("terminada la carga de cripto y boolean a true", this.cargarCriptoTerminada)
      if (this.cargarStockTerminada) {
        console.log("Es un buen momento para llamar a las noticias calientes")
        this.generarNoticiasCalientes();
      }
    })
  }

  public cargarNoticiasStock() {
    let arrayNoticiasStock = new Array
    this.servicio.cargarNoticias("Stock", this.arraySiglasStock).subscribe((data) => {
      console.log(data);
      arrayNoticiasStock.push(data);
      arrayNoticiasStock = arrayNoticiasStock[0];
      arrayNoticiasStock = this.filtrarArrayNoticias(arrayNoticiasStock);
      arrayNoticiasStock = this.formatearArrayNoticias(arrayNoticiasStock);
      this.arrayNoticiasStock = arrayNoticiasStock;
    }, (error) => { console.log(error) }, () => {
      console.log("He terminado y tengo", arrayNoticiasStock)
      this.cargarStockTerminada = true;
      console.log("terminada la carga de stock y boolean a true", this.cargarStockTerminada)
      if (this.cargarCriptoTerminada) {
        console.log("Es un buen momento para llamar a las noticias calientes")
        this.generarNoticiasCalientes();
      }
      //termina y obtengo un array con arrays dentro

    })
  }

  public filtrarArrayNoticias(arrayNoticiasStock: Array<any>) {
    //la peticion http devuelve unos json sin parsear
    console.log("Me llegado esto", arrayNoticiasStock)
    let arrayTMP = new Array;
    for (let i = 0; i < arrayNoticiasStock.length; i++) {
      if (i % 2 == 0) { // los datos vienen en formato par = siglas del activo impar = informacion en json
        let json = JSON.parse(arrayNoticiasStock[i + 1]);
        json['siglas'] = arrayNoticiasStock[i];
        arrayTMP.push(json)
      }
    }
    arrayNoticiasStock = arrayTMP;
    console.log(arrayNoticiasStock)

    let arrayResultado = new Array;
    for (let i = 0; i < arrayNoticiasStock.length; i++) { // este for recorre el array de arrays resultante
      let array = arrayNoticiasStock[i];
      let siglas = arrayNoticiasStock[i]['siglas'];
      for (let j = 0; j < array.length; j++) { // este recorre el array interno
        let elemento = array[j];
        elemento['siglas'] = siglas;
        arrayResultado.push(elemento);
      }
    }
    return arrayResultado;
  }
  public formatearArrayNoticias(arrayNoticiasStock: Array<any>) {
    for (let i = 0; i < arrayNoticiasStock.length; i++) {
      let elemento = arrayNoticiasStock[i];

      elemento['title'] = elemento['headline'];
      delete elemento['headline'];
      elemento['body'] = elemento['summary'];
      delete elemento['summary'];
      elemento['fechaBuena'] = elemento['datetime'];
      delete elemento['datetime'];
      elemento['categorias'] = elemento['related'];
      //elemento['categorias']=elemento['categorias'].replace(/,/g,"|");
      elemento['categorias'] = elemento['categorias'].split(",");
      if (elemento['categorias'].length > 5) {
        elemento['categorias'].length = 5;
      }
      delete elemento['related'];
      elemento['imageurl'] = "https://storage.googleapis.com/iex/api/logos/" + elemento['siglas'] + ".png";
      delete elemento['image'];



    }
    return arrayNoticiasStock;
  }


  public generarNoticiasCalientes() {
    this.arrayNoticiasCalientes.length = 0;
    let flagCripto: boolean = false;
    let flagStock: boolean = false;
    console.log("entro");

    //las noticias calientes consisten en 3 noticias, por lo que nos hará falta un array de noticias de 3 elementos
    while (this.arrayNoticiasCalientes.length < 3) {

      if (this.arrayNoticiasCripto.length > 0 && flagCripto == false) {
        this.arrayNoticiasCalientes.push(this.arrayNoticiasCripto[this.contCripto]);
        this.contCripto++;
        flagCripto = true;
        flagStock = false;
        console.log("añado cripto")
      }
      console.log(this.arrayNoticiasStock.length)
      if (this.arrayNoticiasStock.length > 0 && flagStock == false) {
        this.arrayNoticiasCalientes.push(this.arrayNoticiasStock[this.contStock]);
        this.contStock++;
        flagCripto = false;
        flagStock = true;
        console.log("añado stock")
      }
    }
    this.closeLoading();
  }

  public trasformarEpocADate(num: number) {
    return new Date(num);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 4000
    });
    return await loading.present();
  }
  async closeLoading() {
    this.loadingController.dismiss();
  }

  public abrirArticulo(url: string) {
    this.iab.create(url);
  }

}
