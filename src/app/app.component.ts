import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public static rutaImg: string;


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
      title: 'Noticias',
      url: '/noticias',
      icon: 'paper'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
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
    private service: ServiceLoginDashboardService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private renderer: Renderer2
  ) {
    this.initializeApp();

  }
 
  static avisar(data: any) {
    console.log("recibido", data['foto_usuario'])
    AppComponent.rutaImg = data['foto_usuario'];
    let imagen = document.getElementById("imagen")
    let titulo = document.getElementById("titulo")
    let subtitulo = document.getElementById("subtitulo")
    let email = document.getElementById("email")

    imagen.setAttribute('src', data['foto_usuario'])
    subtitulo.innerHTML="TRADER"
    titulo.innerHTML=data['usuario']
    email.innerHTML=data['email']


    
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  dembow(p: any) {

    if (p.title == this.appPages[this.appPages.length - 1].title) {
      this.service.logOutMethod();
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot("/login");
    }
  }
}
