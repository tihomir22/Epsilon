import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from '../servicios/apis.service';
import { Constantes } from 'src/Constantes';
import { ActivoBalanceInterface } from '../modales/gestion-api/modelos/ActivoBalanceInterface';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-plantilla-api',
  templateUrl: './plantilla-api.page.html',
  styleUrls: ['./plantilla-api.page.scss'],
})
export class PlantillaAPIPage implements OnInit {
  public datosQueryParams: string;
  public arrayFinal: Array<ActivoBalanceInterface> = [];
  public mostrarBalance: boolean = false;
  public realizarTransaccion: boolean = false;

  constructor(private route: Router, private activaruta: ActivatedRoute, private apiService: ApisService, public loadingController: LoadingController, private navCtrl: NavController) { }

  ngOnInit() {
    this.datosQueryParams = this.activaruta.snapshot.queryParamMap.get('tipo');
    console.log(this.apiService.getApi())
    this.procesarParams();

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos',
      duration: 2000
    });
    await loading.present();
  }
  goBack() {
    this.navCtrl.goBack();
  }

  public procesarParams(): void {
    this.presentLoading();
    switch (this.datosQueryParams) {
      case Constantes.balance:
        this.apiService.obtenerBalanceBinance(this.apiService.devolverPaquete(this.apiService.getApi().apiKey, this.apiService.getApi().privateKey)).subscribe((data: ActivoBalanceInterface[]) => {
          console.log(data)
          this.arrayFinal = data;
          this.mostrarBalance = true;
        }, (error) => {
          console.log(error)
        }, () => {
          this.loadingController.dismiss();
        })

        break;

      case Constantes.listadoTransaccion:

        break;

      case Constantes.realizarTransaccion:
        this.realizarTransaccion = true;
        break;
    }
  }

}