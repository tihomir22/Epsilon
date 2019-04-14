import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { MailingService } from '../servicios/mailing.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(public alertController: AlertController,
    private infousuarioservicio: ServiceLoginDashboardService,
    private toastController: ToastController,
    private mailingService:MailingService) { }

  ngOnInit() {
  }

  public cambiarContrasenya(): void {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Introduce los datos',
      cssClass: "dembow",
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: this.infousuarioservicio.getDestn().email,
          placeholder: 'Introduce email',
          disabled: true,
        },
        {
          name: 'pass1',
          type: 'password',
          id: 'pass1-id',
          placeholder: 'Introduzca nueva contraseña'
        },
        {
          name: 'pass2',
          type: 'password',
          id: 'pass2-id',
          placeholder: 'Vuelva a repetir la contraseña nueva'
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cambiar',
          handler: (data) => {
            console.log(data);

            if (data['pass1'] == data['pass2'] && data['pass1'].length > 0 && data['pass2'].length > 0) {
              if (data['pass1'].length > 5 && data['pass1'].length < 40) {
                if (data['pass1'].match('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')) {
                  //console.log("full manguito")
                  let usuario=this.infousuarioservicio.getDestn();
                  this.mailingService.cambiarContrasenyaYEnviarEmailAviso(usuario.idepsilon_usuarios,data['pass1'],usuario.email).subscribe((data)=>{
                    this.presentToast(data,3000)
                  })
                } else {
                  this.presentToast("Las contraseñas no tienen un formato correcto", 3000)
                }
              } else {
                this.presentToast("Has introducido un tamaño incorrecto de contraseña", 3000)
              }
            } else {
              this.presentToast("Las contraseñas no coinciden", 3000)
            }

          }
        }
      ]
    });

    await alert.present();
  }
  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }
}
