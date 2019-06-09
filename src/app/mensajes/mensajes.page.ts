import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';
import { AdminServiceService } from '../servicios/admin-service.service';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { mensajeModel } from './detalle-conversacion/modelos/mensajeModel';
import { MensajeschatService } from './detalle-conversacion/servicios/mensajeschat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  public arrayUsuariosExceptoYo: Array<UsuarioInterface> = [];
  public arrayUsuariosCopia: Array<UsuarioInterface> = [];
  public mensajesSinLeer: Array<mensajeModel> = [];
  public formGroup: FormGroup;

  constructor(
    private adminservice: AdminServiceService,
    private loginservice: ServiceLoginDashboardService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private messagin: MensajeschatService,
    private router: Router) { }

  ngOnInit() {
    this.mensajesSinLeer = this.loginservice.getMensajesSinLeer();
    this.cargarUsurios();
    this.formGroup = this.formBuilder.group({
      busqueda: ['']
    })
    this.formGroup.valueChanges.subscribe((data) => {
      of(this.arrayUsuariosCopia).pipe(map(usuarios => usuarios.filter(usuario => usuario.usuario.includes(this.formGroup.getRawValue().busqueda)))).subscribe((data) => {
        this.arrayUsuariosExceptoYo = data;
      })
    })
  }
  ionViewWillEnter() {
    this.messagin.recuperarMensajesSinLeer(this.loginservice.getDestn().idepsilon_usuarios).subscribe((data: Array<any>) => {
      this.loginservice.setMensajesSinLeer(data);
      this.mensajesSinLeer = this.loginservice.getMensajesSinLeer();
      this.adminservice.getAppPages().forEach(appPage => {
        if (appPage.numMensajes != undefined) {
          appPage.numMensajes = data.length;
        }
      });
    })
  }

  private cargarUsurios(): void {
    this.adminservice.obtenerUsuarios(this.loginservice.getDestn().idepsilon_usuarios).subscribe((data) => {
      this.arrayUsuariosExceptoYo = data;
      this.arrayUsuariosCopia = data;
      this.loginservice.setTodosLosUsuariosExceptoActual(data);
    }, (error) => {
      this.presentAlert(error);
    })
  }

  public getOccurrence(idPersonaQueEnvia: any) {
    return this.mensajesSinLeer.filter((v) => (v.id_usuario_emisor === idPersonaQueEnvia)).length;
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Ha ocurrido un error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public navegarConversacion(idusuariodestino: number) {
    this.router.navigate(['mensajes', idusuariodestino])
  }



}
