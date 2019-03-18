import { Component, OnInit } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { UsuarioClass } from './class/UsuarioClass';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public mostrarPrimerChart: boolean = true;
  usuario: UsuarioClass;
  public email: string;
  public sexo: string;
  public telefono: string;
  public permitirGuardado: boolean = false;
  constructor(private service: ServiceLoginDashboardService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.usuario = this.service.getDestn();
    this.sexo = this.usuario.sexo;
    this.email = this.usuario.email;
    this.telefono = this.usuario.telefono;
  }
  public activarPermitirGuardado() {
    if (this.permitirGuardado == false) {
      this.permitirGuardado = true;
    }
  }
  public guardarCambios() {
    this.permitirGuardado = false;
    this.usuario.sexo = this.sexo;
    this.usuario.email = this.email;
    this.usuario.telefono = this.telefono;
    this.service.setDestn(this.usuario);
    this.sendNotification("Cambios guardados con exito!")
    this.service.modificarPerfilUsuario(this.usuario)

  }
  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      animated: true,
      position: "bottom",
      duration: 2000
    });
    toast.present();
  }
  public cambiarSelect(data: any) {
    let recibido: string = data['detail']['value'];
    console.log(recibido)
    switch (recibido) {
      case "fracciones":
        this.mostrarPrimerChart = true;
        break;
      case "porcentajes":
        this.mostrarPrimerChart = false;
        break;

      default:
        break;
    }
  }


}
