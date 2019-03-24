import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/servicios/apis.service';
import { ServiceLoginDashboardService } from 'src/app/servicios/service-login-dashboard.service';
import { ModalController } from '@ionic/angular';
import { GestionApiComponent } from "../../modales/gestion-api/gestion-api.component";


@Component({
  selector: 'app-conexiones',
  templateUrl: './conexiones.component.html',
  styleUrls: ['./conexiones.component.scss']
})
export class ConexionesComponent implements OnInit {
  private arrayActivos: Array<any>;
  private arrayRes: Array<any> = new Array;
  private arrayFinal: Array<any> = new Array;
  constructor(private apis: ApisService, private servicio: ServiceLoginDashboardService,public modalController: ModalController) { }

  ngOnInit() {
    this.arrayActivos = this.servicio.getArrayActivosCompletos();
  }
  /*
  recuperarBinance() {
    this.apis.obtenerBalanceBinance().subscribe((data) => {
      console.log(data)
      this.arrayRes.push(data);
      this.arrayRes = this.arrayRes[0];

      for (var key in this.arrayRes) {
        if (this.arrayRes.hasOwnProperty(key)) {
          //console.log(key + " -> " + this.arrayRes[key]["btcTotal"]);
          if (this.arrayRes[key]["btcTotal"] > 0 && this.arrayRes[key]["btcTotal"] != 0) {
            console.log("añadiendo", key)
          }

        }
      }

    }, (error) => {
      console.log(error)
    }, () => {
      console.log(this.arrayFinal)
    })
  }
  */

  async presentModal() {
    const modal = await this.modalController.create({
      component: GestionApiComponent
    });
    return await modal.present();
  }
 


}
