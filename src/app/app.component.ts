import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Agregar Activos',
      url: '/agregar-activos',
      icon: 'add'
    },
    {
      title: 'Salir',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private service:ServiceLoginDashboardService,
    private menuCtrl:MenuController,
    private navCtrl:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  dembow(p:any){
    
    if(p.title==this.appPages[this.appPages.length-1].title){
      this.service.logOutMethod();
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot("/login");
    }
  }
}
