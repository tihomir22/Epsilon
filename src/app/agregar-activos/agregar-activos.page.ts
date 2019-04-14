import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import "rxjs/add/operator/debounceTime";
import "hammerjs"; // HAMMER TIME
import { HammerGestureConfig } from "@angular/platform-browser";
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';


@Component({
  selector: 'app-agregar-activos',
  templateUrl: './agregar-activos.page.html',
  styleUrls: ['./agregar-activos.page.scss'],
})
export class AgregarActivosPage extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }

  constructor(public alertController: AlertController, public service: ServiceLoginDashboardService, public http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super();

  }

  ngOnInit() {


  }

}
