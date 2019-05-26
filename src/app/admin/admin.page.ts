import { Component, OnInit, Inject } from '@angular/core';
import { AdminServiceService } from '../servicios/admin-service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogoAdminComponent } from './dialogo-admin/dialogo-admin.component';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public accionesSobreActivos: Array<any> = [];
  public accionesSobreUsuarios: Array<any> = [];
  public ID_ACTUALIZAR_CRIPTO_ACTIVOS_SQL = 1;
  public ID_PERMISOS_USUARIO_SQL = 101;
  public ID_BLOQUEAR_USUARIO_SQL = 102;

  constructor(private adminserv: AdminServiceService, private generalser: ServiceLoginDashboardService, public modalController: ModalController, public dialog: MatDialog, public loadingController: LoadingController, public alertController: AlertController) {
    this.accionesSobreActivos = [
      { id: 1, label: 'Actualizar el top 100 de criptomonedas y guardar en la base de datos', icono: 'assignment_turned_in' }
    ]
    this.accionesSobreUsuarios = [
      { id: 101, label: 'Gestion de permisos de usuario', icono: 'perm_contact_calendar' },
      { id: 102, label: 'Desbloquear/bloquear usuarios', icono: 'block' }
    ]
  }

  ngOnInit() {
  }

  public procesarOpcionPorId(id: number) {
    switch (id) {
      case this.ID_ACTUALIZAR_CRIPTO_ACTIVOS_SQL:
        this.presentAlertConfirm("La operación que vas a realizar va a eliminar los registros de criptomonedas en la base de datos y añadir la lista de nuevo actualizada, esto puede tardar entre 10 secs y hasta 1 minuto, <strong>Desea continuar?</strong>")
        break;
      case this.ID_PERMISOS_USUARIO_SQL:
        this.presentLoading('Cargando usuarios...');
        this.adminserv.obtenerUsuarios(this.generalser.getDestn().idepsilon_usuarios).subscribe((data: UsuarioInterface[]) => {
          this.loadingController.dismiss();
          this.presentarDialogoAngular(data, "usuarios-privilegios");
        }, (error) => {
        }, () => {
          this.loadingController.dismiss();
        })
        break;
      case this.ID_BLOQUEAR_USUARIO_SQL:
        this.presentLoading('Cargando usuarios...');
        this.adminserv.obtenerUsuarios(this.generalser.getDestn().idepsilon_usuarios).subscribe((data: UsuarioInterface[]) => {
          this.loadingController.dismiss();
          this.presentarDialogoAngular(data, "usuarios-bloqueos");
        }, (error) => {
        }, () => {
          this.loadingController.dismiss();
        })
        break;

    }
  }

  async presentLoading(msg: string) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación requerida!',
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Adelante',
          handler: () => {
            console.log('Confirm Okay');
            this.presentLoading("Manos a la obra!")
            this.adminserv.obtenertop100().subscribe((dataActivos) => {
              this.loadingController.dismiss();
              this.presentarDialogoAngular(dataActivos, "activos");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  private presentarDialogoAngular(datos: Array<any>, tipoDatos: string) {

    const dialogRef = this.dialog.open(DialogoAdminComponent, {
      width: '100vh',
      height: '90vh',
      data: [datos, tipoDatos]
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    })

  }


}
