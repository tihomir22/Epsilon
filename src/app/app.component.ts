import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Platform, MenuController, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceLoginDashboardService } from './servicios/service-login-dashboard.service';
import { ApisService } from './servicios/apis.service';
import { isUndefined } from 'util';
import { Constantes } from 'src/Constantes';
import { Router } from '@angular/router';
import { SeleccionApiComponent } from './modales/seleccion-api/seleccion-api.component';
import { AdminServiceService } from './servicios/admin-service.service';
import { ThemeSwitcherService } from './servicios/theme-switcher.service';

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
      title: 'Acciones con API',
      children: [
        {
          title: Constantes.balance,
          url: "/perfil",
          icon: 'basket'
        },
        {
          title: Constantes.realizarTransaccion,
          url: "/realizar-transaccion",
          icon: 'card'
        },
        {
          title: Constantes.listadoTransaccion,
          url: "/perfil",
          icon: 'list-box'
        }
      ]
    },
    {
      title: 'Noticias',
      url: '/noticias',
      icon: 'paper'
    },
    {
      title: 'Mensajes',
      url: '/mensajes',
      icon: 'mail',
      numMensajes: 0
    },
    {
      title: 'Alertas',
      url: '/alertas',
      icon: 'add'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Ajustes',
      url: '/ajustes',
      icon: 'cog'
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
    private apiservice: ApisService,
    private modalController: ModalController,
    private adminService: AdminServiceService,
    private temas: ThemeSwitcherService
  ) {
    this.initializeApp();
    this.adminService.setAppPages(this.appPages);
  }


  static avisar(data: any) {
    AppComponent.rutaImg = data['foto_usuario'];
    let imagen = document.getElementById("imagen")
    let titulo = document.getElementById("titulo")
    let subtitulo = document.getElementById("subtitulo")
    let email = document.getElementById("email")

    imagen.setAttribute('src', data['foto_usuario'])
    subtitulo.innerHTML = "TRADER"
    titulo.innerHTML = data['usuario']
    email.innerHTML = data['email']



  }
  public navegar(event: any, subitem: any): void {
    event.preventDefault();
    this.apiservice.setParametros(subitem);
    this.presentModal();

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SeleccionApiComponent,
      componentProps: { arrayApis: this.apiservice.getListUserApis(), parametros: this.apiservice.getParametros() }
    });

    await modal.present();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout(p: any) {

    if (p.title == this.appPages[this.appPages.length - 1].title) {
      this.temas.setTheme('normal');
      this.service.logOutMethod();
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot("/login");
    }
  }
}
