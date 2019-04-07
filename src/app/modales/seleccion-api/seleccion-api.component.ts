import { Component, OnInit, Input } from '@angular/core';
import { apiInterfaz } from '../vista-rapida-api/models/apiInterfaz';
import { ApisService } from 'src/app/servicios/apis.service';
import { exchangeClass } from '../gestion-api/modelos/exchangeClass';
import { ExchangeInterface } from '../gestion-api/modelos/exchangeInterface';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constantes } from 'src/Constantes';

@Component({
  selector: 'app-seleccion-api',
  templateUrl: './seleccion-api.component.html',
  styleUrls: ['./seleccion-api.component.scss']
})
export class SeleccionApiComponent implements OnInit {
  @Input('arrayApis')
  set arrayApis(arrayApis: Array<apiInterfaz>) {
    this._arrayApis = arrayApis;

  }

  public _arrayApis: Array<apiInterfaz> = [];
  public todosLosExchanges: Array<exchangeClass> = [];
  constructor(private servicioApi: ApisService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.cargarTodosLosExchanges();

  }

  public cargarTodosLosExchanges(): void {
    this.servicioApi.getTodosLosExchanges().subscribe((data: Array<exchangeClass>) => {
      this.todosLosExchanges = data;
      this.asignarValoresDelExchangeAlaApi();
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("termianda carga exchange")
    })
  }

  private asignarValoresDelExchangeAlaApi(): void {
    for (let i = 0; i < this._arrayApis.length; i++) {
      let exchange: exchangeClass = this.recuperarInfoRelativaAlExchange(this._arrayApis[i].id_exchange_api);
      if (exchange != null) {
        this._arrayApis[i]['nombre_exchange'] = exchange.nombre;
        this._arrayApis[i]['foto_exchange'] = exchange.imagen_icono;
      } else {
        console.log("EXCHANGE NO ENCONTRADO")
      }

    }
  }
  public seleccionarApi(api: apiInterfaz): void {
    this.modalCtrl.dismiss();
    this.servicioApi.setApi(api);
    this.router.navigate(["/plantilla-api"], { queryParams: { tipo: Constantes.balance } })
  }

  public recuperarInfoRelativaAlExchange(id_exchange: number): exchangeClass {
    for (let i = 0; i < this.todosLosExchanges.length; i++) {
      console.log("comparando ", [this.todosLosExchanges[i].id, id_exchange])
      if (this.todosLosExchanges[i].id == id_exchange) {
        return this.todosLosExchanges[i];
      }
    }
    return null;
  }
  goBack() {
    this.modalCtrl.dismiss();
  }


}
